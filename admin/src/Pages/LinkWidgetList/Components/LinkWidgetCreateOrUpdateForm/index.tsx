import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, FormRenderProps, useForm } from 'react-final-form';
import { type LinkWidget } from 'vinisto_api_client/src/domain/link-widget';
import {
	Input,
	InputMultiselect,
	InputNumber,
	InputRange,
	InputSelect,
	Validators,
} from 'Components/Form';
import { UseMutateAsyncFunction, useQuery } from '@tanstack/react-query';
import IconPickerInput from 'Components/Form/Components/IconPicker';
import { Modal } from 'Components/Modal';
import { FaRegImage } from 'react-icons/fa';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { capitalize } from 'Helpers/lodash';
import getUrlString from 'Helpers/getUrlString';
import SpecificationService from 'vinisto_api_client/src/product-service/specification';
import { SECTION_TRANSLATION_MAP } from 'Pages/LinkWidgetList/constants';
import AutocompleteCategory from 'Components/Form/Components/AutocompleteCategory';
import PlatformMultiselect from 'Components/Form/Components/PlatformMultiselect';

import ImagePicker from './ImagePicker';

interface CategoryOption {
	value: string;
	label: string;
	url: string;
	image: string | undefined;
}

import {
	Allowed_Sections,
	Link_Widget_Types,
} from '@/domain/link-widget/enums';
import { HttpResponse } from '@/link-widget-service/client';
import { ProblemDetails } from '@/api-types/linkwidgets-api';
import api from '@/api';
import { VinistoProductDllModelsApiCategoryCategoryReturn } from '@/api-types/product-api';
import { VinistoCmsDllModelsApiReturnCmsArticlesReturn } from '@/api-types/cms-api';
import { Specification } from '@/domain/specification/schema';

interface LinkWidgetFormValues extends LinkWidget {
	section: Allowed_Sections;
	specification?: string;
	categoryLocator?: string;
	specificationValue?: string | number[];
	availableImages: string[];
	flagsOptions: { value: string; label: string }[];
	flags: string[];
}

type LinkWidgetCreateOrUpdateFormProps =
	| {
			mode: 'CREATE';
			data: Partial<LinkWidget>;
			updateHandler?: undefined;
			createHandler: UseMutateAsyncFunction<
				HttpResponse<boolean, ProblemDetails>,
				unknown,
				{
					data: Partial<LinkWidget> & {
						name: string;
						pathId: string;
						availableOnPlatforms: number[];
					};
				},
				unknown
			>;
	  }
	| {
			mode: 'UPDATE';
			data: Partial<LinkWidget>;
			updateHandler: UseMutateAsyncFunction<
				HttpResponse<boolean, ProblemDetails>,
				unknown,
				{
					id: string;
					link: LinkWidget;
				},
				unknown
			>;
			createHandler?: undefined;
	  };

const toUniqueArray = <T,>(array: T[] = [], ...newItems: T[]) =>
	Array.from(new Set([...array, ...newItems]));

// TODO: BE limit 0 stopped returing all records, therefore limit 9999
const params = {
	Limit: 9999,
	isCache: true,
};

const RenderIconPicker = ({
	values,
}: Partial<
	FormRenderProps<LinkWidgetFormValues, Partial<LinkWidgetFormValues>>
>) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { change } = useForm();

	return (
		<div>
			<div className="gap-3 mb-3 d-flex align-items-center">
				<Button
					type="button"
					onClick={() => setIsModalOpen(true)}
					className="gap-2 d-flex align-items-center"
				>
					<FaRegImage />
					{t({ id: 'icon.select' })}
				</Button>
			</div>
			<Modal
				show={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
			>
				<IconPickerInput
					name="imageLocator"
					identifier="imageLocator"
					label="icon.select"
					onChange={(value) =>
						change(
							'availableImages',
							toUniqueArray(values?.availableImages, value)
						)
					}
					activeIcon={values?.imageLocator}
					validate={Validators.required}
					onSelectCallback={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

function normalizeUrlSeparators(url: string): string {
	return url.replace(/-/g, '+');
}

const LinkWidgetCreateOrUpdateForm = ({
	mode,
	data,
	createHandler,
	updateHandler,
}: LinkWidgetCreateOrUpdateFormProps) => {
	const getLocalizedValue = useLocalizedValue();
	const { id = '' } = data;
	const entityUrlRegex = /\/\w+\/([^/|]+)\|\w*/;

	const section = data.pathId?.split('|')[1] as Allowed_Sections;

	const firstUrlPart = data.url?.split('/')[1];
	const secondUrlPart = data.url?.split('/')[2];

	const category = data.pathId?.replace(entityUrlRegex, '$1');
	const categoryLocator = data.pathId?.replace(entityUrlRegex, '$1');

	const { data: categoryData, isFetching: isCategoryDataFetching } = useQuery(
		['getCategoryByUrl', categoryLocator],
		() =>
			api
				.get<VinistoProductDllModelsApiCategoryCategoryReturn>(
					`product-api/categories/${categoryLocator}/GetCategoryByUrl`,
					params
				)
				.then((response) => response.category),
		{
			enabled: Boolean(section === Allowed_Sections.CATEGORY && category),
		}
	);

	const categoryImage = categoryData?.images?.[0]?.domainUrls?.thumb_64x80;

	if (isCategoryDataFetching) return null;

	return (
		<Form<LinkWidgetFormValues>
			initialValues={{
				...data,
				section: section ?? Allowed_Sections.CATEGORY,
				type: data.type ?? Link_Widget_Types.Category,
				pathId: data.pathId?.split('|')[0],
				...(section === Allowed_Sections.CATEGORY && {
					category: getLocalizedValue(categoryData?.name),
					categoryLocator: getLocalizedValue(categoryData?.name),
				}),
				...(data.type === 2 && {
					blog: getUrlString(secondUrlPart ?? ''),
				}),
				...(data.type === 3 && {
					specification: getUrlString(firstUrlPart ?? ''),
					specificationValue: /^\d+-\d+$/.test(
						getUrlString(secondUrlPart ?? '')
					)
						? getUrlString(secondUrlPart ?? '')
								.split('-')
								.map(Number)
						: getUrlString(secondUrlPart ?? ''),
				}),
				imageLocator: data.imageLocator || categoryImage || '',
				availableImages: data.imageLocator
					? [data.imageLocator]
					: categoryImage
					? [categoryImage]
					: [],
			}}
			onSubmit={(data) => {
				const flags = data.flagsOptions?.map((flag) => flag.value);

				if (mode === 'CREATE')
					return createHandler({
						data: {
							...data,
							pathId: `${data.pathId}|${data.section}`,
							flags,
						},
					});
				if (mode === 'UPDATE') {
					return updateHandler({
						id,
						link: { ...data, pathId: `${data.pathId}|${data.section}`, flags },
					});
				}
			}}
			render={({ handleSubmit, values, initialValues }) => (
				<FormContent
					handleSubmit={handleSubmit}
					values={values}
					initialValues={initialValues}
				/>
			)}
		></Form>
	);
};

export default LinkWidgetCreateOrUpdateForm;

const FormContent = ({
	form,
	handleSubmit,
	values,
	initialValues,
}: Partial<
	FormRenderProps<LinkWidgetFormValues, Partial<LinkWidgetFormValues>>
>) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const localize = useLocalizedValue();
	const { change } = useForm();

	const { data: specificationData } = useQuery(['specifications', params], () =>
		SpecificationService.getAllSpecifications(params)
	);

	const specificationId = specificationData?.specifications?.find(
		(specification) =>
			getUrlString(localize(specification.name)) === values?.specification
	)?.id;

	const specificationValueParams = {
		...params,
		specificationId,
	};

	const { data: specificationValueData } = useQuery(
		['specifications', 'specificationValues', specificationValueParams],
		() =>
			api.get<any>(
				`product-api/specifications/${specificationId}/GetSpecificationUsedValues`
			),
		{
			enabled: Boolean(specificationId),
		}
	);

	const { data: articleData } = useQuery(['articles', params], () =>
		api.get<VinistoCmsDllModelsApiReturnCmsArticlesReturn>('cms-api/articles', {
			...params,
			IsCache: false,
		})
	);

	const typeOptions = Object.keys(Link_Widget_Types)
		.filter((key) => isNaN(Number(key)))
		.map((key) => ({
			value: String(Link_Widget_Types[key as keyof typeof Link_Widget_Types]),
			label: key,
		}));

	const specificationOptions = specificationData?.specifications
		?.map((specification) => ({
			label: localize(specification.name).trim(),
			value: getUrlString(localize(specification.name)),
		}))
		.sort((a, b) => a.label.localeCompare(b.label));

	const specificationValueOptions = Array.from(
		new Set(
			specificationValueData?.specificationValues?.map((value: unknown) =>
				typeof value === 'number' ? Math.round(value) : value
			) ?? []
		)
	)
		?.sort((a: unknown, b: unknown) => {
			const sortCache = Number(a) - Number(b);
			return isNaN(sortCache)
				? String(a).trim().localeCompare(String(b).trim())
				: sortCache;
		})
		.map((value: unknown) => ({
			label: String(value).trim(),
			value: getUrlString(String(value)),
		}));

	const articleOptions = articleData?.articles
		?.map((article) => ({
			label: String(article.title).trim(),
			value: article.url,
		}))
		.sort((a, b) => a.label.localeCompare(b.label));

	const getSpecificationFromSlug = (
		specifications: Specification[],
		slug: string
	) => {
		const specification = specifications.find((specification) => {
			return getUrlString(localize(specification.name)) === slug;
		});
		return specification;
	};

	const getRangeMinMax = (specification: Specification | undefined) => {
		if (
			['NUMBER', 'DECIMAL_NUMBER', 'DECIMAL_NUMBER_IMPERIAL'].includes(
				specification?.specificationType ?? ''
			)
		) {
			const sortedValues = Array.from(
				new Set<number>(
					specificationValueData?.specificationValues?.map((value: unknown) =>
						Math.round(Number(value))
					) ?? []
				)
			)?.sort((a, b) => a - b);
			return {
				min: sortedValues[0],
				max: sortedValues[sortedValues.length - 1],
			};
		}
		if (specification?.specificationType === 'PRICE') {
			return { min: specification.min, max: specification.max };
		}
		return { min: 0, max: 1000 };
	};

	const specification = getSpecificationFromSlug(
		specificationData?.specifications ?? [],
		values?.specification ?? ''
	);

	// To "select" the first available image as default value if there is no imageLocator
	useEffect(() => {
		if (!values?.imageLocator && values?.availableImages?.length) {
			change('imageLocator', values?.availableImages?.[0]);
		}
	}, [values?.availableImages, values?.imageLocator, change]);

	const sectionOptions: { label: string; value: string }[] = [];
	for (const [key, value] of Object.entries(SECTION_TRANSLATION_MAP)) {
		sectionOptions.push({
			label: t({ id: value })?.toString() ?? '',
			value: key,
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<PlatformMultiselect
				name="availableOnPlatforms"
				identifier="availableOnPlatforms"
				label="availableOnPlatform"
				validate={Validators.required}
			/>
			<InputSelect
				name="section"
				identifier="section"
				label={'admin.linkWidgetList.section.label'}
				options={sectionOptions}
				onChange={(e) => {
					if (e === Allowed_Sections.CATEGORY) {
						change('pathId', initialValues?.pathId);
					} else {
						change('pathId', '/');
					}
				}}
			/>
			{values?.section === Allowed_Sections.CATEGORY && (
				<AutocompleteCategory<CategoryOption>
					name="categoryLocator"
					identifier="categoryLocator"
					label={'admin.linkWidgetList.categoryLocator.label'}
					mapOption={(category) => ({
						value: category?.id || '',
						label: localize(category?.name),
						url: localize(category?.url),
						image: category?.images?.[0]?.domainUrls?.thumb_64x80,
					})}
					placeholder="search.category.singular"
					onChange={(options) => {
						const selectedOption = options?.[0];
						change('pathId', `/kategorie/${selectedOption.url}`);
					}}
				/>
			)}
			{values?.section === Allowed_Sections.CATEGORY && (
				<Input
					name="pathId"
					identifier="pathId"
					label={'admin.linkWidgetList.identifier.label'}
					disabled
					validate={Validators.required}
				/>
			)}
			<InputSelect
				name="type"
				identifier="type"
				label="admin.linkWidgetList.type.label"
				options={typeOptions.map((option) => ({
					label: t({ id: `linkWidgetType.${option.label}` })?.toString(),
					value: option.value,
				}))}
				onChange={() => {
					[
						'category',
						'blog',
						'specification',
						'specificationValue',
						'imageLocator',
						'name',
						'url',
						'availableImages',
					].forEach((field) => {
						change(field, field === 'availableImages' ? [] : '');
						form?.resetFieldState(field as keyof LinkWidgetFormValues);
					});
				}}
			/>
			{Number(values?.type) === Link_Widget_Types.Category && (
				<AutocompleteCategory<CategoryOption>
					name="category"
					identifier="category"
					label={'admin.linkWidgetList.category.label'}
					mapOption={(category) => ({
						value: category?.id || '',
						label: localize(category?.name),
						url: localize(category?.url),
						image: category?.images?.[0]?.domainUrls?.thumb_64x80,
					})}
					placeholder="search.category.singular"
					onChange={(options) => {
						const option = options?.[0];
						const categoryImage = option?.image;

						change('name', option?.label);
						change('url', `/kategorie/${option?.url}`);
						change('imageLocator', categoryImage ?? '');
						change('availableImages', categoryImage ? [categoryImage] : []);
					}}
				/>
			)}
			{Number(values?.type) === Link_Widget_Types.Blog && (
				<InputSelect
					name="blog"
					identifier="blog"
					label={'admin.linkWidgetList.blog.label'}
					onChange={(e) => {
						const option = articleOptions?.find(
							(option: any) => option.value === e
						);

						change('name', option?.label);
						change('url', `/blog/${option?.value}`);
					}}
					options={articleOptions}
				/>
			)}

			{Number(values?.type) === Link_Widget_Types.Specification && (
				<>
					<InputSelect
						name="specification"
						identifier="specification"
						label={'admin.linkWidgetList.specification.label'}
						onChange={(e) => {
							const option = specificationOptions?.find(
								(option: any) => option.value === e
							);

							const selectedSpecification = getSpecificationFromSlug(
								specificationData?.specifications ?? [],
								e ?? ''
							);

							const specificationImage =
								// @ts-expect-error adapter issue?
								selectedSpecification?.images?.[0]?.domainUrls?.thumb_64x80;

							if (
								[
									'NUMBER',
									'DECIMAL_NUMBER',
									'DECIMAL_NUMBER_IMPERIAL',
									'PRICE',
								].includes(selectedSpecification?.specificationType ?? '')
							) {
								change('specificationValue', [
									getRangeMinMax(selectedSpecification).min,
									getRangeMinMax(selectedSpecification).max,
								]);
							}
							change('name', option?.label);
							change('url', `/${capitalize(option?.value ?? '')}`);
							change('imageLocator', specificationImage ?? '');
							change(
								'availableImages',
								specificationImage ? [specificationImage] : []
							);
						}}
						options={specificationOptions}
					/>

					{values?.specification &&
						([
							'NUMBER',
							'DECIMAL_NUMBER',
							'DECIMAL_NUMBER_IMPERIAL',
							'PRICE',
						].includes(specification?.specificationType ?? '') ? (
							<InputRange
								name="specificationValue"
								identifier="specificationValue"
								label={'admin.linkWidgetList.specificationValue.label'}
								min={getRangeMinMax(specification).min}
								max={getRangeMinMax(specification).max}
								onChange={(value) => {
									const appendedName = `${
										values?.name.split(' - ')[0]
									} - ${value.join('-')}`;

									const urlParts = values?.url.split('/');
									const baseUrl =
										urlParts.length > 2
											? urlParts.slice(0, -1).join('/')
											: values?.url;
									const appendedUrl = `${normalizeUrlSeparators(
										baseUrl
									)}/${value.join('-')}`;

									change('name', appendedName);
									change('url', appendedUrl);
								}}
							/>
						) : (
							<InputSelect
								name="specificationValue"
								identifier="specificationValue"
								label={'admin.linkWidgetList.specificationValue.label'}
								options={specificationValueOptions}
								onChange={(e) => {
									const option = specificationValueOptions?.find(
										(option: any) => option.value === e
									);

									const selectedSpecification = getSpecificationFromSlug(
										specificationData?.specifications ?? [],
										values.specification ?? ''
									);

									const selectedValue =
										// @ts-expect-error adapter issue?
										selectedSpecification?.allowedValues?.[e];

									const selectedValueImage =
										selectedValue?.images?.[0]?.domainUrls?.thumb_64x80;

									const selectedValueIcon = selectedValue?.icons?.[0]?.url;

									const appendedName = `${values?.name.split(' - ')[0]} - ${
										option?.label
									}`;

									const urlParts = values?.url.split('/');
									const baseUrl =
										urlParts.length > 2
											? urlParts.slice(0, -1).join('/')
											: values?.url;
									const appendedUrl = `${normalizeUrlSeparators(baseUrl)}/${
										option?.value
									}`;

									change('name', appendedName);
									change('url', appendedUrl);
									if (selectedValueImage || selectedValueIcon) {
										change(
											'availableImages',
											toUniqueArray(
												values?.availableImages,
												selectedValueImage,
												selectedValueIcon
											).filter(Boolean)
										);
									}
								}}
							/>
						))}
				</>
			)}
			<Input
				name="name"
				identifier="name"
				label={'linkText'}
				validate={Validators.required}
			/>
			<Input
				name="url"
				identifier="url"
				label={'admin.linkWidgetList.url.label'}
				validate={Number(values?.type) !== 4 ? Validators.required : undefined}
			/>
			<InputMultiselect
				options={[
					{
						value: 'Highlighted',
						label: `${t({ id: 'admin.linkWidgetList.Highlighted.label' })}`,
					},
					{
						value: 'ExcludedFromMenu',
						label: `${t({
							id: 'admin.linkWidgetList.ExcludedFromMenu.label',
						})}`,
					},
				]}
				name="flagsOptions"
				identifier="flagsOptions"
				label="admin.linkWidgetList.flags.label"
				className="form-control--link-widget"
				initialSelected={values?.flags?.map((flag) => ({
					value: flag,
					label: `${t({ id: 'admin.linkWidgetList.' + flag + '.label' })}`,
				}))}
			/>
			<InputNumber
				name="order"
				identifier="order"
				label={'order'}
				validate={Validators.required}
			/>

			<div className="gap-2 d-flex">
				<RenderIconPicker values={values} />
				<ImagePicker
					options={(values?.availableImages ?? []).map((image) => ({
						value: image,
						label: '',
					}))}
					defaultValue={values?.imageLocator}
					onChange={(value) => change('imageLocator', value)}
					name="imagePicker"
				/>
			</div>
			<Button type="submit">{t({ id: 'save' })}</Button>
		</form>
	);
};

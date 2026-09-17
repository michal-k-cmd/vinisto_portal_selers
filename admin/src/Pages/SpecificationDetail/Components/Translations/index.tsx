import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query';
import { Column, Row } from '@tanstack/react-table';
import AdminTable from 'Components/AdminTable';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import Detail from 'Components/Detail';
import {
	ADD_SPECIFICATION_TRANSLATION,
	EDIT_SPECIFICATION_TRANSLATION,
} from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import MetaColumn from 'Pages/SpecificationDetail/Components/MetaColumn';
import { useContext, useMemo } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { apiServiceInstance } from 'Services/ApiService';
import { VinistoImageDllModelsApiImageImage } from 'vinisto_api_client/src/api-types/image-api/';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	ComboBoxSpecification,
	MultiComboBoxSpecification,
} from 'Services/Specification/interfaces';

import styles from './styles.module.css';

export enum TranslationMode {
	ADD = 'ADD',
	EDIT = 'EDIT',
}

interface TranslationProps {
	data: ComboBoxSpecification | MultiComboBoxSpecification;
	editSpecificationMutation: UseMutationResult<any, unknown, void, unknown>;
}

interface HandleRemoveSpecificationTranslationLanguageRequestParams {
	specificationId: string;
	language: VinistoHelperDllEnumsLanguage;
	userLoginHash: string;
}

const Translations = ({
	data,
	editSpecificationMutation,
}: TranslationProps) => {
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const getLocalizedValue = useLocalizedValue();
	const t = localizationContext.useFormatMessage();
	const notificationsContext = useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const queryClient = useQueryClient();

	const removeSpecificationTranslationLanguage = ({
		specificationId,
		language,
		userLoginHash,
	}: HandleRemoveSpecificationTranslationLanguageRequestParams) => {
		return apiServiceInstance.put(
			`product-api/specifications/${specificationId}/remove-language-value`,
			{
				language,
				userLoginHash,
			}
		);
	};

	const removeSpecificationTranslationLanguageMutation = useMutation({
		mutationFn: (
			requestParams: HandleRemoveSpecificationTranslationLanguageRequestParams
		) => removeSpecificationTranslationLanguage(requestParams),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['specifications', data.id],
			});
			notificationsContext.handleShowSuccessNotification(
				'admin.deleteSpecificationTranslation.success'
			);
		},
		onError: () => {
			notificationsContext.handleShowErrorNotification(
				'admin.deleteSpecificationTranslation.error'
			);
		},
	});

	const handleRemoveSpecificationTranslationLanguage = (
		data: Omit<
			HandleRemoveSpecificationTranslationLanguageRequestParams,
			'userLoginHash'
		>
	) =>
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteSpecificationTranslation.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteSpecificationTranslation.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						removeSpecificationTranslationLanguageMutation.mutate({
							specificationId: data.specificationId,
							language: data.language,
							userLoginHash,
						});
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.no',
					})}`,
					onClick: () => {},
				},
			],
		});

	const adminTableSchema = useMemo(
		() => [
			{
				header: `${t({ id: 'language' })}`,
				accessorKey: 'language',
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'nameOf' })}`,
				accessorKey: 'name',
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'metaDescription' })}`,
				accessorKey: 'metaDescription',
				enableColumnFilter: false,
				enableSorting: false,
				size: 400,
				cell: ({
					row,
					column,
				}: {
					row: Row<SpecificationTranslation>;
					column: Column<SpecificationTranslation, unknown>;
				}) => (
					<div
						{...(!row.getIsExpanded() && {
							className: styles.truncated,
							style: { maxWidth: `calc(${column.getSize()}px - 1.5rem)` },
						})}
					>
						{row.original.metaDescription}
					</div>
				),
			},
			{
				header: `${t({ id: 'description' })}`,
				accessorKey: 'description',
				enableColumnFilter: false,
				enableSorting: false,
				size: 400,
				cell: ({
					row,
					column,
				}: {
					row: Row<SpecificationTranslation>;
					column: Column<SpecificationTranslation, unknown>;
				}) => (
					<div
						{...(!row.getIsExpanded() && {
							className: styles.truncated,
							style: { maxWidth: `calc(${column.getSize()}px - 1.5rem)` },
						})}
					>
						{row.original.description}
					</div>
				),
			},
			{
				header: `${t({ id: 'image' })}`,
				accessorKey: 'image',
				enableColumnFilter: false,
				enableSorting: false,
				cell: ({ row }: { row: Row<SpecificationTranslation> }) => {
					const { image } = row.original;
					return image ? (
						<a
							// @ts-expect-error todo fix
							href={`${image.domainUrls?.original_png}`}
							target="_blank"
							rel="noreferrer"
						>
							<img
								// @ts-expect-error todo fix
								src={image.domainUrls?.thumb_64x80 ?? ''}
								alt=""
							/>
						</a>
					) : null;
				},
				size: 48,
			},
			{
				accessorKey: '',
				id: 'meta',
				cell: ({ row }: { row: Row<SpecificationTranslation> }) => (
					<MetaColumn<SpecificationTranslation>
						row={row}
						handleEdit={() =>
							modalContext.handleOpenModal(EDIT_SPECIFICATION_TRANSLATION, {
								...row.original,
								id: row.original.specificationId,
								editSpecificationMutation,
							})
						}
						handleDelete={() =>
							handleRemoveSpecificationTranslationLanguage(row.original)
						}
					/>
				),
				size: 210,
				enableColumnFilter: false,
				enableSorting: false,
			},
		],
		[editSpecificationMutation, modalContext, t, userLoginHash]
	);

	interface SpecificationTranslation {
		id: VinistoHelperDllEnumsLanguage;
		specificationId: string;
		language: VinistoHelperDllEnumsLanguage;
		name: string;
		description: string;
		metaDescription: string;
		image: VinistoImageDllModelsApiImageImage | undefined;
	}

	const translations = Object.values(VinistoHelperDllEnumsLanguage)
		.map((language) => ({
			id: language,
			specificationId: data.id,
			language,
			name: getLocalizedValue(data.name ?? [], language),
			description: getLocalizedValue(data.description ?? [], language),
			metaDescription: getLocalizedValue(data.metaDescription ?? [], language),
			image: data.images.find(
				(image) => getLocalizedValue(data.imageId ?? [], language) === image.id
			),
		}))
		.filter((record) => record.name.length);

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({
					id: 'admin.modal.category.specification.translation.label',
				})}`}
			/>
			<AdminTable<SpecificationTranslation>
				data={translations}
				columns={adminTableSchema}
				variant={AdminTableVariants.DETAIL_STYLE}
			/>
			<Detail.Button
				className="mt-3 mb-2"
				onClick={() => {
					modalContext.handleOpenModal(ADD_SPECIFICATION_TRANSLATION, {
						...translations,
						mode: TranslationMode.ADD,
						editSpecificationMutation,
					});
				}}
			>
				{t({ id: 'addTranslation' })}
			</Detail.Button>
		</Detail.Container>
	);
};

export default Translations;

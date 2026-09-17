import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CForm } from '@coreui/react';
import cx from 'classnames';
import { get, isEmpty, map } from 'Helpers/lodash';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { InputAutocompleteProps } from 'Components/Form/Components/Autocomplete/interfaces';
import { SpecificationDefinition } from 'Services/Specification/interfaces';
import {
	SpecificationType,
	TYPE_PRICE,
} from 'Services/Specification/constants';
import { apiServiceInstance } from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import ContentPreloader from 'Components/ContentPreloader';
import {
	Input,
	InputAutocomplete,
	InputError,
	Label,
	Validators,
} from 'Components/Form';
import { TagService } from 'vinisto_api_client';

import CheckBoxForm from '../CategorySpecification/Components/CheckBoxForm';
import NumberForm from '../CategorySpecification/Components/NumberForm';
import TextForm from '../CategorySpecification/Components/TextForm';
import MultiselectForm from '../CategorySpecification/Components/MultiselectForm';

import { CountryCode } from '@/shared';
import { AddSpecificationToTagParams } from '@/product-service/tag';

type TagSpecificationModalData = {
	tagId: string;
	specification: SpecificationDefinition;
	alreadyAdded: SpecificationDefinition[];
	selectedValues: string[] | number[] | boolean[];
	countryCode: CountryCode;
	refetchTagsFn: () => void;
};

const SPECIFICATION_MAP = {
	[SpecificationType.CHECK_BOX]: TagService.addCheckboxSpecificationToTag,
	[SpecificationType.MULTI_COMBO_BOX]:
		TagService.addMultiComboboxSpecificationToTag,
	[SpecificationType.COMBO_BOX]: TagService.addComboboxSpecificationToTag,
	[SpecificationType.NUMBER]: TagService.addNumberSpecificationToTag,
	[SpecificationType.NUMBER_IMPERIAL]:
		TagService.addNumberImperialSpecificationToTag,
	[SpecificationType.DECIMAL_NUMBER]: TagService.addDecimalSpecificationToTag,
	[SpecificationType.DECIMAL_NUMBER_IMPERIAL]:
		TagService.addDecimalNumberImperialSpecificationToTag,
	[SpecificationType.TEXT]: TagService.addTextSpecificationToTag,
};

const TagSpecificationModal = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);

	const modalContext = useContext(ModalContext);
	const modalData = modalContext.data as TagSpecificationModalData;

	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const specificationToEdit: SpecificationDefinition | undefined =
		modalData.specification;
	const isEdit = specificationToEdit !== undefined;

	const [autocompleteSpecifications, setAutocompleteSpecifications] =
		useState<InputAutocompleteProps['options']>();
	const [specifications, setSpecifications] = useState<
		SpecificationDefinition[]
	>(isEdit ? [specificationToEdit] : []);
	const [selectedSpecificationId, setSelectedSpecificationId] = useState<
		string | undefined
	>(specificationToEdit?.id);
	const [selectedSpecificationValues, setSelectedSpecificationValues] =
		useState<string[] | number[] | boolean[]>([]);
	const [specificationValueError, setSpecificationValueError] =
		useState<string>();

	const selectedSpecification = useMemo(
		() => specifications.find((s) => s.id === selectedSpecificationId),
		[specifications, selectedSpecificationId]
	);

	const selectedSpecificationType = selectedSpecification?.specificationType;

	const handleOnSubmit = () => {
		if (!selectedSpecification) return;
		if (isEmpty(selectedSpecificationValues)) {
			setSpecificationValueError('validation.error.required');
			return;
		}

		const tagId = modalData.tagId;

		const apiMethod =
			SPECIFICATION_MAP[selectedSpecification.specificationType];

		if (!apiMethod) {
			handleShowErrorNotification('admin.modal.tag.specification.error');
			return;
		}

		const params: AddSpecificationToTagParams = {
			tagId,
			countryOfSale: modalData.countryCode,
		};

		// We will send both allowedValues and allowedNumberValues
		// because based on specification type, each endpoint has a different payload structure
		// it ignores the excess
		const req = {
			allowedValues: selectedSpecificationValues,
			allowedNumberValues: selectedSpecificationValues.filter(
				(value) => typeof value === 'number' || typeof value === 'string'
			) as number[] | string[],
			specificationDefinitionId: selectedSpecification.id,
			userLoginHash: vinistoUser.loginHash,
		};

		apiMethod(params, req)
			.then(() => {
				handleShowSuccessNotification(
					isEdit
						? 'admin.modal.tag.specification.edit.success'
						: 'admin.modal.tag.specification.add.success'
				);
				modalData.refetchTagsFn();
				modalContext.handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification(
					isEdit
						? 'admin.modal.tag.specification.edit.error'
						: 'admin.modal.tag.specification.add.error'
				);
			});
	};

	const handleOnSelectSpecificationId = useCallback(
		(specificationOption: InputAutocompleteProps['options']) => {
			setSelectedSpecificationId(
				isEmpty(specificationOption) ? undefined : specificationOption[0].value
			);
		},
		[]
	);

	const handleOnValidateSpecificationId = (
		value: InputAutocompleteProps['options']
	) => (isEmpty(value) ? 'validation.error.required' : undefined);

	const setSelectedValues = useCallback(
		(value: typeof selectedSpecificationValues) => {
			setSelectedSpecificationValues(value);
			setSpecificationValueError(
				isEmpty(value) ? 'validation.error.required' : undefined
			);
		},
		[]
	);

	useEffect(() => {
		if (isEdit) return;
		apiServiceInstance
			.getCollection(
				'product-api/admin/specifications',
				[
					{ key: 'userLoginHash', value: vinistoUser.loginHash },
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((payload) => {
				apiServiceInstance
					.getCollection(
						'product-api/admin/specifications',
						[
							{ key: 'userLoginHash', value: vinistoUser.loginHash },
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
						],
						true
					)
					.then((payload) => {
						const alreadyAddedSpecificationIds: string[] = map(
							get(modalContext, 'data.alreadyAdded'),
							'definition.id'
						);
						const payloadSpecifications = get(
							payload,
							'specifications',
							[]
						) as SpecificationDefinition[];
						const specificationToSelect = !Array.isArray(payloadSpecifications)
							? []
							: payloadSpecifications
									.filter(
										(specification) =>
											!alreadyAddedSpecificationIds.includes(
												specification.id
											) &&
											String(specification.specificationType) !== TYPE_PRICE
									)
									.map((specification) => ({
										value: specification.id,
										label: getLocalizedValue(specification.name),
									}))
									.sort((a, b) => a.label.localeCompare(b.label));
						setAutocompleteSpecifications(specificationToSelect);
						setSpecifications(payloadSpecifications);
					});
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.modal.tag.specification.autocomplete.error'
				);
				setAutocompleteSpecifications([]);
			});
	}, [
		isEdit,
		handleShowErrorNotification,
		vinistoUser.loginHash,
		modalContext,
		getLocalizedValue,
	]);

	const isLoading = !isEdit && autocompleteSpecifications === undefined;

	return (
		<Form
			onSubmit={handleOnSubmit}
			initialValues={{
				specificationId: isEdit
					? getLocalizedValue(specificationToEdit.name)
					: undefined,
			}}
			render={({ handleSubmit, submitting }) => {
				return (
					<CForm
						onSubmit={handleSubmit}
						className={cx({ 'position-relative': isLoading })}
					>
						{isLoading && (
							<ContentPreloader wrapperClass="modal-loading-overlay" />
						)}
						{isEdit ? (
							<Input
								identifier="specificationId"
								name="specificationId"
								label="admin.modal.tag.specification.name.label"
								disabled={true}
								validate={Validators.required}
							/>
						) : (
							<InputAutocomplete
								disabled={isLoading}
								options={autocompleteSpecifications ?? []}
								label="admin.modal.tag.specification.name.label"
								labelKey="label"
								name="specificationId"
								identifier="specificationId"
								onChange={handleOnSelectSpecificationId}
								validate={handleOnValidateSpecificationId}
							/>
						)}
						{selectedSpecification && (
							<div>
								<Label isRequired={true}>
									{t({ id: 'admin.modal.tag.specification.value.label' })}
								</Label>
								{selectedSpecificationType === SpecificationType.CHECK_BOX && (
									<CheckBoxForm
										setSelectedValues={setSelectedValues}
										initialValue={modalData.selectedValues as boolean[]}
									/>
								)}
								{(selectedSpecificationType === SpecificationType.COMBO_BOX ||
									selectedSpecificationType ===
										SpecificationType.MULTI_COMBO_BOX) && (
									<MultiselectForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalData.selectedValues as string[]}
									/>
								)}
								{selectedSpecificationType === SpecificationType.TEXT && (
									<TextForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalData.selectedValues as string[]}
									/>
								)}
								{(selectedSpecificationType ===
									SpecificationType.DECIMAL_NUMBER ||
									selectedSpecificationType ===
										SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
									selectedSpecificationType === SpecificationType.NUMBER ||
									selectedSpecificationType ===
										SpecificationType.NUMBER_IMPERIAL) && (
									<NumberForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalData.selectedValues as number[]}
									/>
								)}
								{/* TODO: remove once Multiselect component is rewritten to regular form control */}
								<InputError
									errorMessage={specificationValueError}
									touched={true}
								/>
							</div>
						)}
						<Button
							type="submit"
							disabled={submitting}
						>
							{t({
								id: isEdit
									? 'admin.modal.tag.specification.edit.submit'
									: 'admin.modal.tag.specification.add.submit',
							})}
						</Button>
					</CForm>
				);
			}}
		/>
	);
};

export default TagSpecificationModal;

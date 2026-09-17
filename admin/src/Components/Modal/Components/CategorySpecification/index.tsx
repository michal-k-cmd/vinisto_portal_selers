import {
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { CForm } from '@coreui/react';
import cx from 'classnames';
import { get, isEmpty, map } from 'Helpers/lodash';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { useRevalidator } from 'react-router-dom';
import { InputAutocompleteProps } from 'Components/Form/Components/Autocomplete/interfaces';
import { UpdateSpecificationParams } from 'Services/Category/interfaces';
import { SpecificationDefinition } from 'Services/Specification/interfaces';
import {
	SpecificationType,
	TYPE_PRICE,
} from 'Services/Specification/constants';
import { apiServiceInstance } from 'Services/ApiService';
import CategoryService from 'Services/Category';
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

import CheckBoxForm from './Components/CheckBoxForm';
import MultiselectForm from './Components/MultiselectForm';
import NumberForm from './Components/NumberForm';
import TextForm from './Components/TextForm';

import './styles.css';

/**
 * @category Component Category Specification Modal Content
 */
const CategorySpecificationModal: FC = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const t = useFormatMessage();
	const revalidator = useRevalidator();
	const getLocalizedValue = useLocalizedValue();

	const specificationToEdit: SpecificationDefinition | undefined =
		modalContext.data?.specification;
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

	const handleOnSubmit = useCallback(() => {
		if (!selectedSpecification) return;
		if (isEmpty(selectedSpecificationValues)) {
			setSpecificationValueError('validation.error.required');
			return;
		}

		const categoryId = modalContext.data?.categoryId;

		const updateData: UpdateSpecificationParams = {
			categoryId,
			userLoginHash: vinistoUser.loginHash,
			specification: null!,
			value: null!,
		};
		updateData.specification = selectedSpecification;
		updateData.value = selectedSpecificationValues;

		CategoryService.updateSpecification(updateData)
			.then(() => {
				handleShowSuccessNotification(
					isEdit
						? 'admin.modal.category.specification.edit.success'
						: 'admin.modal.category.specification.add.success'
				);
				modalContext.handleCloseModal();
				revalidator.revalidate();
			})
			.catch(() => {
				handleShowErrorNotification(
					isEdit
						? 'admin.modal.category.specification.edit.error'
						: 'admin.modal.category.specification.add.error'
				);
			});
	}, [
		vinistoUser,
		selectedSpecification,
		selectedSpecificationValues,
		modalContext,
		isEdit,
		handleShowSuccessNotification,
		handleShowErrorNotification,
		revalidator,
	]);

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
					'admin.modal.category.specification.autocomplete.error'
				);
				setAutocompleteSpecifications([]);
			});
	}, [isEdit, handleShowErrorNotification]);

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
								label="admin.modal.category.specification.name.label"
								disabled={true}
								validate={Validators.required}
							/>
						) : (
							<InputAutocomplete
								disabled={isLoading}
								options={autocompleteSpecifications ?? []}
								label="admin.modal.category.specification.name.label"
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
									{t({ id: 'admin.modal.category.specification.value.label' })}
								</Label>
								{selectedSpecificationType === SpecificationType.CHECK_BOX && (
									<CheckBoxForm
										setSelectedValues={setSelectedValues}
										initialValue={modalContext.data?.selectedValues}
									/>
								)}
								{(selectedSpecificationType === SpecificationType.COMBO_BOX ||
									selectedSpecificationType ===
										SpecificationType.MULTI_COMBO_BOX) && (
									<MultiselectForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalContext.data?.selectedValues}
									/>
								)}
								{selectedSpecificationType === SpecificationType.TEXT && (
									<TextForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalContext.data?.selectedValues}
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
										initialValue={modalContext.data?.selectedValues}
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
									? 'admin.modal.category.specification.edit.submit'
									: 'admin.modal.category.specification.add.submit',
							})}
						</Button>
					</CForm>
				);
			}}
		/>
	);
};

export default CategorySpecificationModal;

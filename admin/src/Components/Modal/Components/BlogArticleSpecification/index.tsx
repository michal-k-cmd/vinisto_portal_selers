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
import { InputAutocompleteProps } from 'Components/Form/Components/Autocomplete/interfaces';
import {
	SpecificationDefinition,
	SpecificationDetail,
} from 'Services/Specification/interfaces';
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
import CheckBoxForm from 'Components/Modal/Components/CategorySpecification/Components/CheckBoxForm';
import MultiselectForm from 'Components/Modal/Components/CategorySpecification/Components/MultiselectForm';
import NumberForm from 'Components/Modal/Components/CategorySpecification/Components/NumberForm';
import TextForm from 'Components/Modal/Components/CategorySpecification/Components/TextForm';

import './styles.css';

const BlogArticleSpecificationModal: FC = () => {
	const {
		vinistoUser: { loginHash: userLoginHash },
	} = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { data: modalData, handleCloseModal } = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const specificationToEdit: SpecificationDefinition | undefined =
		modalData?.specification;
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
		useState<string[] | number[] | boolean[]>(modalData?.selectedValues ?? []);
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

		const updateData: SpecificationDetail = {
			definition: selectedSpecification,
			value: {
				allowedValues: selectedSpecificationValues,
			},
		};
		modalData?.onSubmit(updateData);

		handleCloseModal();
	}, [
		selectedSpecification,
		selectedSpecificationValues,
		handleCloseModal,
		handleShowSuccessNotification,
		handleShowErrorNotification,
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
					{ key: 'userLoginHash', value: userLoginHash },
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
							{ key: 'userLoginHash', value: userLoginHash },
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
						],
						true
					)
					.then((payload) => {
						const alreadyAddedSpecificationIds: string[] = map(
							modalData?.alreadyAdded,
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
					'admin.modal.cms.article.specification.autocomplete.error'
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
								label="admin.modal.cms.article.specification.name.label"
								disabled={true}
								validate={Validators.required}
							/>
						) : (
							<InputAutocomplete
								disabled={isLoading}
								options={autocompleteSpecifications ?? []}
								label="admin.modal.cms.article.specification.name.label"
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
									{t({
										id: 'admin.modal.cms.article.specification.value.label',
									})}
								</Label>
								{selectedSpecificationType === SpecificationType.CHECK_BOX && (
									<CheckBoxForm
										setSelectedValues={setSelectedValues}
										initialValue={modalData?.selectedValues}
									/>
								)}
								{(selectedSpecificationType === SpecificationType.COMBO_BOX ||
									selectedSpecificationType ===
										SpecificationType.MULTI_COMBO_BOX) && (
									<MultiselectForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalData?.selectedValues}
									/>
								)}
								{selectedSpecificationType === SpecificationType.TEXT && (
									<TextForm
										setSelectedValues={setSelectedValues}
										specification={selectedSpecification}
										initialValue={modalData?.selectedValues}
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
										initialValue={modalData?.selectedValues}
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
									? 'admin.modal.cms.article.specification.edit.submit'
									: 'admin.modal.cms.article.specification.add.submit',
							})}
						</Button>
					</CForm>
				);
			}}
		/>
	);
};

export default BlogArticleSpecificationModal;

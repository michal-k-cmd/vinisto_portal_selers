import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import {
	entriesIn,
	filter,
	find,
	get,
	includes,
	isEmpty,
	map,
	set,
} from 'Helpers/lodash';
import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import {
	TYPE_CHECK_BOX,
	TYPE_COMBO_BOX,
	TYPE_DECIMAL_NUMBER,
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_MULTI_COMBO_BOX,
	TYPE_NUMBER,
	TYPE_NUMBER_IMPERIAL,
	TYPE_PRICE,
	TYPE_TEXT,
} from 'Services/Specification/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { InputAutocomplete, Validators } from 'Components/Form';
import { Button } from 'react-bootstrap';

import CheckBoxForm from './Components/CheckBoxForm';
import ComboBoxForm from './Components/ComboBoxForm';
import MultiComboBoxForm from './Components/MultiComboBoxForm';
import NumberForm from './Components/NumberForm';
import TextForm from './Components/TextForm';

interface FormValues {
	allowedValue: string;
	allowedValues: Record<any, any>;
	isChecked: boolean;
	numberValue: number;
	imperialNumberValue: number;
	textValue: string;
	language: string;
}

const AddSpecificationToBundleModal = () => {
	const [autocompleteSpecifications, setAutocompleteSpecifications] = useState<
		Record<any, any>[]
	>([]);
	const [specifications, setSpecifications] = useState<Record<any, any>[]>([]);
	const [selectedSpecificationId, setSelectedSpecificationId] = useState(null);
	const selectedSpecification = useMemo<Record<any, any> | undefined>(
		() =>
			find(specifications, { id: selectedSpecificationId }) as
				| Record<any, any>
				| undefined,
		[specifications, selectedSpecificationId]
	);

	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const bundle = modalContext.data?.bundle;
	const bundleId = bundle?.id;

	const handleOnAddSpecificationToBundle = useCallback(
		(formValues: FormValues) => {
			if (!selectedSpecificationId)
				return notificationsContext.handleShowErrorNotification(
					'admin.addSpecificationToBundle.error.notSelectedId'
				);

			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				specificationDefinitionId: get(selectedSpecification, 'id'),
			};

			let apiUrl = `product-api/bundles/${bundleId}/specifications/`;

			if (
				get(selectedSpecification, 'specificationType') === TYPE_COMBO_BOX &&
				formValues.allowedValue !== `${t({ id: 'value.pick' })}`
			) {
				apiUrl += 'AddComboBoxSpecification';
				set(requestData, 'selectedValueName', get(formValues, 'allowedValue'));
			} else if (
				get(selectedSpecification, 'specificationType') === TYPE_MULTI_COMBO_BOX
			) {
				apiUrl += 'AddMultiComboBoxSpecification';
				const allowedValues = map(
					filter(
						entriesIn(get(formValues, 'allowedValues', {})),
						([, value]: [string, boolean]) => value
					),
					(value) => get(value, '[0]')
				);
				set(requestData, 'selectedValuesName', allowedValues);
			} else if (
				get(selectedSpecification, 'specificationType', '') === TYPE_CHECK_BOX
			) {
				apiUrl += 'AddCheckBoxSpecification';
				set(requestData, 'isChecked', get(formValues, 'isChecked'));
			} else if (
				get(selectedSpecification, 'specificationType', '') === TYPE_NUMBER
			) {
				apiUrl += 'AddNumberSpecification';
				set(requestData, 'numberValue', get(formValues, 'numberValue'));
			} else if (
				get(selectedSpecification, 'specificationType', '') ===
				TYPE_DECIMAL_NUMBER
			) {
				apiUrl += 'AddDecimalNumberSpecification';
				set(requestData, 'decimalNumberValue', get(formValues, 'numberValue'));
			} else if (
				get(selectedSpecification, 'specificationType', '') ===
				TYPE_NUMBER_IMPERIAL
			) {
				apiUrl += 'AddNumberImperialSpecification';
				set(requestData, 'numberValue', get(formValues, 'numberValue'));
				set(
					requestData,
					'imperialNumberValue',
					get(formValues, 'imperialNumberValue')
				);
			} else if (
				get(selectedSpecification, 'specificationType', '') ===
				TYPE_DECIMAL_NUMBER_IMPERIAL
			) {
				apiUrl += 'AddDecimalNumberImperialSpecification';
				set(requestData, 'decimalNumberValue', get(formValues, 'numberValue'));
				set(
					requestData,
					'imperialDecimalNumberValue',
					get(formValues, 'imperialNumberValue')
				);
			} else if (
				get(selectedSpecification, 'specificationType', '') === TYPE_TEXT
			) {
				apiUrl += 'AddTextSpecification';
				set(requestData, 'language', get(formValues, 'language'));
				set(requestData, 'textValue', get(formValues, 'textValue'));
			}

			const additionalData = Object.keys(requestData).filter(
				(key) => !['userLoginHash', 'specificationDefinitionId'].includes(key)
			);

			const isDataEmpty =
				additionalData.length === 0 ||
				additionalData.every(
					(key) =>
						//@ts-expect-error - TS doesn't know that requestData[key] is a string
						!requestData[key] ||
						//@ts-expect-error - TS doesn't know that requestData[key] is an array
						(Array.isArray(requestData[key]) && requestData[key].length === 0)
				);

			if (isDataEmpty) {
				return notificationsContext.handleShowErrorNotification(
					'admin.addSpecificationToBundle.error.noAdditionalData'
				);
			}

			apiServiceInstance
				.post(apiUrl, requestData, true)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addSpecificationToBundle.success'
					);
					refetchBundleDetail();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addSpecificationToBundle.error'
					);
				});
		},
		[
			selectedSpecificationId,
			notificationsContext,
			authenticationContext.vinistoUser.loginHash,
			selectedSpecification,
			bundleId,
			refetchBundleDetail,
			modalContext,
		]
	);

	useEffect(() => {
		const loginHash = authenticationContext?.vinistoUser?.loginHash ?? '';
		apiServiceInstance
			.getCollection(
				'product-api/admin/specifications',
				[
					{ key: 'userLoginHash', value: loginHash },
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
							{ key: 'userLoginHash', value: loginHash },
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
							{ key: 'SortingColumn', value: 'name' },
						],
						true
					)
					.then((payload) => {
						const alreadyAddedSpecificationIds = map(
							get(modalContext, 'data.bundleState.bundle.specificationDetails'),
							(specification) => get(specification, 'definition.id')
						);
						let preparedSpecifications = filter(
							get(payload, 'specifications', [] as Record<any, any>[]),
							(specification: Record<any, any>) =>
								!includes(
									alreadyAddedSpecificationIds,
									get(specification, 'id')
								) && specification?.specificationType !== TYPE_PRICE
						) as Record<any, any>[];
						preparedSpecifications = map(
							preparedSpecifications,
							(specification) => {
								return {
									value: get(specification, 'id'),
									label: get(
										find(get(specification, 'name'), {
											language: localizationContext.activeLanguageKey,
										}),
										'value',
										''
									),
								};
							}
						);
						setAutocompleteSpecifications(preparedSpecifications);
						setSpecifications(
							get(payload, 'specifications', []) as Record<any, any>[]
						);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.addSpecificationToBundle.autocomplete.error'
				);
				setAutocompleteSpecifications([]);
			});
	}, []);

	const handleOnSelectSpecificationId = useCallback(
		(specificationOption: Record<any, any>) => {
			if (!isEmpty(specificationOption)) {
				setSelectedSpecificationId(get(specificationOption, '[0].value'));
			}
		},
		[]
	);

	return (
		<Form
			onSubmit={handleOnAddSpecificationToBundle}
			// submitText={'admin.modal.addSpecificationToBundle.submit'}
			initialValues={{
				numberValue: 0,
				imperialNumberValue: 0,
				language: LANGUAGES[0].value,
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<InputAutocomplete
						options={autocompleteSpecifications}
						label="admin.modal.addSpecificationToBundle.autocomplete.label"
						placeholder="admin.modal.addSpecificationToBundle.autocomplete.label"
						labelKey={'label'}
						name="specificationId"
						identifier="specificationId"
						onChange={handleOnSelectSpecificationId}
						validate={Validators.required}
					/>
					{selectedSpecification && (
						<>
							{get(selectedSpecification, 'specificationType', '') ===
								TYPE_COMBO_BOX && (
								<ComboBoxForm
									specification={selectedSpecification}
									validate={Validators.required}
								/>
							)}
							{get(selectedSpecification, 'specificationType', '') ===
								TYPE_MULTI_COMBO_BOX && (
								<MultiComboBoxForm specification={selectedSpecification} />
							)}
							{(get(selectedSpecification, 'specificationType', '') ===
								TYPE_NUMBER ||
								get(selectedSpecification, 'specificationType', '') ===
									TYPE_NUMBER_IMPERIAL ||
								get(selectedSpecification, 'specificationType', '') ===
									TYPE_DECIMAL_NUMBER ||
								get(selectedSpecification, 'specificationType', '') ===
									TYPE_DECIMAL_NUMBER_IMPERIAL) && (
								<NumberForm specification={selectedSpecification} />
							)}
							{get(selectedSpecification, 'specificationType', '') ===
								TYPE_CHECK_BOX && <CheckBoxForm />}
							{get(selectedSpecification, 'specificationType', '') ===
								TYPE_TEXT && <TextForm />}
						</>
					)}
					<Button
						type="submit"
						variant="primary"
					>
						{t({ id: 'admin.modal.addSpecificationToBundle.submit' })}
					</Button>
				</form>
			)}
		/>
	);
};

export default AddSpecificationToBundleModal;

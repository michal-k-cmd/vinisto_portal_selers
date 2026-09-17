import {
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
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
import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';

import CheckBoxForm from './Components/CheckBoxForm';
import ComboBoxForm from './Components/ComboBoxForm';
import MultiComboBoxForm from './Components/MultiComboBoxForm';
import NumberForm from './Components/NumberForm';
import TextForm from './Components/TextForm';

import Product from '@/domain/product';

const AddSpecificationToProductModal: FC = () => {
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
	const queryClient = useQueryClient();

	const handleOnAddSpecificationToProduct = useCallback(
		(formValues: Record<any, any>) => {
			if (!selectedSpecificationId)
				return notificationsContext.handleShowErrorNotification(
					'admin.addSpecificationToProduct.error.notSelectedId'
				);
			const productData = modalContext.data?.product as Product | undefined;

			if (!productData) return;

			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				specificationDefinitionId: get(selectedSpecification, 'id'),
			};

			let apiUrl = `product-api/products/${productData?.id}/specifications/`;

			if (get(selectedSpecification, 'specificationType') === TYPE_COMBO_BOX) {
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

			apiServiceInstance
				.post(apiUrl, requestData, true)
				.then(() => {
					queryClient.invalidateQueries(['productDetail', productData?.id]);
					notificationsContext.handleShowSuccessNotification(
						'admin.addSpecificationToProduct.success'
					);
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addSpecificationToProduct.error'
					);
				});
		},
		[
			selectedSpecificationId,
			notificationsContext,
			modalContext,
			authenticationContext.vinistoUser.loginHash,
			selectedSpecification,
			queryClient,
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
						],
						true
					)
					.then((payload) => {
						const alreadyAddedSpecificationIds = map(
							get(
								modalContext,
								'data.productState.product.specificationDetails'
							),
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
							(specification: Record<any, any>) => {
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
					'admin.modal.addSpecificationToProduct.autocomplete.error'
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
			onSubmit={handleOnAddSpecificationToProduct}
			initialValues={{
				numberValue: 0,
				imperialNumberValue: 0,
				language: LANGUAGES[0].value,
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<InputAutocomplete
						options={autocompleteSpecifications}
						label="admin.modal.addSpecificationToProduct.autocomplete.label"
						placeholder="admin.modal.addSpecificationToProduct.autocomplete.label"
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
					<Button type="submit">
						{t({
							id: 'admin.modal.addSpecificationToProduct.submit',
						})}
					</Button>
				</form>
			)}
		/>
	);
};

export default AddSpecificationToProductModal;

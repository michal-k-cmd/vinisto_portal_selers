import { FC, useCallback, useContext, useMemo } from 'react';
import { Form } from 'react-final-form';
import {
	entriesIn,
	filter,
	find,
	forEach,
	get,
	isEmpty,
	map,
	set,
} from 'Helpers/lodash';
import { Validators } from 'Components/Form';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	TYPE_CHECK_BOX,
	TYPE_COMBO_BOX,
	TYPE_DECIMAL_NUMBER,
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_MULTI_COMBO_BOX,
	TYPE_NUMBER,
	TYPE_NUMBER_IMPERIAL,
	TYPE_TEXT,
} from 'Services/Specification/constants';
import ApiService from 'Services/ApiService';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';

import { ModalContext } from '../../context';
import CheckBoxForm from '../AddSpecificationToProduct/Components/CheckBoxForm';
import ComboBoxForm from '../AddSpecificationToProduct/Components/ComboBoxForm';
import MultiComboBoxForm from '../AddSpecificationToProduct/Components/MultiComboBoxForm';
import NumberForm from '../AddSpecificationToProduct/Components/NumberForm';
import TextForm from '../AddSpecificationToProduct/Components/TextForm';

import type Product from '@/domain/product';

const EditSpecificationInProductModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const specification = get(modalContext, 'data.specification');
	const productSpecification = get(modalContext, 'data.productSpecification');
	const queryClient = useQueryClient();
	const t = localizationContext.useFormatMessage();
	const initializationValues = useMemo(() => {
		if (
			get(specification, 'definition.specificationType') ===
			TYPE_MULTI_COMBO_BOX
		) {
			const allowedValues = {};
			forEach(
				get(specification, 'value.selectedValuesName'),
				(selectedValue: string) => {
					set(allowedValues, selectedValue, true);
				}
			);
			return { allowedValues };
		} else if (
			get(specification, 'definition.specificationType') === TYPE_COMBO_BOX
		) {
			return { allowedValue: get(specification, 'value.selectedValueName') };
		} else if (
			get(specification, 'definition.specificationType', '') === TYPE_CHECK_BOX
		) {
			return { isChecked: get(specification, 'value.value') };
		} else if (
			get(specification, 'definition.specificationType', '') === TYPE_NUMBER
		) {
			return { numberValue: get(specification, 'value.value') };
		} else if (
			get(specification, 'definition.specificationType', '') ===
			TYPE_DECIMAL_NUMBER
		) {
			return { numberValue: get(specification, 'value.value') };
		} else if (
			get(specification, 'definition.specificationType', '') ===
			TYPE_NUMBER_IMPERIAL
		) {
			return {
				numberValue: get(specification, 'value.value'),
				imperialNumberValue: get(specification, 'value.imperialValue'),
			};
		} else if (
			get(specification, 'definition.specificationType', '') ===
			TYPE_DECIMAL_NUMBER_IMPERIAL
		) {
			return {
				numberValue: get(specification, 'value.value'),
				imperialNumberValue: get(specification, 'value.imperialValue'),
			};
		} else if (
			get(specification, 'definition.specificationType', '') === TYPE_TEXT
		) {
			return {
				textValue: get(
					find(get(specification, 'value.value'), {
						language: localizationContext.activeLanguageKey,
					}),
					'value',
					''
				),
			};
		}
	}, [specification, localizationContext.activeLanguageKey]);

	const handleOnEditSpecificationInProduct = useCallback(
		(formValues: Record<any, any>) => {
			const productData = modalContext.data?.product as Product | undefined;
			const apiService = new ApiService();
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				specificationDefinitionId: get(specification, 'definition.id'),
			};

			let apiUrl = `product-api/products/${get(
				productData,
				'id'
			)}/specifications/`;

			try {
				if (
					get(specification, 'definition.specificationType') === TYPE_COMBO_BOX
				) {
					apiUrl += 'AddComboBoxSpecification';
					if (!get(formValues, 'allowedValue')) throw new Error();
					set(
						requestData,
						'selectedValueName',
						get(formValues, 'allowedValue')
					);
				} else if (
					get(specification, 'definition.specificationType') ===
					TYPE_MULTI_COMBO_BOX
				) {
					apiUrl += 'AddMultiComboBoxSpecification';
					const allowedValues = map(
						filter(
							entriesIn(get(formValues, 'allowedValues', {})),
							([, value]: [string, boolean]) => value
						),
						(value) => get(value, '[0]')
					);
					if (isEmpty(allowedValues)) throw new Error();
					set(requestData, 'selectedValuesName', allowedValues);
				} else if (
					get(specification, 'definition.specificationType', '') ===
					TYPE_CHECK_BOX
				) {
					apiUrl += 'AddCheckBoxSpecification';
					if (typeof get(formValues, 'isChecked') !== 'boolean')
						throw new Error();
					set(requestData, 'isChecked', get(formValues, 'isChecked'));
				} else if (
					get(specification, 'definition.specificationType', '') === TYPE_NUMBER
				) {
					apiUrl += 'AddNumberSpecification';
					set(requestData, 'numberValue', get(formValues, 'numberValue'));
				} else if (
					get(specification, 'definition.specificationType', '') ===
					TYPE_DECIMAL_NUMBER
				) {
					apiUrl += 'AddDecimalNumberSpecification';
					set(
						requestData,
						'decimalNumberValue',
						get(formValues, 'numberValue')
					);
				} else if (
					get(specification, 'definition.specificationType', '') ===
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
					get(specification, 'definition.specificationType', '') ===
					TYPE_DECIMAL_NUMBER_IMPERIAL
				) {
					apiUrl += 'AddDecimalNumberImperialSpecification';
					set(
						requestData,
						'decimalNumberValue',
						get(formValues, 'numberValue')
					);
					set(
						requestData,
						'imperialDecimalNumberValue',
						get(formValues, 'imperialNumberValue')
					);
				} else if (
					get(specification, 'definition.specificationType', '') === TYPE_TEXT
				) {
					apiUrl += 'AddTextSpecification';
					if (!get(formValues, 'textValue')) throw new Error();
					set(requestData, 'language', get(formValues, 'language'));
					set(requestData, 'textValue', get(formValues, 'textValue'));
				}
			} catch {
				return notificationsContext.handleShowErrorNotification(
					'admin.editSpecificationInBundle.error'
				);
			}

			apiService
				.post(apiUrl, requestData, true)
				.then(() => {
					queryClient.invalidateQueries(['productDetail', productData?.id]);
					notificationsContext.handleShowSuccessNotification(
						'admin.editSpecificationInProduct.success'
					);
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.editSpecificationInProduct.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
			queryClient,
			specification,
		]
	);

	return (
		<Form
			onSubmit={handleOnEditSpecificationInProduct}
			initialValues={{
				language: localizationContext.activeLanguageKey,
				...initializationValues,
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					{get(specification, 'definition.specificationType', '') ===
						TYPE_COMBO_BOX && (
						<ComboBoxForm
							specification={productSpecification}
							validate={Validators.required}
						/>
					)}
					{get(specification, 'definition.specificationType', '') ===
						TYPE_MULTI_COMBO_BOX && (
						<MultiComboBoxForm specification={productSpecification} />
					)}
					{(get(specification, 'definition.specificationType', '') ===
						TYPE_NUMBER ||
						get(specification, 'definition.specificationType', '') ===
							TYPE_NUMBER_IMPERIAL ||
						get(specification, 'definition.specificationType', '') ===
							TYPE_DECIMAL_NUMBER ||
						get(specification, 'definition.specificationType', '') ===
							TYPE_DECIMAL_NUMBER_IMPERIAL) && (
						<NumberForm specification={specification} />
					)}
					{get(specification, 'definition.specificationType', '') ===
						TYPE_CHECK_BOX && <CheckBoxForm />}
					{get(specification, 'definition.specificationType', '') ===
						TYPE_TEXT && <TextForm />}
					<Button type="submit">
						{t({ id: 'admin.modal.editSpecificationInProduct.submit' })}
					</Button>
				</form>
			)}
		/>
	);
};

export default EditSpecificationInProductModal;

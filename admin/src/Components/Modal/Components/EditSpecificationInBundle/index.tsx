import { useCallback, useContext, useMemo } from 'react';
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
import { Form } from 'Components/Form';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import ApiService from 'Services/ApiService';
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

import { ModalContext } from '../../context';
import MultiComboBoxForm from '../AddSpecificationToBundle/Components/MultiComboBoxForm';
import ComboBoxForm from '../AddSpecificationToBundle/Components/ComboBoxForm';
import CheckBoxForm from '../AddSpecificationToBundle/Components/CheckBoxForm';
import NumberForm from '../AddSpecificationToBundle/Components/NumberForm';
import TextForm from '../AddSpecificationToBundle/Components/TextForm';

import { CESKA_REPUBLIKA } from './constants';

const EditSpecificationInBundleModal = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);

	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const specification = modalContext?.data?.specification;
	const bundleSpecification = modalContext?.data?.bundleSpecification;

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

	const specificationType = get(
		specification,
		'definition.specificationType',
		''
	);

	const handleOnEditSpecificationInBundle = useCallback(
		(formValues: Record<any, any>) => {
			const bundleId = modalContext.data?.bundleId;
			const apiService = new ApiService();
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				specificationDefinitionId: get(specification, 'definition.id'),
			};

			let apiUrl = `product-api/bundles/${bundleId}/specifications/`;
			try {
				if (specificationType === TYPE_COMBO_BOX) {
					apiUrl += 'AddComboBoxSpecification';
					if (!get(formValues, 'allowedValue')) throw new Error();
					set(
						requestData,
						'selectedValueName',
						get(formValues, 'allowedValue')
					);
				} else if (specificationType === TYPE_MULTI_COMBO_BOX) {
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
				} else if (specificationType === TYPE_CHECK_BOX) {
					apiUrl += 'AddCheckBoxSpecification';
					if (typeof get(formValues, 'isChecked') !== 'boolean')
						throw new Error();
					set(requestData, 'isChecked', get(formValues, 'isChecked'));
				} else if (specificationType === TYPE_NUMBER) {
					apiUrl += 'AddNumberSpecification';
					set(requestData, 'numberValue', get(formValues, 'numberValue'));
				} else if (specificationType === TYPE_DECIMAL_NUMBER) {
					apiUrl += 'AddDecimalNumberSpecification';
					set(
						requestData,
						'decimalNumberValue',
						get(formValues, 'numberValue')
					);
				} else if (specificationType === TYPE_NUMBER_IMPERIAL) {
					apiUrl += 'AddNumberImperialSpecification';
					set(requestData, 'numberValue', get(formValues, 'numberValue'));
					set(
						requestData,
						'imperialNumberValue',
						get(formValues, 'imperialNumberValue')
					);
				} else if (specificationType === TYPE_DECIMAL_NUMBER_IMPERIAL) {
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
				} else if (specificationType === TYPE_TEXT) {
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
					notificationsContext.handleShowSuccessNotification(
						'admin.editSpecificationInBundle.success'
					);
					refetchBundleDetail();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.editSpecificationInBundle.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
			refetchBundleDetail,
			specification,
			specificationType,
		]
	);

	const sortAllowedValues = (allowedValuesObj: any, language: any) => {
		const sortedArray = [];

		for (const key in allowedValuesObj) {
			const valueObj = allowedValuesObj[key].name.find(
				(item: { language: any }) => item.language === language
			);
			if (valueObj) {
				sortedArray.push({ key, ...valueObj });
			}
		}

		return sortedArray.sort((a, b) => {
			if (a.value === CESKA_REPUBLIKA && b.value !== CESKA_REPUBLIKA) {
				return -1;
			} else if (a.value !== CESKA_REPUBLIKA && b.value === CESKA_REPUBLIKA) {
				return 1;
			} else {
				return a.value.localeCompare(b.value);
			}
		});
	};

	const sortedAllowedValues = useMemo(() => {
		if (
			specificationType !== TYPE_COMBO_BOX &&
			specificationType !== TYPE_MULTI_COMBO_BOX
		) {
			return [];
		}
		if (!bundleSpecification) {
			return [];
		}
		return sortAllowedValues(
			bundleSpecification.allowedValues,
			localizationContext.activeLanguageKey
		);
	}, [
		bundleSpecification,
		localizationContext.activeLanguageKey,
		specificationType,
	]);

	const sortedSpecification = useMemo(() => {
		if (
			specificationType !== TYPE_COMBO_BOX &&
			specificationType !== TYPE_MULTI_COMBO_BOX
		) {
			return bundleSpecification;
		}
		if (!bundleSpecification) {
			return {};
		}

		const newAllowedValues = {};
		sortedAllowedValues.forEach((item) => {
			// @ts-expect-error index access
			newAllowedValues[item.key] = bundleSpecification.allowedValues[item.key];
		});

		return { ...bundleSpecification, allowedValues: newAllowedValues };
	}, [bundleSpecification, sortedAllowedValues, specificationType]);

	return (
		<Form
			submitCallback={handleOnEditSpecificationInBundle}
			submitText={'admin.modal.editSpecificationInBundle.submit'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				...initializationValues,
			}}
		>
			{specificationType === TYPE_COMBO_BOX && (
				<ComboBoxForm specification={sortedSpecification} />
			)}
			{specificationType === TYPE_MULTI_COMBO_BOX && (
				<MultiComboBoxForm specification={sortedSpecification} />
			)}
			{(specificationType === TYPE_NUMBER ||
				specificationType === TYPE_NUMBER_IMPERIAL ||
				specificationType === TYPE_DECIMAL_NUMBER ||
				specificationType === TYPE_DECIMAL_NUMBER_IMPERIAL) && (
				<NumberForm specification={specification} />
			)}
			{specificationType === TYPE_CHECK_BOX && <CheckBoxForm />}
			{specificationType === TYPE_TEXT && <TextForm />}
		</Form>
	);
};

export default EditSpecificationInBundleModal;

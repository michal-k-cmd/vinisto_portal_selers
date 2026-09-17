import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME, FORM_KEY } from './constants';
import { DeliveryTypeFormFields } from './interfaces';
import DeliveryTypeSelect from './input';

const FormDeliveryType = withForm<DeliveryTypeFormFields>(DeliveryTypeSelect);

const DeliveryTypeForm: FC = () => {
	const { dispatch, isShipping } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: DeliveryTypeFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setIsShipping,
				values[FIELD_NAME] === 'true',
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormDeliveryType
			formKey={FORM_KEY}
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: String(isShipping) }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default DeliveryTypeForm;

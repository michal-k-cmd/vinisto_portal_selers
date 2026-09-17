import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { WineRegionFormFields } from './interfaces';
import WineRegionInput from './input';

const FormWineRegion = withForm<WineRegionFormFields>(WineRegionInput);

const WineRegionForm: FC = () => {
	const { dispatch, wineRegion } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: WineRegionFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setWineRegion,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormWineRegion
			formKey="wineRegion"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: wineRegion }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default WineRegionForm;

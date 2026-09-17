import withForm from 'Components/SingleEditForm/withForm';

import { PriceFormFields, PriceFormProps } from './interfaces';
import { FIELD_NAME, FORM_KEY } from './constants';
import PriceInput from './input';

const FormPrice = withForm<PriceFormFields>(PriceInput);

const PriceForm = ({
	initialValue,
	labelValue,
	onSubmit,
	priceLevel,
	basePrice,
	platformId,
}: PriceFormProps) => {
	return (
		<FormPrice
			formKey={FORM_KEY}
			onSubmit={onSubmit}
			initialValues={{
				[FIELD_NAME]: initialValue,
				basePrice,
				priceLevel,
				platformId,
			}}
			labelValue={{ [FIELD_NAME]: labelValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper-price"
			priceLevel={priceLevel}
			platformId={platformId}
			priceControls={true}
		/>
	);
};

export default PriceForm;

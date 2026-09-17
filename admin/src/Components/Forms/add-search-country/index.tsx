import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputMultiselect } from 'Components/Form';
import { Option } from 'Components/Multiselect/interfaces';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

type FormValues = {
	countries: Option[];
};

type AddSearchCountryFormProps = {
	onSubmit: (countries: VinistoHelperDllEnumsCountryCode[]) => void;
	initialSelectedValues?: Option[];
};

const AddSearchCountryForm = ({
	onSubmit,
	initialSelectedValues,
}: AddSearchCountryFormProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const handleSubmit = (values: FormValues) => {
		const selectedCountries = values.countries.map(
			(country: Option) => country.value as VinistoHelperDllEnumsCountryCode
		);
		onSubmit(selectedCountries);
	};

	return (
		<Form<FormValues>
			onSubmit={handleSubmit}
			submitText={'admin.modal.form.save'}
			render={({ handleSubmit, submitting, pristine }) => (
				<form onSubmit={handleSubmit}>
					<InputMultiselect
						options={Object.entries(VinistoHelperDllEnumsCountryCode).map(
							([key, value]) => ({
								label: key,
								value: String(value),
							})
						)}
						initialSelected={initialSelectedValues}
						name="countries"
						identifier={'countries'}
					/>

					<Button
						variant="primary"
						type="submit"
						disabled={submitting || pristine}
					>
						{t({ id: 'admin.modal.form.save' })}
					</Button>
				</form>
			)}
		></Form>
	);
};

export default AddSearchCountryForm;

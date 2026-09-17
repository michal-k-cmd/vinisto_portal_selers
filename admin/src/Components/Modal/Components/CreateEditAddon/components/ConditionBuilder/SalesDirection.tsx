import { InputSelect, Validators } from 'Components/Form';

import { CountryCode } from '@/api-types/addons-api';

interface SalesDirectionProps {
	name: string;
}

const SalesDirection = ({ name }: SalesDirectionProps) => {
	return (
		<div className="d-flex flex-column gap-3">
			<InputSelect
				name={`${name}.originCountry`}
				identifier={`${name}.originCountry`}
				label="admin.modal.form.originCountry"
				options={Object.values(CountryCode).map((value) => ({
					value,
					label: value,
				}))}
				validate={Validators.required}
			/>
			<InputSelect
				name={`${name}.destinationCountry`}
				identifier={`${name}.destinationCountry`}
				label="admin.modal.form.destinationCountry"
				options={Object.values(CountryCode).map((value) => ({
					value,
					label: value,
				}))}
				validate={Validators.required}
			/>
		</div>
	);
};

export default SalesDirection;

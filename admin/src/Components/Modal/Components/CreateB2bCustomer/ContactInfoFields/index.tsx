import { Input, InputSelect, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import { VinistoHelperDllEnumsCompanyUserIndustryType } from '@/api-types/user-api';

const ContactInfoFields = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<>
			<Input
				label="admin.b2bCustomer.firstName.label"
				name="firstName"
				identifier="firstName"
				validate={Validators.required}
			/>
			<Input
				label="admin.b2bCustomer.surname.label"
				name="surname"
				identifier="surname"
				validate={Validators.required}
			/>
			<Input
				label="admin.b2bCustomer.positionInCompany.label"
				name="positionInCompany"
				identifier="positionInCompany"
			/>
			<Input
				label="admin.b2bCustomer.companyEmail.label"
				name="companyEmail"
				identifier="companyEmail"
				validate={Validators.required}
			/>
			<Input
				label="admin.b2bCustomer.phone.label"
				name="phone"
				identifier="phone"
				validate={Validators.required}
			/>
			<InputSelect
				label="admin.b2bCustomer.industryType.label"
				name="industryType"
				identifier="industryType"
				options={Object.values(
					VinistoHelperDllEnumsCompanyUserIndustryType
				).map((type) => ({
					value: type,
					label: `${t({ id: `admin.b2bCustomer.industryType.${type}` })}`,
				}))}
			/>
		</>
	);
};

export default ContactInfoFields;

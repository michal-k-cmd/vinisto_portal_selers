import InitialsAvatar from 'vinisto_ui/src/components/initials-avatar';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';
interface Props {
	b2bCustomer: VinistoAuthDllModelsApiUserCompany;
}

const CompanyCell = ({ b2bCustomer }: Props) => {
	const {
		company: billingAddressCompanyName,
		email,
		city,
	} = b2bCustomer.billingAddress ?? {};

	const company =
		b2bCustomer.validationData?.companyName ?? billingAddressCompanyName;

	if (!company) return null;
	const user = {
		firstName: company[0] ?? '',
		lastName: company[1] ?? '',
		email: email ?? '',
	};
	return (
		<div className="d-flex gap-3 align-items-center">
			<InitialsAvatar user={user} />
			<div className="lh-sm">
				<div>
					<strong>{company}</strong>
				</div>
				<small>{city}</small>
			</div>
		</div>
	);
};

export default CompanyCell;

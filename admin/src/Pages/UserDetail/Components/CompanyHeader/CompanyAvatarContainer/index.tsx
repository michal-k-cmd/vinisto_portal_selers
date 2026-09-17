import InitialsAvatar from 'vinisto_ui/src/components/initials-avatar';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

const CompanyAvatarContainer = ({
	b2bCustomer,
}: {
	b2bCustomer: VinistoAuthDllModelsApiUserCompany;
}) => {
	const { company: billingAddressCompanyName, email } =
		b2bCustomer.billingAddress ?? {};

	const company =
		b2bCustomer.validationData?.companyName ?? billingAddressCompanyName;

	if (!company) return null;
	const user = {
		firstName: company[0] ?? '',
		lastName: company[1] ?? '',
		email: email ?? '',
	};
	return <InitialsAvatar user={user} />;
};

export default CompanyAvatarContainer;

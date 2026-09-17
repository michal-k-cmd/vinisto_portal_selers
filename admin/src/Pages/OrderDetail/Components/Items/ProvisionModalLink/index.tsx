import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

interface ProvisionModalLinkProps {
	handleOnShowProvisions: () => void;
}

const ProvisionModalLink = ({
	handleOnShowProvisions,
}: ProvisionModalLinkProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { permissions } = useContext(AuthenticationContext).vinistoUser;

	const userCanSeeProvisions =
		permissions.includes('USER_ADMIN_FEE_RULE') ||
		permissions.includes('USER_ADMIN_ORDER_FEES');

	if (!userCanSeeProvisions) {
		return null;
	}

	return (
		<Detail.Link
			className="mb-2"
			onClick={handleOnShowProvisions}
		>
			{t({ id: 'orderDetail.provisionOpenModal' })}
		</Detail.Link>
	);
};

export default ProvisionModalLink;

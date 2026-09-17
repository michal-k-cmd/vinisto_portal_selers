import { useQuery } from '@tanstack/react-query';
import { COUPON_CREATION_ACTION_TYPE } from 'Components/Modal/Components/CreateDiscountCoupon/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { UserService } from 'Services/UserService/User';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { VinistoOrderDllModelsApiDiscountCouponDefinitionModelsTrigger } from '@/api-types/order-api';

export interface UserDetailProps {
	trigger: VinistoOrderDllModelsApiDiscountCouponDefinitionModelsTrigger;
}

const UserDetail = ({ trigger }: UserDetailProps) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const { getUserById } = UserService;
	const userQueryKey = ['user', trigger.itemId];

	const { data: userData } = useQuery(
		userQueryKey,
		async () =>
			await getUserById(trigger.itemId ?? '', {
				userId: trigger.itemId ?? '',
				UserLoginHash: vinistoUser.loginHash,
			}),
		{ enabled: !!trigger.itemId }
	);
	return (
		<div>
			{trigger.type == COUPON_CREATION_ACTION_TYPE.MANUAL
				? t({ id: 'admin.header.coupon.whoCreated.createdManual' })
				: t({
						id: 'admin.header.coupon.whoCreated.createdNewRegistration',
				  })}{' '}
			<Link to={`/user-detail/${trigger.itemId}`}>
				{userData?.user?.email || '-'}
			</Link>
		</div>
	);
};

export default UserDetail;

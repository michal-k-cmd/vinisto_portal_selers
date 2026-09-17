import useVerifyCompanyCreditPayment from 'Hooks/useVerifyCompanyCreditPayment';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import ButtonsContainer from '../ButtonsContainer';
import { useB2bBasketContext } from '../context';
import {
	DetailLink,
	FinishOrderButton,
	SetToWaitingToApprovalButton,
	SetToWaitingToDirectorApprovalButton,
} from '../Buttons';

import { BasketApprovalState } from '@/api-types/basket-api';

const UserSupportButtons = () => {
	const { basket } = useB2bBasketContext();

	const { id: userId } = useContext(AuthenticationContext).vinistoUser;

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPayment({
		customerId: basket?.customerId,
	});

	const hasCredit = !!(
		verifyCompanyCreditPaymentQuery.isFetched &&
		verifyCompanyCreditPaymentQuery.data?.result?.canPayByCredit
	);

	if (!basket) return null;

	const isUserOwnerOfBasket = basket.userId === userId;

	return (
		<ButtonsContainer>
			{basket.approvalState === BasketApprovalState.CONCEPT &&
				(hasCredit ? (
					<SetToWaitingToApprovalButton />
				) : (
					<SetToWaitingToDirectorApprovalButton />
				))}
			{basket.approvalState === BasketApprovalState.APPROVED &&
				isUserOwnerOfBasket && <FinishOrderButton />}
			<DetailLink />
		</ButtonsContainer>
	);
};

export default UserSupportButtons;

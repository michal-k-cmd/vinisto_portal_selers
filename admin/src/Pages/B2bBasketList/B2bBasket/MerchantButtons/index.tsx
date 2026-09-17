import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useVerifyCompanyCreditPayment from 'Hooks/useVerifyCompanyCreditPayment';

import { useB2bBasketContext } from '../context';
import {
	ApproveAndTakeOwnershipButton,
	ApproveButton,
	ApproveConceptButton,
	DetailLink,
	FinishOrderButton,
	PreApproveAndTakeOwnershipButton,
	PreApproveButton,
	ReopenRejectedButton,
	TakeOwnershipButton,
} from '../Buttons';
import ButtonsContainer from '../ButtonsContainer';

import { BasketApprovalState } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsUserUserRights } from '@/api-types/user-api';

const ConceptButtons = () => {
	const { basket } = useB2bBasketContext();
	const { id: userId } = useContext(AuthenticationContext).vinistoUser;

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPayment({
		customerId: basket?.customerId,
	});

	if (!basket) return null;

	const hasCredit = !!(
		verifyCompanyCreditPaymentQuery.isFetched &&
		verifyCompanyCreditPaymentQuery.data?.result?.canPayByCredit
	);

	const isUserOwnerOfBasket = basket.userId === userId;

	return isUserOwnerOfBasket ? (
		<ButtonsContainer>
			{hasCredit ? (
				<ApproveConceptButton />
			) : basket.approvalFlags?.approveCustomer ? null : (
				<PreApproveButton />
			)}
			<DetailLink />
		</ButtonsContainer>
	) : (
		<ButtonsContainer>
			<DetailLink />
		</ButtonsContainer>
	);
};

const WaitingForApprovalButtons = () => {
	const { basket } = useB2bBasketContext();
	const { id: userId } = useContext(AuthenticationContext).vinistoUser;

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPayment({
		customerId: basket?.customerId,
	});

	if (!basket) return null;

	const hasCredit = !!(
		verifyCompanyCreditPaymentQuery.isFetched &&
		verifyCompanyCreditPaymentQuery.data?.result?.canPayByCredit
	);

	const isUserOwnerOfBasket = basket.userId === userId;

	return (
		<ButtonsContainer>
			{isUserOwnerOfBasket ? (
				hasCredit ? (
					<ApproveButton />
				) : (
					<PreApproveButton />
				)
			) : (
				<>
					{hasCredit ? (
						<>
							<ApproveButton />
							<ApproveAndTakeOwnershipButton />
						</>
					) : (
						<>
							<PreApproveButton />
							<PreApproveAndTakeOwnershipButton />
						</>
					)}
					<DetailLink />
				</>
			)}
		</ButtonsContainer>
	);
};

const WaitingForDirectorApprovalButtons = () => {
	const { basket } = useB2bBasketContext();
	const { permissions } = useContext(AuthenticationContext).vinistoUser;

	const canApproveBasketAsCSO = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_CSO
	);
	return (
		<ButtonsContainer>
			{canApproveBasketAsCSO ? (
				<ApproveButton />
			) : basket?.approvalFlags?.approveCustomer ? null : (
				<PreApproveButton />
			)}
			<DetailLink />
		</ButtonsContainer>
	);
};

const ApprovedButtons = () => {
	const { basket } = useB2bBasketContext();
	const { id: userId } = useContext(AuthenticationContext).vinistoUser;

	if (!basket) return null;

	const isUserOwnerOfBasket = basket.userId === userId;

	return (
		<ButtonsContainer>
			{isUserOwnerOfBasket ? <FinishOrderButton /> : <TakeOwnershipButton />}
			<DetailLink />
		</ButtonsContainer>
	);
};

const RejectedButtons = () => {
	return (
		<ButtonsContainer>
			<ReopenRejectedButton />
			<DetailLink />
		</ButtonsContainer>
	);
};

const MerchantButtons = () => {
	const { basket } = useB2bBasketContext();
	if (!basket) return null;

	if (basket.approvalState === BasketApprovalState.CONCEPT)
		return <ConceptButtons />;

	if (basket.approvalState === BasketApprovalState.WAITING_FOR_APPROVAL)
		return <WaitingForApprovalButtons />;

	if (
		basket.approvalState === BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
	)
		return <WaitingForDirectorApprovalButtons />;

	if (basket.approvalState === BasketApprovalState.APPROVED)
		return <ApprovedButtons />;

	if (basket.approvalState === BasketApprovalState.REJECTED)
		return <RejectedButtons />;

	return null;
};

export default MerchantButtons;

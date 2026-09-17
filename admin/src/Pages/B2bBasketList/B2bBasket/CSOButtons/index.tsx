import {
	ApproveButton,
	DetailLink,
	RejectButton,
	ReopenRejectedButton,
	// TakeOwnershipButton,
} from '../Buttons';
import ButtonsContainer from '../ButtonsContainer';
import { useB2bBasketContext } from '../context';

import { BasketApprovalState } from '@/api-types/basket-api';

const CSOButtons = () => {
	const { basket } = useB2bBasketContext();
	if (!basket) return null;

	if (
		basket.approvalState === BasketApprovalState.CONCEPT ||
		basket.approvalState === BasketApprovalState.WAITING_FOR_APPROVAL
	)
		return (
			<ButtonsContainer>
				<DetailLink />
			</ButtonsContainer>
		);

	if (
		basket.approvalState === BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
	)
		return (
			<ButtonsContainer>
				<ApproveButton />
				<RejectButton />
				<DetailLink />
			</ButtonsContainer>
		);

	if (basket.approvalState === BasketApprovalState.APPROVED)
		return (
			<ButtonsContainer>
				{/* Doesn not work */}
				{/*<TakeOwnershipButton />*/}
				<DetailLink />
			</ButtonsContainer>
		);

	if (basket.approvalState === BasketApprovalState.REJECTED)
		return (
			<ButtonsContainer>
				<ReopenRejectedButton />
				<DetailLink />
			</ButtonsContainer>
		);

	return null;
};

export default CSOButtons;

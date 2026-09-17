import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';

import { BasketApprovalState } from '@/api-types/basket-api';

export const useIsBasketLockedForEdit = () => {
	const { basketState } = useContext(BasketContext);
	if (!basketState?.approvalState) return false;
	const isBasketLockedForEdit = [
		BasketApprovalState.APPROVED,
		BasketApprovalState.REJECTED,
	].includes(basketState.approvalState);

	return isBasketLockedForEdit;
};

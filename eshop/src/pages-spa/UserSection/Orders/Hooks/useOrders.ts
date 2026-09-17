/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, useContext } from 'react';
import { CANCEL_ORDER_CONFIRM_MODAL } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';

import { VinistoHelperDllEnumsOrderOrderState } from '@/api-types/order-api';

const useOrders = (lastState: any, isLoading: boolean, order: any) => {
	const modalContext = useContext(ModalContext);

	const showCancelOrderBtn =
		lastState === VinistoHelperDllEnumsOrderOrderState.CREATED && !isLoading;

	const handleOnClickCancelOrder = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		modalContext.handleOpenModal(CANCEL_ORDER_CONFIRM_MODAL, order);
	};

	return {
		showCancelOrderBtn,
		handleOnClickCancelOrder,
	};
};

export default useOrders;

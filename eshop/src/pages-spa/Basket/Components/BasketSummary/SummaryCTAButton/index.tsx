import { useContext, useState } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';
import { BasketContext } from 'Services/BasketService';
import {
	usePlatformContext,
	useWithB2bQueryParams,
} from 'Services/PlatformService';
import { useMutation } from '@tanstack/react-query';
import { ModalContext } from 'Components/Modal/context';
import { BASKET_WAITING_FOR_APPROVAL_CONFIRM_MODAL } from 'Components/Modal/constants';
import { updateApprovalState } from 'Services/BasketService/handlers';
import useIsFeeOverLimit from 'Services/BasketService/useIsFeeOverLimit';
import { NotificationsContext } from 'Services/NotificationService';
import useVerifyCompanyCreditPaymentQuery from 'Hooks/useVerifyCompanyCreditPaymentQuery';

import ShippingDataButton from '../ShippingDataButton';

import styles from './styles.module.css';

import { BasketApprovalState } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsUserUserType } from '@/api-types/user-api';

interface SummaryCTAButtonProps {
	basketItemsQuantity: number;
	showButton: boolean;
	buttonProps?: {
		text?: string;
		href?: string;
		disabled?: boolean;
		onClick?: () => void;
		buttonType?: 'submit' | 'button';
		shippingDataButton?: boolean;
	};
}

const SummaryCTAButton = ({
	basketItemsQuantity,
	showButton,
	buttonProps,
}: SummaryCTAButtonProps) => {
	const { isB2b } = usePlatformContext();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const withB2bQueryParams = useWithB2bQueryParams();
	const { basketState, handleGoToShippingPayment, handleOnClearBasket } =
		useContext(BasketContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);
	const { basketId, vinistoUser } = useContext(AuthenticationContext);
	const isUserCompany =
		vinistoUser.type === VinistoHelperDllEnumsUserUserType.Company;

	const [isUpdatingApprovalState, setIsUpdatingApprovalState] = useState(false);

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPaymentQuery();

	const updateBasketApprovalStateMutation = useMutation({
		mutationFn: (params: { targetState: BasketApprovalState }) => {
			const targetState = params.targetState;
			return updateApprovalState({
				targetState,
				userLoginHash: vinistoUser.loginHash,
				basketId,
			});
		},
		onMutate: () => {
			setIsUpdatingApprovalState(true);
		},
		onSuccess: (_, params) => {
			if (
				params.targetState === BasketApprovalState.WAITING_FOR_APPROVAL ||
				params.targetState === BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
			) {
				handleOpenModal(BASKET_WAITING_FOR_APPROVAL_CONFIRM_MODAL);
			}
			if (params.targetState === BasketApprovalState.APPROVED) {
				handleShowSuccessNotification('basketApprovalState.approve.success');
			}
			handleOnClearBasket();
		},
		onError: () => {
			handleShowErrorNotification('basketApprovalState.update.error');
		},
		onSettled: () => {
			setIsUpdatingApprovalState(false);
		},
	});

	const isFeeOverLimit = useIsFeeOverLimit();

	const isB2bCreditPaymentIssue =
		isB2b &&
		verifyCompanyCreditPaymentQuery.isFetched &&
		!verifyCompanyCreditPaymentQuery.data?.result?.canPayByCredit;

	const isCSOConfirmationMandatory = isFeeOverLimit || isB2bCreditPaymentIssue;

	if (!basketItemsQuantity || !showButton) return null;

	if (buttonProps?.shippingDataButton)
		return <ShippingDataButton onClick={buttonProps.onClick} />;

	if (buttonProps && buttonProps.disabled)
		return (
			<button
				className={styles.checkoutButton}
				disabled
			>
				{buttonProps.text}
			</button>
		);

	if (buttonProps && buttonProps.onClick)
		return (
			<button
				className={styles.checkoutButton}
				onClick={buttonProps.onClick}
				type={buttonProps.buttonType || 'button'}
			>
				{buttonProps.text}
			</button>
		);

	if (buttonProps)
		return (
			<Link
				href={withB2bQueryParams(buttonProps.href || '#')}
				className={styles.checkoutButton}
			>
				{buttonProps.text}
			</Link>
		);

	{
		// This block should match for orders created via admin
		// Consider using getIsInAdminIframe() function (but this should work as well)
	}
	if (isB2b && !isUserCompany) {
		if (
			vinistoUser.canCreateOrderAsCSO &&
			basketState?.approvalState ===
				BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
		) {
			return (
				<button
					disabled={isUpdatingApprovalState}
					className={styles.checkoutButton}
					onClick={() => {
						return updateBasketApprovalStateMutation.mutate({
							targetState: BasketApprovalState.APPROVED,
						});
					}}
				>
					Schválit jako CSO
				</button>
			);
		}

		if (basketState?.userId !== vinistoUser.id) return null;

		if (basketState?.approvalState === BasketApprovalState.CONCEPT)
			return (
				<button
					disabled={isUpdatingApprovalState}
					className={styles.checkoutButton}
					onClick={(e) => {
						if (
							vinistoUser.canCreateOrderAsMerchant &&
							!isCSOConfirmationMandatory
						) {
							return handleGoToShippingPayment(e);
						}
						return updateBasketApprovalStateMutation.mutate({
							targetState: isCSOConfirmationMandatory
								? BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
								: BasketApprovalState.WAITING_FOR_APPROVAL,
						});
					}}
				>
					{vinistoUser.canCreateOrderAsMerchant && !isCSOConfirmationMandatory
						? t({ id: 'basket.orderContinue' })
						: `Odeslat ke schválení${
								isCSOConfirmationMandatory ? ` CSO` : ` obchodníkovi`
						  }`}
				</button>
			);

		if (basketState?.approvalState !== BasketApprovalState.APPROVED)
			return (
				<button
					className={styles.checkoutButton}
					disabled={true}
				>
					{`Čeká na schválení${
						basketState?.approvalState ===
						BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
							? ` CSO`
							: ` obchodníka`
					}`}
				</button>
			);
	}

	return (
		<Link
			href={withB2bQueryParams(
				`/${t({
					id: 'routes.cart.shippingPayment.route',
				})}`
			)}
			className={styles.checkoutButton}
			onClick={(e) => handleGoToShippingPayment(e)}
		>
			{t({ id: 'basket.orderContinue' })}
		</Link>
	);
};

export default SummaryCTAButton;

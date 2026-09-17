import { useContext, useEffect, useState } from 'react';
import { get } from 'lodash-es';
import { useRouter } from 'next/navigation';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import api from 'vinisto_api_client/src/api';
import './styles.css';
import { useWithB2bQueryParams } from 'Services/PlatformService';
import { ORDER_DOES_NOT_EXIST } from 'pages-spa/CartConfirmation/constants';
import { useMutation } from '@tanstack/react-query';

import { VinistoGopayDllModelsApiPaymentReturn } from '@/api-types/services-api';
import { ApiError } from '@/domain/error';

const ORDER_NOT_CREATED_RETRY_DELAY = 1000;
const ORDER_NOT_CREATED_MAX_RETRIES = 5;

export interface GopayPaymentModalData {
	orderId: string;
	orderType: 'SUBSCRIPTION' | 'ORDER';
}

const GopayPaymentModal = () => {
	const withB2bQueryParams = useWithB2bQueryParams();

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const modalContext = useContext(ModalContext);
	const modalData = modalContext.modalData as GopayPaymentModalData;

	const orderId = modalData.orderId;
	const orderType = modalData.orderType;

	const router = useRouter();

	const [isManualRetry, setIsManualRetry] = useState(false);

	const createPaymentForOrderMutation = useMutation({
		mutationFn: () => {
			return api.post<VinistoGopayDllModelsApiPaymentReturn>(
				`services-api/gopay/CreatePaymentFromOrder`,
				undefined,
				{
					orderId,
					notificationUrl: `${process.env.NEXT_PUBLIC_API_URI}services-api/gopay/notify`,
					returnUrl:
						orderType === 'SUBSCRIPTION'
							? `${get(
									window,
									'location.origin'
							  )}/uzivatelska-sekce/vinisto-plus?oid=${orderId}`
							: withB2bQueryParams(
									`${get(window, 'location.origin')}/${t({
										id: 'routes.cart.confirmation.route',
									})}?oid=${orderId}`
							  ),
				}
			);
		},

		onError: () => {
			router.push(
				withB2bQueryParams(
					`/${t({
						id: 'routes.cart.confirmation.route',
					})}?oid=${orderId}`
				)
			);
			modalContext.handleCloseModal();
		},

		onSuccess: (data: VinistoGopayDllModelsApiPaymentReturn) => {
			const gwUrl = data.payment?.gwUrl;
			if (gwUrl) window.location.replace(gwUrl);
		},

		retry: (failureCount: number, error: ApiError) => {
			if (error?.message === ORDER_DOES_NOT_EXIST)
				return failureCount < ORDER_NOT_CREATED_MAX_RETRIES;
			return false;
		},
		retryDelay: (attempt: number) => {
			return attempt > 1
				? attempt ** 2 * ORDER_NOT_CREATED_RETRY_DELAY
				: ORDER_NOT_CREATED_RETRY_DELAY;
		},
	});

	useEffect(() => {
		createPaymentForOrderMutation.mutate();
		// Including createPaymentForOrderMutation in dependencies would cause retrying after every state change, we do not want this
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO - zmenit texty v zavislosti ze ci ideme z kosiku alebo vinista plus, ide to cez premennu orderType === 'SUBSCRIPTION'
	return (
		<div className="vinisto-popup__payment">
			<div className="vinisto-popup__payment__heading">
				{t({ id: 'modal.payment.modalTitle' })}
				<br />
				{t({ id: 'modal.payment.modalSubtitle' })}
			</div>

			<div>
				<div className="vinisto-popup__payment__text mb-3">
					{t({ id: 'modal.payment.text' })}
				</div>
				<div className="vinisto-popup__payment__btn">
					<button
						onClick={() => {
							// This will allow trigger manual retry, but only once
							if (isManualRetry) return;
							setIsManualRetry(true);
							createPaymentForOrderMutation.reset();
							createPaymentForOrderMutation.mutate();
						}}
						disabled={isManualRetry}
						className="vinisto-btn vinisto-bg-green vinisto-font-18"
					>
						{createPaymentForOrderMutation.isLoading ? (
							<span className="vinisto-popup__payment__btn-loading">
								<LoadingSpinner
									height={20}
									width={20}
									strokeWidth={3}
								/>
								{t({ id: 'modal.payment.button.loading' })}
							</span>
						) : (
							t({ id: 'modal.payment.button' })
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GopayPaymentModal;

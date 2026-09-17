import { FC, useCallback, useContext } from 'react';
import { get, map } from 'Helpers/lodash';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import { MdPayment } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';

import './styles.css';

const PaymentList: FC<Record<any, any>> = (
	props: Record<any, any>
): JSX.Element => {
	const deliveryState: Record<any, any> = get(props, 'customData', {});
	const deliveryMethods: Record<any, any> = get(props, 'customMethods', {});
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();

	const handleOnRemovePaymentFromDelivery = useCallback(
		(paymentId: string) => () => {
			const deliveryId = get(deliveryState, 'deliveryDetailData.id');

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deletePayment.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deletePayment.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							const apiService = new ApiService();
							apiService
								.delete(
									`order-api/deliveries/${deliveryId}/payments`,
									paymentId,
									false,
									[
										{
											key: 'userLoginHash',
											value: authenticationContext.vinistoUser.loginHash,
										},
									]
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deletePayment.success'
									);
									deliveryMethods.setDeliveryDetailState({
										...deliveryState,
										loaded: false,
									});
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deletePayment.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.no',
						})}`,
						onClick: () => {},
					},
				],
			});
		},
		[
			notificationsContext,
			authenticationContext,
			deliveryState,
			deliveryMethods,
		]
	);

	const handleOnClickRedirect = useCallback(
		(paymentId: string) => () => {
			navigate(`/payment-detail/${paymentId}`);
		},
		[navigate]
	);

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetail.payments' })}
			</div>
			{deliveryState.loaded &&
				map(
					get(deliveryState, 'deliveryDetailData.payments', []),
					(payment: Record<string, any>, key) => (
						<div
							key={`delivery-payments-${key}`}
							className="product-category"
						>
							<MdPayment className="product-category-icon" />
							<div className="product-category-label">
								{getLocalizedValue(get(payment, 'name', []))}
							</div>
							<BiLink
								onClick={handleOnClickRedirect(payment.id)}
								className="product-category-icon pointer"
							/>
							<DeleteIcon
								onClick={handleOnRemovePaymentFromDelivery(payment.id)}
								className="product-category-icon pointer"
							/>
						</div>
					)
				)}
		</div>
	);
};

export default PaymentList;

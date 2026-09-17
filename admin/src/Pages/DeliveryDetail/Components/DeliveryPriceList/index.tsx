import React from 'react';
import { get, map } from 'Helpers/lodash';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { FaMoneyBillWave } from 'react-icons/fa';
import DeleteIcon from 'Components/Icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';

import './styles.css';

const DeliveryPriceList: React.FC<Record<any, any>> = (props): JSX.Element => {
	const deliveryState: Record<any, any> = get(props, 'customData', {});
	const deliveryMethods: Record<any, any> = get(props, 'customMethods', {});
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnRemoveDeliveryPrice = React.useCallback(
		(priceId: string) => () => {
			const deliveryId = get(deliveryState, 'deliveryDetailData.id');
			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deletePaymentPrice.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deletePaymentPrice.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.deletePaymentPrice.yes',
						})}`,
						onClick: () => {
							const apiService = new ApiService();
							apiService
								.delete(
									`order-api/deliveries/${deliveryId}/prices/${priceId}`,
									undefined,
									true,
									[
										{
											key: 'UserLoginHash',
											value: get(
												authenticationContext,
												'vinistoUser.loginHash'
											),
										},
									]
								)
								.then((payload: Record<any, any>) => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deletePaymentPrice.success'
									);
									deliveryMethods.setDeliveryDetailState(
										(deliveryState: Record<any, any>) => ({
											...deliveryState,
											deliveryDetailData: get(payload, 'delivery'),
										})
									);
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deletePaymentPrice.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.deletePaymentPrice.no',
						})}`,
						onClick: () => {},
					},
				],
			});
		},
		[deliveryState, deliveryMethods, authenticationContext.vinistoUser]
	);

	return (
		<div className="payment-detail-price-list">
			<div className="payment-detail-price-list-title">
				{t({ id: 'admin.paymentDetail.prices.label' })}
			</div>
			<div className="payment-detail-price-list-container">
				{get(deliveryState, 'loaded', false) &&
					map(
						get(deliveryState, 'deliveryDetailData.prices', []),
						(price: Record<any, any>) => (
							<div
								key={get(price, 'id')}
								className="payment-price"
							>
								<div className="top-panel">
									<FaMoneyBillWave className="payment-price-icon payment-map-icon" />
									<DeleteIcon
										onClick={handleOnRemoveDeliveryPrice(get(price, 'priceId'))}
										className="payment-price-icon payment-remove-icon"
									/>
								</div>
								<div>
									{t(
										{ id: 'admin.paymentDetail.prices.priceWithoutVat' },
										{
											value: get(price, 'value', '-'),
											currency: get(price, 'currency', '-'),
										}
									)}
								</div>
								<div>
									{t(
										{ id: 'admin.paymentDetail.prices.priceWithVat' },
										{
											value: get(price, 'valueWithVat', '-'),
											currency: get(price, 'currency', '-'),
										}
									)}
								</div>
								<div>
									{t(
										{ id: 'admin.paymentDetail.prices.minOrderPrice' },
										{
											value: get(price, 'minOrderPrice', '-'),
											currency: get(price, 'currency', '-'),
										}
									)}
								</div>
								<div>
									{t(
										{ id: 'admin.paymentDetail.prices.maxOrderPrice' },
										{
											value: get(price, 'maxOrderPrice', '-'),
											currency: get(price, 'currency', '-'),
										}
									)}
								</div>
								<div>
									{t(
										{ id: 'admin.paymentDetail.prices.vat' },
										{
											value: get(price, 'vat', '-'),
										}
									)}
								</div>
							</div>
						)
					)}
			</div>
		</div>
	);
};

export default DeliveryPriceList;

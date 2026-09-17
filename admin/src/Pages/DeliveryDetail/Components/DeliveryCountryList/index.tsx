import React from 'react';
import { get, map } from 'Helpers/lodash';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { MdMap } from 'react-icons/md';
import DeleteIcon from 'Components/Icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';

import './styles.css';

const DeliveryCountryList: React.FC<Record<any, any>> = (
	props
): JSX.Element => {
	const deliveryState: Record<any, any> = get(props, 'customData', {});
	const deliveryMethods: Record<any, any> = get(props, 'customMethods', {});
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnRemovePaymentCountry = React.useCallback(
		(country: string) => () => {
			const deliveryId = get(deliveryState, 'deliveryDetailData.id');
			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deletePaymentCountry.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deletePaymentCountry.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.deletePaymentCountry.yes',
						})}`,
						onClick: () => {
							const apiService = new ApiService();
							apiService
								.delete(
									`order-api/deliveries/${deliveryId}/countries`,
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
										{
											key: 'Country',
											value: country,
										},
									]
								)
								.then((payload: Record<any, any>) => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deletePaymentCountry.success'
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
										'admin.deletePaymentCountry.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.deletePaymentCountry.no',
						})}`,
						onClick: () => {},
					},
				],
			});
		},
		[deliveryState, deliveryMethods, authenticationContext.vinistoUser]
	);

	return (
		<div className="payment-detail-country-list">
			<div className="payment-detail-country-list-title">
				{t({ id: 'admin.paymentDetail.countries.label' })}
			</div>
			{get(deliveryState, 'loaded', false) &&
				map(
					get(deliveryState, 'deliveryDetailData.countries', []),
					(country: string) => (
						<div
							key={country}
							className="payment-country"
						>
							<MdMap className="payment-country-icon payment-map-icon" />
							<div className="payment-country-label">{country}</div>
							<DeleteIcon
								onClick={handleOnRemovePaymentCountry(country)}
								className="payment-country-icon payment-remove-icon"
							/>
						</div>
					)
				)}
		</div>
	);
};

export default DeliveryCountryList;

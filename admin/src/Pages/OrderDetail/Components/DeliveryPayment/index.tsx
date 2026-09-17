import {
	VinistoOrderDllModelsApiOrderDelivery,
	VinistoOrderDllModelsApiOrderPayment,
	VinistoSupplierDllModelsApiAddressAddress,
} from 'vinisto_api_client/src/api-types/order-api/';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { composeURLEncodedAddress } from './helpers';

interface OrderDeliveryPaymentProps {
	delivery: VinistoOrderDllModelsApiOrderDelivery | undefined;
	payment: VinistoOrderDllModelsApiOrderPayment | undefined;
}

const OrderDeliveryPayment = ({
	delivery,
	payment,
}: OrderDeliveryPaymentProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const localize = useLocalizedValue();

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({ id: 'orderDetail.deliveryPayment.title' })}`}
			/>
			<Detail.Columns>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.delivery' })} />
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.deliveryName' })}
						value={localize(delivery?.name ?? [])}
					/>
					{!!delivery?.pickupPoint?.address && (
						<Detail.InfoWithLabel
							label={t({ id: 'orderDetail.deliveryPickupPoint' })}
							value={
								<a
									href={`https://maps.google.com/?q=${composeURLEncodedAddress(
										delivery.pickupPoint
											.address as VinistoSupplierDllModelsApiAddressAddress
									)}`}
									target="_blank"
									rel="noreferrer"
								>
									{delivery?.pickupPoint?.code}
								</a>
							}
						/>
					)}
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.deliveryTrackingUrl' })}
						value={
							delivery?.trackingUrl && (
								<a href={delivery?.trackingUrl}>{delivery?.trackingUrl}</a>
							)
						}
						fallbackOrHide={false}
					/>
				</div>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.payment' })} />
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.paymentName' })}
						value={localize(payment?.name ?? [])}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.paymentGoPayId' })}
						value={payment?.goPayId}
						fallbackOrHide={false}
					/>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};

export default OrderDeliveryPayment;

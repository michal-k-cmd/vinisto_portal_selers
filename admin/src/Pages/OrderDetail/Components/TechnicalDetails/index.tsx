import {
	VinistoOrderDllModelsApiOrderDelivery,
	VinistoOrderDllModelsApiOrderPayment,
} from 'vinisto_api_client/src/api-types/order-api/';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Detail from 'Components/Detail';

interface OrderTechnicalDetailsProps {
	orderId: string;
	orderNumber: string | null;
	delivery: VinistoOrderDllModelsApiOrderDelivery | undefined;
	payment: VinistoOrderDllModelsApiOrderPayment | undefined;
}

const OrderTechnicalDetails = ({
	orderId,
	orderNumber,
	delivery,
	payment,
}: OrderTechnicalDetailsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const localize = useLocalizedValue();

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({ id: 'orderDetail.technicalDetails.title' })}`}
			/>
			<Detail.Columns>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.order' })} />
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.orderId' })}
						value={orderId}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.orderNumber' })}
						value={orderNumber}
					/>
				</div>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.delivery' })} />
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.deliveryName' })}
						value={localize(delivery?.name ?? [])}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.deliveryType' })}
						value={delivery?.deliveryType}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.deliveryCode' })}
						value={delivery?.deliveryCode}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.deliveryTime' })}
						value={
							delivery?.deliveryTime
								? `${delivery?.deliveryTime} ${t({ id: 'hour.short' })}`
								: undefined
						}
					/>
				</div>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.payment' })} />
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.paymentName' })}
						value={localize(payment?.name ?? [])}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.paymentType' })}
						value={payment?.paymentType}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.paymentGoPayId' })}
						value={payment?.goPayId}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.paymentGoPayType' })}
						value={payment?.goPayType}
					/>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};

export default OrderTechnicalDetails;

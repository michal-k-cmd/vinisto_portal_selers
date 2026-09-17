import { useContext } from 'react';
import { OrderSummaryProps } from 'pages-spa/CartConfirmation/Components/OrderSummary/interfaces';
import { AddressType } from 'pages-spa/CartConfirmation/Components/Address/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import OrderItem from 'pages-spa/CartConfirmation/Components/OrderItem';
import DeliveryPaymentItem from 'pages-spa/CartConfirmation/Components/DeliveryPaymentItem';
import Address from 'pages-spa/CartConfirmation/Components/Address';
import DiscountCoupon from 'Components/DiscountCoupon/index';
import { VinistoOrderDllModelsApiOrderOrderItem } from 'vinisto_api_client/src/api-types/order-api';
import './styles.css';

const OrderSummary = ({
	orderItems,
	orderGiftItems,
	delivery,
	payment,
	billingAddress,
	discountCoupons,
	orderCurrency,
	shippingPackaging,
}: OrderSummaryProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isDesktop } = useContext(DeviceServiceContext);

	const deliveryAdress =
		delivery?.deliveryAddress ?? delivery?.pickupPoint?.address;
	const deliveryPhone =
		delivery?.pickupPoint != null
			? delivery.pickupPoint.phone
			: delivery?.deliveryAddress?.phone;

	const deliveryEmail =
		delivery?.pickupPoint != null
			? delivery.pickupPoint.email
			: delivery?.deliveryAddress?.email;

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div>
						<h2 className="vinisto-heading underline mt-3 mt-xl-5 mb-0">
							{t({
								id: 'orderConfirmation.orderSummary.title',
							})}
						</h2>
						<div
							className={
								isDesktop
									? 'vinisto-user-orders__orders__order-body vinisto-cart__items vinisto-order-summary__items d-block'
									: 'vinisto-user-orders__orders__order vinisto-user-favorites--mobile vinisto-crosssell--mobile vinisto-cart__items--mobile vinisto-order-summary__items--mobile shadow-none'
							}
						>
							{orderItems?.map((orderItemData) => (
								<OrderItem
									key={'cartordersumary' + orderItemData.bundle.id}
									orderItemData={orderItemData}
								/>
							))}
							{orderGiftItems?.map((assignedGift, key) => {
								return (
									<OrderItem
										key={`cartordersumaryassignedGift-${key}`}
										orderItemData={assignedGift}
										isGift={true}
									/>
								);
							})}
							{discountCoupons &&
								discountCoupons?.map((discountCoupon, index) => {
									return (
										<DiscountCoupon
											key={'cartordersumarycoupon' + index}
											discountCoupon={discountCoupon}
											orderCurrency={orderCurrency}
										/>
									);
								})}
							<ShippingPackagingItem shippingPackaging={shippingPackaging} />
							<DeliveryPaymentItem
								name={delivery?.name}
								price={delivery?.price}
							/>
							<DeliveryPaymentItem
								name={payment?.name}
								price={payment?.price}
							/>
						</div>
						<h2 className="vinisto-heading underline mt-3 mt-xl-4">
							{t({
								id: 'orderConfirmation.orderSummary.address.deliveryShipping.title',
							})}
						</h2>
						<div className="vinisto-order-summary__addresses">
							<Address
								addressData={deliveryAdress}
								addressType={AddressType.DELIVERY}
								addressPhone={deliveryPhone}
								addressEmail={deliveryEmail}
							/>
							<Address
								addressData={billingAddress}
								addressType={AddressType.BILLING}
								addressPhone={billingAddress?.phone}
								addressEmail={billingAddress?.email}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;

interface ShippingPackagingItemProps {
	shippingPackaging?: VinistoOrderDllModelsApiOrderOrderItem | null;
}
const ShippingPackagingItem = ({
	shippingPackaging,
}: ShippingPackagingItemProps) => {
	if (!shippingPackaging) {
		return null;
	}

	return (
		<DeliveryPaymentItem
			name={shippingPackaging?.bundle.name}
			price={shippingPackaging?.bundle.price}
		/>
	);
};

import { useContext } from 'react';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderOrderEditAddressesParameters,
} from 'vinisto_api_client/src/api-types/order-api/';

import { OrderAddressType } from '../OrderAddress/constants';

import EditAddresses from './EditAddresses';

interface OrderCustomerProps {
	billingAddress: VinistoOrderDllModelsApiOrderAddress | undefined;
	deliveryAddress: VinistoOrderDllModelsApiOrderAddress | undefined;
	orderId: string | undefined;
	isStateCreated: boolean;
	handleEditAddressesInOrder: (
		addressData: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters
	) => void;
}

const OrderCustomer = ({
	billingAddress,
	deliveryAddress,
	orderId,
	isStateCreated,
	handleEditAddressesInOrder,
}: OrderCustomerProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<Detail.Container>
			<Detail.Heading value={`${t({ id: 'orderDetail.customer.title' })}`} />
			<Detail.Columns>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.contact' })} />
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.nameAndSurname' })}
						value={`${billingAddress?.name ?? ''} ${
							billingAddress?.surname ?? ''
						}`}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.email' })}
						value={billingAddress?.email}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.phone' })}
						value={billingAddress?.phone}
					/>
				</div>
				<div>
					<Detail.Subheading
						value={
							<>
								{t({ id: 'orderDetail.billingAddress' })}
								{billingAddress && deliveryAddress && orderId && (
									<EditAddresses
										orderId={orderId}
										isStateCreated={isStateCreated}
										type={OrderAddressType.BILLING}
										billingAddress={billingAddress}
										shippingAddress={deliveryAddress}
										handleEditAddressesInOrder={handleEditAddressesInOrder}
									/>
								)}
							</>
						}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.nameAndSurname' })}
						value={`${billingAddress?.name ?? ''} ${
							billingAddress?.surname ?? ''
						}`}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.company' })}
						value={billingAddress?.company}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.email' })}
						value={billingAddress?.email}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.phone' })}
						value={billingAddress?.phone}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.address' })}
						value={<AddressFormatter address={billingAddress} />}
					/>
				</div>
				<div>
					<Detail.Subheading
						value={
							<>
								{t({ id: 'orderDetail.deliveryAddress' })}
								{billingAddress && deliveryAddress && orderId && (
									<EditAddresses
										orderId={orderId}
										isStateCreated={isStateCreated}
										type={OrderAddressType.SHIPPING}
										billingAddress={billingAddress}
										shippingAddress={deliveryAddress}
										handleEditAddressesInOrder={handleEditAddressesInOrder}
									/>
								)}
							</>
						}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.nameAndSurname' })}
						value={`${deliveryAddress?.name ?? ''} ${
							deliveryAddress?.surname ?? ''
						}`}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.company' })}
						value={deliveryAddress?.company}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.email' })}
						value={deliveryAddress?.email}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.phone' })}
						value={deliveryAddress?.phone}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.address' })}
						value={<AddressFormatter address={deliveryAddress} />}
					/>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};

export default OrderCustomer;

interface AddressFormatterProps {
	address: VinistoOrderDllModelsApiOrderAddress | undefined;
}

const AddressFormatter = ({ address }: AddressFormatterProps) => {
	if (!address) return null;

	return (
		<div>
			<div>{`${address.street ?? '-'} ${
				address.landRegistryNumber ?? '-'
			}`}</div>
			<div>{`${address.city ?? '-'} ${address.zip ?? '-'}`}</div>
			<div>{address.countryCode ?? '-'}</div>
		</div>
	);
};

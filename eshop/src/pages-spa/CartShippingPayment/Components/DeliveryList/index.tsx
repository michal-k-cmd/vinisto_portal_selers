import { Fragment } from 'react';
import { TEST_IDS } from 'Constants/test-ids';
import { DeliveryMethodsPlacement } from 'Components/DeliveryMethods/types';
import { SKELETONS_NUM_DELIVERIES } from 'pages-spa/CartShippingPayment/constants';
import { useContext, useState } from 'react';
import { OrderContext } from 'Services/OrderService/context';
import {
	VinistoHelperDllEnumsOrderDeliveryType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoOrderDllModelsApiDeliveryDelivery,
} from 'vinisto_api_client/src/api-types/order-api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import DeliveryItem from '../DeliveryItem';

import PickupList from './PickupList';

const DeliveryList = ({
	deliveries,
	isDeliveriesLoading,
}: {
	deliveries: VinistoOrderDllModelsApiDeliveryDelivery[];
	isDeliveriesLoading: boolean;
}) => {
	const { deliveryMethod, setDeliveryMethod } = useContext(OrderContext);
	const { vinistoUser } = useContext(AuthenticationContext);

	const [shouldShowPickupGroup, setShouldShowPickupGroup] = useState(false);

	const pickups = deliveries.filter(
		(delivery) =>
			delivery.deliveryType === VinistoHelperDllEnumsOrderDeliveryType.PICKUP
	);

	const isUserVinistoPlusSubscriber =
		vinistoUser.priceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus;
	const isSomePickupsVinistoPlus = pickups.some(
		(pickup) => pickup?.isSubscriber === true
	);
	const showPickupGroupForVinistoPlusUser =
		isUserVinistoPlusSubscriber && isSomePickupsVinistoPlus;

	const otherDeliveries = deliveries.filter(
		(delivery) =>
			delivery.deliveryType !== VinistoHelperDllEnumsOrderDeliveryType.PICKUP
	);

	if (isDeliveriesLoading) {
		return (
			<div>
				{Array.from({ length: SKELETONS_NUM_DELIVERIES }).map((_, index) => (
					<DeliveryItem
						key={'cartshippaydelli' + index}
						isLoading={true}
						placement={DeliveryMethodsPlacement.CHECKOUT}
					/>
				))}
			</div>
		);
	}

	return (
		<div>
			{(() => {
				const pickupVinistoPlusIndex = otherDeliveries.findIndex(
					(d) => (d?.order ?? 0) >= 10
				);
				return otherDeliveries?.map((delivery, index) => (
					<Fragment key={delivery?.id ?? 'cartshippaydelli2' + index}>
						{showPickupGroupForVinistoPlusUser &&
							index === pickupVinistoPlusIndex && (
								<PickupList
									pickups={pickups}
									deliveryMethod={deliveryMethod}
									setDeliveryMethod={setDeliveryMethod}
									shouldShowPickupGroup={shouldShowPickupGroup}
									setShouldShowPickupGroup={setShouldShowPickupGroup}
									showVinistoPlusLogo={true}
								/>
							)}
						<DeliveryItem
							delivery={delivery}
							dataTestid={TEST_IDS.BASKET_SHIPPING_TYPE + '_' + delivery?.id}
							placement={DeliveryMethodsPlacement.CHECKOUT}
							onSelectDelivery={() => setShouldShowPickupGroup(false)}
							selectedDelivery={deliveryMethod?.id}
						/>
					</Fragment>
				));
			})()}
			{!showPickupGroupForVinistoPlusUser && (
				<PickupList
					pickups={pickups}
					deliveryMethod={deliveryMethod}
					setDeliveryMethod={setDeliveryMethod}
					shouldShowPickupGroup={shouldShowPickupGroup}
					setShouldShowPickupGroup={setShouldShowPickupGroup}
				/>
			)}
		</div>
	);
};

export default DeliveryList;

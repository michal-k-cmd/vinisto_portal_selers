import Detail from 'Components/Detail';
import { Fragment, useContext } from 'react';
import {
	VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderUtmParameters,
} from 'vinisto_api_client/src/api-types/order-api/';
import { LocalizationContext } from 'Services/LocalizationService';

import UTMParametersList from '../UTMParametersList';

interface OrderMarketingDetailsProps {
	discountCoupons:
		| (
				| VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition
		  )[]
		| undefined;
	utmParameters: VinistoOrderDllModelsApiOrderUtmParameters | undefined;
}

const OrderMarketingDetails = ({
	utmParameters,
	discountCoupons,
}: OrderMarketingDetailsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div>
			<Detail.InfoWithLabel
				label={t({ id: 'orderDetail.campaign' })}
				value={
					<UTMParametersList
						data={utmParameters}
						shouldTrim={false}
					/>
				}
				fallbackOrHide={false}
			/>
			<Detail.InfoWithLabel
				label={t({ id: 'orderDetail.discountCoupon' })}
				value={
					discountCoupons
						? discountCoupons?.map((discountCoupon, key) => (
								<Fragment key={key}>
									<span>{discountCoupon?.code}</span>
									<br />
								</Fragment>
						  ))
						: null
				}
			/>
		</div>
	);
};

export default OrderMarketingDetails;

import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api/';
import { BillingOrder } from 'Services/OrderService/interfaces';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import {
	DetailTableColumn,
	DetailTableData,
} from 'Components/Detail/Table/types';
import { Link } from 'react-router-dom';
import { dayjsInstance as dayjs } from 'Services/Date';
import { getDiscountPriceValues } from 'vinisto_shared/src/price/get-discount-prices';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/user-api';

interface OrderItemsProps {
	items: BillingOrder[] | null | undefined;
}

const OrderItems = ({ items }: OrderItemsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const tableColumns: DetailTableColumn[] = [
		{ title: t({ id: 'admin.billing.orderNumber' }), width: '30%' },
		{ title: t({ id: 'admin.billing.status' }) },
		{ title: t({ id: 'admin.billing.orderDate' }) },
		{ title: t({ id: 'admin.billing.orderItemCount' }) },
		{ title: t({ id: 'admin.billing.itemsPrice' }), minWidth: '170px' },
		{ title: t({ id: 'admin.billing.isFee' }) },
		{ title: t({ id: 'admin.billing.saleFee' }) },
		{ title: t({ id: 'admin.billing.logisticFee' }) },
		{ title: t({ id: 'admin.billing.fee' }) },
		{ title: '' },
	];

	let tableData: DetailTableData = [];

	items &&
		items?.length > 0 &&
		(tableData = items?.map((item) => [
			item.orderNumber,
			t({
				id: `admin.billing.status.${item.stateChangeRecords?.at(-1)?.state}`,
			}),
			dayjs
				.unix(
					item.stateChangeRecords?.find(
						(changeRecord) =>
							changeRecord.state ===
							VinistoHelperDllEnumsOrderOrderState.CREATED
					)?.changeTime ?? 0
				)
				.format(`${t({ id: 'admin.dateFormat' })}`),
			item.orderItems
				.map((orderItem) => {
					return orderItem.quantity ?? 0;
				})
				.reduce((a, b) => a + b, 0),
			getLocalizedPrice({
				price: item.orderItems
					.map((orderItem) => {
						const { isDiscounted, discountedPriceWithVat } =
							getDiscountPriceValues({
								quantityInBasket: orderItem.quantity ?? 1,
								basePrice: orderItem.bundle.price,
								discountedPrice: orderItem.bundle.discountPrice,
							});

						return isDiscounted
							? (discountedPriceWithVat ?? 0) * (orderItem.quantity ?? 1)
							: (orderItem.bundle.price.valueWithVat ?? 0) *
									(orderItem.quantity ?? 1);
					})
					.reduce((a, b) => a + b, 0),
				currency: VinistoHelperDllEnumsCurrency.CZK,
				displayCurrency: false,
			}),
			item.sumOrderFee > 0 ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			getLocalizedPrice({
				price: item.sumOrderSaleFeeWithVat,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				displayCurrency: false,
			}),
			getLocalizedPrice({
				price: item.sumOrderLogisticFeeWithVat,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				displayCurrency: false,
			}),
			getLocalizedPrice({
				price: item.sumOrderFeeWithVat,
				currency: VinistoHelperDllEnumsCurrency.CZK,
				displayCurrency: false,
			}),
			<Link
				to={`/order-detail/${item.id}`}
				key={item.id}
				className={'btn btn-primary btn-sm d-inline-block'}
			>
				{t({ id: 'admin.billing.orderLink' })}
			</Link>,
		]));

	return (
		<Detail.Container>
			<div className="table-responsive">
				<Detail.Table
					columns={tableColumns}
					data={tableData}
				/>
			</div>
		</Detail.Container>
	);
};

export default OrderItems;

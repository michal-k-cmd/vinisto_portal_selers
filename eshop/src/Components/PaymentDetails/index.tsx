import { useContext } from 'react';
import Config from 'Config';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';
import CopyValue from 'Components/CopyValue';

import styles from './styles.module.css';
import { PaymentDetailsProps } from './interfaces';

const PaymentDetails = ({
	orderId,
	orderNumber,
	orderPrice,
	orderCurrency,
}: PaymentDetailsProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const bankAccount =
		orderCurrency === VinistoHelperDllEnumsCurrency.EUR
			? Config.market.bankAccountEUR
			: Config.market.bankAccount;

	return (
		<div className={styles.paymentInfo}>
			<div className={styles.qrCode}>
				<img
					src={`${Config.baseUrl}order-api/orders/${orderId}/GetQrCode/img.png`}
					alt="qr"
					className={styles.qrCodeImage}
				/>
			</div>
			<div className={styles.wrap}>
				<div>
					{`${t({
						id: 'cartShippingPayment.accountNumber',
					})}/${t({
						id: 'cartShippingPayment.bankAccount.code',
					})}: `}

					<CopyValue value={bankAccount}>
						<strong>{bankAccount}</strong>
					</CopyValue>
				</div>
				<div>
					{`${t({
						id: 'cartShippingPayment.varSymbol',
					})}: `}
					<CopyValue value={orderNumber}>
						<strong>{orderNumber}</strong>
					</CopyValue>
				</div>
				<div>
					{`${t({
						id: 'cartShippingPayment.payment',
					})}: `}
					<CopyValue
						value={orderPrice.toLocaleString('cs-CZ', {
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
					>
						<strong>
							{(orderPrice &&
								getLocalizedPrice({
									price: orderPrice,
									currency: orderCurrency,
								})) ??
								'BRO'}
						</strong>
					</CopyValue>
				</div>
			</div>
		</div>
	);
};

export default PaymentDetails;

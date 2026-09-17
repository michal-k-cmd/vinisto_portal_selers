import { useContext } from 'react';
import { IPaymentInfoProps } from 'pages-spa/CartConfirmation/Components/PaymentInfo/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import Container from 'Components/View/Container';
import PaymentDetails from 'Components/PaymentDetails';

import RegisterForm from '../RegisterForm';

import styles from './styles.module.css';

const PaymentInfo = ({
	orderId,
	orderNumber,
	isCreditPayment = false,
	orderPrice,
	orderEmail,
	orderCurrency,
}: IPaymentInfoProps) => {
	const localizationContext = useContext(LocalizationContext);
	const { isLoggedIn } = useContext(AuthenticationContext);
	const t = localizationContext.useFormatMessage();
	const translationPrefix = `cartShippingPayment.${
		isCreditPayment ? 'credit' : 'bankAccount'
	}.summary`;

	return (
		<>
			<Container>
				<p className={styles.text}>
					{t(
						{ id: translationPrefix },
						{
							orderNumber: (
								<span
									className="fw-bolder"
									key="orderNumber"
								>
									{t(
										{
											id: `${translationPrefix}.orderNumber`,
										},
										{ orderNumber }
									)}
								</span>
							),
							paymentType: (
								<span
									className="fw-bolder"
									key="paymentType"
								>
									{t({
										id: `${translationPrefix}.paymentType`,
									})}
								</span>
							),
						}
					)}
				</p>
				<p className={styles.text}>
					{t(
						{ id: `${translationPrefix}.disclaimer` },
						{
							highlighted: (
								<span
									className="fw-bolder vinisto-color-error"
									key="highlighted"
								>
									{t({
										id: `${translationPrefix}.disclaimer.highlighted`,
									})}
								</span>
							),
						}
					)}
				</p>
				<p className={styles.text}>
					{t(
						{ id: `${translationPrefix}.follow` },
						{
							highlighted: (
								<span
									className="fw-bolder"
									key="highlighted2"
								>
									{t({
										id: `${translationPrefix}.follow.highlighted`,
									})}
								</span>
							),
						}
					)}
				</p>
			</Container>

			<Container>
				<h2 className={styles.title}>
					{t({
						id: 'cartShippingPayment.paymentInfo',
					})}
				</h2>
				<PaymentDetails
					orderId={orderId}
					orderNumber={orderNumber}
					orderPrice={orderPrice}
					orderCurrency={orderCurrency}
				/>
			</Container>

			{!isLoggedIn && (
				<Container>
					<RegisterForm email={orderEmail ?? ''} />
				</Container>
			)}
		</>
	);
};

export default PaymentInfo;

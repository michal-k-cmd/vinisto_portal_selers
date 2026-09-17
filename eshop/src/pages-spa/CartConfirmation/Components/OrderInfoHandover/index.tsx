import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import RegisterForm from '../RegisterForm';

import { IOrderInfoHandoverProps } from './interfaces';
import styles from './styles.module.css';

const OrderInfoHandover = ({
	orderNumber,
	orderEmail,
}: IOrderInfoHandoverProps) => {
	const localizationContext = useContext(LocalizationContext);
	const { isLoggedIn } = useContext(AuthenticationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<ContainerFullWidth>
			{!isLoggedIn && (
				<div className="container mt-0">
					<div className="row">
						<div className="col-12">
							<RegisterForm email={orderEmail ?? ''} />
						</div>
					</div>
				</div>
			)}
			<h2 className="vinisto-heading underline mt-2 mt-xl-4">
				{t({
					id: 'cartShippingPayment.info',
				})}
			</h2>
			<div className={styles.info}>
				<p className={styles.infoText}>
					{t(
						{ id: 'cartShippingPayment.handover.summary' },
						{
							orderNumber: (
								<span className="fw-bolder">
									{t(
										{
											id: 'cartShippingPayment.handover.summary.orderNumber',
										},
										{ orderNumber }
									)}
								</span>
							),
						}
					)}
				</p>
				<p className={styles.infoText}>
					{t({ id: 'cartShippingPayment.handover.summary.follow' })}
				</p>
			</div>
		</ContainerFullWidth>
	);
};

export default OrderInfoHandover;

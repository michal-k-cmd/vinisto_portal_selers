import { lazy, Suspense, useContext } from 'react';
import Loader from 'Components/View/Loader';
import { UseQueryResult } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';
import Container from 'Components/View/Container';

const BigGreenOkIcon = lazy(() => import('Components/Icons/BigGreenOk'));

import RegisterForm from '../Components/RegisterForm';

import styles from './styles.module.css';

import { Order } from '@/domain/order';

interface PaidProps {
	orderQuery: UseQueryResult<void | Order | null, unknown>;
	handleOnNavigateToOrders: () => void;
}

const Paid = ({ orderQuery, handleOnNavigateToOrders }: PaidProps) => {
	const isB2b = useIsB2b();
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isLoggedIn } = useContext(AuthenticationContext);

	return (
		<section id="content-wrapper">
			<Container>
				<div className={styles.status}>
					<Suspense fallback={<Loader blank />}>
						<BigGreenOkIcon
							alt=""
							title=""
							className={styles.icon}
						/>
					</Suspense>
					<h1 className={styles.title}>
						{t({
							id: 'orderConfirmation.success.title',
						})}
					</h1>
				</div>
			</Container>

			<Container>
				<p className={styles.text}>
					{t(
						{
							id: 'orderConfirmation.success.text.orderAccepted',
						},
						{
							orderNumber: (
								<span
									className="fw-bolder"
									key="order-number"
								>
									{t(
										{
											id: 'orderConfirmation.success.text.orderId',
										},
										{
											value: orderQuery.data?.orderNumber ?? '',
										}
									)}
								</span>
							),
						}
					)}
				</p>
				<p className={styles.text}>
					{t(
						{
							id: 'orderConfirmation.success.text.orderState',
						},
						{
							highlightedFollow: (
								<span
									className="fw-bolder"
									key="highlighted-follow"
								>
									{t({
										id: 'orderConfirmation.success.text.orderState.follow',
									})}
								</span>
							),
							highlightedInvoice: (
								<span
									className="fw-bolder"
									key="highlighted-invoice"
								>
									{t({
										id: 'orderConfirmation.success.text.orderState.invoice',
									})}
								</span>
							),
						}
					)}
				</p>
			</Container>
			{isLoggedIn && !isB2b && (
				<Container className="text-center mb-3">
					<button
						onClick={handleOnNavigateToOrders}
						className="vinisto-btn vinisto-bg vinisto-font-18"
					>
						{t({
							id: 'orderConfirmation.success.followOrderLink',
						})}
					</button>
				</Container>
			)}

			<Container className="text-center">
				<h1 className={styles.title}>
					{t({
						id: 'orderConfirmation.success.sms.title',
					})}
				</h1>
				<p className={styles.text}>
					{t({
						id: 'orderConfirmation.success.sms.text',
					})}
				</p>
			</Container>

			{!isLoggedIn && (
				<Container>
					<RegisterForm email={orderQuery.data?.billingAddress?.email ?? ''} />
				</Container>
			)}
		</section>
	);
};
export default Paid;

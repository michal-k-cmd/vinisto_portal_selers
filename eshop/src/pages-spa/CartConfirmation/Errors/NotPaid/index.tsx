import { lazy, Suspense, useContext } from 'react';
import Container from 'Components/View/Container';
import Loader from 'Components/View/Loader';
import { UseQueryResult } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import { GoPayServiceContext } from 'Services/GoPayService';
import { useWithB2bQueryParams } from 'Services/PlatformService';
import useCustomerSupportContact from 'Hooks/useCustomerSupportContact';

const BigRedError = lazy(() => import('Components/Icons/BigRedError'));
const MailIcon = lazy(() => import('Components/Icons/MailIcon'));
const PhoneCallIcon = lazy(() => import('Components/Icons/PhoneCall'));

import styles from '../styles.module.css';

import { Order } from '@/domain/order';

interface ErrorProps {
	orderQuery: UseQueryResult<void | Order | null, unknown>;
}

const PaymentError = ({ orderQuery }: ErrorProps) => {
	const withB2bQueryParams = useWithB2bQueryParams();
	const t = useContext(LocalizationContext).useFormatMessage();
	const goPayContext = useContext(GoPayServiceContext);
	const customerSupport = useCustomerSupportContact();

	const handleOnRetryPayment = () =>
		goPayContext.handleOnPayOnline({
			order: orderQuery.data ?? null,
			notificationUrl: `${process.env.NEXT_PUBLIC_API_URI}services-api/gopay/notify`,
			returnUrl: withB2bQueryParams(
				`${window.location.origin}/${t({
					id: 'routes.cart.confirmation.route',
				})}?oid=${orderQuery.data?.id}`
			),
		});

	return (
		<section id="content-wrapper">
			<Container>
				<div className={styles.status}>
					<Suspense fallback={<Loader blank />}>
						<BigRedError
							alt=""
							title=""
							className={styles.icon}
						/>
					</Suspense>
					<h1 className={styles.title}>
						{t({ id: 'orderConfirmation.fail.title' })}
					</h1>
				</div>
			</Container>

			<Container className="mb-4">
				<p className={styles.text}>
					{t(
						{
							id: 'orderConfirmation.fail.info',
						},
						{
							orderNumber: (
								<span
									className={styles.boldText}
									key="info.orderNumber"
								>
									{t(
										{
											id: 'orderConfirmation.fail.info.orderNumber',
										},
										{
											value: orderQuery.data?.orderNumber,
										}
									)}
								</span>
							),
							error: (
								<span
									className={styles.errorText}
									key="info.error"
								>
									{t({
										id: 'orderConfirmation.fail.info.error',
									})}
								</span>
							),
							noExpedition: (
								<span
									className={styles.errorText}
									key="info.noExpedition"
								>
									{t({
										id: 'orderConfirmation.fail.info.noExpedition',
									})}
								</span>
							),
						}
					)}
				</p>
				<Container className="my-3 text-center">
					<button
						onClick={handleOnRetryPayment}
						className="vinisto-btn vinisto-bg-green vinisto-payment-error-btn"
					>
						{t({
							id: 'orderConfirmation.fail.repeat.btn',
						})}
					</button>
				</Container>
				<p className={styles.text}>
					{t(
						{ id: 'orderConfirmation.fail.info.moreInfo' },
						{ phone: formatPhoneNumber(customerSupport.phone) }
					)}
				</p>
				<div className={styles.contactUs}>
					<a
						href={`tel:${customerSupport.phone}`}
						className={styles.linkTo}
					>
						<Suspense fallback={<Loader blank />}>
							<PhoneCallIcon className={styles.contactUsPhoneIcon} />
						</Suspense>
						{formatPhoneNumber(customerSupport.phone)}{' '}
						{t({
							id: 'orderConfirmation.fail.info.opening',
						})}
					</a>
					<a
						href={`mailto:${customerSupport.email}`}
						className={styles.linkTo}
					>
						<Suspense fallback={<Loader blank />}>
							<MailIcon className={styles.contactUsMailIcon} />
						</Suspense>
						{customerSupport.email}
					</a>
				</div>
			</Container>
		</section>
	);
};
export default PaymentError;

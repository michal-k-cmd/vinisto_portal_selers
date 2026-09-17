import { lazy, Suspense, useContext } from 'react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { OrderContext } from 'Services/OrderService/context';
import Container from 'Components/View/Container';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import useCustomerSupportContact from 'Hooks/useCustomerSupportContact';

const BigRedError = lazy(() => import('Components/Icons/BigRedError'));
const MailIcon = lazy(() => import('Components/Icons/MailIcon'));
const PhoneCallIcon = lazy(() => import('Components/Icons/PhoneCall'));

import styles from '../styles.module.css';

import localStyles from './styles.module.css';

const NotCreatedError = () => {
	const [apiOrderId] = useQueryState('oid');
	const { orderErrorsFromWs } = useContext(OrderContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const customerSupport = useCustomerSupportContact();

	const currentOrderErrors = apiOrderId
		? orderErrorsFromWs[apiOrderId] ?? []
		: [];

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
						{t({
							id: 'orderConfirmation.notCreated.title',
						})}
					</h1>
					<p>
						Zkuste to, prosím, znovu.{' '}
						<Link
							href="/kosik"
							className="fw-bolder text-decoration-underline"
						>
							Zpět do košíku
						</Link>
					</p>
				</div>
			</Container>

			<Container className="mb-4">
				<p className={styles.text}>
					{currentOrderErrors.length ? (
						<ul className={localStyles.errors}>
							{currentOrderErrors.map((error, i) => (
								<li key={i}>
									{error.message ?? error.specificError ?? error.generalError}
								</li>
							))}
						</ul>
					) : null}
				</p>
				<p className={styles.text}>
					{t({
						id: 'orderConfirmation.fail.info.moreInfo',
					})}
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
export default NotCreatedError;

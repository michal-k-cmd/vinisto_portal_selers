import { lazy, Suspense, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Container from 'Components/View/Container';
import Loader from 'Components/View/Loader';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import useCustomerSupportContact from 'Hooks/useCustomerSupportContact';

const BigRedError = lazy(() => import('Components/Icons/BigRedError'));
const MailIcon = lazy(() => import('Components/Icons/MailIcon'));
const PhoneCallIcon = lazy(() => import('Components/Icons/PhoneCall'));

import styles from '../styles.module.css';

const TimeoutExpiredError = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const customerSupport = useCustomerSupportContact();

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
				</div>
			</Container>

			<Container className="mb-4">
				<p className={styles.text}></p>
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
export default TimeoutExpiredError;

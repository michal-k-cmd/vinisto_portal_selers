import { lazy, Suspense } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import Container from 'Components/View/Container';
import Loader from 'Components/View/Loader';
import useCustomerSupportContact from 'Hooks/useCustomerSupportContact';
const PhoneCallIcon = lazy(() => import('Components/Icons/PhoneCall'));
const VinistoLogoIcon = lazy(() => import('Components/Icons/VinistoLogo'));

import styles from './styles.module.css';

const BasketHeader = () => {
	const t = useFormatMessage();
	const customerSupport = useCustomerSupportContact();

	return (
		<Container>
			<div className={styles.basketHeader}>
				<div className={styles.logoWrapper}>
					<a href="/">
						<Suspense fallback={<Loader blank />}>
							<VinistoLogoIcon />
						</Suspense>
					</a>
				</div>
				<div className="d-flex justify-content-end align-items-center pe-0 pe-md-3">
					<a
						href={`tel:${customerSupport.phone}`}
						className={styles.basketHeaderCta}
					>
						<div className="d-flex flex-row align-items-center">
							<Suspense fallback={<Loader blank />}>
								<PhoneCallIcon className="me-2 vinisto-header-phone-icon" />
							</Suspense>
							<div className="d-flex flex-column">
								<div className="text-end">
									{t({ id: 'navbar.customerCare.label' })}
								</div>
								<div className={styles.phoneNumber}>
									{formatPhoneNumber(customerSupport.phone)}
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</Container>
	);
};

export default BasketHeader;

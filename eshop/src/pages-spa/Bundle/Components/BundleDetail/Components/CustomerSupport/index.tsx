import { useContext } from 'react';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import useChat from 'Hooks/useChat';
import useCustomerSupportContact from 'Hooks/useCustomerSupportContact';
import { LocalizationContext } from 'Services/LocalizationService';
import ImageLocal from 'Components/View/ImageLocal';
import { useIsB2b } from 'Services/PlatformService';
import Config from 'Config';

import styles from './styles.module.css';

const CustomerSupport = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { openChat } = useChat();
	const customerSupport = useCustomerSupportContact();
	const isB2b = useIsB2b();
	const businessCustomerSales = Config.market.businessCustomerSales;

	return (
		<div className={styles.customerSupportWrapper}>
			<div className={styles.header}>
				{t({ id: 'productDetail.customerSupport' })}
			</div>
			<div className={styles.chat}>
				<a
					className={styles.contactLink}
					href={`tel:${customerSupport.phone}`}
				>
					{formatPhoneNumber(customerSupport.phone)}
				</a>
				<button
					className={styles.startChat}
					onClick={() => openChat()}
				>
					{t({ id: 'productDetail.startChat' })}
					<ImageLocal
						fileName="chat.svg"
						alt=""
						className={styles.chatIcon}
						width={18}
						height={17}
					/>
				</button>
			</div>
			{isB2b && (
				<div className={styles.salesDepartment}>
					<div className={styles.header}>
						{t({ id: 'footer.b2b.salesDepartment' })}
					</div>
					<div className={`${styles.chat} ${styles.salesContacts}`}>
						<a
							className={styles.contactLink}
							href={`tel:${businessCustomerSales.phone}`}
						>
							{formatPhoneNumber(businessCustomerSales.phone)}
						</a>
						<a
							className={styles.contactLink}
							href={`mailto:${businessCustomerSales.email}`}
						>
							{businessCustomerSales.email}
						</a>
					</div>
				</div>
			)}
		</div>
	);
};
export default CustomerSupport;

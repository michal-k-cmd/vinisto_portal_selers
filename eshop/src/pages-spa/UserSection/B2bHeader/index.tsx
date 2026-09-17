import UserHeader from '../UserHeader';
import CompanyInfo from '../CompanyInfo';
import CreditInfo from '../CreditInfo';
import MerchantInfo from '../MerchantInfo';
import B2bHeaderCards from '../B2bHeaderCards';
import OverdueInfo from '../OverdueInfo';

import styles from './styles.module.css';

const B2bHeader = () => {
	return (
		<div className={styles.b2bHeaderContainer}>
			<div className="d-flex flex-column gap-3">
				<UserHeader />
				<CompanyInfo />
			</div>
			<B2bHeaderCards>
				<CreditInfo />
				<OverdueInfo />
				<MerchantInfo />
			</B2bHeaderCards>
		</div>
	);
};

export default B2bHeader;

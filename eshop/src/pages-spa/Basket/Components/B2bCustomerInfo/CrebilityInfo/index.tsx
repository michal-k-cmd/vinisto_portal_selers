import cx from 'classnames';
import CheckIconX from 'vinisto_ui/src/components/icons/check-simple';
import AlertIcon from 'Components/Icons/Alert';

import styles from './styles.module.css';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

interface CredibilityInfoProps {
	b2bCustomer: VinistoAuthDllModelsApiUserCompany;
}

const CredibilityInfo = ({ b2bCustomer }: CredibilityInfoProps) => {
	const isVatPayer = !!b2bCustomer.validationData?.isVatPayer;
	const isUnreliableVatPayer = isVatPayer
		? !b2bCustomer.validationData?.isVatPayerTrustworthy
		: false;
	const hasIsirRecord = !!b2bCustomer.validationData?.hasRecordInIsir;

	return (
		<div className={styles.credibilityInfoComponent}>
			{isUnreliableVatPayer ? (
				<div
					className={cx(
						'mb-2 d-flex align-items-center',
						styles.credibilityWarningItem
					)}
				>
					<AlertIcon
						className="me-1"
						height={32}
						width={32}
					/>
					<span className={styles.credibilityWarningText}>
						Nespolehlivý plátce DPH
					</span>
				</div>
			) : (
				<div className={styles.credibilityInfoItem}>
					<CheckIconX className="me-1" />
					Spolehlivý plátce DPH
				</div>
			)}
			{hasIsirRecord ? (
				<div
					className={cx(
						'mb-2 d-flex align-items-center',
						styles.credibilityWarningItem
					)}
				>
					<AlertIcon
						className="me-1"
						height={32}
						width={32}
					/>
					<span className={styles.credibilityWarningText}>
						Záznam v registru dlužníků
					</span>
				</div>
			) : (
				<div className={styles.credibilityInfoItem}>
					<CheckIconX className="me-1" />
					Bez záznamu v registru dlužníků
				</div>
			)}
		</div>
	);
};

export default CredibilityInfo;

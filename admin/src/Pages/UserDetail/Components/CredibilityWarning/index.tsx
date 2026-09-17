import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import CredibilityIssue from 'Components/CredibilityIssue';

import styles from './styles.module.css';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

interface CredibilityInfoProps {
	b2bCustomer: VinistoAuthDllModelsApiUserCompany;
}

const CredibilityWarning = ({ b2bCustomer }: CredibilityInfoProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const isVatPayer = !!b2bCustomer.validationData?.isVatPayer;
	const isUnreliableVatPayer = isVatPayer
		? !b2bCustomer.validationData?.isVatPayerTrustworthy
		: false;
	const hasIsirRecord = !!b2bCustomer.validationData?.hasRecordInIsir;

	return (
		<div className={styles.credibilityInfoComponent}>
			{isUnreliableVatPayer && (
				<CredibilityIssue>
					{t({ id: 'admin.b2bCustomer.isUnreliableVatPayer.title' })}
				</CredibilityIssue>
			)}
			{hasIsirRecord && (
				<CredibilityIssue>
					{t({ id: 'admin.b2bCustomer.hasIsirRecord.title' })}
				</CredibilityIssue>
			)}
		</div>
	);
};

export default CredibilityWarning;

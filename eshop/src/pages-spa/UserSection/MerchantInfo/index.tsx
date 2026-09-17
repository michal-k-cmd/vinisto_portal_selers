import { dayjsInstance as dayjs } from 'vinisto_shared';
import useGetUserById from 'Hooks/use-get-user-by-id';
import { PHONE_CODE_PREFIX_CHAR, PHONE_CODES } from 'Components/Form/constants';

import Title from '../B2bHeaderCards/Title';

import styles from './styles.module.css';

import {
	VinistoAuthDllModelsApiUserCompany,
	VinistoHelperDllEnumsUserCompanyCompanyUserRights,
} from '@/api-types/user-api';

const getIsMerchantOnline = () => {
	const currentDate = dayjs();

	const day = currentDate.day();
	const isWorkDay = day >= 1 && day <= 5;

	const hour = currentDate.hour();
	return isWorkDay && hour >= 8 && hour < 17;
};

const defaultMerchant = {
	firstName: 'Obchodník',
	surname: 'vinisto',
	phone: '606758080',
	email: 'obchodnik@vinisto.cz',
};

const CZECH_PHONE_PREFIX = `${PHONE_CODE_PREFIX_CHAR}${PHONE_CODES.CZ}`;

const MerchantInfo = () => {
	const { data: user } = useGetUserById();

	const merchant =
		(user as VinistoAuthDllModelsApiUserCompany | undefined)?.users?.find(
			(companyUser) =>
				companyUser.right ===
					VinistoHelperDllEnumsUserCompanyCompanyUserRights.Merchant &&
				companyUser.companyUserDetail != null
		)?.companyUserDetail ?? defaultMerchant;

	const isMerchanOnline = getIsMerchantOnline();
	const initials = `${merchant.firstName?.[0] ?? ''} ${
		merchant.surname?.[0] ?? ''
	}`;

	return (
		<div>
			<Title>
				<div>{`váš obchodník`}</div>
				<span
					className={styles.status}
					style={{
						'--status-color': isMerchanOnline
							? 'var(--vinisto-color-green)'
							: 'var(--vinisto-color-red)',
					}}
				>
					{isMerchanOnline ? `Online` : `Offline`}
				</span>
			</Title>
			<div className={styles.info}>
				<div className={styles.avatar}>
					<span className={styles.initials}>{initials}</span>
				</div>
				<div>
					<div
						className={styles.name}
					>{`${merchant.firstName} ${merchant.surname}`}</div>
					<div className={styles.workingHours}>Po–Pá 8:00–17:00</div>
				</div>
			</div>
			<div className={styles.links}>
				<a
					className={styles.cta}
					href={`tel:${CZECH_PHONE_PREFIX}${merchant.phone}`}
					title={`zavolat ${merchant.phone}`}
				>
					<img
						src={`/assets/images/phone.svg`}
						width={14}
						height={14}
						className="me-1"
					/>
					{`${CZECH_PHONE_PREFIX} ${(merchant.phone ?? '').replace(
						/(\+?\d{3})/g,
						'$1 '
					)}`}
				</a>
				<a
					className={styles.mailto}
					href={`mailto:${merchant.email}`}
					aria-label={merchant.email ?? ''}
					title={`napsat ${merchant.email}`}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						width="14"
						height="14"
					>
						<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
						<rect
							x="2"
							y="4"
							width="20"
							height="16"
							rx="2"
						></rect>
					</svg>
					<span>Napsat e-mail</span>
				</a>
			</div>
		</div>
	);
};

export default MerchantInfo;

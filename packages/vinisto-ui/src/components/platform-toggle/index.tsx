'use client';

import cx from 'classnames';
import { VinistoHelperDllEnumsDeliveryAndPaymentPlatform } from 'vinisto_api_client/src/api-types/order-api';

import styles from './styles.module.css';

interface PlatformToggleProps {
	isB2b: boolean;
	prefix: (itemName: string) => string;
	storageKeys: {
		readonly LOGIN_REDIRECT_PATH: 'LOGIN_REDIRECT_PATH';
		readonly ACTIVE_CURRENCY: 'ACTIVE_CURRENCY';
		readonly USER_PRICE_LEVEL: 'USER_PRICE_LEVEL';
		readonly ACTIVE_PLATFORM: 'ACTIVE_PLATFORM';
	};
}

const PlatformToggle = ({
	isB2b,
	prefix,
	storageKeys,
}: PlatformToggleProps) => {
	return (
		<div className={styles.platformToggle}>
			<button
				className={cx(styles.platformToggleButton, styles.b2c, {
					[styles.active]: !isB2b,
				})}
				onClick={() => {
					document.cookie = `${prefix(storageKeys.ACTIVE_PLATFORM)}=${
						VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2C
					}; path=/ ;max-age=31536000`;

					window.location.reload();
				}}
			>
				<strong>B2c</strong>
			</button>
			<button
				className={cx(styles.platformToggleButton, styles.b2b, {
					[styles.active]: isB2b,
				})}
				onClick={() => {
					document.cookie = `${prefix(storageKeys.ACTIVE_PLATFORM)}=${
						VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B
					}; path=/ ;max-age=31536000`;

					window.location.reload();
				}}
			>
				<strong>B2b</strong>
			</button>
			<button
				className={styles.platformToggleButton}
				onClick={() => {
					document.cookie = `${prefix(
						storageKeys.ACTIVE_PLATFORM
					)}=; path=/ ;max-age=0`;

					window.location.reload();
				}}
			>
				<svg
					stroke="currentColor"
					fill="none"
					strokeWidth="2"
					viewBox="0 0 24 24"
					strokeLinecap="round"
					strokeLinejoin="round"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
				>
					<path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
					<path d="M20 4v5h-5"></path>
				</svg>
			</button>
		</div>
	);
};

export default PlatformToggle;

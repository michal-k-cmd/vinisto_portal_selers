import { ReactNode } from 'react';

import styles from './styles.module.css';

interface ProvisionProps {
	label: ReactNode;
	/** @format range 0-1 */
	percentProvisionB2C: number;
	/** @format range 0-1 */
	percentProvisionB2B: number;

	prefix?: string;
}

const Provision = ({
	label,
	percentProvisionB2C,
	percentProvisionB2B,
	prefix,
}: ProvisionProps) => {
	return (
		<div className={styles.wrapper}>
			<div>{label}</div>
			<div className={styles.percentage}>
				<span>
					{prefix ? `${prefix} ` : ''}
					{Math.min(1, percentProvisionB2C).toLocaleString('cs-CZ', {
						style: 'percent',
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					})}
				</span>
				<span>
					{prefix ? `${prefix} ` : ''}
					{Math.min(1, percentProvisionB2B).toLocaleString('cs-CZ', {
						style: 'percent',
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					})}
				</span>
			</div>
		</div>
	);
};

export default Provision;

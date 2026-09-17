import useFormatMessage from 'Hooks/useFormatMessage';

import styles from './styles.module.css';

interface BasicProvisionProps {
	value1: number;
	value2: number;
}

const BasicProvision = ({ value1, value2 }: BasicProvisionProps) => {
	const t = useFormatMessage();
	return (
		<div className={styles.wrapper}>
			<div>{t({ id: 'dashboard.provisions.basic' })}</div>
			<div className={styles.percentage}>
				<span>{value1}%</span>
				<span>{value2}%</span>
			</div>
		</div>
	);
};

export default BasicProvision;

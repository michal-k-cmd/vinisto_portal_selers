import cx from 'classnames';

import styles from './styles.module.css';

interface DetailSubheadingProps {
	value: string | number | React.ReactNode;
	className?: string;
}

const DetailSubheading = ({ value, className }: DetailSubheadingProps) => {
	return <h6 className={cx(styles.subheading, className)}>{value}</h6>;
};

export default DetailSubheading;

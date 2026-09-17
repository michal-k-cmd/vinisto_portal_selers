import cx from 'classnames';

import styles from './styles.module.css';

interface DetailColumnsProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

const DetailColumns = ({ children, style, className }: DetailColumnsProps) => {
	return (
		<div
			className={cx(styles.columns, className)}
			style={style}
		>
			{children}
		</div>
	);
};

export default DetailColumns;

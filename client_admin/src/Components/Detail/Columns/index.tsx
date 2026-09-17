import styles from './styles.module.css';

interface DetailColumnsProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
}

const DetailColumns = ({ children, style }: DetailColumnsProps) => {
	return (
		<div
			className={styles.columns}
			style={style}
		>
			{children}
		</div>
	);
};

export default DetailColumns;

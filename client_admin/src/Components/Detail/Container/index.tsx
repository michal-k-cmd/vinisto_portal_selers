interface DetailContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

import styles from './styles.module.css';

const DetailContainer = ({ children, ...rest }: DetailContainerProps) => {
	return (
		<div {...rest}>
			<div className={styles.container}>{children}</div>
		</div>
	);
};

export default DetailContainer;

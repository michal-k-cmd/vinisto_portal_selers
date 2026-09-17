import styles from './styles.module.css';

interface DetailViewProps {
	children: React.ReactNode;
}

const DetailView = ({ children }: DetailViewProps) => {
	return <div className={styles.detailView}>{children}</div>;
};

export default DetailView;

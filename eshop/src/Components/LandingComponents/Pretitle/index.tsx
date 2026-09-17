import styles from './styles.module.css';

interface PretitleProps {
	pretitle: string;
}

const Pretitle = ({ pretitle }: PretitleProps) => {
	return <p className={styles.pretitle}>{pretitle}</p>;
};

export default Pretitle;

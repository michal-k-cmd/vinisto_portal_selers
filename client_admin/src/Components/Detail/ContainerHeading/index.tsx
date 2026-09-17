import styles from './styles.module.css';

interface ContainerHeadingProps {
	value: string | number | React.ReactNode;
}

const ContainerHeading = ({ value }: ContainerHeadingProps) => {
	return <h5 className={styles.containerHeading}>{value}</h5>;
};

export default ContainerHeading;

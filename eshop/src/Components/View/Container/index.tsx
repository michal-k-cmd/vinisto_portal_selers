import cx from 'classnames';

import styles from './styles.module.css';

interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
	return <div className={cx(styles.container, className)}>{children}</div>;
};

export default Container;

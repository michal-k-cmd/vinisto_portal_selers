import cx from 'classnames';

import styles from './styles.module.css';

interface HeadingProps {
	heading: string;
	className?: string;
}

const Heading = ({ heading, className }: HeadingProps) => {
	return <h2 className={cx(styles.heading, className)}>{heading}</h2>;
};

export default Heading;

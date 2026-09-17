import Spinner from 'react-bootstrap/Spinner';
import cx from 'classnames';

import styles from './styles.module.css';

interface LoaderProps {
	blank?: boolean;
}

const Loader = ({ blank }: LoaderProps) => {
	return (
		<Spinner
			animation="border"
			role="status"
			className={cx({ [styles.blank]: blank })}
		>
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	);
};

export default Loader;

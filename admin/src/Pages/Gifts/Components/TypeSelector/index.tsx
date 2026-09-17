import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.css';

const TYPE_MAP = {
	'/gifts': 'Dárky',
	'/product-upsells': 'Upsells produktu',
	'/services': 'Služby',
};

const TypeSelector = () => {
	const pathname = useLocation().pathname;

	return (
		<div>
			<div className={styles.typeSelector}>
				{Object.entries(TYPE_MAP).map(([path, name]) => (
					<Link
						to={path}
						key={path}
						className={`${
							pathname === path
								? 'd-inline-flex btn btn-primary'
								: 'd-inline-flex btn btn-secondary'
						}`}
					>
						{name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default TypeSelector;

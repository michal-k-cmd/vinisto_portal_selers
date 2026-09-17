import { ReactNode } from 'react';

import styles from './styles.module.css';

const Empty = ({ children }: { children: ReactNode }) => {
	return <div className={styles.noProducts}>{children}</div>;
};

export default Empty;

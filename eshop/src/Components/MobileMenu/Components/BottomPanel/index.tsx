import { ReactNode } from 'react';

import styles from './styles.module.css';

/**
 * Sticky Mobile Menu Bottom Panel
 */
const MobileMenuBottomPanel = ({ children }: { children: ReactNode }) => {
	return <div className={styles.bottomPanel}>{children}</div>;
};

export default MobileMenuBottomPanel;

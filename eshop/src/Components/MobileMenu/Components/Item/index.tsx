import { IMobileMenuLinkProps } from '../Link';

import styles from './styles.module.css';

type IMobileMenuItemProps = Omit<IMobileMenuLinkProps, 'to'>;

export const MobileMenuItem = ({ children, ...rest }: IMobileMenuItemProps) => {
	return (
		<div
			className={styles?.menuItemLink}
			{...rest}
		>
			{children}
		</div>
	);
};

export default MobileMenuItem;

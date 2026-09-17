import { useLayoutContext } from '../../App/LayoutContext';

type THeaderProps = {
	title: string;
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

import styles from './style.module.css';

const Header = ({ title, children }: THeaderProps) => {
	const { headerRef } = useLayoutContext();
	return (
		<header
			className={styles.wrapper}
			id="header"
			ref={headerRef}
		>
			<h2 className={styles.title}>{title}</h2>
			{children}
		</header>
	);
};

export default Header;

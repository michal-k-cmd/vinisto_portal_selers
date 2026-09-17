'use client';

import NextLink from 'next/link';
import VinistoLogoIcon from 'Components/Icons/VinistoLogo';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

const Logo = () => {
	const isB2b = useIsB2b();
	const t = useFormatMessage();

	return (
		<NextLink
			href="/"
			className={styles.logo}
		>
			<VinistoLogoIcon
				alt={`vinisto`}
				title={`vinisto`}
				className={styles.logoIcon}
			/>
			{isB2b && (
				<span className={styles.b2bChip}>{t({ id: 'navbar.b2bChip' })}</span>
			)}
		</NextLink>
	);
};

export default Logo;

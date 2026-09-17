import NextLink from 'next/link';
import useMenuAnalytics from 'Components/Navbar/useMenuAnalytics';
import { isExternalLink } from 'vinisto_shared';

import { BlindSpotLinkProps } from './interfaces';
import styles from './styles.module.css';

const BlindSpotLink = ({ name, url }: BlindSpotLinkProps) => {
	const match = false;

	const { handleOnClickMenuItem } = useMenuAnalytics();

	return (
		<NextLink
			className={styles.blindLink}
			onClick={() => handleOnClickMenuItem(name ?? '')}
			href={url ?? ''}
			aria-current={match ? 'page' : undefined}
			{...(url && isExternalLink(url)
				? { target: '_blank', rel: 'noopener noreferrer' }
				: {})}
		/>
	);
};

export default BlindSpotLink;

import NextLink from 'next/link';
import Flag from 'Components/Flag';
import useMenuAnalytics from 'Components/Navbar/useMenuAnalytics';
import Icon from 'vinisto_ui/src/components/Icon';
import { isExternalLink } from 'vinisto_shared';

import { ICategoryLink } from './interfaces';
import styles from './styles.module.css';

const CategoryLink = ({
	name,
	url,
	flag,
	className,
	navLinkClassName,
	imageLocator,
	showImage,
}: ICategoryLink) => {
	const match = false;

	const { handleOnClickMenuItem } = useMenuAnalytics();

	const isFontAwesomeIcon = imageLocator?.includes(' ');

	const iconName = isFontAwesomeIcon ? imageLocator?.split(' ')[1] : '';
	const iconPrefix = isFontAwesomeIcon ? imageLocator?.split(' ')[0] : '';

	return (
		<NextLink
			className={navLinkClassName ?? 'nav-link'}
			onClick={() => {
				return handleOnClickMenuItem(name ?? '');
			}}
			href={url ?? ''}
			aria-current={match ? 'page' : undefined}
			{...(url && isExternalLink(url)
				? { target: '_blank', rel: 'noopener noreferrer' }
				: {})}
		>
			{showImage &&
				imageLocator &&
				(isFontAwesomeIcon ? (
					<Icon
						baseUrl={`/assets/font-awesome/${'solid'}/`}
						prefix={iconPrefix}
						name={iconName}
						className={styles.icon}
					/>
				) : (
					<img
						src={imageLocator}
						alt={name ?? ''}
						className={styles.image}
					/>
				))}
			{flag && (
				<Flag
					code={flag}
					width={23}
					height={15}
					className="vinisto-flag"
				/>
			)}
			<span className={className}>{name}</span>
		</NextLink>
	);
};

export default CategoryLink;

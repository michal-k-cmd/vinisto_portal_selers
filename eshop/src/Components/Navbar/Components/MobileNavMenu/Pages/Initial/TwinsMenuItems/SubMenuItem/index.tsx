import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MobileMenuContext } from 'Components/MobileMenu';
import Icon from 'vinisto_ui/src/components/Icon';
import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';

import styles from './styles.module.css';

interface MobileMenuLinkProps {
	childLink: MenuLink;
}

export const SubMenuItem = ({ childLink }: MobileMenuLinkProps) => {
	const { closeMenu } = useContext(MobileMenuContext);
	const router = useRouter();

	const name = childLink?.name;
	const url = childLink?.url ?? ''; // "#" causes https://github.com/vercel/next.js/discussions/75995
	const imageLocator = childLink?.imageLocator;

	const isFontAwesomeIcon = imageLocator?.includes(' ');

	const iconName = isFontAwesomeIcon ? imageLocator?.split(' ')[1] : '';
	const iconPrefix = isFontAwesomeIcon ? imageLocator?.split(' ')[0] : '';

	const handleOnClick = (url: string) => {
		router.push(url);
		closeMenu();
	};

	return (
		<button
			onClick={() => handleOnClick(url)}
			className={styles.subMenuItemLink}
		>
			<div className={styles.imgWrap}>
				{imageLocator &&
					(isFontAwesomeIcon ? (
						<Icon
							baseUrl={`/assets/font-awesome/${'solid'}/`}
							prefix={iconPrefix}
							name={iconName}
							className={styles.icon}
						/>
					) : imageLocator === '+' ? (
						<div className={styles.plusIcon}>+</div>
					) : (
						<img
							src={imageLocator}
							alt={name ?? ''}
							className={styles.image}
						/>
					))}
			</div>
			{name}
		</button>
	);
};

export default SubMenuItem;

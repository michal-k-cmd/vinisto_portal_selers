import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MobileMenuContext } from 'Components/MobileMenu';
import Icon from 'vinisto_ui/src/components/Icon';
import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';

import styles from './styles.module.css';

interface MobileMenuLinkProps {
	category: MenuLink;
	open?: boolean;
	setOpenIndex: (index: number | null) => void;
	index: number;
}

export const MobileMenuItemLink = ({
	category,
	open,
	setOpenIndex,
	index,
}: MobileMenuLinkProps) => {
	const { closeMenu } = useContext(MobileMenuContext);
	const router = useRouter();

	const name = category?.name;
	const url = category?.url ?? ''; // "#" causes https://github.com/vercel/next.js/discussions/75995
	const imageLocator = category?.imageLocator;
	const childLinks = category?.childLinks;

	const hasChilds = childLinks && childLinks?.length > 0;
	const isFontAwesomeIcon = imageLocator?.includes(' ');

	const iconName = isFontAwesomeIcon ? imageLocator?.split(' ')[1] : '';
	const iconPrefix = isFontAwesomeIcon ? imageLocator?.split(' ')[0] : '';

	const handleOnClick = () => {
		if (!hasChilds) {
			router.push(url);
			closeMenu();
		}

		if (!open) {
			setOpenIndex(index);
		} else {
			setOpenIndex(null);
		}
	};

	return (
		<button
			onClick={handleOnClick}
			className={cx(styles.menuItemLink, {
				[styles.highlighted]: url === '/sleva',
				[styles.open]: open,
			})}
		>
			{imageLocator &&
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
			{name}
		</button>
	);
};

export default MobileMenuItemLink;

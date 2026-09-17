import { useContext } from 'react';
import cx from 'classnames';
import MobileMenu from 'Components/MobileMenu';
import { LocalizationContext } from 'Services/LocalizationService';
import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';

import styles from './styles.module.css';
import SubMenuItem from './SubMenuItem';

interface MenuItemLinkProps {
	categoryLeft: MenuLink;
	categoryRight?: MenuLink;
	indexLeft: number;
	indexRight?: number;
	openIndex: number | null;
	setOpenIndex: (index: number | null) => void;
}

const TwinsMenuItems = ({
	categoryLeft,
	categoryRight,
	indexLeft,
	indexRight,
	openIndex,
	setOpenIndex,
}: MenuItemLinkProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const hasLeftChilds =
		categoryLeft.childLinks && categoryLeft.childLinks?.length > 0;
	const hasRightChilds =
		categoryRight?.childLinks && categoryRight.childLinks?.length > 0;

	return (
		<div>
			<div className={styles.mobileMenuGrid}>
				<MobileMenu.MenuItemLink
					key={'navcatleftm' + indexLeft}
					index={indexLeft}
					category={categoryLeft}
					open={openIndex === indexLeft}
					setOpenIndex={setOpenIndex}
				/>
				{categoryRight && indexRight && (
					<MobileMenu.MenuItemLink
						key={'navcatrightm' + indexRight}
						index={indexRight}
						category={categoryRight}
						open={openIndex === indexRight}
						setOpenIndex={setOpenIndex}
					/>
				)}
			</div>
			<div
				className={cx(styles.wrap, {
					[styles.open]: openIndex === indexLeft,
				})}
			>
				<div className={styles.overflow}>
					{hasLeftChilds && (
						<div className={styles.submenu}>
							<div className={styles.submenuWrap}>
								<SubMenuItem
									childLink={{
										name: t({ id: 'megamenu.showAll' }) as string,
										url: categoryLeft.url,
										imageLocator: '+',
									}}
								/>
								{categoryLeft.childLinks?.map((childLink, index) => (
									<SubMenuItem
										key={'navcatsubi' + index}
										childLink={childLink}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div
				className={cx(styles.wrap, {
					[styles.open]: openIndex === indexRight,
				})}
			>
				<div className={styles.overflow}>
					{hasRightChilds && (
						<div className={styles.submenu}>
							<div className={styles.submenuWrap}>
								<SubMenuItem
									childLink={{
										name: t({ id: 'megamenu.showAll' }) as string,
										url: categoryRight.url,
										imageLocator: '+',
									}}
								/>
								{categoryRight.childLinks?.map((childLink, index) => (
									<SubMenuItem
										key={'navcatsubiright' + index}
										childLink={childLink}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TwinsMenuItems;

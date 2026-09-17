import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';

import CategoryLink from '../CategoryLink';

import BlindSpotLink from './BlindSpotLink';
import { ICategoryLinkListMenuProps } from './interfaces';
import styles from './styles.module.css';

import './styles.css';

const CategoryLinkListMenu = ({
	sections,
	category,
	displayedCategory,
}: ICategoryLinkListMenuProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const [showAll, setShowAll] = useState<boolean[]>([]);

	useEffect(() => {
		setShowAll([]);
	}, [displayedCategory]);

	return (
		<div className="products-submenu">
			<div className={styles.megaMenuHeading}>
				{category.name}
				<CategoryLink
					navLinkClassName={styles.megaMenuCategoryLink}
					name={t({ id: 'megamenu.showAll' }) as string}
					url={category.url}
				/>
			</div>
			<div className={styles.megaMenuSubmenus}>
				{sections.map(({ name, url, imageLocator, childLinks }, index) => {
					return (
						<div
							key={'navcat' + index}
							className={cx(
								styles.megaMenuSubmenuWrap,
								childLinks?.length === 0 && styles.noSubItems,
								showAll[index] && styles.showAll
							)}
						>
							{name && (
								<CategoryLink
									name={name}
									url={url ?? ''}
									imageLocator={imageLocator}
									navLinkClassName={styles.heading}
									showImage={true}
								/>
							)}
							<ul className={styles.megaMenuSubmenu}>
								{childLinks &&
									childLinks
										.slice(0, !showAll[index] ? 5 : childLinks.length)
										.map((item, index) => {
											return (
												<li
													key={'navcatli' + item.name + index}
													className={styles.megaMenuSubmenuItem}
												>
													<CategoryLink
														navLinkClassName={styles.megaMenuSubmenuLink}
														{...item}
													/>
												</li>
											);
										})}
								{childLinks && childLinks.length > 5 && (
									<li
										className={styles.megaMenuSubmenuItem}
										key={index}
									>
										<button
											onClick={() => {
												const newShowAll = [...showAll];
												newShowAll[index] = !newShowAll[index];
												setShowAll(newShowAll);
											}}
											className={styles.showMoreButton}
										>
											{t({ id: 'megamenu.showAllCategories' })}
											<FilterDropdownArrowIcon
												className={showAll[index] ? styles.opened : undefined}
											/>
										</button>
									</li>
								)}
							</ul>
							{name && (
								<BlindSpotLink
									name={name}
									url={url ?? ''}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CategoryLinkListMenu;

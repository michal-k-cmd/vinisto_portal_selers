import { Fragment, useContext } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import MobileMenu from 'Components/MobileMenu';
import { useMobileMenu } from 'Components/MobileMenu/hooks';
import useMenuAnalytics from 'Components/Navbar/useMenuAnalytics';
import useStaticCategories from 'Components/Navbar/useStaticCategories';

import CategoryHeading from './Components/CategoryHeading';
import CategoryItem from './Components/CategoryItem';
import styles from './styles.module.css';

const MobileMenuCategoryPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { params, closeMenu } = useMobileMenu();
	const { mobileMenu } = useStaticCategories();

	const category =
		params?.id && !isNaN(parseInt(params?.id))
			? mobileMenu?.[parseInt(params?.id)]
			: null;

	const { handleOnClickMenuItem } = useMenuAnalytics();

	const handleClickMenuItem = (name: string) => {
		handleOnClickMenuItem(name);
		closeMenu();
	};

	return (
		<MobileMenu.Page
			contentClassName={styles.page}
			topPanel={{
				title: `${category?.name}`,
				to: '/',
			}}
			bottomPanelElement={
				<Link
					href={`${category?.url}`}
					onClick={closeMenu}
				>
					<button className={cx('vinisto-btn', styles.showAllBtn)}>
						{t(
							{ id: 'menu.category.showAll' },
							{ category: category?.name?.toLowerCase() }
						)}
					</button>
				</Link>
			}
		>
			{!category ? (
				`${t({
					id: 'notification.message.category.error.ObjectNotFound',
				})}`
			) : (
				<>
					{category?.childLinks?.map((subcategory, index) => (
						<Fragment key={'navcatmob' + index}>
							<CategoryHeading>
								{subcategory?.name ? subcategory?.name : category?.name}
							</CategoryHeading>
							{subcategory?.childLinks?.map((subcategoryItem, index) => (
								<CategoryItem
									key={'navcati' + index}
									name={subcategoryItem?.name ?? ''}
									url={subcategoryItem?.url ?? ''}
									//flag={subcategoryItem?.flag}
									onClick={() =>
										handleClickMenuItem(subcategoryItem?.name ?? '')
									}
								/>
							))}
						</Fragment>
					))}
				</>
			)}
		</MobileMenu.Page>
	);
};

export default MobileMenuCategoryPage;

'use client';

import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { SortingTab, SortingTabs } from 'Components/SortingTabs';
import { useQueryState } from 'nuqs';

import BreadCrumbsUserSection from '../Breadcrumbs';

import ActionsProducts from './ActionProducts';
import DiscountCoupons from './DiscountCoupons';
import { ACTION_PRODUCTS_URI_PARAM } from './constants';

interface UserSectionClubDiscountsProps {
	isBreadCrumbsUserSection?: boolean;
}

const UserSectionClubDiscounts = ({
	isBreadCrumbsUserSection = true,
}: UserSectionClubDiscountsProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const [openedTab, setOpenedTab] = useQueryState('tab');

	return (
		<>
			{isBreadCrumbsUserSection && <BreadCrumbsUserSection />}
			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'routes.user-section.club-coupons.name' })}
			</h1>
			<div>
				<SortingTabs>
					<SortingTab
						label={`${t({
							id: 'routes.user-section.club-coupons.discount-coupons',
						})}`}
						onClick={() => setOpenedTab(null)}
						isActive={openedTab !== ACTION_PRODUCTS_URI_PARAM}
					/>
					<SortingTab
						label={`${t({
							id: 'routes.user-section.club-coupons.action-products',
						})}`}
						onClick={() => setOpenedTab(ACTION_PRODUCTS_URI_PARAM)}
						isActive={openedTab === ACTION_PRODUCTS_URI_PARAM}
					/>
				</SortingTabs>
				{openedTab === ACTION_PRODUCTS_URI_PARAM ? (
					<ActionsProducts />
				) : (
					<DiscountCoupons />
				)}
			</div>
		</>
	);
};

export default UserSectionClubDiscounts;

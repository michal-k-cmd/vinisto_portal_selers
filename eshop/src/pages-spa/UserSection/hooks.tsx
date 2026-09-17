import { LocalizationContext } from 'Services/LocalizationService';
import { lazy, Suspense, useContext } from 'react';
const ActiveOrdersIcon = lazy(() => import('Components/Icons/ActiveOrders'));
const OrdersIcon = lazy(() => import('Components/Icons/Orders'));
const AddressesIcon = lazy(() => import('Components/Icons/Addresses'));
const FavoritesIcon = lazy(() => import('Components/Icons/Favorites'));
const SettingsIcon = lazy(() => import('Components/Icons/Settings'));
const VinistoEmblemIcon = lazy(() => import('Components/Icons/VinistoEmblem'));
import Loader from 'Components/View/Loader';
import ThreeBottlesIcon from 'Components/Icons/ThreeBottles';
import Star from 'Components/Icons/Star';
import Note from 'Components/Icons/Note';
import { useIsB2b } from 'Services/PlatformService';

import { UserSectionLink } from './interfaces';
import PercentIcon from './ClubDiscounts/PercentIcon/PercentIcon';
import styles from './styles.module.css';

const useUserSectionLinks = (
	isLoggedIn: boolean,
	hasVinistoPlusActive: boolean
): UserSectionLink[] => {
	const isB2b = useIsB2b();
	const t = useContext(LocalizationContext).useFormatMessage();

	if (isLoggedIn) {
		const links: UserSectionLink[] = [
			{
				route: `${t({ id: 'routes.user-section.activeOrders.route' })}`,
				name: `${t({ id: 'routes.user-section.activeOrders.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<ActiveOrdersIcon />
					</Suspense>
				),
			},
			...(isB2b
				? []
				: [
						{
							route: `${t({ id: 'routes.user-section.club-coupons.route' })}`,
							name: `${t({ id: 'routes.user-section.club-coupons.name' })}`,
							icon: (
								<Suspense fallback={<Loader blank />}>
									<PercentIcon />
								</Suspense>
							),
							flags: ['clubCoupons'],
						},
				  ]),
			{
				route: `${t({ id: 'routes.user-section.orders.route' })}`,
				name: `${t({ id: 'routes.user-section.myOrders.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<OrdersIcon />
					</Suspense>
				),
			},
			{
				route: `${t({ id: 'routes.user-section.bought-products.route' })}`,
				name: `${t({ id: 'routes.user-section.bought-products.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<ThreeBottlesIcon />
					</Suspense>
				),
			},
			{
				route: `${t({ id: 'routes.user-section.notes.route' })}`,
				name: `${t({ id: 'routes.user-section.notes.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<Note />
					</Suspense>
				),
			},
			...(isB2b
				? []
				: [
						{
							route: `${t({ id: 'routes.user-section.reviews.route' })}`,
							name: `${t({ id: 'routes.user-section.reviews.name' })}`,
							icon: (
								<Suspense fallback={<Loader blank />}>
									<Star />
								</Suspense>
							),
						},
				  ]),
			{
				route: `${t({ id: 'routes.user-section.favorites.route' })}`,
				name: `${t({ id: 'routes.user-section.favorites.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<FavoritesIcon />
					</Suspense>
				),
			},
			{
				route: `${t({ id: 'routes.user-section.addresses.route' })}`,
				name: `${t({ id: 'routes.user-section.addresses.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<AddressesIcon />
					</Suspense>
				),
			},
			{
				route: `${t({ id: 'routes.user-section.settings.route' })}`,
				name: `${t({ id: 'routes.user-section.settings.name' })}`,
				icon: (
					<Suspense fallback={<Loader blank />}>
						<SettingsIcon />
					</Suspense>
				),
			},
			...(process.env.NEXT_PUBLIC_IS_VINISTO_PLUS_ACTIVE !== 'true' || isB2b
				? []
				: [
						{
							route: `${t({ id: 'routes.user-section.vinistoplus.route' })}`,
							name: (
								<span>
									{t({ id: 'routes.user-section.vinistoplus.name' })}{' '}
									{hasVinistoPlusActive && (
										<span className={styles.activeVinistoPlus}>
											{' '}
											{t({ id: 'routes.user-section.vinistoplus.active' })}
										</span>
									)}
								</span>
							),
							icon: (
								<Suspense fallback={<Loader blank />}>
									<VinistoEmblemIcon />
								</Suspense>
							),
							highlighted: true,
						},
				  ]),
		];

		return links;
	}

	return [
		{
			route: `${t({ id: 'routes.user-section.favorites.route' })}`,
			name: `${t({ id: 'routes.user-section.favorites.name' })}`,
			icon: (
				<Suspense fallback={<Loader blank />}>
					<FavoritesIcon />
				</Suspense>
			),
		},
	];
};

export default useUserSectionLinks;

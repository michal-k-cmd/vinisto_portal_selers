'use client';

import { lazy, Suspense, useContext, useEffect, useRef } from 'react';
import cx from 'classnames';
import { DeviceServiceAction } from 'Services/DeviceService/constants';
import useIsInBasket from 'Hooks/useIsInBasket';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { NavbarContext } from 'Components/Navbar/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { UserAvatar } from 'Components/Avatar';
import Basket from 'Components/Basket';
import { FavoriteCount } from 'Components/Favorite';
import Loader from 'Components/View/Loader';
import FreeDeliveryProgressBar from 'Components/FreeDeliveryProgressBar';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { ModalContext } from 'Components/Modal/context';
import { useIsClient } from '@uidotdev/usehooks';
import useGetUserSubscriptions from 'Hooks/useGetUserSubscriptions';
import { usePlatformContext } from 'Services/PlatformService';
import { LOGIN_MODAL } from 'Components/Modal/constants';

import styles from './styles.module.css';

const BurgerMenuIcon = lazy(() => import('Components/Icons/BurgerMenu'));
const UserIcon = lazy(() => import('Components/Icons/User'));
const VinistoLogoBoldEmblemIcon = lazy(
	() => import('Components/Icons/VinistoLogoEmblemBold')
);
import './styles.css';

import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';

const BottomNavigation = () => {
	const isInAdminIframe = usePlatformContext().getIsInAdminIframe();
	const { isLoggedIn, vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		layoutWidth,
		layoutHeight,
		dispatch: deviceContextDispatch,
	} = useContext(DeviceServiceContext);
	const {
		basketPriceWithVatMinusOosPrice,
		basketState,
		minimalPriceForFreeDelivery,
		itemsQuantity,
	} = useContext(BasketContext);
	const { handleOnToggleMenu, handleOnCloseMenu, menuRef } =
		useContext(NavbarContext);
	const pathname = usePathname();
	const isClient = useIsClient();

	const { handleOpenModal } = useContext(ModalContext);

	const isInBasket = useIsInBasket(true);

	const matchCartShippingPayment = pathname.startsWith(
		`/${t({ id: 'routes.cart.shippingPayment.route' })}`
	);
	const matchCartShippingData = pathname.startsWith(
		`/${t({ id: 'routes.cart.shipping.route' })}`
	);

	const isInverted = true;

	const showBottomNavigation = !(
		matchCartShippingPayment ||
		matchCartShippingData ||
		isInAdminIframe
	);

	const openMobileMenuBtnRef = useRef<HTMLButtonElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);

	const cartTitle =
		basketPriceWithVatMinusOosPrice && basketState?.currency
			? getLocalizedPrice({
					price: basketPriceWithVatMinusOosPrice,
					currency: basketState.currency,
			  })
			: `${t({ id: 'routes.cart.name' })}`;

	useOnClickOutside([openMobileMenuBtnRef, menuRef], handleOnCloseMenu);

	const matchBundleDetail = pathname.startsWith(
		`/${t({ id: 'routes.product.route' })}`
	);

	useEffect(() => {
		deviceContextDispatch([
			DeviceServiceAction.setFooterHeight,
			footerRef.current?.clientHeight || 0,
		]);

		if (matchBundleDetail !== false) {
			return;
		}
		deviceContextDispatch([
			DeviceServiceAction.setSellerSelectionFooterHeight,
			footerRef.current?.clientHeight || 0,
		]);
	}, [
		layoutWidth,
		layoutHeight,
		minimalPriceForFreeDelivery,
		showBottomNavigation,
		matchBundleDetail,
		deviceContextDispatch,
	]);

	const userId = vinistoUser?.id;
	const userSubscriptionsQuery = useGetUserSubscriptions({
		params: { UserId: userId ?? '' },
	});

	const nonInactiveSubscription =
		userSubscriptionsQuery.data?.subscriptions?.find(
			(sub) =>
				(sub.type === SubscriptionType.Month ||
					sub.type === SubscriptionType.Year) &&
				sub.state !== SubscriptionState.Inactive
		);

	if (!showBottomNavigation) {
		return null;
	}

	return (
		<div
			className={cx(
				styles.bottomNavigation,
				{
					inverted: isInverted,
				},
				'd-print-none'
			)}
			ref={footerRef}
		>
			{!isInBasket && typeof minimalPriceForFreeDelivery === 'number' && (
				<div className={styles.freeDeliveryProgressBar}>
					<FreeDeliveryProgressBar variant="small-horizontal" />
				</div>
			)}
			<div className={styles.bottomNavigationLinks}>
				<NextLink
					href={'/'}
					className="bottom-navigation-links__link"
				>
					<Suspense fallback={<Loader blank />}>
						<VinistoLogoBoldEmblemIcon className="force-3d" />
					</Suspense>
					<span className="bottom-navigation-links__link__title">
						{t({ id: 'routes.introduction.name' })}
					</span>
				</NextLink>
				<NextLink
					href={`/${t({ id: 'routes.user-section.route' })}/${t({
						id: 'routes.user-section.favorites.route',
					})}`}
					className="bottom-navigation-links__link"
				>
					<FavoriteCount
						size="sm"
						className="force-3d"
					/>
					<span className="bottom-navigation-links__link__title">
						{t({ id: 'routes.user-section.favorites.name' })}
					</span>
				</NextLink>
				<NextLink
					href={`/${t({ id: 'routes.cart.route' })}`}
					className="bottom-navigation-links__link"
					onClick={handleOnCloseMenu}
				>
					<Basket
						showCount={itemsQuantity !== 0}
						size="sm"
						className="pb-0 force-3d"
						isNavBottom
					/>
					<span className="bottom-navigation-links__link__title">
						{cartTitle}
					</span>
				</NextLink>
				{isClient && isLoggedIn ? (
					<NextLink
						href={`/${t({ id: 'routes.user-section.route' })}`}
						className="bottom-navigation-links__link"
					>
						{isLoggedIn && (vinistoUser?.nickname || vinistoUser?.email) ? (
							<UserAvatar
								size="xs"
								fw="bold"
								className="force-3d"
								hasActiveVinistoPlusEmblem={!!nonInactiveSubscription}
							/>
						) : (
							<Suspense fallback={<Loader blank />}>
								<UserIcon className="bottom-navigation-links__link__icon" />
							</Suspense>
						)}
						<span className="bottom-navigation-links__link__title">
							{t({ id: 'navbar.labels.myVinisto' })}
						</span>
					</NextLink>
				) : (
					<button
						className="bottom-navigation-links__link"
						onClick={() => {
							handleOpenModal(LOGIN_MODAL);
						}}
					>
						<Suspense fallback={<Loader blank />}>
							<UserIcon className="bottom-navigation-links__link__icon" />
						</Suspense>
						<span className="bottom-navigation-links__link__title">
							{t({ id: 'navbar.actionButton.logIn' })}
						</span>
					</button>
				)}
				<button
					ref={openMobileMenuBtnRef}
					onClick={handleOnToggleMenu}
					className={cx(
						styles.openMobileMenuButton,
						'bottom-navigation-links__link'
					)}
				>
					<Suspense fallback={<Loader blank />}>
						<BurgerMenuIcon
							className="bottom-navigation-links__link__icon force-3d"
							id="bottom-burger"
						/>
					</Suspense>
					<span className="bottom-navigation-links__link__title">
						{t({ id: 'routes.category.name' })}
					</span>
				</button>
			</div>
		</div>
	);
};

export default BottomNavigation;

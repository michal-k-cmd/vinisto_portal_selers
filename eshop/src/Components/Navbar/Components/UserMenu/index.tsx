'use client';

import { useCallback, useContext, useRef, useState } from 'react';
import { uniqueId } from 'lodash-es';
import NextLink from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import UserIcon from 'Components/Icons/User';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { DeviceServiceContext } from 'Services/DeviceService';
import { UserAvatar } from 'Components/Avatar';
import { TEST_IDS } from 'Constants/test-ids';
import { useRouter } from 'next/navigation';
import { useIsClient } from '@uidotdev/usehooks';
import useGetUserSubscriptions from 'Hooks/useGetUserSubscriptions';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

import {
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';

const UserMenu = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		isLoggedIn,
		vinistoUser,
		handleOnLogOut: logOut,
	} = useContext(AuthenticationContext);
	const { isDesktop } = useContext(DeviceServiceContext);
	const { handleOpenModal } = useContext(ModalContext);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const [visibleDropdownMenu, setVisibleDropdownMenu] =
		useState<boolean>(false);
	const router = useRouter();
	const isB2b = useIsB2b();

	const isClient = useIsClient();

	const handleCloseDropdownMenu = useCallback(() => {
		setVisibleDropdownMenu(false);
	}, []);

	useOnClickOutside([userMenuRef], handleCloseDropdownMenu);

	const handleOpenDropdownMenu = () => {
		isDesktop && setVisibleDropdownMenu(true);
	};

	const handleOnLogOut = () => {
		logOut();
		handleCloseDropdownMenu();
	};

	const handleOpenUserSection = () => {
		if (isLoggedIn) {
			isDesktop
				? router.push(`/${t({ id: 'routes.user-section.route' })}/`)
				: setVisibleDropdownMenu((visibleDropdownMenu) => !visibleDropdownMenu);
		} else {
			handleOpenModal(LOGIN_MODAL);
		}
	};

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

	return (
		<div
			className={styles.userSectionNavLink}
			ref={userMenuRef}
		>
			<div
				onClick={handleOpenUserSection}
				onKeyDown={handleOpenUserSection}
				onFocus={handleOpenDropdownMenu}
				onMouseOver={handleOpenDropdownMenu}
				onMouseLeave={() => {
					isDesktop && handleCloseDropdownMenu();
				}}
				role="presentation"
				className={styles.wrapper}
				data-testid={TEST_IDS.USER_SECTION_DESKTOP}
			>
				{isClient &&
				isLoggedIn &&
				(vinistoUser?.nickname || vinistoUser?.email) ? (
					<UserAvatar
						size="sm"
						fw="light"
						hasActiveVinistoPlus={!!nonInactiveSubscription}
					/>
				) : (
					<UserIcon
						id={uniqueId()}
						alt={t({ id: 'alt.userSection' })}
						title={t({ id: 'alt.userSection' })}
						className={`UserIcon`}
					/>
				)}
				<span className={styles.text}>
					{isClient && isLoggedIn
						? t({ id: 'navbar.labels.myVinisto' })
						: t({ id: 'navbar.actionButton.logIn' })}
				</span>
			</div>
			{isClient && isLoggedIn && visibleDropdownMenu && (
				<div
					className="vinisto-user-section-nav-link__menu underline-effect underline-effect--vinisto"
					onMouseLeave={handleCloseDropdownMenu}
					onMouseOver={handleOpenDropdownMenu}
					onFocus={handleOpenDropdownMenu}
				>
					<ul className={styles.submenu}>
						<li>
							<NextLink
								className="underline-item"
								href={`/${t({
									id: 'routes.user-section.route',
								})}/${t({
									id: 'routes.user-section.activeOrders.route',
								})}`}
								aria-current="page"
								onClick={handleCloseDropdownMenu}
							>
								{t({ id: 'routes.user-section.activeOrders.name' })}
							</NextLink>
						</li>

						{!isB2b && (
							<li>
								<NextLink
									className="underline-item"
									href={`/${t({
										id: 'routes.user-section.route',
									})}/${t({
										id: 'routes.user-section.club-coupons.route',
									})}`}
									aria-current="page"
									onClick={handleCloseDropdownMenu}
								>
									{t({ id: 'routes.user-section.club-coupons.name' })}
								</NextLink>
							</li>
						)}

						<li>
							<NextLink
								className="underline-item"
								href={`/${t({
									id: 'routes.user-section.route',
								})}/${t({
									id: 'routes.user-section.orders.route',
								})}`}
								aria-current="page"
								onClick={handleCloseDropdownMenu}
							>
								{t({ id: 'routes.user-section.myOrders.name' })}
							</NextLink>
						</li>

						<li>
							<NextLink
								className="underline-item"
								href={`/${t({
									id: 'routes.user-section.route',
								})}/${t({
									id: 'routes.user-section.bought-products.route',
								})}`}
								aria-current="page"
								onClick={handleCloseDropdownMenu}
							>
								{t({ id: 'routes.user-section.bought-products.name' })}
							</NextLink>
						</li>

						<li>
							<NextLink
								className="underline-item"
								href={`/${t({
									id: 'routes.user-section.route',
								})}/${t({
									id: 'routes.user-section.favorites.route',
								})}`}
								aria-current="page"
								onClick={handleCloseDropdownMenu}
							>
								{t({ id: 'routes.user-section.favorites.name' })}
							</NextLink>
						</li>

						<li className={styles.divider}>
							<NextLink
								className="underline-item"
								href={`/${t({
									id: 'routes.user-section.route',
								})}/${t({
									id: 'routes.user-section.addresses.route',
								})}`}
								aria-current="page"
								onClick={handleCloseDropdownMenu}
							>
								{t({
									id: 'routes.user-section.addresses.name',
								})}
							</NextLink>
						</li>
						<li>
							<NextLink
								className="underline-item"
								href={`/${t({
									id: 'routes.user-section.route',
								})}/${t({
									id: 'routes.user-section.settings.route',
								})}`}
								aria-current="page"
								onClick={handleCloseDropdownMenu}
							>
								{t({ id: 'routes.user-section.settings.name' })}
							</NextLink>
						</li>
						{process.env.NEXT_PUBLIC_IS_VINISTO_PLUS_ACTIVE === 'true' &&
							!isB2b && (
								<li>
									<NextLink
										className="underline-item"
										href={`/${t({
											id: 'routes.user-section.route',
										})}/${t({
											id: 'routes.user-section.vinistoplus.route',
										})}`}
										aria-current="page"
										onClick={handleCloseDropdownMenu}
									>
										{t({ id: 'routes.user-section.vinistoplus.name' })}
										{!!nonInactiveSubscription && (
											<span className={styles.activeVinistoPlus}>
												{' '}
												{t({ id: 'routes.user-section.vinistoplus.active' })}
											</span>
										)}
									</NextLink>
								</li>
							)}
						<li className={styles.divider}>
							<NextLink
								onClick={handleOnLogOut}
								className="underline-item"
								href={``}
								aria-current="page"
							>
								<b>{t({ id: 'navbar.actionButton.logOut' })}</b>
							</NextLink>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default UserMenu;

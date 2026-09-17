'use client';

import { useContext, useEffect, useState } from 'react';
import Container from 'Components/View/Container';
import { BasketContext } from 'Services/BasketService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';
import { usePlatformContext } from 'Services/PlatformService';

import BasketHeader from './Components/BasketHeader';
import BasketSummary from './Components/BasketSummary';
import BasketItems from './Components/BasketItems';
import BasketTabs from './Components/BasketTabs';
import BasketShare from './Components/BasketShare';
import Coupon from './Components/Coupon';
import Gifts from './Components/Gifts';
import Packaging from './Components/Packaging';
import AvailabilityUpdateModal from './Components/AvailabilityUpdateModal';
import RecommenderCarousel from './Components/RecommenderCarousel';
import OtherPeopleBuyCarousel from './Components/OtherPeopleBuyCarousel';
//import Additionals from './Components/Additionals';
//import ExpeditionThanks from './Components/ExpeditionThanks';
import styles from './styles.module.css';
import { useBasketShare } from './hooks';
import UserBasket from './Components/UserBasket';
import GobackToShoppingButton from './Components/GoBackToShoppingButton';
import B2bPermissionMissingWarning from './Components/B2bPermissionMissingWarning';

const calculateSummaryVisibility = (
	selectedTabId: string | null,
	isDesktop: boolean,
	basketItemsQuantity: number
): boolean => {
	return selectedTabId === null && (isDesktop || basketItemsQuantity > 0);
};

interface BasketProps {
	sharedItems?: BundleIdAndQuantity[];
}

const Basket = ({ sharedItems }: BasketProps) => {
	const { getIsInAdminIframe, isB2b } = usePlatformContext();
	const { isLoggedIn, vinistoUser, basketErrorMessages } = useContext(
		AuthenticationContext
	);
	const { isDesktop } = useContext(DeviceServiceContext);
	const { basketState, isBasketFetched } = useContext(BasketContext);
	const basketItems = basketState?.items;
	const basketItemsQuantity = basketItems?.length ?? 0;

	const [selectedTabId, setSelectedTabId] = useState<string | null>(null);

	// If user log out, we need to select the default (null) tabId,
	// because anonymous user can't have user baskets
	useEffect(() => {
		if (!vinistoUser.id && selectedTabId != null) {
			setSelectedTabId(null);
		}
	}, [selectedTabId, vinistoUser.id]);

	const isPrimaryBasket = selectedTabId === null;

	const shouldShowSummary = calculateSummaryVisibility(
		selectedTabId,
		isDesktop,
		basketItemsQuantity
	);

	const shouldShowAvailabilityUpdateModal =
		basketErrorMessages.Bundle.length > 0;

	useBasketShare({
		sharedItems,
		isBasketFetched,
	});

	const isAdminIframe = getIsInAdminIframe();
	const canCreateAdminB2bOrder =
		vinistoUser.canCreateOrderAsMerchant ||
		vinistoUser.canCreateOrderAsSupport ||
		vinistoUser.canCreateOrderAsCSO;

	if (isAdminIframe && vinistoUser && !canCreateAdminB2bOrder) {
		return <B2bPermissionMissingWarning />;
	}

	return (
		<section id="content-wrapper">
			<Container className={styles.basketContainer}>
				{!isB2b && <BasketShare />}
				<div className={styles.mainBasketArea}>
					{!isAdminIframe && (
						<div className={styles.headerContainer}>
							<BasketHeader
								step="basket"
								basketItemsQuantity={basketItemsQuantity}
							/>
						</div>
					)}
					{isLoggedIn && !isAdminIframe && (
						<BasketTabs
							isSummaryDisplayed={shouldShowSummary}
							selectedTabId={selectedTabId}
							setSelectedTabId={setSelectedTabId}
						/>
					)}
					{isPrimaryBasket ? (
						<>
							<BasketItems />
							{basketItemsQuantity > 0 && !isAdminIframe && (
								<>
									{!isB2b && <Coupon />}
									<Gifts />
									{!isB2b && <Packaging />}
									{/* <Additionals /> */}
									{/* <ExpeditionThanks /> */}

									<GobackToShoppingButton className={styles.backButton} />
								</>
							)}
						</>
					) : (
						<UserBasket
							userOrSystemBasketId={selectedTabId}
							setSelectedTabId={setSelectedTabId}
						/>
					)}
					{!isDesktop && !isAdminIframe && (
						<>
							<Container>
								<RecommenderCarousel />
								<br />
							</Container>
							<Container>
								<OtherPeopleBuyCarousel />
							</Container>
						</>
					)}
				</div>

				{shouldShowSummary && <BasketSummary showFreeDeliveryProgressBar />}

				{shouldShowAvailabilityUpdateModal && <AvailabilityUpdateModal />}
			</Container>
			{isDesktop && !isB2b && (
				<>
					<Container>
						<RecommenderCarousel />
						<br />
					</Container>
					<Container>
						<OtherPeopleBuyCarousel />
					</Container>
				</>
			)}
		</section>
	);
};

export default Basket;

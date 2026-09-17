'use client';

import { useContext } from 'react';
import cx from 'classnames';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { LocalizationContext } from 'Services/LocalizationService';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import PhoneIcon from 'Components/Icons/Phone';
import MailIcon from 'Components/Icons/Mail';
import ChatDarkIcon from 'Components/Icons/ChatDark';
import useChat from 'Hooks/useChat';
import { useQuery } from '@tanstack/react-query';
import { OrderService } from 'vinisto_api_client';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import Link from 'next/link';
import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import OrderItemB2b from 'Components/OrderItem/OrderItemB2b';
import OrderItemB2c from 'Components/OrderItem/OrderItemB2c';
import useCustomerSupportContact from 'Hooks/useCustomerSupportContact';
import { useIsB2b } from 'Services/PlatformService';
import Config from 'Config';

import UserTileMenu from '../UserTileMenu';
import Header from '../Header';

import UserCarousel from './Carousel';
import styles from './styles.module.css';

import { B2B_NUMERIC_CODE } from '@/shared';

const activeOrderStates = [
	VinistoHelperDllEnumsOrderOrderState.CREATED,
	VinistoHelperDllEnumsOrderOrderState.PAID,
	VinistoHelperDllEnumsOrderOrderState.IN_WMS,
	VinistoHelperDllEnumsOrderOrderState.WMS_ACCEPTED,
	VinistoHelperDllEnumsOrderOrderState.WMS_INCOMPLETE,
	VinistoHelperDllEnumsOrderOrderState.WMS_READY,
	VinistoHelperDllEnumsOrderOrderState.SENT,
];

const UserSectionDashboard = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { vinistoUser, isLoggedIn } = useContext(AuthenticationContext);
	const { openChat } = useChat();
	const customerSupport = useCustomerSupportContact();
	const isB2b = useIsB2b();
	const businessCustomerSales = Config.market.businessCustomerSales;

	const req = {
		UserLoginHash: vinistoUser.loginHash,
		OrderStates: activeOrderStates,
		IsSortingDescending: true,
		UserIds: vinistoUser.id,
	};

	const activeOrdersQueryKey = ['userActiveOrders', req];

	const { data, isLoading, isError } = useQuery(activeOrdersQueryKey, {
		queryFn: async () => OrderService.getOrderList(req),
		enabled: isLoggedIn,
	});

	if (isLoading || isError) {
		return null;
	}

	return (
		<>
			<Header />
			<UserTileMenu />
			<ContainerFullWidth>
				<h2 className={userSectionStyles.userSectionHeader}>
					{t({ id: 'userSection.dashboard.activeOrders' })}
				</h2>
				<div className="mb-4">
					{data.length === 0 ? (
						<div className={styles.noOrders}>
							V tuto chvíli nemáte žádné probíhající objednávky
						</div>
					) : (
						data.map((order, i) => {
							const isB2bOrder = order.platformId === B2B_NUMERIC_CODE;

							return isB2bOrder ? (
								<OrderItemB2b
									key={'usbdash' + i + order.id}
									// TODO handle this better (it's impossible to be true now)
									isLoading={isLoading}
									order={order}
									orderNumberAsLink={false}
								/>
							) : (
								<OrderItemB2c
									key={'usbdash' + i + order.id}
									// TODO handle this better (it's impossible to be true now)
									isLoading={isLoading}
									order={order}
									orderNumberAsLink={false}
								/>
							);
						})
					)}
				</div>
				<h2 className={userSectionStyles.userSectionHeader}>
					{t({ id: 'userSection.dashboard.carouselHeading' })}
					<Link
						href="/stitek/pro-cleny"
						className={styles.linkAll}
					>
						{t({ id: 'userSection.dashboard.showAll' })}
					</Link>
				</h2>
				<UserCarousel />
				<h2
					className={cx(
						userSectionStyles.userSectionHeader,
						styles.contactsHeader
					)}
				>
					{t({ id: 'userSection.dashboard.weAreHereForYou' })}
				</h2>
				<div className={styles.contactsGrid}>
					<a
						href={`tel:${customerSupport.phone}`}
						className={styles.contact}
					>
						<div className={styles.icon}>
							<PhoneIcon />
						</div>
						<div className={styles.heading}>
							{t({ id: 'userSection.dashboard.customerPhone' })}:
						</div>
						<div className={styles.value}>
							{formatPhoneNumber(customerSupport.phone)}
						</div>
					</a>
					<a
						href={`mailto:${customerSupport.email}`}
						className={styles.contact}
					>
						<div className={styles.icon}>
							<MailIcon />
						</div>
						<div className={styles.heading}>
							{t({ id: 'userSection.dashboard.email' })}:
						</div>
						<div className={styles.value}>{customerSupport.email}</div>
					</a>
					<button
						className={styles.contact}
						onClick={() => {
							openChat();
						}}
					>
						<div className={styles.icon}>
							<ChatDarkIcon />
						</div>

						<div className={styles.heading}>
							{t({ id: 'userSection.dashboard.chat' })}:
						</div>
						<div className={styles.value}>
							{t({ id: 'userSection.dashboard.writeUs' })}
						</div>
					</button>
					{isB2b && (
						<div className={styles.contact}>
							<div className={styles.icon}>
								<PhoneIcon />
							</div>
							<div className={styles.heading}>
								{t({ id: 'footer.b2b.salesDepartment' })}:
							</div>
							<div className={styles.salesValues}>
								<a href={`tel:${businessCustomerSales.phone}`}>
									{formatPhoneNumber(businessCustomerSales.phone)}
								</a>
								<a href={`mailto:${businessCustomerSales.email}`}>
									{businessCustomerSales.email}
								</a>
							</div>
						</div>
					)}
				</div>
			</ContainerFullWidth>
		</>
	);
};

export default UserSectionDashboard;

import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DocumentHeaderAction } from 'Components/DocumentHeader/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { DocumentHeaderContext } from 'Components/DocumentHeader/context';
import { DeviceServiceContext } from 'Services/DeviceService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { getPdfDocument, openPdf } from 'pages-spa/UserSection/Orders/helpers';
import { VinistoOrderDllModelsApiReturnDataOrderReturn } from 'vinisto_api_client/src/api-types/order-api';
import api from 'vinisto_api_client/src/api';
// import { orderAdapter } from 'vinisto_api_client/src/index';
// import { Order as OrderType } from 'vinisto_api_client/src/domain/order';

import BreadCrumbsUserSection from '../Breadcrumbs';

import Order from './Order';

interface OrderDetailProps {
	orderId: string;
}

const OrderDetail = ({ orderId }: OrderDetailProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { dispatch } = useContext(DocumentHeaderContext);
	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	const t = useFormatMessage();

	const userLoginHash = vinistoUser.loginHash ?? '';

	const { data: orderData, isLoading } = useQuery(
		['order-detail', orderId, userLoginHash],
		() =>
			api
				.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
					`order-api/orders/${orderId}`,
					{
						UserLoginHash: userLoginHash,
					}
				)
				.then((response) => {
					return response.order ?? null;
					//	return response.order ? orderAdapter.fromApi(response.order) : null;
				})
	);

	useEffect(() => {
		dispatch({
			type: DocumentHeaderAction.setTitle,
			value: `${t(
				{ id: 'app.title.page' },
				{ title: `${t({ id: 'routes.user-section.orders.name' })}` }
			)}`,
		});
	}, []);

	const handleOnClickInvoice =
		(orderId: string, documentUrl: string) => async () => {
			const userLoginHash = vinistoUser.loginHash ?? '';
			try {
				const encodedPdfContent = await getPdfDocument(
					orderId,
					documentUrl,
					userLoginHash
				);
				openPdf(encodedPdfContent as string);
			} catch {
				handleShowErrorNotification('userSection.order.invoice.loadError');
			}
		};

	return (
		<>
			<BreadCrumbsUserSection
				subpageTitle="routes.user-section.myOrders.name"
				subpageLink={`/${t({ id: 'routes.user-section.route' })}/${t({
					id: 'routes.user-section.orders.route',
				})}`}
			/>

			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'userSection.order.btn.detail' })}{' '}
				{((isMobile || isTablet) && orderData?.orderNumber) ?? ''}
			</h1>

			<div>
				{/* TODO Handle order loading error - now it's just an empty page with header */}
				{isLoading && (
					<Order
						isLoading={true}
						order={null}
						handleOnClickInvoice={handleOnClickInvoice}
					/>
				)}
				{orderData && (
					<Order
						isLoading={false}
						order={orderData}
						handleOnClickInvoice={handleOnClickInvoice}
					/>
				)}
			</div>
		</>
	);
};

export default OrderDetail;

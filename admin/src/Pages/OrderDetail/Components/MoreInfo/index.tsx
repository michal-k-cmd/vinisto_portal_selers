import Detail from 'Components/Detail';
import {
	VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderUtmParameters,
	VinistoOrderDllModelsApiReturnDataInvoicesReturn,
} from 'vinisto_api_client/src/api-types/order-api/';
import { Fragment, useContext, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { getFilenameFromPath } from 'Pages/OrderDetail/helpers';
import { TEST_IDS } from 'Constants/test-ids';
import { Modal } from 'Components/Modal';
import { Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { OrderService } from 'vinisto_api_client';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import DeleteIcon from 'Components/Icons/Delete';
import { NotificationsContext } from 'Services/NotificationService';
import { confirmAlert } from 'react-confirm-alert';

import UTMParametersList from '../UTMParametersList';
import OrderMarketingDetails from '../MarketingDetails';
import DocumentUpload from '../DocumentUpload';

import api from '@/api';
import { VinistoHelperDllEnumsUserUserRights } from '@/api-types/user-api';

interface OrderMoreInfoProps {
	orderId: string;
	note: string | null | undefined;
	handleEditInternalNote: (note: string) => void;
	utmParameters: VinistoOrderDllModelsApiOrderUtmParameters | undefined;
	discountCoupons:
		| (
				| VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition
		  )[]
		| undefined;
	handleGetPdf: (documentUrl: string) => void;
}

const OrderMoreInfo = ({
	orderId,
	note,
	handleEditInternalNote,
	utmParameters,
	discountCoupons,
	handleGetPdf,
}: OrderMoreInfoProps) => {
	const { loginHash: userLoginHash, permissions } = useContext(
		AuthenticationContext
	).vinistoUser;

	const { handleShowSuccessNotification } = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const [isMarketingDetailModalOpen, setIsMarketingDetailModalOpen] =
		useState(false);
	const [isUploadDocumentModalOpen, setIsUploadDocumentModalOpen] =
		useState(false);

	const params = {
		orderId,
		UserLoginHash: userLoginHash,
	};

	const orderInvoicesQuery = useQuery({
		queryKey: ['orderInvoices', orderId, { userLoginHash }],
		queryFn: () =>
			api.get<VinistoOrderDllModelsApiReturnDataInvoicesReturn>(
				`order-api/invoices/order/${orderId}/get-invoices`,
				{ UserLoginHash: userLoginHash }
			),
	});

	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ['order', params],
		queryFn: async () => OrderService.getOrderDocuments(params),
	});

	const handleClickDocumentUrl = async (
		documentId: string,
		fileName: string
	) => {
		try {
			const file = await OrderService.getOrderDocument(
				{
					documentId,
					orderId,
					UserLoginHash: userLoginHash,
				},
				fileName
			);

			const url = window.URL.createObjectURL(file);
			const a = document.createElement('a');
			a.href = url;
			a.download = file.name || `OrderDocument_${documentId}`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to download the document', error);
		}
	};

	const handleClickDelete = async (documentId: string) => {
		confirmAlert({
			title: `${t({ id: 'orderDetail.deleteDocument.confirm.title' })}`,
			message: `${t({ id: 'orderDetail.deleteDocument.confirm.message' })}`,
			buttons: [
				{
					label: `${t({ id: 'admin.confirm.yes' })}`,
					onClick: async () => {
						await handleDeleteDocument(documentId);
					},
				},
				{
					label: `${t({ id: 'admin.confirm.no' })}`,
					onClick: () => undefined,
				},
			],
		});
	};

	const handleDeleteDocument = async (documentId: string) => {
		await OrderService.deleteOrderDocument({
			documentId,
			orderId,
			UserLoginHash: userLoginHash,
		}).then(() => {
			handleShowSuccessNotification('orderDetail.deleteDocument.success');
			refetch();
		});
	};

	const hasOrderDocumentsChangePermission = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER
	);

	return (
		<Detail.Container>
			<Detail.Heading value={`${t({ id: 'orderDetail.moreInfo.title' })}`} />
			<Detail.Columns>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.documents' })} />
					{orderInvoicesQuery.data?.invoices?.map((invoice) => (
						<Detail.InfoWithLabel
							key={invoice.id}
							label={t({ id: `admin.billing.${invoice.type}` })}
							value={
								invoice.path ? (
									<Detail.Link onClick={() => handleGetPdf(`${invoice.path}`)}>
										{getFilenameFromPath(invoice.path)}
									</Detail.Link>
								) : null
							}
						/>
					))}
				</div>
				<div>
					<Detail.Subheading
						value={
							<MarketingInfoSubheading
								onClick={() => setIsMarketingDetailModalOpen(true)}
							/>
						}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.campaign' })}
						value={<UTMParametersList data={utmParameters} />}
						fallbackOrHide={false}
					/>
					<Detail.InfoWithLabel
						label={t({ id: 'orderDetail.discountCoupon' })}
						value={discountCoupons?.map((discountCoupon, key) => (
							<Fragment key={key}>
								<span>{discountCoupon?.code}</span>
								<br />
							</Fragment>
						))}
					/>
				</div>
				<div>
					<Detail.Textarea
						label={<Detail.Subheading value={t({ id: 'orderDetail.note' })} />}
						value={note ?? ''}
						onSave={handleEditInternalNote}
						data-testid={TEST_IDS.ORDER_DETAIL_NOTE}
					/>
				</div>
				<div>
					<Detail.Subheading value={t({ id: 'orderDetail.documents' })} />
					{!isLoading && !isError && data?.internalDocuments ? (
						<Detail.InfoWithLabel
							value={data.internalDocuments.map((document) => (
								<div key={document.id}>
									<div className="d-flex gap-2 align-items-center">
										<Detail.Link
											onClick={() =>
												handleClickDocumentUrl(
													document.id,
													document.originalFileName
												)
											}
										>
											{document.originalFileName}
										</Detail.Link>
										{hasOrderDocumentsChangePermission && (
											<DeleteIcon
												className="pointer"
												onClick={() => handleClickDelete(document.id)}
											/>
										)}
									</div>
								</div>
							))}
						/>
					) : null}
				</div>
			</Detail.Columns>
			{hasOrderDocumentsChangePermission && (
				<Button onClick={() => setIsUploadDocumentModalOpen(true)}>
					{t({ id: 'orderDetail.uploadDocument' })?.toString()}
				</Button>
			)}
			<Modal
				title={t({ id: 'orderDetail.marketingInfo' })?.toString()}
				show={isMarketingDetailModalOpen}
				handleClose={() => setIsMarketingDetailModalOpen(false)}
			>
				<OrderMarketingDetails
					utmParameters={utmParameters}
					discountCoupons={discountCoupons}
				/>
			</Modal>
			<Modal
				title={t({ id: 'orderDetail.uploadDocument' })?.toString()}
				show={isUploadDocumentModalOpen}
				handleClose={() => setIsUploadDocumentModalOpen(false)}
			>
				<DocumentUpload
					orderId={orderId}
					onSubmit={() => {
						setIsUploadDocumentModalOpen(false);
						handleShowSuccessNotification('orderDetail.uploadDocument.success');
						refetch();
					}}
				/>
			</Modal>
		</Detail.Container>
	);
};

export default OrderMoreInfo;

const MarketingInfoSubheading = ({ onClick }: { onClick: () => void }) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div
			style={{
				display: 'flex',
				gap: '0.5em',
			}}
		>
			{t({ id: 'orderDetail.marketingInfo' })}
			<Detail.Link onClick={onClick}>{t({ id: 'view' })}</Detail.Link>
		</div>
	);
};

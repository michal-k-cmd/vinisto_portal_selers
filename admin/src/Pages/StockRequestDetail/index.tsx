import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import {
	VinistoHelperDllEnumsStockingRequestDeliveryType,
	VinistoHelperDllEnumsStockingRequestStockingState,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
} from 'vinisto_api_client/src/api-types/supplier-api/';
import { transportMethodTranslationKeys } from 'Pages/StockRequestList/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { ModalContext } from 'Components/Modal/context';
import {
	ADD_BUNDLE_TO_REQUEST,
	COMPLETE_RECEIPT,
	CONFIRM_STOCK_REQUEST_FOR_SUPPLIER,
	STOCK_REQUEST_ADD_TRANSPORT,
	UPLOAD_RECEIPT_FOR_CLOSED_REQUEST,
} from 'Components/Modal/constants';
import AdminDetail from 'Components/AdminDetail';
import StockRequestPrint from 'Components/StockRequestPrint';
import Detail from 'Components/Detail';

import AssignedBundleList from './AssignedBundleList';
import './styles.css';
import ErrorLog from './ErrorLog';

const StockRequestDetailPage = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const navigate = useNavigate();

	const { id: stockRequestId } = useParams<{ id: string }>();

	if (!stockRequestId) throw new Error('Stock request id is not provided');

	const [refetchKey, setRefetchKey] = useState(0);
	const [stockRequest, setStockRequest] =
		useState<VinistoStockingRequestDllModelsApiStockingRequestStockingRequest | null>(
			null
		);

	const stockRequestState = stockRequest?.stockingState;
	const isVinistoDelivery =
		stockRequest?.deliveryType ===
		VinistoHelperDllEnumsStockingRequestDeliveryType.VINISTO_DELIVERY;

	useEffect(() => {
		const req = [
			{
				key: 'UserLoginHash',
				value: loginHash,
			},
		];

		StockingRequestService.getById(stockRequestId, req)
			.then((res) => {
				if (!res.stockingRequest) {
					notificationsContext.handleShowErrorNotification(
						'admin.stockRequestDetail.error'
					);
					return;
				}

				setStockRequest(res.stockingRequest);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestDetail.error'
				);
			});
	}, [loginHash, notificationsContext, stockRequestId, refetchKey]);

	if (!stockRequest) {
		return null;
	}

	const handleClickDelete = () => {
		StockingRequestService.remove(stockRequestId, [
			{ key: 'UserLoginHash', value: loginHash },
		])
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.stockRequestDetail.deleteSuccess'
				);
				navigate('/stock-request-list');
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestDetail.deleteError'
				);
			});
	};

	const handleClickCancel = () => {
		const request = {
			userLoginHash: loginHash,
		};

		StockingRequestService.cancel(stockRequestId, request)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.stockRequestDetail.cancelSuccess'
				);
				setRefetchKey((prev) => prev + 1);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestDetail.cancelError'
				);
			});
	};

	const handleClickSendToSupplier = () => {
		const request = {
			userLoginHash: loginHash,
		};

		StockingRequestService.sendToSupplier(stockRequestId, request)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.stockRequestDetail.sendSuccess'
				);
				setRefetchKey((prev) => prev + 1);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestDetail.sendError'
				);
			});
	};

	const handleResendToSupplier = () => {
		StockingRequestService.sendStockingRequestToSupplierAgain(stockRequestId, {
			userLoginHash: loginHash,
		})
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.stockRequestDetail.resendSuccess'
				);
				setRefetchKey((prev) => prev + 1);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestDetail.resendError'
				);
			});
	};

	const handleSaveAdminNote = async (newNote: string) => {
		try {
			await StockingRequestService.updateAdminNote(stockRequestId, {
				userLoginHash: loginHash,
				adminNote: newNote ?? null,
			});
			notificationsContext.handleShowSuccessNotification(
				'admin.stockRequestDetail.updateAdminNote.success'
			);
			setRefetchKey((prev) => prev + 1);
		} catch {
			notificationsContext.handleShowErrorNotification(
				'admin.stockRequestDetail.updateAdminNote.error'
			);
		}
	};

	const stockRequestDetailSchema = [
		{
			label: 'admin.stockRequestDetail.requestNumber.label',
			value: stockRequest.requestNumber,
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.supplier.label',
			value: stockRequest.supplier?.nameWeb,
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.deliveryType.label',
			value: t({
				id:
					stockRequest.deliveryType &&
					transportMethodTranslationKeys[stockRequest.deliveryType],
			}),
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.sentToSupplier.label',
			value: stockRequest.isSent,
			type: 'boolean',
		},
		{
			label: 'admin.stockRequestDetail.createDate.label',
			value:
				stockRequest.createdAt &&
				dayjs
					.unix(stockRequest.createdAt)
					.format(`${t({ id: 'admin.dateFormat' })}`),
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.confirmedBySupplier.label',
			value: stockRequest.isConfirmed,
			type: 'boolean',
		},
		{
			label: 'admin.stockRequestDetail.expectedDeliveryDate.label',
			value:
				stockRequest.deliveryDate &&
				dayjs
					.unix(stockRequest.deliveryDate)
					.format(`${t({ id: 'admin.dateFormat' })}`),
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.transport.label',
			value: `${getLocalizedValue(stockRequest.delivery?.name ?? [])}
      /
      ${stockRequest.trackingNumber ?? ''}`,
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.isStockedInWms.label',
			value: stockRequest.isStocked,
			type: 'boolean',
		},
		{
			label: 'admin.stockRequestDetail.stockingDate.label',
			value:
				stockRequest.stockingDate &&
				dayjs
					.unix(stockRequest.stockingDate)
					.format(`${t({ id: 'admin.dateFormat' })}`),
			type: null,
		},
		{
			label: 'admin.stockRequestDetail.AcceptProtocol.label',
			value:
				stockRequest.stockingState ===
				VinistoHelperDllEnumsStockingRequestStockingState.WMS_STOCKED ? (
					<a
						href={StockingRequestService.getPdfDownloadLink(
							stockRequest.id ?? '',
							loginHash
						)}
					>
						<img
							src={'/assets/images/pdf.svg'}
							alt={`${t({
								id: 'admin.stockRequestDetail.AcceptProtocol.icon.alt',
							})}`}
							className="stockrequest-protocol-icon"
						/>
					</a>
				) : (
					'-'
				),
		},
		{
			label: 'admin.stockRequestDetail.adminNote',
			value: (
				<Detail.Textarea
					label={''}
					value={stockRequest.adminNote ?? ''}
					onSave={handleSaveAdminNote}
					data-testid="stock-request-admin-note"
				/>
			),
			type: null,
		},
	].filter((item) => {
		const valuesToExclude: string[] = [];
		if (!isVinistoDelivery) {
			valuesToExclude.push('admin.stockRequestDetail.transport.label');
		}
		if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.CREATED
		) {
			valuesToExclude.push(
				'admin.stockRequestDetail.createDate.label',
				'admin.stockRequestDetail.confirmedBySupplier.label',
				'admin.stockRequestDetail.expectedDeliveryDate.label',
				'admin.stockRequestDetail.isStockedInWms.label',
				'admin.stockRequestDetail.stockingDate.label',
				'admin.stockRequestDetail.AcceptProtocol.label',
				'admin.stockRequestDetail.transport.label'
			);
		}

		return !valuesToExclude.includes(item.label);
	});

	const actionButtonsSchema = [
		{
			rowId: 'Actions',
			items: [
				{
					label: 'admin.btn.addBundle',
					onClick: () => {
						modalContext.handleOpenModal(ADD_BUNDLE_TO_REQUEST, {
							stockRequestId,
							setRefetchKey,
							supplierId: stockRequest.supplierId,
						});
					},
					icon: undefined,
				},
				{
					label: 'admin.btn.addTransport.label',
					onClick: () => {
						modalContext.handleOpenModal(STOCK_REQUEST_ADD_TRANSPORT, {
							stockRequestId,
							setRefetchKey,
						});
					},
				},
				{
					label: 'admin.btn.changeTransport.label',
					onClick: () => {
						modalContext.handleOpenModal(STOCK_REQUEST_ADD_TRANSPORT, {
							stockRequestId,
							setRefetchKey,
							trackingNumber: stockRequest.trackingNumber,
							delivery: stockRequest.delivery,
						});
					},
				},
				{
					label: 'admin.btn.deleteRequest.label',
					onClick: () => handleClickDelete(),
				},
				{
					label: 'admin.btn.sendRequestToSupplier.label',
					onClick: () => handleClickSendToSupplier(),
				},
				{
					label: 'admin.btn.printRequest.label',
					onClick: () => window.print(),
				},
				{
					label: 'admin.btn.confirmForSupplier.label',
					onClick: () =>
						modalContext.handleOpenModal(CONFIRM_STOCK_REQUEST_FOR_SUPPLIER, {
							stockRequestId,
							setRefetchKey,
						}),
				},
				{
					label: 'admin.btn.resendToSupplier.label',
					onClick: () => handleResendToSupplier(),
				},
				{
					label: 'admin.btn.cancelRequest.label',
					onClick: () => handleClickCancel(),
				},
				{
					label: 'admin.btn.refreshInWms.label',
					onClick: () =>
						StockingRequestService.updateWms(stockRequestId, {
							userLoginHash: loginHash,
						}),
				},
				{
					label: 'admin.btn.finishRequest.label',
					onClick: () =>
						modalContext.handleOpenModal(COMPLETE_RECEIPT, {
							stockRequestId,
							setRefetchKey,
							assignedBundles: stockRequest.bundles,
							bundleDetails: stockRequest.bundleDetails,
						}),
				},
				{
					label: 'admin.btn.uploadReceiptForClosedRequest.label',
					onClick: () =>
						modalContext.handleOpenModal(UPLOAD_RECEIPT_FOR_CLOSED_REQUEST, {
							stockRequestId,
							setRefetchKey,
						}),
				},
				{
					label: 'admin.btn.back',
					onClick: () => navigate(-1),
				},
			],
		},
	].map((item) => {
		let labelsToInclude: string[] = [];

		if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.CREATED
		) {
			labelsToInclude = [
				'admin.btn.addBundle',
				'admin.btn.deleteRequest.label',
			];

			if (stockRequest.bundles && stockRequest.bundles.length > 0) {
				labelsToInclude.push(
					'admin.btn.sendRequestToSupplier.label',
					'admin.btn.printRequest.label'
				);
			}
		} else if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.SENT
		) {
			labelsToInclude = [
				'admin.btn.addBundle',
				'admin.btn.cancelRequest.label',
				'admin.btn.confirmForSupplier.label',
				'admin.btn.printRequest.label',
				'admin.btn.resendToSupplier.label',
			];
		} else if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.CONFIRMED
		) {
			labelsToInclude = [
				'admin.btn.addBundle',
				'admin.btn.cancelRequest.label',
				'admin.btn.refreshInWms.label',
				'admin.btn.printRequest.label',
			];

			if (isVinistoDelivery) {
				labelsToInclude.push('admin.btn.addTransport.label');
			}
		} else if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.DELIVERY_ORDERED
		) {
			labelsToInclude = [
				'admin.btn.addBundle',
				'admin.btn.changeTransport.label',
				'admin.btn.cancelRequest.label',
				'admin.btn.refreshInWms.label',
				'admin.btn.printRequest.label',
			];
		} else if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.SENT_WMS
		) {
			labelsToInclude = [
				'admin.btn.addBundle',
				'admin.btn.cancelRequest.label',
				'admin.btn.refreshInWms.label',
				'admin.btn.printRequest.label',
			];

			if (isVinistoDelivery) {
				labelsToInclude.push('admin.btn.addTransport.label');
			}
		} else if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.WMS_DELIVERED
		) {
			labelsToInclude = [
				'admin.btn.finishRequest.label',
				'admin.btn.printRequest.label',
			];
		} else if (
			stockRequestState ===
			VinistoHelperDllEnumsStockingRequestStockingState.WMS_STOCKED
		) {
			labelsToInclude = [
				'admin.btn.uploadReceiptForClosedRequest.label',
				'admin.btn.printRequest.label',
			];
		}

		labelsToInclude.push('admin.btn.back');

		return {
			...item,
			items: item.items.filter((action) =>
				labelsToInclude.includes(action.label)
			),
		};
	});

	return (
		<>
			<AdminDetail
				className="d-print-none"
				detailSchema={stockRequestDetailSchema}
				actionButtonsSchema={actionButtonsSchema}
				customComponentRender={() => (
					<div>
						<AssignedBundleList
							stockingRequest={stockRequest}
							stockRequestId={stockRequestId}
							setRefetchKey={setRefetchKey}
						/>
						<ErrorLog stockRequest={stockRequest} />
					</div>
				)}
			/>
			<StockRequestPrint stockRequest={stockRequest} />
		</>
	);
};

export default StockRequestDetailPage;

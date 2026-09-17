import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { apiServiceInstance } from 'Services/ApiService';
import AdminDetail from 'Components/AdminDetail';
import {
	MdAspectRatio,
	MdCategory,
	MdClose,
	MdKeyboardBackspace,
	MdOutlineDelete,
	MdProductionQuantityLimits,
} from 'react-icons/md';
import { RiBarcodeBoxLine, RiCalendarEventFill } from 'react-icons/ri';
import { FaCheck, FaPercentage } from 'react-icons/fa';
import { GrValidate } from 'react-icons/gr';
import { VinistoSupplierDllModelsApiFeeRecordFeeRecordReturn } from 'vinisto_api_client/src/api-types/supplier-api';
import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	VinistoOrderDllModelsApiReturnDataBillingReturn,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
} from 'vinisto_api_client/src/api-types/order-api';

import { feeRecordTypeTranslationMap } from './constants';

const FeeRecordDetailPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();
	const history = useNavigate();
	const { id: feeRecordId } = useParams();

	const localize = useLocalizedValue();

	const { data, isLoading, isError } = useQuery({
		queryKey: ['feeRecord', feeRecordId],
		queryFn: async () =>
			await apiServiceInstance.get<VinistoSupplierDllModelsApiFeeRecordFeeRecordReturn>(
				'supplier-api/fee-records/' + feeRecordId,
				undefined,
				undefined,
				[
					{
						key: 'userLoginHash',
						value: authenticationContext.vinistoUser.loginHash,
					},
				]
			),
	});

	const orderId = data?.feeRecord?.orderId;
	const billingId = data?.feeRecord?.billingId;

	const { data: orderData } = useQuery({
		queryKey: ['order', orderId],
		queryFn: async () =>
			await apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
				`order-api/orders/${orderId}`,
				undefined,
				undefined,
				[
					{
						key: 'userLoginHash',
						value: authenticationContext.vinistoUser.loginHash,
					},
				]
			),
		enabled: Boolean(orderId),
	});

	const { data: billingData } = useQuery({
		queryKey: ['billing', billingId],
		queryFn: async () =>
			await apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataBillingReturn>(
				`order-api/billings/${billingId}`,
				undefined,
				undefined,
				[
					{
						key: 'userLoginHash',
						value: authenticationContext.vinistoUser.loginHash,
					},
				]
			),
		enabled: billingId !== null,
	});

	const billingNumber = billingData?.billing?.billingNumber;
	const orderNumber = orderData?.order?.orderNumber;

	const feeRecordData = data?.feeRecord;
	const isPaidOut = feeRecordData?.isPaidOut ?? false;

	const isSupplierdiscount = feeRecordData?.isSupplierDiscount;

	const detailSchema = [
		{
			icon: RiBarcodeBoxLine,
			label: 'admin.feeRecord.identifier.label',
			value: feeRecordData?.id,
			type: null,
		},
		{
			icon: RiBarcodeBoxLine,
			label: 'feeRecord.supplier.label',
			value: (
				<Link to={`/supplier-detail/${feeRecordData?.supplierId}`}>
					{feeRecordData?.supplier.nameWeb}
				</Link>
			),
			type: null,
		},
		{
			icon: RiBarcodeBoxLine,
			label: 'feeRecord.bundle.label',
			value: (
				<Link to={`/bundle-detail/${feeRecordData?.bundleId}`}>
					{localize(feeRecordData?.bundle.name)}
				</Link>
			),
			type: null,
		},
		{
			icon: RiBarcodeBoxLine,
			label: 'feeRecord.order.label',
			value: orderNumber ? (
				<Link to={`/order-detail/${feeRecordData?.orderId}`}>
					{orderNumber}
				</Link>
			) : (
				'-'
			),
			type: null,
		},
		{
			icon: RiBarcodeBoxLine,
			label: 'feeRecord.order.externalId',
			value: feeRecordData?.externalOrderId,
			type: null,
		},
		{
			icon: RiCalendarEventFill,
			label: 'admin.feeRecord.time.label',
			value: feeRecordData?.createdAt
				? dayjs.unix(feeRecordData?.createdAt).format('DD.MM.YYYY HH:mm')
				: '',
			type: null,
		},
		{
			icon: MdCategory,
			label: 'admin.feeRecord.type.label',
			value:
				feeRecordData?.type &&
				t({ id: feeRecordTypeTranslationMap[feeRecordData?.type] }),
			type: null,
		},
		{
			icon: MdProductionQuantityLimits,
			label: 'admin.feeRecord.itemPrice.label',
			value: (
				<>
					{t(
						{ id: 'admin.feeRecord.itemPrice.withoutVat' },
						{
							value: isSupplierdiscount
								? Number(feeRecordData?.itemPrice?.value ?? 0).toFixed(2)
								: Number(feeRecordData?.originalPrice?.value ?? 0).toFixed(2),
							currency: feeRecordData?.itemPrice?.currency,
						}
					)}
					<br />
					{t(
						{ id: 'admin.feeRecord.itemPrice.withVat' },
						{
							value: isSupplierdiscount
								? Number(feeRecordData?.itemPrice?.valueWithVat ?? 0).toFixed(2)
								: Number(
										feeRecordData?.originalPrice?.valueWithVat ?? 0
								  ).toFixed(2),
							currency: feeRecordData?.itemPrice?.currency,
						}
					)}
				</>
			),
			type: null,
		},
		{
			icon: FaPercentage,
			label: 'admin.feeRecord.feePercentage.label',
			value: feeRecordData?.feePercentage + '%',
			type: null,
		},
		{
			icon: MdAspectRatio,
			label: 'admin.feeRecord.vinistoFeeValue.label',
			value:
				Number(feeRecordData?.vinistoFeeValue ?? 0).toFixed(2) +
				' ' +
				feeRecordData?.itemPrice.currency,
			type: null,
		},
		{
			icon: MdAspectRatio,
			label: 'admin.feeRecord.supplierYieldValue.label',
			value:
				Number(feeRecordData?.itemPrice.value).toFixed(2) +
				' ' +
				feeRecordData?.itemPrice.currency,
			type: null,
		},
		{
			icon: GrValidate,
			label: 'admin.feeRecord.isPaidOut.label',
			value: isPaidOut ? (
				<div className="d-flex align-items-center gap-2">
					<FaCheck />
					{
						<Link to="billing-detail/feeRecordData?.billingId">
							{billingNumber}
						</Link>
					}
				</div>
			) : (
				<MdClose />
			),
			type: null,
		},
	];

	const actionButtonsSchema = [
		{
			rowId: 'FEE_RECORD_1',
			items: [
				{
					label: 'admin.btn.deleteFeeRecord',
					key: 'deleteFeeRecords',
					disabled: isLoading || isError,
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.deleteFeeRecord.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.deleteFeeRecord.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.deleteFeeRecord.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(`supplier-api/fee-records`, feeRecordId, true, [
												{
													key: 'userLoginHash',
													value: authenticationContext.vinistoUser.loginHash,
												},
											])
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.deleteFeeRecord.success'
												);
												history(`/fee-record-list`);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.deleteFeeRecord.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.deleteFeeRecord.no',
									})}`,
									onClick: () => null,
								},
							],
						});
					},
					icon: MdOutlineDelete,
				},
				{
					label: 'admin.btn.back',
					onClick: () => {
						history(-1);
					},
					icon: MdKeyboardBackspace,
				},
			],
		},
	];

	return <AdminDetail {...{ detailSchema, actionButtonsSchema }} />;
};

export default FeeRecordDetailPage;

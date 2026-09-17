import { useCallback, useContext, useEffect, useMemo } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { TopBarButton, TopBarItem } from 'Components/TopBar/interfaces';
import { ModalType } from 'Components/Modal/constants';
import {
	STOCK_REQUEST_STATE_CSS,
	STOCK_REQUEST_STATE_LOCALIZATION_MAP,
} from 'Pages/StockRequestList/constants';
import { STOCK_REQUEST_STATE } from 'Services/StockRequest/constants';
import Config from 'Config';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useGoBackInHistory from 'Hooks/useGoBackInHistory';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import PrinterIcon from 'Components/Icons/Printer';
import TopBar from 'Components/TopBar';
import NotFoundPage from 'Pages/NotFound';
import { TIME_SLOTS_OPTIONS } from 'Components/Modal/StockRequestConfirmation/constants';

import { StockRequestDetailContext } from './context';
import {
	STOCK_REQUEST_DETAIL_CSS_BODY_CLASS,
	StockRequestDetailAction,
} from './constants';
import StockRequestBundleList from './Components/BundleList';

import './styles.css';

const StockRequestDetailPage = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const { stockRequest, dispatch } = useContext(StockRequestDetailContext);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const goBack = useGoBackInHistory();

	useEffect(() => {
		document.body.classList.add(STOCK_REQUEST_DETAIL_CSS_BODY_CLASS);
		return () =>
			document.body.classList.remove(STOCK_REQUEST_DETAIL_CSS_BODY_CLASS);
	}, []);

	const getTimeSlotLabel = (value: string): string => {
		if (!value) return '';

		return (
			TIME_SLOTS_OPTIONS.find((option) => option.value === value)?.label || ''
		);
	};

	const handleOnClickConfirm = useCallback(() => {
		handleOpenModal(
			stockRequest?.isSelfDelivered
				? ModalType.STOCK_REQUEST_CONFIRMATION_SHIPPING
				: ModalType.STOCK_REQUEST_CONFIRMATION_PICKUP,
			{
				stockRequestId: stockRequest?.id,
				reloadData: () => {
					dispatch([StockRequestDetailAction.reload]);
				},
			}
		);
	}, [handleOpenModal, stockRequest, dispatch]);

	const handleOnClickQuestion = useCallback(
		() => handleOpenModal(ModalType.STOCK_REQUEST_CHAT_MODAL),
		[handleOpenModal]
	);

	const handleOnClickPrint = window.print;

	const topBarButtons: TopBarButton[] = useMemo(() => {
		const items = [
			{
				label: <PrinterIcon />,
				onClick: handleOnClickPrint,
				className: 'btn-print',
			},
			stockRequest?.state === STOCK_REQUEST_STATE.SENT
				? {
						label: t({ id: 'stockRequest.btn.confirmRequest' }),
						onClick: handleOnClickConfirm,
						className: 'btn-ok',
				  }
				: undefined,
			{
				label: t({ id: 'stockRequest.detail.btn.question' }),
				onClick: handleOnClickQuestion,
			},
			{
				label: t({ id: 'stockRequest.detail.btn.back' }),
				onClick: goBack(),
			},
		];
		return items.filter((item) => item !== undefined) as TopBarButton[];
	}, [
		t,
		stockRequest,
		handleOnClickConfirm,
		handleOnClickQuestion,
		handleOnClickPrint,
		goBack,
	]);

	if (stockRequest === null) {
		return <NotFoundPage />;
	}

	const topBarItems: TopBarItem[] = [
		{
			label: t({ id: 'stockRequest.detail.requestId' }),
			value: stockRequest.requestNumber,
		},
		{
			label: t({ id: 'stockRequest.detail.dateIssued' }),
			value:
				stockRequest.dateIssued &&
				dayjs(stockRequest.dateIssued).format(`${t({ id: 'dateFormat' })}`),
		},
		{
			label: t({ id: 'stockRequest.detail.transportType' }),
			value: t({
				id: stockRequest.isSelfDelivered
					? 'stockRequest.list.transportType.supplier'
					: 'stockRequest.list.transportType.vinisto',
			}),
		},
		{
			label: t({ id: 'stockRequest.detail.transporter' }),
			value: (
				<>
					{stockRequest.transporterName
						? getLocalizedValue(stockRequest.transporterName ?? [])
						: '-'}
					{stockRequest.trackingUrl && stockRequest.trackingId && (
						<>
							<br />
							<a
								href={`//${stockRequest.trackingUrl}${stockRequest.trackingId}`}
							>
								{stockRequest.trackingId}
							</a>
						</>
					)}
				</>
			),
		},
		{
			label: t({ id: 'stockRequest.detail.dateStocked' }),
			value: stockRequest.dateStocked
				? dayjs(stockRequest.dateStocked).format(`${t({ id: 'dateFormat' })}`)
				: '-',
		},
		{
			label: t({ id: 'stockRequest.detail.state' }),
			value: stockRequest.state ? (
				<span className={STOCK_REQUEST_STATE_CSS[stockRequest.state]}>
					{t({ id: STOCK_REQUEST_STATE_LOCALIZATION_MAP[stockRequest.state] })}
				</span>
			) : (
				'-'
			),
		},
		{
			label: t({ id: 'stockRequest.detail.dateDelivery' }),
			value: stockRequest.dateDelivery
				? dayjs(stockRequest.dateDelivery).format(
						`${t({ id: 'dateFormat' })}`
				  ) +
				  ' ' +
				  getTimeSlotLabel(stockRequest.timeDelivery?.toString() ?? '')
				: '-',
		},
	];

	return (
		<>
			<h1 className="d-none d-print-block">
				{t(
					{ id: 'stockRequest.detail.print.heading' },
					{ requestId: stockRequest.requestNumber }
				)}
			</h1>
			<TopBar
				items={topBarItems}
				buttons={topBarButtons}
				className="d-print-none"
			/>
			<dl className="d-none d-print-grid request-print-header">
				<dt>{t({ id: 'stockRequest.detail.dateIssued' })}</dt>
				<dd>
					{stockRequest.dateIssued &&
						dayjs(stockRequest.dateIssued).format(`${t({ id: 'dateFormat' })}`)}
				</dd>
				<dt>{t({ id: 'stockRequest.detail.transportType' })}</dt>
				<dd>
					{t({
						id: stockRequest.isSelfDelivered
							? 'stockRequest.list.transportType.supplier'
							: 'stockRequest.list.transportType.vinisto',
					})}
				</dd>
			</dl>
			<StockRequestBundleList />
			<div className="d-none d-print-block fw-bold py-2">
				{t(
					{ id: 'stockRequest.detail.print.footer' },
					{
						phone: Config.contact.phone,
						email: Config.contact.email,
					}
				)}
			</div>
		</>
	);
};

export default StockRequestDetailPage;

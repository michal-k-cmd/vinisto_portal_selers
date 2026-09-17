import { useContext, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api';
import underscoreToCamel from 'Helpers/underscore-to-camel';
import { Button } from 'react-bootstrap';
import { Modal } from 'Components/Modal';
import ChangeOrderStateForm from 'Components/Forms/change-order-state';
import Detail from 'Components/Detail';
import { DetailTableColumn } from 'Components/Detail/Table/types';
import { dayjsInstance as dayjs } from 'Services/Date';
import { ChangeLogData } from 'Pages/OrderDetail/helpers';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { VinistoHelperDllEnumsUserUserRights } from '@/api-types/user-api';

interface OrderStatesProps {
	orderId: string;
	states: ChangeLogData[];
	orderState: VinistoHelperDllEnumsOrderOrderState;
	isOrderCancelled: boolean;
	handleChangeOrderState: (
		state: VinistoHelperDllEnumsOrderOrderState,
		isNotificationEmailSent: boolean
	) => void;
	handleStornoOrder: () => void;
	handleRefundOrder: () => void;
}

const OrderStates = ({
	orderId,
	states,
	orderState,
	isOrderCancelled,
	handleChangeOrderState,
	handleStornoOrder,
	handleRefundOrder,
}: OrderStatesProps) => {
	const { permissions } = useContext(AuthenticationContext).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();

	const [isChangeOrderStateModalOpen, setIsChangeOrderStateModalOpen] =
		useState(false);

	const tableColumns: DetailTableColumn[] = [
		{ title: t({ id: 'orderDetail.date' }) },
		{ title: t({ id: 'orderDetail.time' }) },
		{ title: t({ id: 'orderDetail.user' }) },
		{ title: t({ id: 'orderDetail.state' }), width: '100%' },
		{ title: '' },
	];

	const onEmailPreviewClick = (
		emailData: string,
		emailTemplateName: string
	) => {
		const newTab = window.open();
		if (newTab && newTab.document) {
			newTab.document.write(emailData);
			newTab.document.title = emailTemplateName;
		}
	};

	const tableData = states.map((stateRecord) => {
		const dateTime = dayjs.unix(stateRecord.changeTime ?? 0);
		const userId = stateRecord.userId;
		const emailTemplateName = stateRecord.emailTemplateName;
		const emailData = stateRecord.emailData;
		const state = stateRecord.stateChangedTo;
		const hasEmail = emailData && emailTemplateName;

		const stateKeyBase = `admin.orderList.state.${underscoreToCamel(
			stateRecord.state?.toLowerCase() ?? ''
		)}`;
		let stateKey = stateKeyBase;

		if (
			isOrderCancelled &&
			(stateKeyBase.endsWith('cancelled') ||
				stateKeyBase.includes('OrderPickupErrorCash.template'))
		) {
			stateKey += '.returned';
		}

		const stateText = t({ id: stateKey });
		const extraText = emailTemplateName
			? ' - ' + t({ id: emailTemplateName })
			: (state &&
					' - ' +
						t({
							id: `admin.orderList.state.${underscoreToCamel(state)}`,
						})?.toString()) ??
			  '';
		const displayStateText = stateText + extraText;

		return [
			dateTime.format('DD. MM. YYYY'),
			dateTime.format('HH:mm:ss'),
			userId ? (
				<Link
					to={`/user-detail/${userId}`}
					key={userId}
				>
					{stateRecord.userEmail}
				</Link>
			) : (
				'-'
			),
			displayStateText,
			hasEmail && (
				<Button
					key={emailData.slice(0, 35)}
					onClick={() => onEmailPreviewClick(emailData, emailTemplateName)}
					style={{ whiteSpace: 'nowrap' }}
				>
					{t({ id: 'orderDetail.previewEmail' })}
				</Button>
			),
		];
	});

	const onOrderStateChange = (
		state: VinistoHelperDllEnumsOrderOrderState,
		isNotificationEmailSent: boolean
	) => {
		setIsChangeOrderStateModalOpen(false);
		handleChangeOrderState(state, isNotificationEmailSent);
	};

	const isFinalState =
		isOrderCancelled ||
		VinistoHelperDllEnumsOrderOrderState.LOSS_EVENT === orderState;

	const showRefundButton =
		orderState === VinistoHelperDllEnumsOrderOrderState.REVERT_FINANCE_AND_FEES;

	const hasOrderStateChangePermission = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER
	);

	const hasorderStornoPermission = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_ORDER_STORNO
	);

	return (
		<>
			<Detail.Container>
				<Detail.Heading value={`${t({ id: 'orderDetail.states.title' })}`} />
				<div className="table-responsive">
					<Detail.Table
						columns={tableColumns}
						data={tableData ?? []}
					/>
				</div>
				<div className="d-flex gap-3 m-2 mt-3">
					{!isFinalState && hasOrderStateChangePermission && (
						<Button onClick={() => setIsChangeOrderStateModalOpen(true)}>
							{t({ id: 'orderDetail.changeState' })}
						</Button>
					)}
					{!isFinalState && hasorderStornoPermission && (
						<Button onClick={() => handleStornoOrder()}>
							{t({ id: 'orderDetail.stornoOrder' })}
						</Button>
					)}
					{showRefundButton && (
						<Button onClick={() => handleRefundOrder()}>
							{t({ id: 'orderDetail.refundOrder' })}
						</Button>
					)}
				</div>
			</Detail.Container>
			<Modal
				title={t({ id: 'orderDetail.changeState' })?.toString()}
				show={isChangeOrderStateModalOpen}
				handleClose={() => setIsChangeOrderStateModalOpen(false)}
			>
				<ChangeOrderStateForm
					onOrderStateChange={onOrderStateChange}
					orderId={orderId}
					initialState={orderState}
				/>
			</Modal>
		</>
	);
};

export default OrderStates;

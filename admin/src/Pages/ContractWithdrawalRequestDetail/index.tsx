import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Detail from 'Components/Detail';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { UserService } from 'Services/UserService/User';
import { ContractWithdrawalRequestService } from 'vinisto_api_client';
import {
	CONTRACT_WITHDRAWAL_REQUEST_LIST_URL,
	ContractWithdrawalRequestChangeState,
	contractWithdrawalRequestChangeStateTranslationKeys,
	ContractWithdrawalRequestCustomerType,
	contractWithdrawalRequestCustomerTypeTranslationKeys,
	contractWithdrawalRequestSourceTranslationKeys,
	contractWithdrawalRequestStateTranslationKeys,
} from 'Pages/ContractWithdrawalRequest/constants';
import {
	VinistoApplicationLogDllModelsApiApplicationLogContractWithdrawalRequestApplicationLog,
	VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState,
	VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest,
} from 'vinisto_api_client/src/api-types/order-api';

import {
	DisplayUser,
	formatAddress,
	formatCustomerName,
	formatDisplayUser,
	formatUserLogin,
	getAvailableActions,
	isProcessedByUserId,
} from './helpers';
import styles from './styles.module.css';

type ContractWithdrawalRequest =
	VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest;

const ContractWithdrawalRequestDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);

	const t = useFormatMessage();
	const queryClient = useQueryClient();

	const [internalNote, setInternalNote] = useState('');

	const isInternalNoteRequired = (
		state: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState
	) =>
		state !== ContractWithdrawalRequestChangeState.InReview &&
		state !== ContractWithdrawalRequestChangeState.Resolved;

	const requestQueryKey = ['contractWithdrawalRequest', id];
	const historyQueryKey = ['contractWithdrawalRequestHistory', id];

	const { data: requestData } = useQuery(
		requestQueryKey,
		async () => {
			const response = await ContractWithdrawalRequestService.getById({
				contractWithdrawalRequestId: id ?? '',
				UserLoginHash: userLoginHash,
			});

			if (!response.contractWithdrawalRequest) {
				throw new Error('Missing contract withdrawal request');
			}

			return response.contractWithdrawalRequest as ContractWithdrawalRequest;
		},
		{
			enabled: !!id,
			onError: () => {
				handleShowErrorNotification(
					'admin.contractWithdrawalRequestDetail.loadingError'
				);
			},
		}
	);

	const { data: history = [] } = useQuery(
		historyQueryKey,
		async () => {
			const response = await ContractWithdrawalRequestService.getHistory({
				requestId: id ?? '',
				UserLoginHash: userLoginHash,
			});

			return (response.applicationLogs ??
				[]) as VinistoApplicationLogDllModelsApiApplicationLogContractWithdrawalRequestApplicationLog[];
		},
		{
			enabled: !!id,
		}
	);

	const request = requestData ?? null;
	const processedBy = request?.processedBy;

	const { data: processedByUserLabel = '' } = useQuery(
		['contractWithdrawalRequestProcessedByUser', processedBy],
		async () => {
			const response = await UserService.getUserById(processedBy ?? '', {
				userId: processedBy ?? '',
				UserLoginHash: userLoginHash,
			});

			return formatUserLogin(response.user as DisplayUser) || '';
		},
		{
			enabled: !!processedBy,
		}
	);

	const updateMutation = useMutation(
		async (
			state: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState
		) => {
			const trimmedInternalNote = internalNote.trim();
			const response = await ContractWithdrawalRequestService.update({
				contractWithdrawalRequestId: id ?? '',
				UserLoginHash: userLoginHash,
				State: state,
				...(trimmedInternalNote && { InternalNote: trimmedInternalNote }),
			});

			if (!response.contractWithdrawalRequest) {
				throw new Error('Missing contract withdrawal request');
			}

			return response;
		},
		{
			onSuccess: () => {
				setInternalNote('');
				queryClient.invalidateQueries(requestQueryKey);
				queryClient.invalidateQueries(historyQueryKey);
				handleShowSuccessNotification(
					'admin.contractWithdrawalRequestDetail.stateChangeSuccess'
				);
			},
			onError: () => {
				handleShowErrorNotification(
					'admin.contractWithdrawalRequestDetail.stateChangeError'
				);
			},
		}
	);

	const handleChangeState = (
		state: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState
	) => {
		if (!id || updateMutation.isLoading) return;

		if (isInternalNoteRequired(state) && internalNote.trim().length === 0) {
			handleShowErrorNotification(
				'admin.contractWithdrawalRequestDetail.stateChangeNoteRequired'
			);
			return;
		}

		updateMutation.mutate(state);
	};

	if (!request) return null;

	const stateLabel = request.state
		? t({
				id: contractWithdrawalRequestStateTranslationKeys[request.state],
		  })
		: '-';
	const dateTimeFormat = `${t({ id: 'admin.dateTimeFormat' })}`;
	const createdAtLabel = request.createdAt
		? dayjs.unix(request.createdAt).format(dateTimeFormat)
		: '-';
	const orderValue = request.orderId ? (
		<Link to={`/order-detail/${request.orderId}`}>
			{request.orderNumber ?? '-'}
		</Link>
	) : (
		request.orderNumber
	);
	const customerName = formatCustomerName(request);
	const hasCustomerDetail =
		request.customerType === ContractWithdrawalRequestCustomerType.LoggedUser &&
		request.customerId;
	const customerItems = [
		{
			label: 'admin.contractWithdrawalRequestDetail.customerName.label',
			value: hasCustomerDetail ? (
				<Link to={`/user-detail/${request.customerId}`}>{customerName}</Link>
			) : (
				customerName
			),
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.customerEmail.label',
			value: request.customerEmail,
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.customerPhone.label',
			value: request.customerPhone,
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.customerAddress.label',
			value: formatAddress(request),
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.customerType.label',
			value: request.customerType
				? t({
						id: contractWithdrawalRequestCustomerTypeTranslationKeys[
							request.customerType
						],
				  })
				: '',
		},
	];
	const requestItems = [
		{
			label: 'admin.contractWithdrawalRequestDetail.bankAccount.label',
			value: request.bankAccount,
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.source.label',
			value: request.source
				? t({
						id: contractWithdrawalRequestSourceTranslationKeys[request.source],
				  })
				: '',
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.processedBy.label',
			value:
				request.processedBy &&
				processedByUserLabel &&
				isProcessedByUserId(request.processedBy) ? (
					<Link to={`/user-detail/${request.processedBy}`}>
						{processedByUserLabel}
					</Link>
				) : (
					processedByUserLabel
				),
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.customerNote.label',
			value: request.note,
		},
		{
			label: 'admin.contractWithdrawalRequestDetail.internalNote.label',
			value: request.internalNote,
		},
	];
	const availableActions = getAvailableActions(request.state);
	const historyRows =
		history.length === 0
			? [
					[
						t({
							id: 'admin.contractWithdrawalRequestDetail.history.empty',
						}),
						'',
						'',
					],
			  ]
			: history.map((item) => [
					item.time ? dayjs(item.time).format(dateTimeFormat) : '-',
					item.state
						? t({
								id: contractWithdrawalRequestStateTranslationKeys[item.state],
						  })
						: '-',
					formatDisplayUser(item.user as DisplayUser) || '-',
			  ]);

	return (
		<Detail.View>
			<Detail.Container className={styles.headerContainer}>
				<Detail.Columns className={styles.headerColumns}>
					<Detail.InfoWithLabel
						label={
							<div className={styles.headerLabel}>
								{t({
									id: 'admin.contractWithdrawalRequestDetail.orderNumber.label',
								})}
								:{' '}
							</div>
						}
						value={<div className={styles.headerValue}>{orderValue}</div>}
						layout="horizontal"
					/>
					<Detail.InfoWithLabel
						label={
							<div className={styles.headerLabel}>
								{t({
									id: 'admin.contractWithdrawalRequestDetail.state.label',
								})}
								:{' '}
							</div>
						}
						value={<div className={styles.headerValue}>{stateLabel}</div>}
						layout="horizontal"
					/>
					<Detail.InfoWithLabel
						label={
							<div className={styles.headerLabel}>
								{t({
									id: 'admin.contractWithdrawalRequestDetail.createdAt.label',
								})}
								:{' '}
							</div>
						}
						value={<div className={styles.headerValue}>{createdAtLabel}</div>}
						layout="horizontal"
					/>
					<div className={styles.headerActions}>
						<Detail.Button
							type="button"
							onClick={() => navigate(CONTRACT_WITHDRAWAL_REQUEST_LIST_URL)}
						>
							{t({ id: 'admin.btn.back' })}
						</Detail.Button>
					</div>
				</Detail.Columns>
			</Detail.Container>
			<Detail.Container>
				<Detail.Heading>
					{t({
						id: 'admin.contractWithdrawalRequestDetail.customerSection',
					})}
				</Detail.Heading>
				<Detail.Columns>
					{customerItems.map((item) => (
						<Detail.InfoWithLabel
							key={item.label}
							label={t({ id: item.label })}
							value={item.value}
						/>
					))}
				</Detail.Columns>
			</Detail.Container>
			<Detail.Container>
				<Detail.Heading>
					{t({
						id: 'admin.contractWithdrawalRequestDetail.requestSection',
					})}
				</Detail.Heading>
				<Detail.Columns>
					{requestItems.map((item) => (
						<Detail.InfoWithLabel
							key={item.label}
							label={t({ id: item.label })}
							value={item.value}
						/>
					))}
				</Detail.Columns>
			</Detail.Container>
			<Detail.Container>
				<div className={styles.detail}>
					<Detail.Heading>
						{t({
							id: 'admin.contractWithdrawalRequestDetail.processingSection',
						})}
					</Detail.Heading>
					<div className={styles.note}>
						<label
							className={styles.noteLabel}
							htmlFor="contract-withdrawal-request-internal-note"
						>
							{t({
								id: 'admin.contractWithdrawalRequestDetail.stateChangeNote.label',
							})}
						</label>
						<textarea
							id="contract-withdrawal-request-internal-note"
							className="form-control"
							rows={4}
							value={internalNote}
							onChange={(event) => setInternalNote(event.target.value)}
						/>
					</div>
					<div className={styles.actions}>
						{availableActions.map((state) => (
							<Detail.Button
								key={state}
								type="button"
								onClick={() => handleChangeState(state)}
								disabled={
									updateMutation.isLoading ||
									(isInternalNoteRequired(state) &&
										internalNote.trim().length === 0)
								}
							>
								{t({
									id: contractWithdrawalRequestChangeStateTranslationKeys[
										state
									],
								})}
							</Detail.Button>
						))}
					</div>
					<Detail.Subheading
						value={t({ id: 'admin.contractWithdrawalRequestDetail.history' })}
					/>
					<Detail.Table
						columns={[
							{
								title: t({
									id: 'admin.contractWithdrawalRequestDetail.history.time',
								}),
							},
							{
								title: t({
									id: 'admin.contractWithdrawalRequestDetail.history.state',
								}),
							},
							{
								title: t({
									id: 'admin.contractWithdrawalRequestDetail.history.user',
								}),
							},
						]}
						data={historyRows}
					/>
				</div>
			</Detail.Container>
		</Detail.View>
	);
};

export default ContractWithdrawalRequestDetailPage;

import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { head } from 'Helpers/lodash';
import { dayjsInstance as dayjs } from 'Services/Date';
import { UserService } from 'Services/UserService/User';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import useAdminTable from 'Hooks/useAdminTable';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useTableSchema from 'Hooks/useTableSchema';
import AdminListPage from 'Components/AdminListPage';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest as ContractWithdrawalRequest } from 'vinisto_api_client/src/api-types/order-api';
import {
	CONTRACT_WITHDRAWAL_REQUEST_DEFAULT_SORT,
	CONTRACT_WITHDRAWAL_REQUEST_DETAIL_URL,
	CONTRACT_WITHDRAWAL_REQUEST_FILTER_COLUMN_MAP,
	CONTRACT_WITHDRAWAL_REQUEST_SORTING_COLUMN_MAP,
	CONTRACT_WITHDRAWAL_REQUEST_URI,
	contractWithdrawalRequestCustomerTypeTranslationKeys,
	ContractWithdrawalRequestListTableKeys,
	contractWithdrawalRequestSourceTranslationKeys,
	ContractWithdrawalRequestState,
	contractWithdrawalRequestStateTranslationKeys,
} from 'Pages/ContractWithdrawalRequest/constants';
import {
	DisplayUser,
	formatUserLogin,
} from 'Pages/ContractWithdrawalRequestDetail/helpers';

type ContractWithdrawalRequestListTableRow = IPageListTableRow &
	Omit<ContractWithdrawalRequest, 'id'> & {
		customerName: string;
	};

const ContractWithdrawalRequestListPage = () => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema =
		useTableSchema<ContractWithdrawalRequestListTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<ContractWithdrawalRequestListTableRow>(
			CONTRACT_WITHDRAWAL_REQUEST_DEFAULT_SORT
		);
	const [processedByUsers, setProcessedByUsers] = useState<
		Record<string, string>
	>({});
	const processedByUsersRef = useRef<Record<string, string>>({});

	const stateFilterOptions: [value: string, label: string][] = Object.values(
		ContractWithdrawalRequestState
	).map((value) => [
		value,
		String(t({ id: contractWithdrawalRequestStateTranslationKeys[value] })),
	]);

	const tableSchema: TableSchema<ContractWithdrawalRequestListTableRow> = [
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.receivedAt.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.CREATED_AT,
			accessorKey: ContractWithdrawalRequestListTableKeys.CREATED_AT,
			accessorFn: (row) =>
				row.createdAt
					? dayjs
							.unix(row.createdAt)
							.format(`${t({ id: 'admin.dateTimeFormat' })}`)
					: '',
			enableColumnFilter: false,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.orderNumber.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.ORDER_NUMBER,
			accessorKey: ContractWithdrawalRequestListTableKeys.ORDER_NUMBER,
			cell: ({ row }) =>
				row.original.orderId ? (
					<Link
						to={`/order-detail/${row.original.orderId}`}
						onClick={(event) => event.stopPropagation()}
					>
						{row.original.orderNumber}
					</Link>
				) : (
					row.original.orderNumber ?? ''
				),
			enableColumnFilter: false,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.customerName.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.CUSTOMER_NAME,
			accessorKey: ContractWithdrawalRequestListTableKeys.CUSTOMER_NAME,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.customerEmail.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.CUSTOMER_EMAIL,
			accessorKey: ContractWithdrawalRequestListTableKeys.CUSTOMER_EMAIL,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.customerPhone.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.CUSTOMER_PHONE,
			accessorKey: ContractWithdrawalRequestListTableKeys.CUSTOMER_PHONE,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.customerType.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.CUSTOMER_TYPE,
			accessorFn: (row) =>
				row.customerType
					? t({
							id: contractWithdrawalRequestCustomerTypeTranslationKeys[
								row.customerType
							],
					  })
					: '',
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.source.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.SOURCE,
			accessorFn: (row) =>
				row.source
					? t({
							id: contractWithdrawalRequestSourceTranslationKeys[row.source],
					  })
					: '',
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.state.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.STATE,
			accessorFn: (row) =>
				row.state
					? t({
							id: contractWithdrawalRequestStateTranslationKeys[row.state],
					  })
					: '',
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: stateFilterOptions,
			},
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.contractWithdrawalRequestList.processedBy.label',
			})}`,
			id: ContractWithdrawalRequestListTableKeys.PROCESSED_BY,
			accessorKey: ContractWithdrawalRequestListTableKeys.PROCESSED_BY,
			cell: ({ row }) => {
				const processedBy = row.original.processedBy;
				if (!processedBy) return '';

				const processedByLabel = processedByUsersRef.current[processedBy] ?? '';
				if (!processedByLabel) return '';

				return processedByLabel;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'actions' })}`,
			id: ContractWithdrawalRequestListTableKeys.ACTIONS,
			cell: ({ row }) => (
				<Link
					to={`${CONTRACT_WITHDRAWAL_REQUEST_DETAIL_URL}/${row.original.id}`}
					className="btn btn-primary btn-sm"
					onClick={(event) => event.stopPropagation()}
				>
					{t({ id: 'view' })}
				</Link>
			),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: ContractWithdrawalRequestListTableRow,
		event: React.MouseEvent
	) =>
		navigateWithNewtabOption(
			`${CONTRACT_WITHDRAWAL_REQUEST_DETAIL_URL}/${entity.id}`,
			event
		);

	useEffect(() => {
		const apiParams: { key: string; value: string | number | boolean }[] = [
			{ key: 'UserLoginHash', value: userLoginHash },
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
		];

		const sortByColumn = head(state.sorting);
		if (
			sortByColumn?.id &&
			Object.hasOwn(
				CONTRACT_WITHDRAWAL_REQUEST_SORTING_COLUMN_MAP,
				sortByColumn.id
			)
		) {
			apiParams.push({
				key: 'SortingColumn',
				value:
					CONTRACT_WITHDRAWAL_REQUEST_SORTING_COLUMN_MAP[
						sortByColumn.id as keyof typeof CONTRACT_WITHDRAWAL_REQUEST_SORTING_COLUMN_MAP
					],
			});
			apiParams.push({
				key: 'IsSortingDescending',
				value: sortByColumn.desc ?? true,
			});
		}

		state.filters.forEach((filter) => {
			if (filter.id === ContractWithdrawalRequestListTableKeys.CUSTOMER_NAME) {
				apiParams.push({ key: 'SearchSurname', value: String(filter.value) });
				return;
			}

			if (filter.id === ContractWithdrawalRequestListTableKeys.CUSTOMER_EMAIL) {
				apiParams.push({ key: 'SearchEmail', value: String(filter.value) });
				return;
			}

			if (filter.id === ContractWithdrawalRequestListTableKeys.CUSTOMER_PHONE) {
				apiParams.push({ key: 'SearchPhone', value: String(filter.value) });
				return;
			}

			if (filter.id === ContractWithdrawalRequestListTableKeys.STATE) {
				apiParams.push({
					key: CONTRACT_WITHDRAWAL_REQUEST_FILTER_COLUMN_MAP[
						ContractWithdrawalRequestListTableKeys.STATE
					],
					value: String(filter.value),
				});
			}
		});

		fetchData(
			CONTRACT_WITHDRAWAL_REQUEST_URI,
			apiParams,
			(payload) =>
				(payload.contractWithdrawalRequests ?? []).map(
					(request: ContractWithdrawalRequest) => ({
						...request,
						id: request.id ?? '',
						customerName: [request.customerFirstName, request.customerSurname]
							.filter(Boolean)
							.join(' '),
					})
				),
			'admin.contractWithdrawalRequestList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state, userLoginHash]);

	useEffect(() => {
		const processedByIds = Array.from(
			new Set(
				state.data
					.map((request) => request.processedBy)
					.filter((processedBy): processedBy is string => Boolean(processedBy))
					.filter((processedBy) => !processedByUsersRef.current[processedBy])
			)
		);

		if (processedByIds.length === 0) return;

		Promise.all(
			processedByIds.map(async (processedBy) => {
				try {
					const response = await UserService.getUserById(processedBy, {
						userId: processedBy,
						UserLoginHash: userLoginHash,
					});

					const userLogin = formatUserLogin(response.user as DisplayUser);
					if (!userLogin) return null;

					return [processedBy, userLogin] as const;
				} catch {
					return null;
				}
			})
		).then((users) => {
			const foundUsers = users.filter((user): user is [string, string] =>
				Boolean(user)
			);

			if (foundUsers.length === 0) return;

			setProcessedByUsers((prev) => {
				const next = {
					...prev,
					...Object.fromEntries(foundUsers),
				};
				processedByUsersRef.current = next;
				return next;
			});
		});
	}, [processedByUsers, state.data, userLoginHash]);

	return (
		<AdminListPage<ContractWithdrawalRequestListTableRow>
			adminTableSchema={adminTableSchema}
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				ContractWithdrawalRequestListTableKeys.CREATED_AT,
				ContractWithdrawalRequestListTableKeys.ORDER_NUMBER,
				ContractWithdrawalRequestListTableKeys.CUSTOMER_NAME,
				ContractWithdrawalRequestListTableKeys.CUSTOMER_EMAIL,
				ContractWithdrawalRequestListTableKeys.CUSTOMER_PHONE,
				ContractWithdrawalRequestListTableKeys.CUSTOMER_TYPE,
				ContractWithdrawalRequestListTableKeys.SOURCE,
				ContractWithdrawalRequestListTableKeys.STATE,
				ContractWithdrawalRequestListTableKeys.PROCESSED_BY,
				ContractWithdrawalRequestListTableKeys.ACTIONS,
			]}
		/>
	);
};

export default ContractWithdrawalRequestListPage;

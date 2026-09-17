import { useContext, useMemo } from 'react';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useAdminTable from 'Hooks/useAdminTable';
import { LocalizationContext } from 'Services/LocalizationService';
import { NumberParam, useQueryParams, withDefault } from 'Helpers/query-params';
import { useQuery } from '@tanstack/react-query';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { upperFirst } from 'Helpers/lodash';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import useDebounce from 'Hooks/useDebounce';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

import styles from './styles.module.css';

import {
	SubscriptionResponse,
	SubscriptionsListParams,
	SubscriptionsResponse,
	SubscriptionState,
	SubscriptionType,
} from '@/api-types/subscription-api';
import { subscriptionReadOnlyApi } from '@/subscription-service';
import api from '@/api';
import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
	VinistoAuthDllModelsApiUserUsersReturn,
} from '@/api-types/user-api';

interface SubscriptionRow extends SubscriptionResponse {
	id: string;
	user:
		| VinistoAuthDllModelsApiUserUser
		| VinistoAuthDllModelsApiUserBaseBuyerUser
		| VinistoAuthDllModelsApiUserMerchant
		| null;
}

const SubscriptionListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { handleShowErrorNotification } = useContext(NotificationsContext);

	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const { handlers, state } = useAdminTable<SubscriptionRow>();

	const DEFAULT_ITEMS_PER_PAGE = 25;

	const [query, setQuery] = useQueryParams({
		Limit: withDefault(NumberParam, DEFAULT_ITEMS_PER_PAGE),
		Offset: withDefault(NumberParam, 0),
	});

	// Debounce because of the email filter field (to be implemented)
	// Alternatively, do not debounce all filters but only this specific value
	const debouncedFilters = useDebounce(state.filters, 275);

	const columnToApiFilters = (column: keyof SubscriptionResponse) => {
		switch (column) {
			case 'state':
				return 'States';
			default:
				return upperFirst(column);
		}
	};

	const filtersAsMap = debouncedFilters.reduce<
		Partial<SubscriptionsListParams> & { User?: string }
	>((acc, filter) => {
		// @ts-expect-error My typescript skills are not strong enough to fix this
		acc[columnToApiFilters(`${filter.id}`)] = filter.value;
		return acc;
	}, {});

	const userSearchstring = filtersAsMap.User as string | undefined;

	const usersByEmailQuery = useQuery({
		queryKey: ['getUserByEmail', userSearchstring],
		queryFn: () =>
			api
				.get<VinistoAuthDllModelsApiUserUsersReturn>(`user-api/users`, {
					searchEmail: userSearchstring,
					userLoginHash,
				})
				.catch(() => {
					handleShowErrorNotification('admin.subscription.loadingError.user');
				}),

		enabled: !!userSearchstring,
	});

	const subscriptionsQuery = useQuery({
		queryKey: [
			'subscriptions',
			{
				...query,
				...filtersAsMap,
				userSearchstring,
				isUsersDataFetching: usersByEmailQuery.isFetching,
			},
		],
		queryFn: () => {
			const filterdUsersData = (() => {
				if (usersByEmailQuery.isFetching) return null;
				if (!userSearchstring) return null;

				return {
					filterdUsersCount: usersByEmailQuery.data?.count,
					filteredUsers: usersByEmailQuery.data?.users,
					filterdUsersIds: new Set(
						usersByEmailQuery.data?.users?.map((user) => user.id) ?? []
					),
				};
			})();

			return subscriptionReadOnlyApi
				.subscriptionsList({
					...filtersAsMap,
					...(filtersAsMap.States && {
						// @ts-expect-error T[] does not have '.split'? Interesting...
						States: filtersAsMap.States.split(','),
					}),
					...(filtersAsMap.LastPayment && {
						LastPayment: dayjs
							.unix(Number(filtersAsMap.LastPayment))
							.format('YYYY-M-DD'),
					}),
					...(query.Limit && { Limit: query.Limit }),
					...(query.Offset && { Offset: query.Offset }),
				})
				.then((res) => res.json())
				.then(async (data: SubscriptionsResponse) => {
					const dataFilterdByUserSearch = filterdUsersData
						? {
								...data,
								subscriptions:
									data.subscriptions?.filter((subscription) =>
										filterdUsersData.filterdUsersIds.has(
											`${subscription.userId}`
										)
									) ?? [],
								count: Math.min(
									data.count,
									filterdUsersData.filterdUsersCount ?? 0
								),
						  }
						: data;

					const usersIds =
						dataFilterdByUserSearch.subscriptions?.map((sub) => sub.userId) ??
						[];

					const usersResponse = await api
						.get<VinistoAuthDllModelsApiUserUsersReturn>(
							`user-api/users/users-names-emails`,
							{
								usersIds,
								userLoginHash,
							}
						)
						.catch(() => {
							handleShowErrorNotification(
								'admin.subscription.loadingError.user'
							);
							return null;
						});

					const subscriptionDataFilterdByUserSearchMergedWithUsersData = {
						...dataFilterdByUserSearch,
						subscriptions:
							dataFilterdByUserSearch.subscriptions?.map((subscription) => ({
								...subscription,
								id: `${subscription.id}`,
								user:
									usersResponse?.users?.find(
										(user) => user.id === subscription.userId
									) ?? null,
							})) ?? [],
					};

					return subscriptionDataFilterdByUserSearchMergedWithUsersData;
				})
				.catch(() => {
					handleShowErrorNotification(
						'admin.subscription.loadingError.subscription'
					);
					return null;
				});
		},
	});

	const pageCount = Math.ceil(
		(subscriptionsQuery.data?.count ?? 0) /
			(query.Limit ?? DEFAULT_ITEMS_PER_PAGE)
	);
	const pageNumber = query.Offset / query.Limit + 1;

	const tableSchema: TableSchema<SubscriptionRow> = [
		{
			id: 'id',
			header: 'id',
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'user',
			header: `${t({ id: 'admin.subscription.user.label' })}`,
			accessorFn: (row) => row.user?.email,
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			id: 'type',
			header: `${t({ id: 'admin.subscription.type.label' })}`,
			accessorKey: 'type',
			accessorFn: (row) => {
				if (row.type === SubscriptionType.Month)
					return t({ id: 'admin.subscription.type.monthly' });
				if (row.type === SubscriptionType.Year)
					return t({ id: 'admin.subscription.type.yearly' });
				return null;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'startDate',
			header: `${t({ id: 'admin.subscription.startDate.label' })}`,
			accessorKey: 'startDate',
			accessorFn: (row) => dayjs(row.startDate).format('D. M. YYYY'),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'endDate',
			header: `${t({ id: 'admin.subscription.endDate.label' })}`,
			accessorKey: 'endDate',
			accessorFn: (row) => dayjs(row.endDate).format('D. M. YYYY'),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'lastPayment',
			header: `${t({ id: 'admin.subscription.lastPayment.label' })}`,
			accessorKey: 'lastPayment',
			accessorFn: (row) => dayjs(row.lastPayment).format('D. M. YYYY'),
			enableColumnFilter: true,
			enableSorting: false,
			meta: { filterType: AdminTableFilterType.DATE },
		},
		{
			id: 'state',
			header: `${t({ id: 'admin.subscription.state.label' })}`,
			accessorKey: 'state',
			cell: ({ row }) => {
				if (row.original.isRenewDisabled)
					return (
						<span className={styles.WaitingToEnd}>
							{t({ id: `admin.subscription.state.WaitingToEnd` })}
						</span>
					);
				return (
					<span className={styles[`${row.original.state}`]}>
						{t({ id: `admin.subscription.state.${row.original.state}` })}
					</span>
				);
			},
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions: [
					[
						SubscriptionState.Active,
						`${t({ id: 'admin.subscription.state.Active' })}`,
					],
					[
						SubscriptionState.Inactive,
						`${t({ id: 'admin.subscription.state.Inactive' })}`,
					],
					[
						SubscriptionState.WaitingToPayment,
						`${t({ id: 'admin.subscription.state.WaitingToPayment' })}`,
					],
					[
						SubscriptionState.WaitingToEnd,
						`${t({ id: 'admin.subscription.state.WaitingToEnd' })}`,
					],
				],
			},
		},
		{
			id: 'paymentAttemptsCount',
			header: `${t({ id: 'admin.subscription.paymentAttemptsCount.label' })}`,
			accessorKey: 'paymentAttemptsCount',
			accessorFn: (row) => row.paymentAttemptsCount || '-',
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'creationPayment',
			header: `${t({ id: 'admin.subscription.creationPayment.label' })}`,
			accessorKey: 'creationPayment',
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'card',
			header: `${t({ id: 'admin.subscription.card.label' })}`,
			accessorKey: 'card',
			accessorFn: (row) => JSON.stringify(row.card),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'itemId',
			header: `${t({ id: 'admin.subscription.itemId.label' })}`,
			accessorKey: 'itemId',
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'isRenewDisabled',
			header: `${t({ id: 'admin.subscription.isRenewDisabled.label' })}`,
			accessorKey: 'isRenewDisabled',
			accessorFn: (row) =>
				row.isRenewDisabled ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'orderId',
			header: `${t({ id: 'admin.subscription.orderId.label' })}`,
			accessorKey: 'orderId',
			// Does not work that way - order referenced by Subscription.orderId is empty
			//cell: ({ row }) => (
			//	<Link to={`/order-detail/${row.original.orderId}`}>
			//		{row.original.orderId}
			//	</Link>
			//),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const handleOnTableRowClick = (
		entity: SubscriptionRow,
		event: React.MouseEvent
	) => {
		navigateWithNewtabOption(`/user-detail/${entity.userId}`, event);
	};

	const adaptedState = useMemo(() => {
		return {
			...state,
			loading: subscriptionsQuery.isLoading,
			loaded: subscriptionsQuery.isSuccess,
			count: subscriptionsQuery.data?.count ?? 0,
			pageNumber: pageNumber,
			pageCount: pageCount,
			limit: query.Limit ?? DEFAULT_ITEMS_PER_PAGE,
			data: subscriptionsQuery.data?.subscriptions ?? [],
		};
	}, [
		pageCount,
		pageNumber,
		query.Limit,
		state,
		subscriptionsQuery.data?.count,
		subscriptionsQuery.data?.subscriptions,
		subscriptionsQuery.isLoading,
		subscriptionsQuery.isSuccess,
	]);

	const adaptedHandlers = {
		handleOnSortingChange: handlers.handleOnSortingChange,
		handleOnFiltersChange: handlers.handleOnFiltersChange,
		handleOnPageChange: (selectedPage: number) => {
			setQuery((prev) => ({
				...prev,
				Offset: (query.Limit ?? DEFAULT_ITEMS_PER_PAGE) * (selectedPage - 1),
			}));
		},
		handleOnPageSizeChange: (selectedLimit: number) => {
			setQuery((prev) => ({
				...prev,
				Limit: selectedLimit,
				Offset: 0,
			}));
		},
		handleOnRowSelectionChange: handlers.handleOnRowSelectionChange,
		handleOnToggleSelectAllRows: handlers.handleOnToggleSelectAllRows,
	};

	return (
		<div>
			<AdminListPage<SubscriptionRow>
				adminTableSchema={tableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={{ ...adaptedHandlers }}
				state={adaptedState}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				defaultColumnsExcluded={[
					'id',
					'endDate',
					'creationPayment',
					'card',
					'itemId',
					'isRenewDisabled',
					'orderId',
				]}
				columnOrder={[
					'id',
					'user',
					'type',
					'startDate',
					'endDate',
					'lastPayment',
					'state',
					'paymentAttemptsCount',
					'creationPayment',
					'card',
					'itemId',
					'isRenewDisabled',
					'orderId',
				]}
			/>
		</div>
	);
};

export default SubscriptionListPage;

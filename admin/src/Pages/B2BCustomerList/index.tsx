import { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import useTableSchema from 'Hooks/useTableSchema';
import useAdminTable from 'Hooks/useAdminTable';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import useGetMerchants from 'Hooks/Queries/useGetMerchants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';

import CompanyCell from './CompanyCell';
import MerchantCell from './MerchantCell';
import {
	DEFAULT_SORT,
	SORTING_COLUMN_MAP,
	UserListListTableKeys,
} from './constants';

import './styles.css';

import {
	VinistoAuthDllModelsApiUserCompany,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsUserUserRights,
	VinistoHelperDllEnumsUserUserState,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';

const B2bCustomerList = ({
	userType,
	createModalType,
}: {
	userType: VinistoHelperDllEnumsUserUserType;
	createModalType: string;
}) => {
	const { loginHash: userLoginHash, permissions } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);

	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema<VinistoAuthDllModelsApiUserCompany>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<VinistoAuthDllModelsApiUserCompany>(DEFAULT_SORT);

	const { data: merchants } = useGetMerchants({ userLoginHash });

	const merchantOptions = merchants?.map((merchant): [string, string] => [
		`${merchant.id}`,
		`${merchant.firstName} ${merchant.surname}`,
	]);

	const userStateOptions = Object.keys(VinistoHelperDllEnumsUserUserState).map(
		(key): [string, string] => [
			key,
			`${t({ id: `admin.b2bCustomer.state.${key}` })}`,
		]
	);

	const tableSchema: TableSchema<VinistoAuthDllModelsApiUserCompany> = [
		{
			header: `${t({ id: 'admin.b2bCustomer.company.title' })}`,
			id: UserListListTableKeys.COMPANY,
			accessorKey: UserListListTableKeys.COMPANY,
			cell: ({ row }) => <CompanyCell b2bCustomer={row.original} />,
			enableColumnFilter: true,
			enableSorting: true,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.ico.title' })}`,
			id: UserListListTableKeys.ICO,
			accessorKey: UserListListTableKeys.ICO,
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.companyEmail.title' })}`,
			id: UserListListTableKeys.COMPANY_EMAIL,
			accessorKey: UserListListTableKeys.COMPANY_EMAIL,
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.priceLevel.title' })}`,
			id: UserListListTableKeys.PRICE_LEVEL,
			accessorFn: (row) =>
				t({
					id: `VinistoB2b.${
						row.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1
					}`,
				}),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.merchant.title' })}`,
			id: UserListListTableKeys.MERCHANT_ID,
			accessorKey: UserListListTableKeys.MERCHANT_ID,
			cell: ({ row }) => <MerchantCell company={row.original} />,
			enableColumnFilter: true,
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: merchantOptions,
			},
		},
		//{
		//	header: `${t({ id: 'admin.b2bCustomer.yearlyTurnover.title' })}`,
		//},
		{
			header: `${t({ id: 'admin.b2bCustomer.state.title' })}`,
			id: UserListListTableKeys.STATE,
			accessorFn: (row) => t({ id: `admin.b2bCustomer.state.${row.state}` }),
			enableColumnFilter: true,
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: userStateOptions,
			},
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.credit.title' })}`,
			id: UserListListTableKeys.CREDIT,
			accessorKey: UserListListTableKeys.CREDIT,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.credibility.title' })}`,
			id: UserListListTableKeys.CREDIBILITY,
			cell: ({ row }) => {
				const validationData = row.original?.validationData;
				const isUnreliableVatPayer = validationData?.isVatPayer
					? !validationData?.isVatPayerTrustworthy
					: false;
				const hasIsirRecord = !!validationData?.hasRecordInIsir;
				return (
					<>
						{isUnreliableVatPayer && (
							<div>
								{t({ id: 'admin.b2bCustomer.isUnreliableVatPayer.title' })}
							</div>
						)}
						{hasIsirRecord && (
							<div>{t({ id: 'admin.b2bCustomer.hasIsirRecord.title' })}</div>
						)}
					</>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.actions.title' })}`,
			id: UserListListTableKeys.ACTIONS,
			cell: ({ row }) => (
				<div>
					{row.original.state === VinistoHelperDllEnumsUserUserState.Active ? (
						<Link to={`/basket?customerId=${row.original.id}`}>
							{t({ id: 'admin.b2bCustomer.createOrder.title' })}
						</Link>
					) : null}
				</div>
			),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const detailUrlByUserTypeMap = {
		[VinistoHelperDllEnumsUserUserType.B2C]: `user-detail`,
		[VinistoHelperDllEnumsUserUserType.Company]: `b2b-customer-detail`,
		[VinistoHelperDllEnumsUserUserType.Merchant]: `merchant-detail`,
	};

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) =>
		navigateWithNewtabOption(
			`/${detailUrlByUserTypeMap[userType]}/${entity.id}`,
			event
		);

	const handleOpenCreateModal = useCallback(() => {
		handleOpenModal(createModalType, {
			resetUserList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [createModalType, handleOpenModal, dispatch]);

	useEffect(() => {
		const { limit, offset, sorting, filters } = state;
		const [sortByColumn] = sorting;

		const apiParams: { key: string; value: any }[] = [
			{
				key: 'UserLoginHash',
				value: userLoginHash || null,
			},
			{ key: 'limit', value: limit },
			{ key: 'offset', value: offset },
		];

		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		filters?.forEach((filter) => {
			const { id, value } = filter;

			if (id === UserListListTableKeys.EMAIL) {
				apiParams.push({ key: 'SearchEmail', value });
			} else if (id === UserListListTableKeys.IS_IN_SUPPLIER) {
				apiParams.push({ key: 'IsInSupplier', value });
			} else if (id === UserListListTableKeys.IS_SUPER_ADMIN) {
				apiParams.push({ key: 'IsSuperAdmin', value });
			} else if (id === UserListListTableKeys.HAS_PERMISSION) {
				apiParams.push({ key: 'HasPermission', value });
			} else if (id === UserListListTableKeys.REGISTRATION_COUNTRY) {
				// TODO use filter mapping from constants.ts
				apiParams.push({ key: 'RegistrationCountry', value });
			} else if (id === UserListListTableKeys.ICO) {
				apiParams.push({ key: 'SearchByCompanyIco', value });
			} else if (id === UserListListTableKeys.COMPANY) {
				apiParams.push({ key: 'SearchByCompanyName', value });
			} else if (id === UserListListTableKeys.COMPANY_EMAIL) {
				apiParams.push({ key: 'SearchByCompanyEmail', value });
			} else if (id === UserListListTableKeys.MERCHANT_ID) {
				apiParams.push({ key: 'SearchCompaniesByMerchantId', value });
			} else if (id === UserListListTableKeys.STATE) {
				apiParams.push({ key: 'SearchByUserState', value });
			}
		});

		apiParams.push({ key: 'SearchUsersTypes', value: userType });

		fetchData(
			'user-api/users',
			apiParams,
			(payload) => payload.users ?? [],
			'admin.userList.loadingError',
			API_METHOD.GET
		);
	}, [merchants, userLoginHash, fetchData, state, t, userType]);

	const createLabelsMap: Record<VinistoHelperDllEnumsUserUserType, string> = {
		[VinistoHelperDllEnumsUserUserType.B2C]: 'admin.userList.createUser',
		[VinistoHelperDllEnumsUserUserType.Company]:
			'admin.userList.createB2bCustomer',
		[VinistoHelperDllEnumsUserUserType.Merchant]:
			'admin.userList.createMerchant',
	};

	const hasUserPermission = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER
	);

	return (
		<AdminListPage<VinistoAuthDllModelsApiUserCompany>
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel={
				createLabelsMap[userType] ?? VinistoHelperDllEnumsUserUserType.B2C
			}
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			defaultColumnsExcluded={[
				UserListListTableKeys.CREDIT,
				...(!hasUserPermission ? [UserListListTableKeys.MERCHANT_ID] : []),
			]}
			columnOrder={[
				UserListListTableKeys.COMPANY,
				UserListListTableKeys.ICO,
				UserListListTableKeys.COMPANY_EMAIL,
				UserListListTableKeys.PRICE_LEVEL,
				UserListListTableKeys.MERCHANT_ID,
				UserListListTableKeys.STATE,
				UserListListTableKeys.CREDIT,
				UserListListTableKeys.CREDIBILITY,
				UserListListTableKeys.ACTIONS,
			]}
		/>
	);
};

export default B2bCustomerList;

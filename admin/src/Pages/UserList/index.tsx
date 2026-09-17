import { countryCodeToCountryNameMap } from 'Pages/BundleDetail/constants';
import { useCallback, useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IDbEntity, IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import useTableSchema from 'Hooks/useTableSchema';
import useAdminTable from 'Hooks/useAdminTable';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { FaRegStar } from 'react-icons/fa';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import { prepareData } from './helpers';
import {
	DEFAULT_SORT,
	SORTING_COLUMN_MAP,
	UserListListTableKeys,
} from './constants';

import './styles.css';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';

const UserListPage = ({
	userType,
	createModalType,
	listSuperAdminsOnly = false,
	listSuppliersOnly = false,
}: {
	userType: VinistoHelperDllEnumsUserUserType;
	createModalType: string;
	listSuperAdminsOnly?: boolean;
	listSuppliersOnly?: boolean;
}) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);

	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable(DEFAULT_SORT);

	const dateFormat = `${t({ id: 'admin.dateFormat' })}`;
	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.userDetail.email.label' })}`,
			id: UserListListTableKeys.EMAIL,
			accessorKey: UserListListTableKeys.EMAIL,
			cell: (context) => {
				return context.row.original.isSuperAdmin ? (
					<>
						{context.row.original.email}
						<FaRegStar className="star-icon" />
					</>
				) : (
					context.row.original.email
				);
			},
		},
		{
			header: `${t({ id: 'admin.userDetail.createdAt.label' })}`,
			id: UserListListTableKeys.CREATED_AT,
			accessorFn: (row: IPageListTableRow) =>
				dayjs.unix(row.createdAt ?? 0).format(dateFormat),
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.userDetail.lastLoginTime.label' })}`,
			id: UserListListTableKeys.LAST_LOGIN_TIME,
			accessorFn: (row) =>
				row.lastLoginTime
					? dayjs.unix(row.lastLoginTime).format(dateFormat)
					: null,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.userDetail.registrationCountry.label' })}`,
			id: UserListListTableKeys.REGISTRATION_COUNTRY,
			accessorKey: UserListListTableKeys.REGISTRATION_COUNTRY,
			cell: (context) => {
				return t({
					id: countryCodeToCountryNameMap[
						context.row.original
							.registrationCountry as VinistoHelperDllEnumsCountryCode
					],
				});
			},
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(countryCodeToCountryNameMap).map(
					([key, value]) => [key, `${t({ id: value })}`]
				),
			},
		},
		{
			header: `${t({ id: 'admin.userDetail.isSupplier.label' })}`,
			id: UserListListTableKeys.IS_IN_SUPPLIER,
			accessorFn: (row) => {
				return (row.suppliers && row.suppliers.length) > 0
					? t({ id: 'admin.yes' })
					: t({ id: 'admin.no' });
			},
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
		{
			header: `${t({ id: 'admin.userDetail.isSuperAdmin.label' })}`,
			id: UserListListTableKeys.IS_SUPER_ADMIN,
			accessorFn: (row) => {
				return row.isSuperAdmin
					? t({ id: 'admin.yes' })
					: t({ id: 'admin.no' });
			},
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
		{
			header: `${t({ id: 'admin.userDetail.hasPermissons.label' })}`,
			id: UserListListTableKeys.HAS_PERMISSION,
			accessorFn: (row) => {
				return row.permissions.length > 0
					? t({ id: 'admin.yes' })
					: t({ id: 'admin.no' });
			},
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
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
				value: vinistoUser?.loginHash || null,
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
			} else if (
				id === UserListListTableKeys.IS_IN_SUPPLIER &&
				!listSuppliersOnly
			) {
				apiParams.push({ key: 'IsInSupplier', value });
			} else if (
				id === UserListListTableKeys.IS_SUPER_ADMIN &&
				!listSuperAdminsOnly
			) {
				apiParams.push({ key: 'IsSuperAdmin', value });
			} else if (id === UserListListTableKeys.HAS_PERMISSION) {
				apiParams.push({ key: 'HasPermission', value });
			} else if (id === UserListListTableKeys.REGISTRATION_COUNTRY) {
				apiParams.push({ key: 'RegistrationCountry', value });
			}
		});

		apiParams.push({ key: 'SearchUsersTypes', value: userType });

		if (listSuperAdminsOnly) {
			apiParams.push({ key: 'IsSuperAdmin', value: true });
		}

		if (listSuppliersOnly) {
			apiParams.push({ key: 'IsInSupplier', value: true });
		}

		fetchData(
			'user-api/users',
			apiParams,
			(payload: { users?: IDbEntity[] }) => prepareData(payload.users ?? []),
			'admin.userList.loadingError',
			API_METHOD.GET
		);
	}, [
		vinistoUser,
		fetchData,
		state,
		t,
		userType,
		listSuperAdminsOnly,
		listSuppliersOnly,
	]);

	const createLabelsMap: Record<VinistoHelperDllEnumsUserUserType, string> = {
		[VinistoHelperDllEnumsUserUserType.B2C]: 'admin.userList.createUser',
		[VinistoHelperDllEnumsUserUserType.Company]:
			'admin.userList.createB2bCustomer',
		[VinistoHelperDllEnumsUserUserType.Merchant]:
			'admin.userList.createMerchant',
	};

	return (
		<AdminListPage
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
			columnOrder={[
				UserListListTableKeys.EMAIL,
				UserListListTableKeys.CREATED_AT,
				UserListListTableKeys.LAST_LOGIN_TIME,
				UserListListTableKeys.REGISTRATION_COUNTRY,
				UserListListTableKeys.IS_IN_SUPPLIER,
				UserListListTableKeys.IS_SUPER_ADMIN,
				UserListListTableKeys.HAS_PERMISSION,
			]}
		/>
	);
};

export default UserListPage;

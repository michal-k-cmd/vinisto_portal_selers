import { useCallback, useContext, useEffect } from 'react';
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
import useGetCompanies from 'Hooks/Queries/useGetCompanies';
import InitialsAvatar from 'vinisto_ui/src/components/initials-avatar';

import B2bCustomerCell from './B2bCustomerCell';
import {
	DEFAULT_SORT,
	SORTING_COLUMN_MAP,
	UserListListTableKeys,
} from './constants';

import {
	VinistoAuthDllModelsApiUserMerchant,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';

const MerchantList = ({
	userType,
	createModalType,
}: {
	userType: VinistoHelperDllEnumsUserUserType;
	createModalType: string;
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);

	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema<VinistoAuthDllModelsApiUserMerchant>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<VinistoAuthDllModelsApiUserMerchant>(DEFAULT_SORT);

	const { data: companies } = useGetCompanies({ userLoginHash });

	const tableSchema: TableSchema<VinistoAuthDllModelsApiUserMerchant> = [
		{
			header: `${t({ id: 'admin.b2bCustomer.merchant.title' })}`,
			id: UserListListTableKeys.FULL_NAME,
			cell: ({ row }) => {
				const { firstName, surname, email } = row.original;
				const user = {
					firstName: firstName ?? '',
					lastName: row.original.surname ?? '',
					email: email ?? '',
				};
				return (
					<div className="d-flex gap-3 align-items-center">
						<InitialsAvatar user={user} />
						<div className="lh-1">
							<div>
								<strong>{`${firstName} ${surname}`}</strong>
							</div>
							<small>{email}</small>
						</div>
					</div>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.feePercentage.title' })}`,
			id: UserListListTableKeys.FEE_PERCENTAGE,
			cell: ({ row }) => `${row.original.feePercentage} %`,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.b2bCustomers.title' })}`,
			id: UserListListTableKeys.COMPANIES,
			cell: ({ row }) => <B2bCustomerCell merchant={row.original} />,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.b2bCustomer.state.title' })}`,
			id: UserListListTableKeys.STATE,
			accessorFn: (row) => t({ id: `admin.b2bCustomer.state.${row.state}` }),
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
				apiParams.push({ key: 'RegistrationCountry', value });
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
	}, [companies, userLoginHash, fetchData, state, t, userType]);

	const createLabelsMap: Record<VinistoHelperDllEnumsUserUserType, string> = {
		[VinistoHelperDllEnumsUserUserType.B2C]: 'admin.userList.createUser',
		[VinistoHelperDllEnumsUserUserType.Company]:
			'admin.userList.createB2bCustomer',
		[VinistoHelperDllEnumsUserUserType.Merchant]:
			'admin.userList.createMerchant',
	};

	return (
		<AdminListPage<VinistoAuthDllModelsApiUserMerchant>
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
				UserListListTableKeys.FULL_NAME,
				UserListListTableKeys.FEE_PERCENTAGE,
				UserListListTableKeys.COMPANIES,
				UserListListTableKeys.STATE,
			]}
		/>
	);
};

export default MerchantList;

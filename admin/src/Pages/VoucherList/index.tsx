import AdminListPage from 'Components/AdminListPage';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { CREATE_VOUCHER } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useAdminTable from 'Hooks/useAdminTable';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import useTableSchema from 'Hooks/useTableSchema';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import { get } from 'Helpers/lodash';
import { useCallback, useContext, useEffect } from 'react';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	DiscountCouponListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from './constants';

import { VinistoHelperDllEnumsDiscountCouponDiscountCouponType } from '@/api-types/order-api';

const VoucherListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.couponDetail.code.label' })}`,
			id: DiscountCouponListTableKeys.CODE,
			accessorKey: DiscountCouponListTableKeys.CODE,
		},
		{
			header: `${t({ id: 'admin.voucherList.amountValue' })}`,
			id: DiscountCouponListTableKeys.AMOUNT_VALUE,
			accessorKey: DiscountCouponListTableKeys.AMOUNT_VALUE,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.voucherList.amountCurrency' })}`,
			id: DiscountCouponListTableKeys.AMOUNT_CURRENCY,
			accessorKey: DiscountCouponListTableKeys.AMOUNT_CURRENCY,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.couponDetail.canBeApplied.label' })}`,
			id: DiscountCouponListTableKeys.CAN_BE_APPLIED,
			accessorKey: DiscountCouponListTableKeys.CAN_BE_APPLIED,
			enableSorting: false,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
		{
			header: `${t({ id: 'admin.couponDetail.validFrom.label' })}`,
			id: DiscountCouponListTableKeys.VALID_FROM,
			accessorKey: DiscountCouponListTableKeys.VALID_FROM,
			accessorFn: (row) => {
				return dayjs
					.unix(get(row, 'validFrom', 0))
					.format(`${t({ id: 'admin.dateFormat' })}`);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},

		{
			header: `${t({ id: 'admin.couponDetail.validTo.label' })}`,
			id: DiscountCouponListTableKeys.VALID_TO,
			accessorKey: DiscountCouponListTableKeys.VALID_TO,
			accessorFn: (row) => {
				return dayjs
					.unix(get(row, 'validTo', 0))
					.format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},

		{
			header: `${t({ id: 'admin.couponDetail.isActive.label' })}`,
			id: DiscountCouponListTableKeys.IS_ACTIVE,
			accessorKey: DiscountCouponListTableKeys.IS_ACTIVE,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/voucher-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_VOUCHER, {
			refetchVoucherList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
		];

		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach((filter) => {
			const { id, value } = filter;

			if (
				id === DiscountCouponListTableKeys.VALID_TO &&
				typeof value === 'string'
			) {
				const [dateFrom = '', dateTo = ''] = value.split(
					RANGE_DATE_FILTER_DELIMITER
				);
				apiParams.push({ key: 'ExpirationTimeFrom', value: dateFrom });
				apiParams.push({ key: 'ExpirationTimeTo', value: dateTo });
			} else if (Object.hasOwn(FILTER_COLUMN_MAP, id)) {
				apiParams.push({ key: FILTER_COLUMN_MAP[id], value: value ?? '' });
			}
		});

		apiParams.push({
			key: 'SearchDiscountCouponType',
			value: VinistoHelperDllEnumsDiscountCouponDiscountCouponType.GIFT,
		});

		fetchData(
			'order-api/discount-coupons',
			apiParams,
			(payload) => get(payload, 'discountCoupons', []) ?? [],
			'admin.couponList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.voucherList.createVoucher"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				DiscountCouponListTableKeys.CODE,
				DiscountCouponListTableKeys.AMOUNT_VALUE,
				DiscountCouponListTableKeys.AMOUNT_CURRENCY,
				DiscountCouponListTableKeys.CAN_BE_APPLIED,
				DiscountCouponListTableKeys.VALID_FROM,
				DiscountCouponListTableKeys.VALID_TO,
				DiscountCouponListTableKeys.IS_ACTIVE,
			]}
		/>
	);
};

export default VoucherListPage;

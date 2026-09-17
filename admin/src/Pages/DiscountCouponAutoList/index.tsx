import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import useAutomaticCoupon from 'Hooks/useAutomaticCoupon';
import useTableSchema from 'Hooks/useTableSchema';
import useAdminTable from 'Hooks/useAdminTable';
import AdminListPage from 'Components/AdminListPage';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	DiscountCouponAutoListTableKeys,
	discountCouponTypesTranslationMap,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from './constants';
import { DiscountCouponAutoTableRow } from './interfaces';

const DiscountCouponAutoListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema<DiscountCouponAutoTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<DiscountCouponAutoTableRow>();

	const { remove } = useAutomaticCoupon();

	const refetch = () =>
		dispatch({ type: PageListAction.setShouldReload, value: true });

	const handleOnEdit = (automaticCoupon: DiscountCouponAutoTableRow) => () => {
		modalContext.handleOpenModal('DISCOUNT_COUPON_AUTO_UPDATE', {
			automaticCoupon,
			refetch,
		});
	};

	const handleOnDelete = (itemId: string) => async () => {
		await remove(itemId);
		refetch();
	};

	const handleOnCreate = () => {
		modalContext.handleOpenModal('DISCOUNT_COUPON_AUTO_CREATE', { refetch });
	};

	const translateTriggerValue = (value: string) => {
		switch (value) {
			case 'NEW_USER_REGISTRATION':
				return t({ id: 'trigger.newUserRegistration' });
			case 'NEXT_ORDER':
				return t({ id: 'trigger.nextOrder' });
			default:
				return value;
		}
	};

	const tableSchema: TableSchema<DiscountCouponAutoTableRow> = [
		{
			header: `${t({ id: 'admin.couponAutoList.description.label' })}`,
			id: DiscountCouponAutoListTableKeys.NAME_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.NAME_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.description.trigger' })}`,
			id: DiscountCouponAutoListTableKeys.TRIGGER_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.TRIGGER_COLUMN,
			accessorFn: (row) => translateTriggerValue(row.trigger.type),
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.type.label' })}`,
			id: DiscountCouponAutoListTableKeys.TYPE_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.TYPE_COLUMN,
			accessorFn: (row) =>
				t({
					id: discountCouponTypesTranslationMap[row.discountType],
				}),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.discountValue.label' })}`,
			id: DiscountCouponAutoListTableKeys.DISCOUNT_VALUE_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.DISCOUNT_VALUE_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.currency.label' })}`,
			id: DiscountCouponAutoListTableKeys.CURRENCY_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.CURRENCY_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.priceFrom.label' })}`,
			id: DiscountCouponAutoListTableKeys.PRICE_FROM_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.PRICE_FROM_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.language.label' })}`,
			id: DiscountCouponAutoListTableKeys.LANGUAGE_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.LANGUAGE_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.validFor.label' })}`,
			id: DiscountCouponAutoListTableKeys.VALID_FOR_COLUMN,
			accessorKey: DiscountCouponAutoListTableKeys.VALID_FOR_COLUMN,
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.couponAutoList.actions.label' })}`,
			id: 'actions',
			cell: (entity) => (
				<div className="d-flex gap-2 text-end flex-nowrap">
					<Button onClick={handleOnEdit(entity.row.original)}>
						{t({ id: 'admin.bannerList.edit' })}
					</Button>
					<Button onClick={handleOnDelete(entity.row.id)}>
						{t({ id: 'admin.bannerList.delete' })}
					</Button>
				</div>
			),
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

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
			if (Object.hasOwn(FILTER_COLUMN_MAP, filter.id)) {
				apiParams.push({
					key: FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}
		});

		const handleDataChanged = () => {
			fetchData(
				'order-api/automatic-coupons',
				apiParams,
				(payload) => payload.automaticCoupons ?? [],
				'admin.couponList.loadingError',
				API_METHOD.GET
			);
		};

		handleDataChanged();
	}, [fetchData, state.filters, state.limit, state.offset, state.sorting]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			btnCreateLabel="admin.couponAutoList.couponCreate"
			handleOpenCreateModal={() => handleOnCreate()}
			handleOnTableRowClick={() => undefined}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				DiscountCouponAutoListTableKeys.NAME_COLUMN,
				DiscountCouponAutoListTableKeys.TRIGGER_COLUMN,
				DiscountCouponAutoListTableKeys.TYPE_COLUMN,
				DiscountCouponAutoListTableKeys.DISCOUNT_VALUE_COLUMN,
				DiscountCouponAutoListTableKeys.CURRENCY_COLUMN,
				DiscountCouponAutoListTableKeys.PRICE_FROM_COLUMN,
				DiscountCouponAutoListTableKeys.LANGUAGE_COLUMN,
				DiscountCouponAutoListTableKeys.VALID_FOR_COLUMN,
			]}
		/>
	);
};

export default DiscountCouponAutoListPage;

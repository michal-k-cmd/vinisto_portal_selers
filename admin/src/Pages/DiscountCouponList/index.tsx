import AdminListPage from 'Components/AdminListPage';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { LIMITATION_TYPE_TRANSLATION_MAP } from 'Components/Modal/Components/CreateDiscountCoupon/constants';
import { CREATE_COUPON } from 'Components/Modal/constants';
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
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	DiscountCouponListTableKeys,
	discountCouponTypesTranslationMap,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from './constants';

import SupplierService from '@/supplier-service';
import { VinistoHelperDllEnumsSupplierSortableColumns } from '@/api-types/supplier-api';
import { VinistoHelperDllEnumsDiscountCouponDiscountCouponType } from '@/api-types/order-api';

const { getAll } = SupplierService;

const DiscountCouponListPage = ({
	showOnlySupplierCoupons = false,
}: {
	showOnlySupplierCoupons: boolean;
}) => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const suppliersQuery = useQuery(
		['suppliers'],
		() =>
			getAll({
				UserLoginHash: loginHash,
				Limit: 0,
				SortingColumn: VinistoHelperDllEnumsSupplierSortableColumns.NAME,
			}),
		{
			enabled: showOnlySupplierCoupons,
		}
	);

	const supplierOptions: [value: string, label: string][] = useMemo(() => {
		if (suppliersQuery.isSuccess) {
			return suppliersQuery.data?.map((supplier) => [
				supplier.id,
				supplier.nameWeb,
			]);
		}

		return [];
	}, [suppliersQuery]);

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.couponDetail.code.label' })}`,
			id: DiscountCouponListTableKeys.CODE,
			accessorKey: DiscountCouponListTableKeys.CODE,
		},
		{
			header: `${t({ id: 'admin.couponDetail.isReusable.label' })}`,
			id: DiscountCouponListTableKeys.IS_REUSABLE,
			accessorKey: DiscountCouponListTableKeys.IS_REUSABLE,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
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
			header: `${t({ id: 'admin.couponDetail.type.label' })}`,
			id: DiscountCouponListTableKeys.TYPE,
			accessorKey: DiscountCouponListTableKeys.TYPE,
			accessorFn: (row) =>
				row.discountCouponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.GIFT
					? ''
					: t({
							id: discountCouponTypesTranslationMap[
								row.discountCouponType as keyof typeof discountCouponTypesTranslationMap
							],
					  }),

			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(
					discountCouponTypesTranslationMap
				).map(([key, value]) => [key, `${t({ id: value })}`]),
			},
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
		...(showOnlySupplierCoupons
			? [
					{
						header: `${t({
							id: 'admin.header.coupon.limitationType.supplier',
						})}`,
						id: DiscountCouponListTableKeys.LIMITATION_TYPE_SUPPLIER,
						accessorKey: DiscountCouponListTableKeys.LIMITATION_TYPE_SUPPLIER,
						accessorFn: (row: Record<PropertyKey, any>) =>
							row.limitationDefinition?.supplierName,
						meta: {
							filterType: AdminTableFilterType.MULTISELECT,
							dropDownFilterOptions: supplierOptions,
						},
						enableSorting: false,
					},
			  ]
			: []),
		{
			header: `${t({ id: 'admin.couponDetail.condition.label' })}`,
			id: 'limitationDefinition.limitationType',
			accessorKey: 'limitationDefinition.limitationType',
			accessorFn: (row) => {
				const type = row.limitationDefinition?.limitationType;
				if (!type)
					return t({ id: LIMITATION_TYPE_TRANSLATION_MAP.NO_LIMITATION });
				return t({
					id:
						LIMITATION_TYPE_TRANSLATION_MAP[
							type as keyof typeof LIMITATION_TYPE_TRANSLATION_MAP
						] ?? '',
				});
			},
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions: [
					[
						'NO_LIMITATION',
						t({
							id: 'admin.header.coupon.limitationType.none',
						})?.toString() ?? '',
					],
					[
						'CATEGORY_LIMITATION',
						t({
							id: 'admin.header.coupon.limitationType.category',
						})?.toString() ?? '',
					],
					[
						'SPECIFICATION_LIMITATION',
						t({
							id: 'admin.header.coupon.limitationType.specification',
						})?.toString() ?? '',
					],
					[
						'SUPPLIER_LIMITATION',
						t({
							id: 'admin.header.coupon.limitationType.supplier',
						})?.toString() ?? '',
					],
				],
			},
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.couponDetail.isVisibleOnProductDetail.label',
			})}`,
			id: 'col' + DiscountCouponListTableKeys.IS_VISIBLE_ON_PRODUCT_DETAIL,
			accessorKey: DiscountCouponListTableKeys.IS_VISIBLE_ON_PRODUCT_DETAIL,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
			enableSorting: false,
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
	) => navigateWithNewtabOption(`/discount-coupon-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_COUPON, {
			resetCouponList: () => dispatch({ type: PageListAction.reset }),
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
			} else if (id === DiscountCouponListTableKeys.IS_REUSABLE) {
				apiParams.push({ key: 'IsReusable', value: value });
			} else if (id === DiscountCouponListTableKeys.CAN_BE_APPLIED) {
				apiParams.push({ key: 'CanBeApplied', value: value });
			} else if (id === DiscountCouponListTableKeys.LIMITATION_TYPE) {
				String(value)
					.split(',')
					.forEach((item) => {
						apiParams.push({ key: FILTER_COLUMN_MAP[id], value: item });
					});
			} else if (id === DiscountCouponListTableKeys.LIMITATION_TYPE_SUPPLIER) {
				String(value)
					.split(',')
					.forEach((item) => {
						apiParams.push({
							key: 'SearchSuppliers',
							value: item,
						});
					});
			} else if (Object.hasOwn(FILTER_COLUMN_MAP, id)) {
				apiParams.push({ key: FILTER_COLUMN_MAP[id], value: value ?? '' });
			}
		});

		if (
			!state.filters?.some(
				(filter) => filter.id === DiscountCouponListTableKeys.TYPE
			)
		) {
			apiParams.push(
				{
					key: FILTER_COLUMN_MAP[DiscountCouponListTableKeys.TYPE],
					value: VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT,
				},
				{
					key: FILTER_COLUMN_MAP[DiscountCouponListTableKeys.TYPE],
					value:
						VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE,
				}
			);
		}

		if (showOnlySupplierCoupons) {
			apiParams.push({ key: 'IsSupplierDiscount', value: true });
		}

		fetchData(
			'order-api/discount-coupons',
			apiParams,
			(payload) => get(payload, 'discountCoupons', []) ?? [],
			'admin.couponList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, showOnlySupplierCoupons, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.couponList.couponCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				DiscountCouponListTableKeys.CODE,
				DiscountCouponListTableKeys.IS_REUSABLE,
				DiscountCouponListTableKeys.CAN_BE_APPLIED,
				DiscountCouponListTableKeys.TYPE,
				DiscountCouponListTableKeys.VALID_TO,
				...(showOnlySupplierCoupons
					? [DiscountCouponListTableKeys.LIMITATION_TYPE_SUPPLIER]
					: []),
				'limitationDefinition.limitationType',
				DiscountCouponListTableKeys.IS_VISIBLE_ON_PRODUCT_DETAIL,
				DiscountCouponListTableKeys.IS_ACTIVE,
			]}
		/>
	);
};

export default DiscountCouponListPage;

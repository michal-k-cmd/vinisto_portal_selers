import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { CellContext } from '@tanstack/react-table';
import { confirmAlert } from 'react-confirm-alert';
import { upperCase } from 'lodash-es';
import { Button } from 'react-bootstrap';
import { dayjsInstance as dayjs } from 'Services/Date';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { Device } from 'Services/DeviceService/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { DropdownFilterProps } from 'Components/AdminTable/Filters/Dropdown/interfaces';
import { BiPlus } from 'react-icons/bi';
import { apiServiceInstance } from 'Services/ApiService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	RANGE_DATE_FILTER_DELIMITER,
	RANGE_DATE_FILTER_MAX_VALUE,
	RANGE_DATE_FILTER_MIN_VALUE,
} from 'Components/AdminTable/Filters/RangeDate/constants';

import {
	CRUD_MODE,
	DiscountCouponListTableKeys,
	FILTER_COLUMN_MAP,
	LIST_API_ENDPOINT,
	SORTING_COLUMN_MAP,
} from './constants';
import CreateOrUpdateDiscountCouponModal from './CreateOrUpdateDiscountCouponModal';
import CreateOrUpdateDiscountCouponForm from './CreateOrUpdateDiscountCouponForm';

import { VinistoHelperDllEnumsDiscountCouponDiscountCouponType } from '@/api-types/order-api';

type ModalState = {
	isOpen: boolean;
	mode: keyof typeof CRUD_MODE;
	id?: string;
};

const DiscountCouponList = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { loginHash: userLoginHash } = authenticationContext?.vinistoUser ?? {};

	const [modalState, setModalState] = useState<ModalState>({
		isOpen: false,
		mode: CRUD_MODE.CREATE,
		id: undefined,
	});

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema();

	const { fetchData, handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable([
			{
				id: 'id',
				desc: true,
			},
		]);

	const handleDeleteCoupon = (couponId: string) => {
		confirmAlert({
			title: `${t({ id: 'discountCoupons.delete.title' })}`,
			message: `${t({ id: 'discountCoupons.delete.message' })}`,
			buttons: [
				{
					label: `${t({ id: 'yes' })}`,
					onClick: () => {
						apiServiceInstance
							.delete(`order-api/discount-coupons`, couponId, true, [
								{
									key: 'userLoginHash',
									value: String(userLoginHash),
								},
							])
							.then(() => {
								handleShowSuccessNotification(
									'discountCoupons.deleteCoupon.success'
								);
								dispatch({
									type: PageListAction.setShouldReload,
									value: true,
								});
							})
							.catch(() => {
								handleShowErrorNotification(
									'discountCoupons.deleteCoupon.error'
								);
							});
					},
				},
				{
					label: `${t({ id: 'no' })}`,
					onClick: () => undefined,
				},
			],
		});
	};

	const handleActivateCoupon = (couponId: string) => {
		confirmAlert({
			title: `${t({ id: 'discountCoupons.activate.title' })}`,
			message: `${t({ id: 'discountCoupons.activate.message' })}`,
			buttons: [
				{
					label: `${t({ id: 'yes' })}`,
					onClick: () => {
						apiServiceInstance
							.put(
								`order-api/discount-coupons/${couponId}/activate`,
								{
									userLoginHash: userLoginHash,
								},
								true
							)
							.then(() => {
								handleShowSuccessNotification(
									'discountCoupons.activateCoupon.success'
								);
								dispatch({
									type: PageListAction.setShouldReload,
									value: true,
								});
							})
							.catch(() => {
								handleShowErrorNotification(
									'discountCoupons.activateCoupon.error'
								);
							});
					},
				},
				{
					label: `${t({ id: 'no' })}`,
					onClick: () => undefined,
				},
			],
		});
	};

	const isReusableCell = (table: CellContext<PageListTableRow, unknown>) => {
		const isReusable = table.row.original.isReusable;
		return isReusable
			? t({ id: 'discountCoupons.reusable' })
			: t({ id: 'discountCoupons.disposable' });
	};

	const isUsedCell = (table: CellContext<PageListTableRow, unknown>) => {
		const isUsed = table.row.original.isUsed;
		return isUsed
			? t({ id: 'discountCoupons.isUsedYes' })
			: t({ id: 'discountCoupons.isUsedNo' });
	};

	const couponTypeCell = (table: CellContext<PageListTableRow, unknown>) => {
		const discountCouponType = table.row.original.discountCouponType;
		if (
			discountCouponType ===
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
		)
			return t({ id: 'discountCoupons.amount' });

		if (
			discountCouponType ===
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
		)
			return t({ id: 'discountCoupons.percentage.alt' });
		return null;
	};

	const discountCell = (table: CellContext<PageListTableRow, unknown>) => {
		const discountCouponType = table.row.original.discountCouponType;
		if (
			discountCouponType ===
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
		) {
			const discountAmount = table.row.original.amountDiscount;
			return `${discountAmount.value} ${t({ id: 'currency' })}`;
		}
		if (
			discountCouponType ===
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE
		) {
			const discountPercentage = table.row.original.percentageDiscount;
			return `${discountPercentage} %`;
		}
		return null;
	};

	const dateCell =
		(propName: keyof PageListTableRow) =>
		(table: CellContext<PageListTableRow, unknown>) => {
			if (!table.row.original[propName]) return null;
			const date = dayjs.unix(table.row.original[propName]);
			return `${date.format('D. M. YYYY')}`;
		};

	const allowedFromCell = (table: CellContext<PageListTableRow, unknown>) => {
		const value = table.row.original.allowedFrom?.value;
		if (!value) return null;
		if (Number.isInteger(value))
			return `${value} ${t({
				id: 'currency',
			})}`;
		return `${table.row.original.allowedFrom?.value?.toFixed(2)} ${t({
			id: 'currency',
		})}`;
	};

	const isActiveCell = (table: CellContext<PageListTableRow, unknown>) => {
		return (
			<span style={{ textTransform: 'uppercase' }}>
				{table.row.original.isActive ? t({ id: 'yes' }) : t({ id: 'no' })}
			</span>
		);
	};

	const actionButtonsCell = (table: CellContext<PageListTableRow, unknown>) => {
		// if (table.row.original.isActive) return null;
		return (
			<div
				className={cx('d-flex gap-2', {
					['invisible pointer-events-none']: table.row.original.isActive,
				})}
			>
				<Button
					size="sm"
					className="vinisto-admin-order-action-btn"
					onClick={() => {
						setModalState({
							isOpen: true,
							mode: CRUD_MODE.UPDATE,
							id: table.row.original.id,
						});
					}}
				>
					{t({ id: 'edit' })}
				</Button>
				<Button
					size="sm"
					className="vinisto-admin-order-action-btn btn btn-cancel"
					onClick={() => handleDeleteCoupon(table.row.original.id)}
				>
					{t({ id: 'delete' })}
				</Button>
				<Button
					size="sm"
					className="vinisto-admin-order-action-btn btn btn-ok"
					onClick={() => handleActivateCoupon(table.row.original.id)}
				>
					{t({ id: 'activate' })}
				</Button>
			</div>
		);
	};

	const isReusableOptions: DropdownFilterProps['options'] = useMemo(
		() => [
			[String(true), `${t({ id: 'discountCoupons.reusable' })}`],
			[String(false), `${t({ id: 'discountCoupons.disposable' })}`],
		],
		[t]
	);

	const discountTypeOptions: DropdownFilterProps['options'] = useMemo(
		() => [
			[
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT,
				`${t({ id: 'discountCoupons.amount' })}`,
			],
			[
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE,
				`${t({ id: 'discountCoupons.percentage.alt' })}`,
			],
		],
		[t]
	);

	const isActiveOptions: DropdownFilterProps['options'] = useMemo(
		() => [
			[String(true), upperCase(`${t({ id: 'yes' })}`)],
			[String(false), upperCase(`${t({ id: 'no' })}`)],
		],
		[t]
	);

	const tableSchema: TableSchema = [
		{
			id: DiscountCouponListTableKeys.CODE,
			header: `${t({ id: 'discountCoupons.code' })}`,
			accessorKey: DiscountCouponListTableKeys.CODE,
			enableColumnFilter: true,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},

		{
			id: DiscountCouponListTableKeys.IS_REUSABLE,
			header: `${t({ id: 'discountCoupons.isReusable' })}`,
			accessorKey: DiscountCouponListTableKeys.IS_REUSABLE,
			cell: isReusableCell,
			enableColumnFilter: true,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				filterOptions: isReusableOptions,
			},
		},
		{
			id: DiscountCouponListTableKeys.TYPE,
			header: `${t({ id: 'discountCoupons.discountCouponType' })}`,
			accessorKey: DiscountCouponListTableKeys.TYPE,
			cell: couponTypeCell,
			enableColumnFilter: true,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				filterOptions: discountTypeOptions,
			},
		},
		{
			id: 'amountDiscount',
			header: `${t({ id: 'discountCoupons.amountOrPercentage' })}`,
			accessorKey: 'amountDiscount',
			cell: discountCell,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: DiscountCouponListTableKeys.VALID_TO,
			header: `${t({ id: 'discountCoupons.validTo' })}`,
			accessorKey: DiscountCouponListTableKeys.VALID_TO,
			cell: dateCell(DiscountCouponListTableKeys.VALID_TO),
			enableColumnFilter: true,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			id: DiscountCouponListTableKeys.CREATION_DATE,
			header: `${t({ id: 'discountCoupons.creationDate' })}`,
			accessorKey: DiscountCouponListTableKeys.CREATION_DATE,
			cell: dateCell(DiscountCouponListTableKeys.CREATION_DATE),
			enableColumnFilter: true,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			id: 'allowedFrom',
			header: `${t({ id: 'discountCoupons.allowedFrom' })}`,
			accessorKey: 'allowedFrom',
			cell: allowedFromCell,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: 'isActive',
			header: `${t({ id: 'discountCoupons.isActive' })}`,
			accessorKey: 'isActive',
			cell: isActiveCell,
			enableColumnFilter: true,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				filterOptions: isActiveOptions,
			},
		},
		{
			id: 'isUsed',
			header: `${t({ id: 'discountCoupons.isUsed' })}`,
			accessorKey: 'isUsed',
			cell: isUsedCell,
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: 'action',
			header: '',
			cell: actionButtonsCell,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		if (userLoginHash === '') return;

		const apiParams = [
			{
				key: 'Limit',
				value: state.limit,
			},
			{
				key: 'Offset',
				value: state.offset,
			},
			{
				key: 'UserLoginHash',
				value: String(userLoginHash),
			},
			{
				key: 'SearchSuppliers',
				value: String(authenticationContext.activeSupplierId),
			},
		];

		const [sortByColumn] = state.sorting;
		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn?.id],
			});
			apiParams.push({
				key: 'IsSortingDescending',
				value: String(sortByColumn.desc),
			});
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
				apiParams.push({
					key: 'ExpirationTimeFrom',
					value: dateFrom || RANGE_DATE_FILTER_MIN_VALUE,
				});
				apiParams.push({
					key: 'ExpirationTimeTo',
					value: dateTo || RANGE_DATE_FILTER_MAX_VALUE,
				});
			} else if (
				id === DiscountCouponListTableKeys.CREATION_DATE &&
				typeof value === 'string'
			) {
				const [dateFrom = '', dateTo = ''] = value.split(
					RANGE_DATE_FILTER_DELIMITER
				);
				apiParams.push({
					key: 'CreationTimeFrom',
					value: dateFrom || RANGE_DATE_FILTER_MIN_VALUE,
				});
				apiParams.push({
					key: 'CreationTimeTo',
					value: dateTo || RANGE_DATE_FILTER_MAX_VALUE,
				});
			} else if (id === DiscountCouponListTableKeys.IS_REUSABLE) {
				apiParams.push({
					key: 'IsReusable',
					value: String(value),
				});
			} else if (id === DiscountCouponListTableKeys.CAN_BE_APPLIED) {
				apiParams.push({
					key: 'CanBeApplied',
					value: String(value),
				});
			} else if (id === DiscountCouponListTableKeys.LIMITATION_TYPE) {
				String(value)
					.split(',')
					.forEach((item) => {
						apiParams.push({ key: FILTER_COLUMN_MAP[id], value: item });
					});
			} else if (Object.hasOwn(FILTER_COLUMN_MAP, id)) {
				apiParams.push({ key: FILTER_COLUMN_MAP[id], value: String(value) });
			}
		});

		fetchData(
			LIST_API_ENDPOINT,
			apiParams,
			(response) => response.discountCoupons,
			'discountCoupons.loadingError',
			API_METHOD.GET
		);
	}, [
		userLoginHash,
		state.sorting,
		state.limit,
		state.offset,
		fetchData,
		state.filters,
		authenticationContext.activeSupplierId,
	]);

	useDidMountEffect(() => {
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [authenticationContext.activeSupplierId]);

	const handleCloseModal = useCallback(() => {
		setModalState({ ...modalState, isOpen: false });
	}, [modalState]);

	return (
		<>
			<CreateOrUpdateDiscountCouponModal
				isOpen={modalState.isOpen}
				handleClose={handleCloseModal}
				mode={modalState.mode}
				discountCouponId={modalState.id}
			>
				<CreateOrUpdateDiscountCouponForm
					mode={modalState.mode}
					handleClose={handleCloseModal}
					discountCouponId={modalState.id}
					dispatch={dispatch}
				/>
			</CreateOrUpdateDiscountCouponModal>
			<div className="d-flex px-3 pt-3 justify-content-end">
				<Button
					className="vinisto-admin-order-action-btn btn-ok d-flex gap-1 align-items-center"
					onClick={() =>
						setModalState({ isOpen: true, mode: CRUD_MODE.CREATE })
					}
				>
					<BiPlus />
					{t({ id: 'discountCoupons.create.title' })}
				</Button>
			</div>
			<AdminListPage
				adminTableSchema={adminTableSchema}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
			/>
		</>
	);
};

export default DiscountCouponList;

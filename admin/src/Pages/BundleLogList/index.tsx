import AdminListPage from 'Components/AdminListPage';
import useAdminTable from 'Hooks/useAdminTable';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import useTableSchema from 'Hooks/useTableSchema';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { useContext, useEffect, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { dayjsInstance as dayjs } from 'Services/Date';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { APPLICATION_LOG_URI } from 'Services/Bundle/constants';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import { VinistoHelperDllEnumsActionLogApplicationLogType } from 'vinisto_api_client/src/api-types/product-api/';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { getVatValue } from 'vinisto_shared/src/price';

import { LogTableRow } from './interfaces';
import {
	ACTION_TRANSLATIONS_MAP,
	BundleActionType,
	FILTER_COLUMN_MAP,
	logListTableKeys,
	PRICE_LEVEL_TRANSLATIONS_MAP,
	SORTING_COLUMN_MAP,
} from './constants';
import {
	getDiscountPercentage,
	getRoundedPriceWithVat,
	getUniqueUserEmails,
	showSign,
} from './helpers';
import styles from './styles.module.css';

const BundleLogList = () => {
	const { useFormatMessage, activeCurrency } = useContext(LocalizationContext);
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;
	const t = useFormatMessage();
	const { bundleId } = useParams();
	const history = useNavigate();

	const getTableSchema = useTableSchema<LogTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<LogTableRow>();

	const uniqueUserEmails = useMemo(() => {
		return getUniqueUserEmails(state.data);
	}, [state.data]);

	const tableSchema: TableSchema<LogTableRow> = [
		{
			id: logListTableKeys.TIME,
			header: `${t({ id: 'admin.logList.eventDateTime' })}`,
			accessorFn: (row) => {
				return dayjs.unix(row.time).format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
			cell: (context) => {
				return dayjs
					.unix(context.row.original.time)
					.format(`${t({ id: 'admin.dateTimeFormat' })}`);
			},
		},
		{
			id: logListTableKeys.ACTION,
			header: `${t({ id: 'admin.logList.eventType' })}`,
			accessorFn: (row) => row.action,
			cell: (context) => {
				const row = context.row.original;
				const eventType = row.action as BundleActionType;

				if (
					eventType ===
					VinistoHelperDllEnumsActionLogApplicationLogType.BUNDLE_PRICE_ADDED
				) {
					const isOldPrice = typeof row.oldPriceValue === 'number';

					if (!isOldPrice) {
						return t(
							{ id: 'admin.logList.PriceAdded.base' },
							{
								priceType: `${t({
									id: row.priceDiscountType ? 'discount' : 'price',
								})}`,
								price: (
									<strong
										className={cx(styles.price, {
											[styles.discount]: !!row.priceDiscountType,
										})}
									>
										{getRoundedPriceWithVat(
											row.newPriceValue ?? 0,
											getVatValue(row.newPriceVat)
										)}
									</strong>
								),
								currency: (
									<strong
										className={cx(styles.price, {
											[styles.discount]: !!row.priceDiscountType,
										})}
									>
										{activeCurrency.currency}
									</strong>
								),
								vat: getVatValue(row.newPriceVat),
							}
						);
					}

					const discountPercentage = Math.round(
						getDiscountPercentage(
							getRoundedPriceWithVat(
								row.oldPriceValue ?? 0,
								getVatValue(row.oldPriceVat)
							),
							getRoundedPriceWithVat(
								row.newPriceValue ?? 0,
								getVatValue(row.newPriceVat)
							)
						)
					);

					return t(
						{ id: 'admin.logList.PriceAdded.difference' },
						{
							priceType: `${t({
								id: row.priceDiscountType ? 'discount' : 'price',
							})}`,
							price: (
								<strong
									className={cx(styles.price, {
										[styles.discount]: !!row.priceDiscountType,
									})}
								>
									{getRoundedPriceWithVat(
										row.newPriceValue ?? 0,
										getVatValue(row.newPriceVat)
									)}
								</strong>
							),
							currency: (
								<strong
									className={cx(styles.price, {
										[styles.discount]: !!row.priceDiscountType,
									})}
								>
									{activeCurrency.currency}
								</strong>
							),
							vat: getVatValue(row.newPriceVat),
							difference: showSign(discountPercentage),
							oldPrice: (
								<strong
									className={cx(styles.price, {
										[styles.discount]: !!row.priceDiscountType,
									})}
								>
									{getRoundedPriceWithVat(
										row.oldPriceValue ?? 0,
										getVatValue(row.oldPriceVat)
									)}
								</strong>
							),
							oldVat: getVatValue(row.oldPriceVat),
						}
					);
				}

				if (
					eventType ===
					VinistoHelperDllEnumsActionLogApplicationLogType.BUNDLE_PRICE_REMOVED
				) {
					return t(
						{ id: 'admin.logList.PriceRemoved' },
						{
							priceType: `${t({
								id: row.priceDiscountType ? 'discount' : 'price',
							})}`,
							price: (
								<strong
									className={cx(styles.price, {
										[styles.discount]: !!row.priceDiscountType,
									})}
								>
									{getRoundedPriceWithVat(
										row.oldPriceValue ?? 0,
										getVatValue(row.oldPriceVat)
									)}
								</strong>
							),
							currency: (
								<strong
									className={cx(styles.price, {
										[styles.discount]: !!row.priceDiscountType,
									})}
								>
									{activeCurrency.currency}
								</strong>
							),
							vat: getVatValue(row.oldPriceVat),
						}
					);
				}
				return null as never;
			},
			enableColumnFilter: true,
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(ACTION_TRANSLATIONS_MAP).map(
					([key, value]) => [key, `${t({ id: value })}`]
				),
			},
		},
		{
			id: logListTableKeys.PRICE_LEVEL,
			header: `${t({ id: 'admin.logList.priceType' })}`,
			accessorKey: logListTableKeys.PRICE_LEVEL,
			enableColumnFilter: false,
			enableSorting: false,
			cell: (context) =>
				context.row.original.priceLevel
					? t({
							id:
								PRICE_LEVEL_TRANSLATIONS_MAP[
									context.row.original.priceLevel.toString() as keyof typeof PRICE_LEVEL_TRANSLATIONS_MAP
								] || 'unknown.priceLevel',
					  })
					: '',
		},
		{
			id: logListTableKeys.PRICE_DISCOUNT_TYPE,
			header: `${t({ id: 'admin.logList.priceType' })}`,
			accessorKey: logListTableKeys.PRICE_DISCOUNT_TYPE,
			enableColumnFilter: false,
			enableSorting: false,
			cell: (context) => context.row.original.priceDiscountType,
		},
		{
			id: logListTableKeys.USER,
			header: `${t({ id: 'admin.logList.user' })}`,
			enableColumnFilter: true,
			enableSorting: false,
			accessorFn: (row) => row.user?.email,
			cell: (context) => context.row.original.user?.email,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: uniqueUserEmails,
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = () => undefined;

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{ key: 'userLoginHash', value: loginHash },
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
			if (
				filter.id === logListTableKeys.TIME &&
				typeof filter.value === 'string'
			) {
				const [dateFrom = '', dateTo = ''] = filter.value.split(
					RANGE_DATE_FILTER_DELIMITER
				);
				apiParams.push({ key: 'TimeFrom', value: dateFrom });
				apiParams.push({ key: 'TimeTo', value: dateTo });
			} else if (Object.hasOwn(FILTER_COLUMN_MAP, filter.id)) {
				apiParams.push({
					key: FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}
		});
		fetchData(
			`${APPLICATION_LOG_URI}/${bundleId}`,
			apiParams,
			(payload) => payload.applicationLogs,
			'admin.logList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state, loginHash, bundleId]);

	return (
		<>
			<div className="d-flex flex-grow-0 mx-4">
				<Button
					className="mb-2 ms-auto me-3"
					onClick={() => {
						history(-1);
					}}
				>
					{t({ id: 'admin.btn.back' })}
				</Button>
			</div>
			<AdminListPage<LogTableRow>
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
			/>
		</>
	);
};

export default BundleLogList;

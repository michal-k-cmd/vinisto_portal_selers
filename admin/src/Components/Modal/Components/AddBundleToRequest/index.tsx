import { useContext, useEffect, useState } from 'react';
import { CCol, CContainer, CForm, CRow } from '@coreui/react';
import { Form } from 'react-final-form';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import SPECIFICATION_ID from 'Config/specificationIds';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue, {
	isLangValuePairArray,
} from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import getSpecificationValue from 'Helpers/getSpecificationValue';
import { getAmountFilter } from 'Components/AdminTable/Filters/Amount/helpers';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import AdminListPage from 'Components/AdminListPage';
import SubmitButton from 'Components/Form/Components/Submit';
import { VARIANTS } from 'Components/Warning/BundleFlagsWarning/constants';
import BundleFlagsWarning from 'Components/Warning/BundleFlagsWarning';
import {
	IS_CLEARANCE_SALE,
	IS_DELETED,
	TEMPORARY_UNAVAILABLE,
} from 'Constants/flags';

import {
	BUNDLE_STOCKING_FILTER_COLUMN_MAP,
	BUNDLE_STOCKING_SORTING_COLUMN_MAP,
	BundleStockingTableKeys,
} from './constants';
import {
	AddBundleToRequestModalData,
	AddBundleToRequestTableRows,
} from './interfaces';

import './styles.css';

import { bundleAdapter } from '@/index';

const AddBundleToRequest = () => {
	const {
		activeCurrency: { currency },
		useFormatMessage,
	} = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const modalContext = useContext(ModalContext);
	const { stockRequestId, supplierId, setRefetchKey } =
		modalContext.data as AddBundleToRequestModalData;

	const getTableSchema = useTableSchema<AddBundleToRequestTableRows>();
	const localize = useLocalizedValue();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<AddBundleToRequestTableRows>();

	const [stockUpAmount, setStockUpAmount] = useState<{
		[id: string]: number | '';
	}>({});

	const tableSchema: TableSchema<AddBundleToRequestTableRows> = [
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.id' })}`,
			accessorKey: BundleStockingTableKeys.ID,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.modal.addBundleToRequest.table.warehouseId',
			})}`,
			id: BundleStockingTableKeys.WAREHOUSE_ID,
			accessorFn: (row) => {
				return row.productsDetail
					?.map((product: any) => {
						return product.warehouseId;
					})
					.join(', ');
			},
			enableColumnFilter: true,
			enableSorting: true,
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.name' })}`,
			accessorKey: BundleStockingTableKeys.NAME,
			accessorFn: (row) => localize(row.name ?? []),
			cell: ({ row }) => {
				const { bundlePrices } = bundleAdapter.fromApi(row.original, {
					currency,
				});
				const b2cPrice = bundlePrices.basePrice;

				return (
					<div>
						{localize(row.original?.name ?? [])}
						{b2cPrice && (
							<em>
								{` (${b2cPrice.valueWithVat} ${t({
									id: b2cPrice.currency,
								})})`}
							</em>
						)}
						<BundleFlagsWarning
							flags={{
								[TEMPORARY_UNAVAILABLE]:
									row.original?.flags.isTemporaryUnavailable,
								[IS_DELETED]: row.original?.flags.isDeleted,
								[IS_CLEARANCE_SALE]: row.original?.flags.isClearanceSale,
							}}
							variant={VARIANTS.TABLE_CELL}
						/>
					</div>
				);
			},
			enableColumnFilter: true,
			enableSorting: true,
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.year' })}`,
			accessorKey: BundleStockingTableKeys.YEAR,
			accessorFn: (row) => {
				getSpecificationValue(row.specificationDetails, SPECIFICATION_ID.YEAR);
			},
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.batches' })}`,
			accessorKey: BundleStockingTableKeys.BATCHES,
			accessorFn: (row) =>
				isLangValuePairArray(
					getSpecificationValue.length &&
						getSpecificationValue(
							row.specificationDetails,
							SPECIFICATION_ID.BATCH
						)
				)
					? localize(
							getSpecificationValue(
								row.specificationDetails,
								SPECIFICATION_ID.BATCH
							)
					  )
					: '',
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.kind' })}`,
			accessorKey: BundleStockingTableKeys.KIND,
			accessorFn: (row) =>
				getSpecificationValue(
					row.specificationDetails,
					SPECIFICATION_ID.CATEGORY
				),
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.type' })}`,
			accessorKey: BundleStockingTableKeys.TYPE,
			accessorFn: (row) =>
				getSpecificationValue(row.specificationDetails, SPECIFICATION_ID.TYPE),
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.modal.addBundleToRequest.table.categorization',
			})}`,
			accessorKey: BundleStockingTableKeys.CATEGORIZATION,
			accessorFn: (row) =>
				getSpecificationValue(
					row.specificationDetails,
					SPECIFICATION_ID.CATEGORIZATION
				),
			enableColumnFilter: true,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.stock' })}`,
			accessorKey: BundleStockingTableKeys.STOCK,
			enableColumnFilter: true,
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.AMOUNT,
			},
		},
		{
			header: `${t({ id: 'admin.modal.addBundleToRequest.table.stockUp' })}`,
			cell: ({ row }) => {
				return (
					<input
						type="number"
						min="0"
						defaultValue={stockUpAmount[row.id]}
						onBlur={(e) => onStockUpChange(row.id, e.currentTarget.value)}
					/>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const onStockUpChange = (id: string, value: string) => {
		if (Number(value) === 0) {
			setStockUpAmount((stockUpAmount) => {
				/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
				const { [id]: deletedProperty, ...restOfStockUpAmount } = stockUpAmount;
				return restOfStockUpAmount;
			});
		} else {
			setStockUpAmount((stockUpAmount) => ({
				...stockUpAmount,
				[id]: Number(value),
			}));
		}
	};

	const bundleCount = Object.keys(stockUpAmount).length;

	const handleSubmit = () => {
		StockingRequestService.modifyBundlesInRequest(stockRequestId, {
			userLoginHash: loginHash,
			bundlesRequests: Object.keys(stockUpAmount).map((bundleId) => ({
				bundleId,
				requestedCount: Number(stockUpAmount[bundleId]),
				note: '',
			})),
		})
			.then(() => {
				handleShowSuccessNotification(
					'admin.modal.addBundleToRequest.notifications.success'
				);
				modalContext.handleCloseModal();
				setRefetchKey((prev: number) => prev + 1);
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.modal.addBundleToRequest.notifications.error'
				);
			});
	};

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'userLoginHash', value: loginHash },
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{ key: 'SearchSupplierId', value: supplierId },
			{ key: 'IsSaleOver', value: false },
		];

		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(BUNDLE_STOCKING_SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: BUNDLE_STOCKING_SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach((filter) => {
			if (Object.hasOwn(BUNDLE_STOCKING_FILTER_COLUMN_MAP, filter.id)) {
				apiParams.push({
					key: BUNDLE_STOCKING_FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}

			if (filter.id === BundleStockingTableKeys.STOCK) {
				const amountFilter = getAmountFilter(String(filter.value));
				if (
					amountFilter.comparingNumberType === undefined ||
					amountFilter.value === undefined
				)
					return;

				apiParams.push(
					{
						key: 'SearchAmount',
						value: amountFilter.value,
					},
					{
						key: 'AmountFilter',
						value: amountFilter.comparingNumberType,
					}
				);
			}
		});

		fetchData(
			'product-api/bundles/GetBundlesStocking',
			apiParams,
			(payload) => payload.bundles ?? [],
			'admin.bundleList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, loginHash, state, supplierId]);

	return (
		<Form
			onSubmit={handleSubmit}
			render={({ handleSubmit, submitting, pristine, valid }) => {
				return (
					<CContainer className="bundle-to-request-modal">
						<CRow className="justify-content-center">
							<CCol
								md={6}
								className="admin-form-col"
							>
								<CForm
									onSubmit={handleSubmit}
									className="bundle-to-request-modal__render-form"
								>
									<div className="bundle-to-request-modal__render-form--table">
										<AdminListPage
											adminTableSchema={adminTableSchema}
											handleOnTableRowClick={() => undefined}
											handlers={handlers}
											state={state}
											pageCount={pageCount}
											pageNumber={pageNumber}
											rowsHighlight={stockUpAmount}
										/>
									</div>
									<SubmitButton
										isBackButton
										valid={valid}
										pristine={pristine}
										submitting={submitting}
										submitText="admin.modal.addBundleToRequest.submitText"
										extraText={`(${bundleCount.toString()})`}
									/>
								</CForm>
							</CCol>
						</CRow>
					</CContainer>
				);
			}}
		/>
	);
};

export default AddBundleToRequest;

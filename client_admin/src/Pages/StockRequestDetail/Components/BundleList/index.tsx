import { FC, useContext, useMemo } from 'react';
import {
	CTable,
	CTableBody,
	CTableCaption,
	CTableDataCell,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import cx from 'classnames';
import SPECIFICATION_ID from 'Config/specificationIds';
import { useLocalizedSpecificationValue } from 'Hooks/useLocalizedSpecificationValue';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { getSpecificationById } from 'Services/Specification/helpers';
import { StockRequestDetailContext } from 'Pages/StockRequestDetail/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminTable from 'Components/AdminTable';

import { localizeBundles } from './helpers';
import { BOTTLES_IN_BOX } from './constants';
import { StockRequestBundleTableModel } from './interfaces';

import './styles.css';

const StockRequestBundleList: FC = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { stockRequest } = useContext(StockRequestDetailContext);

	const getLocalizedValue = useLocalizedValue();
	const getLocalizedSpecificationValue = useLocalizedSpecificationValue();
	const t = useFormatMessage();

	const totalCount = useMemo(
		() =>
			stockRequest?.bundles.reduce(
				(total, bundle) => total + bundle.requestedCount,
				0
			) ?? 0,
		[stockRequest?.bundles]
	);
	const totalBoxCount = Math.ceil(totalCount / BOTTLES_IN_BOX);

	const bundles = useMemo(
		() =>
			localizeBundles(stockRequest?.bundles ?? [], getLocalizedValue).sort(
				(bundleA, bundleB) => bundleA.name.localeCompare(bundleB.name)
			),
		[stockRequest?.bundles, getLocalizedValue]
	);

	return (
		<>
			<h2 className="d-none d-print-block mb-0 py-2">
				{t({ id: 'stockRequest.bundle.print.heading' })}
			</h2>
			<AdminTable<StockRequestBundleTableModel>
				columns={[
					{
						header: `${t({ id: 'stockRequest.bundle.warehouseId' })}`,
						accessorKey: 'warehouseId',
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							className: 'd-none d-print-block',
						},
					},
					{
						header: `${t({ id: 'stockRequest.bundle.name' })}`,
						accessorKey: 'name',
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							className: 'request-leading-offset',
						},
					},
					{
						header: `${t({ id: 'stockRequest.bundle.year' })}`,
						accessorFn: (row) => {
							const yearSpecification = getSpecificationById(
								row.specificationDetails,
								SPECIFICATION_ID.YEAR
							);
							return yearSpecification
								? getLocalizedSpecificationValue(yearSpecification)
								: '-';
						},
						enableColumnFilter: false,
						enableSorting: false,
					},
					{
						header: `${t({ id: 'stockRequest.bundle.batch' })}`,
						accessorFn: (row) => {
							const batchSpecification = getSpecificationById(
								row.specificationDetails,
								SPECIFICATION_ID.BATCH
							);
							return batchSpecification
								? getLocalizedSpecificationValue(batchSpecification)
								: '-';
						},
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							cellClassName: 'text-nowrap',
						},
					},
					{
						header: `${t({ id: 'stockRequest.bundle.category' })}`,
						accessorFn: (row) => {
							const categorySpecification = getSpecificationById(
								row.specificationDetails,
								SPECIFICATION_ID.CATEGORY
							);
							return categorySpecification
								? getLocalizedSpecificationValue(categorySpecification)
								: '-';
						},
						enableColumnFilter: false,
						enableSorting: false,
					},
					{
						header: `${t({ id: 'stockRequest.bundle.type' })}`,
						accessorFn: (row) => {
							const typeSpecification = getSpecificationById(
								row.specificationDetails,
								SPECIFICATION_ID.TYPE
							);
							return typeSpecification
								? getLocalizedSpecificationValue(typeSpecification)
								: '-';
						},
						enableColumnFilter: false,
						enableSorting: false,
					},
					{
						header: `${t({ id: 'stockRequest.bundle.count.requested' })}`,
						accessorKey: 'requestedCount',
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							cellClassName: 'fw-bold request-print-table-secondary',
							className: 'request-print-text-end request-total-count',
						},
					},
					{
						header: `${t({ id: 'stockRequest.bundle.count.delivered' })}`,
						accessorKey: 'deliveredCount',
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							className: 'd-print-none',
						},
					},
					{
						header: `${t({ id: 'stockRequest.bundle.count.difference' })}`,
						cell: ({
							cell: {
								row: { original: row },
							},
						}) => (
							<span
								className={cx({
									'stock-request-detail-bundle-list__difference--ok':
										row.countDifference === 0,
									'stock-request-detail-bundle-list__difference--error':
										row.countDifference !== 0,
								})}
							>
								{row.countDifference}
							</span>
						),
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							className: 'd-print-none',
						},
					},
					{
						header: `${t({ id: 'stockRequest.bundle.note' })}`,
						accessorKey: 'note',
						enableColumnFilter: false,
						enableSorting: false,
						meta: {
							className: 'd-print-none',
						},
					},
				]}
				data={bundles}
			/>
			<p className="m-3 mx-4 fw-bold fs-6 d-print-none">
				{t(
					{ id: 'stockRequest.bundle.total.summary' },
					{
						totalCount,
						totalBoxCount,
					}
				)}
			</p>
			<div className="d-none d-print-block">
				<CTable
					bordered
					className="w-auto ms-auto caption-top"
				>
					<CTableCaption className="fw-bold text-end text-black border-0">
						{t({ id: 'stockRequest.bundle.total.label' })}
					</CTableCaption>
					<CTableBody>
						<CTableRow>
							<CTableHeaderCell className="border-start-0 fw-normal">
								{t({ id: 'stockRequest.bundle.total.bottle' })}
							</CTableHeaderCell>
							<CTableDataCell className="request-total-count table-secondary text-end">
								{totalCount}
							</CTableDataCell>
						</CTableRow>
						<CTableRow>
							<CTableHeaderCell className="border-start-0 fw-normal">
								{t({ id: 'stockRequest.bundle.total.box' })}
							</CTableHeaderCell>
							<CTableDataCell className="request-total-count table-secondary text-end">
								{totalBoxCount}
							</CTableDataCell>
						</CTableRow>
					</CTableBody>
				</CTable>
			</div>
		</>
	);
};

export default StockRequestBundleList;

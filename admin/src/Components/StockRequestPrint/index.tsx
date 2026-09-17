import { FC, useContext, useEffect, useMemo } from 'react';
import {
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { VinistoHelperDllEnumsStockingRequestDeliveryType } from 'vinisto_api_client/src/api-types/supplier-api/';
import SPECIFICATION_ID from 'Config/specificationIds';
import { useLocalizedSpecificationValue } from 'Hooks/useLocalizedSpecificationValue';
import { getSpecificationById } from 'Hooks/useLocalizedSpecificationValue/helpers';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';

import { mapBundlesToTableModel } from './helpers';
import {
	BOTTLES_IN_BOX,
	STOCK_REQUEST_DETAIL_CSS_BODY_CLASS,
} from './constants';
import { StockRequestPrintProps } from './interfaces';

import './styles.css';

const StockRequestPrint: FC<StockRequestPrintProps> = ({ stockRequest }) => {
	const { useFormatMessage } = useContext(LocalizationContext);

	const getLocalizedValue = useLocalizedValue();
	const getLocalizedSpecificationValue = useLocalizedSpecificationValue();
	const t = useFormatMessage();

	useEffect(() => {
		document.body.classList.add(STOCK_REQUEST_DETAIL_CSS_BODY_CLASS);
		return () =>
			document.body.classList.remove(STOCK_REQUEST_DETAIL_CSS_BODY_CLASS);
	}, []);

	const totalCount = useMemo(
		() =>
			stockRequest.bundles?.reduce(
				(total, bundle) => total + (bundle.requestedCount ?? 0),
				0
			) ?? 0,
		[stockRequest.bundles]
	);
	const totalBoxCount = Math.ceil(totalCount / BOTTLES_IN_BOX);

	const bundles = useMemo(
		() => mapBundlesToTableModel(stockRequest, getLocalizedValue),
		[stockRequest.bundleDetails, getLocalizedValue]
	);

	return (
		<div className="d-none d-print-block vinisto-admin-stocking-request-print-container">
			<h5 className="request-print-heading stocking-request-number">
				{t(
					{ id: 'admin.stockRequestPrint.heading' },
					{ requestId: stockRequest.requestNumber }
				)}
			</h5>
			<h5 className="request-print-heading">
				{t(
					{ id: 'admin.stockRequestPrint.supplier' },
					{
						requestId: `${stockRequest.supplier?.nameBilling} (${stockRequest.supplier?.nameWeb})`,
					}
				)}
			</h5>
			<dl className="d-grid request-print-header">
				<dt>{t({ id: 'admin.stockRequestPrint.dateIssued' })}</dt>
				<dd>
					{stockRequest.createdAt &&
						dayjs
							.unix(stockRequest.createdAt)
							.format(`${t({ id: 'admin.dateFormat' })}`)}
				</dd>
				<dt>{t({ id: 'admin.stockRequestPrint.transportType' })}</dt>
				<dd>
					{t({
						id:
							stockRequest.deliveryType ===
							VinistoHelperDllEnumsStockingRequestDeliveryType.SUPPLIER_DELIVERY
								? 'admin.stockRequestPrint.transportType.supplier'
								: 'admin.stockRequestPrint.transportType.vinisto',
					})}
				</dd>
			</dl>

			<CTable
				bordered
				className="vinisto-admin-table"
			>
				<CTableHead>
					<CTableRow>
						<CTableHeaderCell
							className="ps-0 pe-0"
							colSpan={8}
						>
							<h6 className="request-print-table-heading mb-0 py-2">
								{t({ id: 'admin.stockRequestPrint.bundles.heading' })}
							</h6>
						</CTableHeaderCell>
					</CTableRow>
					<CTableRow key={`header-row-`}>
						<CTableHeaderCell className="request-print-table-heading-cell">
							{t({ id: 'admin.stockRequestPrint.warehouseId' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-product-name">
							{t({ id: 'admin.stockRequestPrint.name' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-product-year">
							{t({ id: 'admin.stockRequestPrint.year' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.batch' })}
						</CTableHeaderCell>

						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.category' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.type' })}
						</CTableHeaderCell>

						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.requested' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.delivered' })}
						</CTableHeaderCell>
					</CTableRow>
				</CTableHead>
				<CTableBody>
					{bundles.map((bundle, index) => {
						const yearSpecificationById = getSpecificationById(
							bundle.specificationDetails,
							SPECIFICATION_ID.YEAR
						);
						const yearSpecification = yearSpecificationById
							? getLocalizedSpecificationValue(yearSpecificationById)
							: '-';
						const batchSpecificationById = getSpecificationById(
							bundle.specificationDetails,
							SPECIFICATION_ID.BATCH
						);
						const batchSpecification = batchSpecificationById
							? getLocalizedSpecificationValue(batchSpecificationById)
							: '-';
						const categorySpecificationById = getSpecificationById(
							bundle.specificationDetails,
							SPECIFICATION_ID.CATEGORY
						);
						const categorySpecification = categorySpecificationById
							? getLocalizedSpecificationValue(categorySpecificationById)
							: '-';
						const typeSpecificationById = getSpecificationById(
							bundle.specificationDetails,
							SPECIFICATION_ID.TYPE
						);
						const typeSpecification = typeSpecificationById
							? getLocalizedSpecificationValue(typeSpecificationById)
							: '-';
						return (
							<CTableRow key={index}>
								<CTableDataCell>{bundle.warehouseIds}</CTableDataCell>
								<CTableDataCell>{bundle.name}</CTableDataCell>
								<CTableDataCell>{yearSpecification}</CTableDataCell>
								<CTableDataCell>{batchSpecification}</CTableDataCell>
								<CTableDataCell>{categorySpecification}</CTableDataCell>
								<CTableDataCell>{typeSpecification}</CTableDataCell>
								<CTableDataCell className="fw-bold text-end request-total-count request-print-table-secondary">
									{bundle.requestedCount}
								</CTableDataCell>
								<CTableDataCell className="fw-bold text-end">
									{bundle.deliveredCount}
								</CTableDataCell>
							</CTableRow>
						);
					})}
				</CTableBody>
			</CTable>

			<CTable
				bordered
				className="vinisto-admin-table"
			>
				<CTableHead>
					<CTableRow>
						<CTableHeaderCell
							className="ps-0 pe-0"
							colSpan={6}
						>
							<h6 className="request-print-table-heading mb-0 py-2">
								{t({ id: 'admin.stockRequestPrint.bundlesDifference.heading' })}
							</h6>
						</CTableHeaderCell>
					</CTableRow>
					<CTableRow key={`header-row-`}>
						<CTableHeaderCell className="request-print-table-heading-cell">
							{t({ id: 'admin.stockRequestPrint.warehouseId' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-product-name">
							{t({ id: 'admin.stockRequestPrint.name' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-product-year">
							{t({ id: 'admin.stockRequestPrint.year' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.batch' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.requested' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.delivered' })}
						</CTableHeaderCell>
					</CTableRow>
				</CTableHead>
				<CTableBody>
					{Array(4)
						.fill(null)
						.map((index) => {
							return <CTableRow key={index}>&nbsp;</CTableRow>;
						})}
				</CTableBody>
			</CTable>

			<CTable
				bordered
				className="vinisto-admin-table vinisto-admin-table-summary w-auto ms-auto caption-top"
			>
				<CTableHead>
					<CTableRow key={`header-row-`}>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.total.label' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.requested' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.delivered' })}
						</CTableHeaderCell>
					</CTableRow>
				</CTableHead>
				<CTableBody>
					<CTableRow>
						<CTableHeaderCell className="border-start-0 fw-normal">
							{t({ id: 'admin.stockRequestPrint.total.bottle' })}
						</CTableHeaderCell>
						<CTableDataCell className="request-total-count table-secondary text-end">
							{totalCount}
						</CTableDataCell>
					</CTableRow>
					<CTableRow>
						<CTableHeaderCell className="border-start-0 fw-normal">
							{t({ id: 'admin.stockRequestPrint.total.box' })}
						</CTableHeaderCell>
						<CTableDataCell className="request-total-count table-secondary text-end">
							{totalBoxCount}
						</CTableDataCell>
					</CTableRow>
				</CTableBody>
			</CTable>

			<CTable
				bordered
				className="vinisto-admin-table table-no-break"
			>
				<CTableHead>
					<CTableRow>
						<CTableHeaderCell
							className="ps-0 pe-0"
							colSpan={6}
						>
							<h6 className="request-print-table-heading mb-0 py-2">
								{t({ id: 'admin.stockRequestPrint.bundlesDefected.heading' })}
							</h6>
						</CTableHeaderCell>
					</CTableRow>
					<CTableRow key={`header-row-`}>
						<CTableHeaderCell className="request-print-table-heading-cell">
							{t({ id: 'admin.stockRequestPrint.warehouseId' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-product-name">
							{t({ id: 'admin.stockRequestPrint.name' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-product-year">
							{t({ id: 'admin.stockRequestPrint.year' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.batch' })}
						</CTableHeaderCell>
						<CTableHeaderCell className="request-print-table-defect-count">
							{t({ id: 'admin.stockRequestPrint.count.defectCount' })}
						</CTableHeaderCell>
						<CTableHeaderCell>
							{t({ id: 'admin.stockRequestPrint.count.defectDescription' })}
						</CTableHeaderCell>
					</CTableRow>
				</CTableHead>
				<CTableBody>
					{Array(4)
						.fill(null)
						.map((index) => {
							return <CTableRow key={index}>&nbsp;</CTableRow>;
						})}
					<CTableRow className="vinisto-admin-table-request-date ">
						<CTableDataCell colSpan={6}>
							<div className="w-100 d-flex">
								<div className="w-50">
									{t({ id: 'admin.stockRequestPrint.footer.stockedDate' })}
								</div>
								<div className="w-50">
									{t({ id: 'admin.stockRequestPrint.footer.stockedBy' })}
								</div>
							</div>
						</CTableDataCell>
					</CTableRow>
				</CTableBody>
			</CTable>
		</div>
	);
};

export default StockRequestPrint;

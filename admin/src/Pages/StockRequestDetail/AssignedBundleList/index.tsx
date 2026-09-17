import { Dispatch, SetStateAction, useContext, useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import {
	VinistoHelperDllEnumsStockingRequestStockingState,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
} from 'vinisto_api_client/src/api-types/supplier-api/';
import { REMOVE_BUNDLE_FROM_STOCK_REQUEST } from 'Components/Modal/constants';
import SPECIFICATION_ID from 'Config/specificationIds';
import useLocalizedValue, {
	isLangValuePairArray,
} from 'Hooks/useLocalizedValue';
import getSpecificationValue from 'Helpers/getSpecificationValue';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import DeleteIcon from 'Components/Icons/Delete';
import EditIcon from 'Components/Icons/Edit';
import BundleFlagsWarning from 'Components/Warning/BundleFlagsWarning';
import {
	IS_CLEARANCE_SALE,
	IS_DELETED,
	TEMPORARY_UNAVAILABLE,
} from 'Constants/flags';

import './styles.css';
import styles from './styles.module.css';

const AssignedBundleList = ({
	stockingRequest,
	stockRequestId,
	setRefetchKey,
}: {
	stockingRequest: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest;
	stockRequestId: string;
	setRefetchKey: Dispatch<SetStateAction<number>>;
}) => {
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const localize = useLocalizedValue();

	const modalContext = useContext(ModalContext);

	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editedNumber, setEditedNumber] = useState<number | null>(null);

	const isAccepted =
		stockingRequest.stockingState ===
		VinistoHelperDllEnumsStockingRequestStockingState.WMS_DELIVERED;
	const isStocked =
		stockingRequest.stockingState ===
		VinistoHelperDllEnumsStockingRequestStockingState.WMS_STOCKED;

	const handleOnClickEdit = (bundleId: string, requestedNumber: number) => {
		setEditingId(bundleId);
		setEditedNumber(requestedNumber);
	};

	const handleOnClickDelete = (bundleId: string, bundleName: string) => {
		modalContext.handleOpenModal(REMOVE_BUNDLE_FROM_STOCK_REQUEST, {
			bundleId,
			stockingRequestId: stockRequestId,
			bundleName,
			setRefetchKey,
		});
	};

	const handleOnSubmitEdit = (bundleId: string) => {
		StockingRequestService.modifyBundleInRequest(stockRequestId, {
			userLoginHash: loginHash,
			bundleId,
			requestedCount: editedNumber ?? 0,
			note: '',
		})
			.then(() => {
				handleShowSuccessNotification(
					'admin.stockRequestDetail.assigneSuccess'
				);
				setRefetchKey((prev) => prev + 1);
			})
			.catch(() => {
				handleShowErrorNotification('admin.stockRequestDetail.assigneError');
			});
		setEditingId(null);
		setEditedNumber(null);
	};

	const handleOnClickDiscard = () => {
		setEditingId(null);
		setEditedNumber(null);
	};

	if (stockingRequest.bundles?.length === 0) {
		return <></>;
	}

	return (
		<>
			<h6>
				<strong>{t({ id: 'admin.stockRequestDetail.assignedBundles' })}</strong>
			</h6>
			<div className="table-responsive">
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>{t({ id: 'admin.stockRequestDetail.warehouseId' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.name' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.year' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.batch' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.variant' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.type' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.categorization' })}</th>
							<th>{t({ id: 'admin.stockRequestDetail.requestedNumber' })}</th>
							{isAccepted && (
								<>
									<th>
										{t({ id: 'admin.stockRequestDetail.acceptedNumber' })}
									</th>
									<th>{t({ id: 'admin.stockRequestDetail.difference' })}</th>
								</>
							)}
							{isStocked && (
								<>
									<th>
										{t({ id: 'admin.stockRequestDetail.acceptedNumber' })}
									</th>
									<th>{t({ id: 'admin.stockRequestDetail.difference' })}</th>
									<th>{t({ id: 'admin.stockRequestDetail.note' })}</th>
								</>
							)}
							{!isAccepted && !isStocked && (
								<th>{t({ id: 'admin.stockRequestDetail.actions' })}</th>
							)}
						</tr>
					</thead>
					<tbody>
						{stockingRequest.bundles?.map((bundle) => {
							const details = stockingRequest.bundleDetails?.find(
								(detail) => detail.id === bundle.bundleId
							);
							const specificationDetails =
								details?.specificationDetails as SpecificationDetail[];
							return (
								<tr
									key={bundle.bundleId}
									className={cx({
										bg_warning:
											details?.temporaryUnavailable ||
											details?.isDeleted ||
											details?.isClearanceSale,
									})}
								>
									<td>
										{details?.productsDetail
											?.map((product) => {
												return product.warehouseId;
											})
											.join(', ')}
									</td>
									<td>
										<div key={details?.id}>
											<Link
												to={`/bundle-detail/${details?.id}`}
												className={styles.productLink}
											>
												{localize(details?.name ?? [])}
											</Link>
											<BundleFlagsWarning
												flags={{
													[TEMPORARY_UNAVAILABLE]:
														details?.temporaryUnavailable,
													[IS_DELETED]: details?.isDeleted,
													[IS_CLEARANCE_SALE]: details?.isClearanceSale,
												}}
											/>
										</div>
									</td>
									<td>
										{getSpecificationValue(
											specificationDetails,
											SPECIFICATION_ID.YEAR
										) ?? '-'}
									</td>
									<td>
										{isLangValuePairArray(
											getSpecificationValue.length &&
												getSpecificationValue(
													specificationDetails,
													SPECIFICATION_ID.BATCH
												)
										)
											? localize(
													getSpecificationValue(
														specificationDetails,
														SPECIFICATION_ID.BATCH
													)
											  )
											: '-'}
									</td>
									<td>
										{getSpecificationValue(
											specificationDetails,
											SPECIFICATION_ID.CATEGORY
										) ?? '-'}
									</td>
									<td>
										{getSpecificationValue(
											specificationDetails,
											SPECIFICATION_ID.TYPE
										) ?? '-'}
									</td>
									<td>
										{getSpecificationValue(
											specificationDetails,
											SPECIFICATION_ID.CATEGORIZATION
										) ?? '-'}
									</td>
									<td>
										{editingId === bundle.bundleId ? (
											<input
												type="number"
												min="0"
												value={editedNumber ?? 0}
												onChange={(e) =>
													setEditedNumber(Number(e.target.value))
												}
											/>
										) : (
											bundle.requestedCount
										)}
									</td>
									{isAccepted && (
										<>
											<td>{bundle.deliveredCount}</td>
											<td
												className={
													Number(bundle.countDifference) === 0
														? 'difference-green'
														: 'difference-red'
												}
											>
												{bundle.countDifference}
											</td>
										</>
									)}
									{isStocked && (
										<>
											<td>{bundle.deliveredCount}</td>
											<td
												className={
													Number(bundle.countDifference) === 0
														? 'difference-green'
														: 'difference-red'
												}
											>
												{bundle.countDifference}
											</td>
											<td>{bundle.note}</td>
										</>
									)}
									{!isAccepted && !isStocked && (
										<td>
											{editingId === bundle.bundleId ? (
												<>
													<button
														type="button"
														className="assigned-bundle-list__edit--btn"
														onClick={() =>
															handleOnSubmitEdit(bundle.bundleId ?? '')
														}
													>
														{t({ id: 'admin.stockRequestDetail.saveChanges' })}
													</button>
													<button
														type="button"
														className="assigned-bundle-list__edit--btn"
														onClick={handleOnClickDiscard}
													>
														{t({
															id: 'admin.stockRequestDetail.discardChanges',
														})}
													</button>
												</>
											) : (
												<div className="d-flex justify-content-end gap-2">
													{!details?.isClearanceSale && (
														<EditIcon
															title={`${t({
																id: 'admin.stockRequest.bundleActions.edit',
															})}`}
															onClick={() =>
																handleOnClickEdit(
																	bundle.bundleId ?? '',
																	bundle.requestedCount ?? 0
																)
															}
															className="admin-item__icon admin-item__icon--btn pointer me-1"
														/>
													)}
													<DeleteIcon
														title={`${t({
															id: 'admin.stockRequest.bundleActions.delete',
														})}`}
														onClick={() => {
															const bundleDetail =
																stockingRequest.bundleDetails?.find(
																	(detail) => detail.id === bundle.bundleId
																);
															const bundleName = bundleDetail
																? localize(bundleDetail.name ?? [])
																: '';
															handleOnClickDelete(
																bundle.bundleId ?? '',
																bundleName
															);
														}}
														className="admin-item__icon admin-item__icon--btn pointer"
													/>
												</div>
											)}
										</td>
									)}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AssignedBundleList;

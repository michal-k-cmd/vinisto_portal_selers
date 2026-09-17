import { CCol, CContainer, CForm, CRow } from '@coreui/react';
import { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import { Form } from 'react-final-form';
import SubmitButton from 'Components/Form/Components/Submit';
import AdminListPage from 'Components/AdminListPage';
import useFileUpload from 'Hooks/useFileUpload';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { PageListAction as Action } from 'Hooks/useAdminTable/constants';
import getSpecificationValue from 'Helpers/getSpecificationValue';
import SPECIFICATION_ID from 'Config/specificationIds';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';

import { ALLOWED_FILE_TYPES } from './FileUpload/constants';
import { CompleteReceiptModalData } from './interfaces';
import FileUpload from './FileUpload';
import './styles.css';

const CompleteReceipt: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const {
		vinistoUser: { loginHash },
	} = useContext(AuthenticationContext);
	const { data, handleCloseModal } = useContext(ModalContext);

	const { stockRequestId, setRefetchKey, assignedBundles, bundleDetails } =
		data as CompleteReceiptModalData;

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { handlers, state, dispatch, pageNumber, pageCount } = useAdminTable();
	const { handleOnUpload, fileInputRef, imageError, selectedFile } =
		useFileUpload(ALLOWED_FILE_TYPES);

	const { closeReceipt, addBundleNotes } = StockingRequestService;

	const hasNoDifferences = useMemo(
		() =>
			assignedBundles?.every(
				(item) => Number(item.countDifference) === 0 && item.note === ''
			),
		[assignedBundles]
	);

	const onBlur = useCallback(
		(value: string, id: string) => {
			const updatedData = state.data.map((item) => {
				if (item.id === id) {
					return { ...item, id: item.id, note: value };
				}
				return item;
			});

			dispatch({
				type: Action.setData,
				value: updatedData,
			});
		},
		[dispatch, state.data]
	);

	// TODO: Filter/Sorting
	const tableSchema: TableSchema = useMemo(
		() => [
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.warehouseId' })}`,
				accessorFn: (row) => {
					const bundle = bundleDetails?.find((bundle) => bundle.id === row.id);
					return (
						bundle?.productsDetail
							?.map((product) => product.warehouseId)
							.join(', ') ?? ''
					);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.name' })}`,
				accessorFn: (row) => {
					const bundle = bundleDetails?.find((bundle) => bundle.id === row.id);
					return getLocalizedValue(bundle?.name ?? []);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.year' })}`,
				accessorFn: (row) => {
					const bundle = bundleDetails?.find((bundle) => bundle.id === row.id);
					return getSpecificationValue(
						(bundle?.specificationDetails as SpecificationDetail[]) ?? [],
						SPECIFICATION_ID.YEAR
					);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.batches' })}`,
				accessorFn: (row) => {
					const bundle = bundleDetails?.find((bundle) => bundle.id === row.id);
					return getSpecificationValue(
						(bundle?.specificationDetails as SpecificationDetail[]) ?? [],
						SPECIFICATION_ID.BATCH
					);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.kind' })}`,
				accessorFn: (row) => {
					const bundle = bundleDetails?.find((bundle) => bundle.id === row.id);
					return getSpecificationValue(
						(bundle?.specificationDetails as SpecificationDetail[]) ?? [],
						SPECIFICATION_ID.CATEGORY
					);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({
					id: 'admin.modal.completeReceipt.table.requiredUnits',
				})}`,
				cell: ({ row: { original: bundleRequest } }) => (
					<span>{bundleRequest.requestedCount ?? 0}</span>
				),
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({
					id: 'admin.modal.completeReceipt.table.warehouseRecieved',
				})}`,
				cell: ({ row: { original: bundleRequest } }) => (
					<span>{bundleRequest.deliveredCount ?? 0}</span>
				),
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.difference' })}`,
				cell: ({ row: { original: bundleRequest } }) => (
					<span
						className={
							Number(bundleRequest.countDifference) === 0
								? 'complete-receipt-modal__color--green'
								: 'complete-receipt-modal__color--red'
						}
					>
						{bundleRequest.countDifference ?? '0'}
					</span>
				),
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				header: `${t({ id: 'admin.modal.completeReceipt.table.note' })}`,
				cell: ({ row: { id, original: bundleRequest } }) => {
					if (Number(bundleRequest.countDifference) === 0) {
						return '';
					}

					const currentRowNote =
						state.data.filter((item) => item.id === id)[0].note || '';

					return (
						<input
							type="text"
							defaultValue={String(currentRowNote)}
							onBlur={(e) => onBlur(e.currentTarget.value, id)}
						/>
					);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
		],
		[bundleDetails, getLocalizedValue, onBlur, state.data, t]
	);

	const adminTableSchema = getTableSchema(tableSchema);

	const handleSubmit = () => {
		const bundleNotes = state.data.map((item) => {
			return { bundleId: item.id, note: item.note ?? '' };
		});

		addBundleNotes(stockRequestId, {
			userLoginHash: loginHash,
			bundlesNotes: bundleNotes,
		})
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.completeReceipt.submitSuccess'
				);

				closeReceipt(
					stockRequestId,
					{
						receiptFile: selectedFile,
					},
					loginHash
				)
					.then(() => {
						handleCloseModal();
						setRefetchKey((prevKey: number) => prevKey + 1);
					})
					.catch(() => {
						notificationsContext.handleShowErrorNotification(
							'admin.modal.completeReceipt.submitError'
						);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.completeReceipt.submitError'
				);
			});
	};

	useEffect(() => {
		dispatch({
			type: Action.setPageListState,
			value: {
				data:
					assignedBundles?.map((i) => {
						return {
							...i,
							id: i.bundleId ?? '',
						};
					}) ?? [],
			},
		});
	}, [assignedBundles, dispatch]);

	return (
		<Form
			onSubmit={handleSubmit}
			render={({ handleSubmit, submitting, pristine, valid }) => {
				return (
					<CContainer className="complete-receipt-modal__container">
						<CRow className="justify-content-center">
							<CCol
								md={6}
								className="admin-form-col"
							>
								<CForm
									onSubmit={handleSubmit}
									className="complete-receipt-modal__container--render-form"
								>
									{!hasNoDifferences && (
										<div className="complete-receipt-modal__container--render-form--table">
											<AdminListPage
												adminTableSchema={adminTableSchema}
												handleOnTableRowClick={() => undefined}
												handlers={handlers}
												state={state}
												pageCount={pageCount}
												pageNumber={pageNumber}
											/>
										</div>
									)}
									<div className="complete-receipt-modal__container--render-form--file-upload">
										<FileUpload
											name="file"
											handleOnUpload={handleOnUpload}
											fileInputRef={fileInputRef}
											selectedFile={selectedFile}
											allowedTypes={ALLOWED_FILE_TYPES}
											fileError={imageError}
										/>
									</div>
									<SubmitButton
										isBackButton
										valid={valid}
										pristine={pristine}
										submitting={submitting}
										submitText="admin.modal.completeReceipt.submitButtonText"
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

export default CompleteReceipt;

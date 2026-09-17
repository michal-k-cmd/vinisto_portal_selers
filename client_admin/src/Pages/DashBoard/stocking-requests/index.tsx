import AdminTableLight from 'Components/AdminTable/Variants/light';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import { GetAllStockingRequestsQueryArgument } from 'Services/SupplierService/interfaces';
import {
	VinistoHelperDllEnumsStockingRequestStockingState,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { ColumnDef } from '@tanstack/react-table';
import { dayjsInstance } from 'Services/Date';
import { InfoButton } from 'Components/InfoBox';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './styles.module.css';
import { stateTranslationKeys } from './constants';

export const DashboardStockingRequests = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { activeSupplierId, vinistoUser } = useContext(AuthenticationContext);

	const queryParams: GetAllStockingRequestsQueryArgument[] = [
		{
			key: 'UserLoginHash',
			value: vinistoUser?.loginHash ?? '',
		},
		{
			key: 'SearchSupplierId',
			value: activeSupplierId,
		},
		{
			key: 'isSent',
			value: true,
		},
	];

	const { data, isError, isLoading } = useQuery({
		queryKey: ['stockingRequests', queryParams],
		queryFn: () => StockingRequestService.getAll(queryParams),
		refetchOnWindowFocus: true,
	});

	const columnsDef: ColumnDef<VinistoStockingRequestDllModelsApiStockingRequestStockingRequest>[] =
		[
			{
				id: 'request_number',
				header: `${t({ id: 'dashboard.stockingRequests.requestNumber' })}`,
				accessorKey: 'requestNumber',
				enableColumnFilter: false,
				enableSorting: false,
				cell: (ctx) => {
					return (
						<Link to={`/stock-request-detail/${ctx.row.original.id}`}>
							{ctx.row.original.requestNumber}
						</Link>
					);
				},
			},
			{
				id: 'createDate',
				header: `${t({ id: 'dashboard.stockingRequests.createDate' })}`,
				accessorKey: 'createdAt',
				accessorFn: (ctx) => {
					const date = ctx.createdAt;
					if (!date) return '';
					const formattedDate = dayjsInstance(date * 1000).format('DD.MM.YYYY');

					return `${formattedDate}`;
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
			{
				id: 'status',
				header: `${t({ id: 'dashboard.stockingRequests.status' })}`,
				cell: (ctx) => {
					const state = ctx.row.original.stockingState;
					const isSentState =
						state === VinistoHelperDllEnumsStockingRequestStockingState.SENT;

					return (
						<div
							className={cx(
								'd-flex gap-2 align-items-center position-relative',
								{
									'fw-bold': isSentState,
								}
							)}
						>
							{state ? t({ id: stateTranslationKeys[state] }) : ''}
							{isSentState && <InfoButton className={styles.infoButton} />}
						</div>
					);
				},
				enableColumnFilter: false,
				enableSorting: false,
			},
		];

	if (data?.count === 0 || isError || isLoading)
		return (
			<div className={styles.noRequests}>
				{t({ id: 'dashboard.stockingRequests.noData' })}
			</div>
		);

	return (
		<div className={styles.wrapper}>
			<AdminTableLight<VinistoStockingRequestDllModelsApiStockingRequestStockingRequest>
				data={
					data.stockingRequests as unknown as VinistoStockingRequestDllModelsApiStockingRequestStockingRequest[]
				}
				columns={columnsDef}
			/>
		</div>
	);
};

export default DashboardStockingRequests;

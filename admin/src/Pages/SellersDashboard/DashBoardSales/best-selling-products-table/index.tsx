import { ColumnDef } from '@tanstack/react-table';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoOrderDllModelsApiDashboardSaleSaleBundle } from 'vinisto_api_client/src/api-types/order-api';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AdminTable from 'Components/AdminTable';

import PercentageChange from '../../StatisticsTile/PercentageChange';

import styles from './styles.module.css';

type DashboardBundle = VinistoOrderDllModelsApiDashboardSaleSaleBundle & {
	id: string;
};

interface BestSellingProductsTableProps {
	data: VinistoOrderDllModelsApiDashboardSaleSaleBundle[] | null | undefined;
}

const BestSellingProductsTable = ({ data }: BestSellingProductsTableProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const localize = useLocalizedValue();

	const columnsDef: ColumnDef<DashboardBundle>[] = [
		{
			id: 'name',
			header: `${t({ id: 'dashboard.DashBoardSales.name' })}`,
			cell: (ctx) => {
				return (
					<Link to={`/bundle-detail/${ctx.row.original.id}`}>
						{localize(ctx.row.original.bundleDetail.name as LangValuePair[])}
					</Link>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		/*
		// Docasne zakomentovano, protoze se tady ma vypisovat DRUH (specifikace), ale backend ji ted neposila.
		{
			id: 'category',
			header: `${t({ id: 'dashboard.DashBoardSales.category' })}`,
			accessorFn: (ctx) => {
				return localize(
					(ctx.bundleDetail.categoriesDetail[0]?.name ?? []) as LangValuePair[]
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},*/
		{
			id: 'soldPcs',
			header: `${t({ id: 'dashboard.DashBoardSales.soldPcs' })}`,
			accessorKey: 'soldPcs',

			cell: (ctx) => {
				return (
					<span className={styles.countWrap}>
						<div>
							{ctx.row.original.soldPcs} {t({ id: 'pcs' })}
						</div>
					</span>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'soldPcsPercentageDifference',
			header: '',
			accessorKey: 'soldPcsPercentageDifference',

			cell: (ctx) => {
				const difference = ctx.row.original.soldPcsPercentageDifference;

				return (
					<>
						{typeof difference === 'number' && difference > 0 && (
							<PercentageChange
								value={difference}
								position="BOTTOM"
							/>
						)}
					</>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			id: 'sumPrice',
			header: `${t({ id: 'dashboard.DashBoardSales.sumPrice' })}`,
			accessorFn: (ctx) => {
				return `${ctx.sumPrice.toFixed(2)} ${t({
					id: 'currency',
				})}`;
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	if (!data)
		return (
			<div className={styles.noData}>
				{t({ id: 'dashboard.DashBoardSales.noData' })}
			</div>
		);

	return (
		<div className={styles.resizableTable}>
			<AdminTable<DashboardBundle>
				data={data as unknown as DashboardBundle[]}
				columns={columnsDef}
				className={styles.bestSellingProductsTable}
			/>
		</div>
	);
};

export default BestSellingProductsTable;

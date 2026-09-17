import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import { useQuery } from '@tanstack/react-query';
import {
	DashboardSaleListParams,
	VinistoOrderDllModelsApiReturnDataSaleDataReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { apiServiceInstance } from 'Services/ApiService';
import { IQueryArgument } from 'Services/ApiService/interfaces';

import StatisticsTile from '../StatisticsTile';

import styles from './styles.module.css';
import CalendarControls from './calendar-controls';
import useCalendarDate from './calendar-controls/hook';
import BestSellingProductsTable from './best-selling-products-table';

const ORDER_API_BASE_URL = 'order-api';

interface DashBoardSalesProps {
	activeSupplierId: string | null;
}

const DashBoardSales = ({ activeSupplierId }: DashBoardSalesProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { vinistoUser } = useContext(AuthenticationContext);
	const userLoginHash = vinistoUser?.loginHash;

	const { dateRange, setDateRange, daysCount } = useCalendarDate();

	const handleDateChange = (timeFrom: number, timeTo: number) => {
		setDateRange(timeFrom, timeTo);
	};

	const queryParams: DashboardSaleListParams = {
		...(activeSupplierId && { SupplierId: activeSupplierId }),
		TimeFrom: dateRange.timeFrom,
		TimeTo: dateRange.timeTo,
		UserLoginHash: userLoginHash,
	};

	const getSalesData = async (params: DashboardSaleListParams) => {
		const queryArguments: IQueryArgument[] = [
			...(activeSupplierId
				? [
						{
							key: 'SupplierId',
							value: activeSupplierId,
						},
				  ]
				: []),
			{
				key: 'TimeFrom',
				value: params.TimeFrom,
			},
			{
				key: 'TimeTo',
				value: params.TimeTo,
			},
			{
				key: 'UserLoginHash',
				value: params.UserLoginHash ?? '',
			},
			{
				key: 'Limit',
				value: 100,
			},
		];

		const response =
			await apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataSaleDataReturn>(
				`${ORDER_API_BASE_URL}/dashboard-sale`,
				true,
				undefined,
				queryArguments
			);

		return response;
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: ['salesData', queryParams],
		queryFn: () => getSalesData(queryParams),
		keepPreviousData: true,
		enabled: !!userLoginHash,
	});

	if (isLoading || isError)
		return (
			<div className={styles.noData}>
				{t({ id: 'dashboard.DashBoardSales.noData' })}
			</div>
		);

	return (
		<>
			<CalendarControls
				onDateChange={handleDateChange}
				timeFrom={dateRange.timeFrom}
				timeTo={dateRange.timeTo}
			/>
			<Detail.Subheading
				value={t({ id: 'dashboard.DashBoardSales.subheading' })}
				className={styles.subheading}
			/>
			<div className={styles.sales}>
				<StatisticsTile
					label={t({ id: 'dashboard.DashBoardSales.count' })}
					value={data.saleData?.totalSoldPcs ?? 0}
					unit="ks"
					percentageChange={
						data.saleData?.totalSoldPcsPercentageDifference ?? 0
					}
					daysCount={daysCount + 1}
					className={styles.tile}
				/>
				<StatisticsTile
					label={<>{t({ id: 'dashboard.DashBoardSales.money' })} </>}
					value={data.saleData?.totalProfit ?? 0}
					valueFontSize="1.25rem"
					unit="Kč"
					percentageChange={data.saleData?.totalProfitPercentageDifference ?? 0}
					daysCount={daysCount + 1}
					className={styles.tile}
				/>
				<StatisticsTile
					label={t({
						id: activeSupplierId
							? 'dashboard.DashBoardSales.orders'
							: 'dashboard.DashBoardSales.ordersAll',
					})}
					value={data.saleData?.totalOrderCount ?? 0}
					percentageChange={
						data.saleData?.totalOrderCountPercentageDifference ?? 0
					}
					daysCount={daysCount + 1}
					className={styles.tile}
				/>
			</div>
			<Detail.Subheading
				value={t({ id: 'dashboard.DashBoardSales.bestSellingProducts' })}
				className={styles.subheading}
			/>
			<BestSellingProductsTable data={data.saleData?.bundles} />
		</>
	);
};

export default DashBoardSales;

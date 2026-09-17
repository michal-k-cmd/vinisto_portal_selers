import { CCard } from '@coreui/react';
import cx from 'classnames';
import { useQuery } from '@tanstack/react-query';
import ContentPreloader from 'Components/ContentPreloader';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import InfoBox from 'Components/InfoBox';
import { OPEN_POSITION } from 'Components/InfoBox/constants';

import styles from './styles.module.css';

import SupplierService from '@/supplier-service';

const Overview = ({ supplierId }: { supplierId: string }) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const formatNumber = (num: number | undefined) => {
		if (num === undefined) return '';
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	};

	const { data, isLoading } = useQuery({
		queryKey: [supplierId, 'supplierStatistics'],
		queryFn: () => SupplierService.getSupplierStatistics(supplierId),
		enabled: !!supplierId,
	});

	return (
		<div className={styles.cardsWrapper}>
			<CCard className={styles.card}>
				<div className={styles.caption}>
					{t({ id: 'warehouseList.totalProducts' })}
				</div>
				<div className={styles.value}>
					{isLoading ? (
						<ContentPreloader />
					) : (
						`${formatNumber(data?.totalBundlesInWarehouse)} ${t({
							id: 'warehouseList.pcs',
						})}`
					)}
				</div>
			</CCard>
			<CCard className={styles.card}>
				<div className={styles.caption}>
					{t({ id: 'warehouseList.totalProductsTypes' })}
				</div>
				<div className={styles.value}>
					{isLoading ? (
						<ContentPreloader />
					) : (
						`${formatNumber(data?.uniqueBundlesInWarehouse)} ${t({
							id: 'warehouseList.kinds',
						})}`
					)}
				</div>
			</CCard>
			<CCard className={styles.card}>
				<div className={styles.caption}>
					{t({ id: 'warehouseList.soldInPeriod' })}
				</div>
				<div className={cx(styles.value, styles.highlighted)}>
					{isLoading ? (
						<ContentPreloader />
					) : (
						`${formatNumber(data?.bundlesSoldLastMonth)} ${t({
							id: 'warehouseList.pcs',
						})} / ${formatNumber(data?.bundlesSoldThisMonth)} ${t({
							id: 'warehouseList.pcs',
						})}`
					)}
				</div>
			</CCard>
			<CCard className={styles.card}>
				<div className={cx(styles.caption, styles.notPaid)}>
					{t({ id: 'warehouseList.unpaidOrders' })}
					<InfoBox
						content={t({ id: 'warehouseList.notPaidTooltip' })}
						position={OPEN_POSITION.BOTTOM_LEFT}
						className={styles.notPaidTooltip}
						contentClassName={styles.notPaidTooltipContent}
					/>
				</div>
				<div className={styles.value}>
					{isLoading ? (
						<ContentPreloader />
					) : (
						`${formatNumber(data?.bundlesInUnpaidOrders)} ${t({
							id: 'warehouseList.pcs',
						})}`
					)}
				</div>
			</CCard>
		</div>
	);
};

export default Overview;

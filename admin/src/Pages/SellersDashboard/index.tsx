import { useContext, useState } from 'react';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import useSuppliers from 'Pages/UserDetail/Components/SupplierList/useSuppliers';

import styles from './styles.module.css';
import DashBoardSales from './DashBoardSales';
import SuppliersInput from './SuppliersInput';

const SellersDashboard = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const [activeSupplierId, setActiveSupplierId] = useState<string | null>(null);

	const { suppliers } = useSuppliers();

	const supplierData =
		suppliers?.find((supplier) => supplier.id === activeSupplierId) ?? null;

	const supplierName = supplierData?.nameWeb ?? '';

	return (
		<div className={styles.grid}>
			<Detail.Container>
				<Detail.Heading>
					{t({
						id: activeSupplierId ? 'dashboard.sales' : 'dashboard.salesAll',
					})}
					<span className={styles.supplierName}>
						{activeSupplierId && ` - ${supplierName}`}
					</span>
				</Detail.Heading>
				<SuppliersInput
					setSupplierId={setActiveSupplierId}
					className={styles.suppliersInput}
				/>
				<DashBoardSales activeSupplierId={activeSupplierId} />
			</Detail.Container>
		</div>
	);
};

export default SellersDashboard;

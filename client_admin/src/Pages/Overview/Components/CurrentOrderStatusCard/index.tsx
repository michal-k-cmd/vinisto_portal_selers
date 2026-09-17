import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Heading from 'Pages/Overview/Components/Heading';
import './styles.css';

import mockData from './mockData.json';

const CurrentOrderStatusCard: React.FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div>
			<Heading
				size={2}
				className="my-2"
				title={t({ id: 'overview.currentSalesStats.title' })}
			/>
			<div className="d-flex flex-row vinisto-overview-card">
				<div className="vinisto-overview__table w-25 me-5">
					<div>{t({ id: 'overview.currentSalesStats.turnover' })}</div>
					<div>{t({ id: 'overview.currentSalesStats.soldProductCount' })}</div>
					<div>{t({ id: 'overview.currentSalesStats.ordersCount' })}</div>
				</div>
				<div className="vinisto-overview__table fw-bold text-end">
					<div className="vinisto-text__green">
						{mockData.turnover} {t({ id: 'admin.currency' })}
					</div>
					<div>{mockData.productCount}</div>
					<div>{mockData.orderCount}</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentOrderStatusCard;

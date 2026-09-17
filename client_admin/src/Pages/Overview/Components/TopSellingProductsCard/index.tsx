import { useContext } from 'react';
import { map } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import Heading from 'Pages/Overview/Components/Heading';
import TopSellingProductItem from 'Pages/Overview/Components/TopSellingProductsCard/Components/TopSellingProductItem';

import mockData from './mockData.json';

const TopSellingProductsCard: React.FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div>
			<Heading
				size={2}
				className="vinisto-card__heading my-2"
				title={t({ id: 'overview.topSellingProducts.inPeriod.title' })}
			/>
			{map(mockData, (item, index) => (
				<TopSellingProductItem
					key={index}
					productName={item.productName}
					quantity={item.quantity}
				/>
			))}
		</div>
	);
};

export default TopSellingProductsCard;

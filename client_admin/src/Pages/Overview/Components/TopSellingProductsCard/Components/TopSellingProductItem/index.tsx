import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const TopSellingProductsCard: React.FC<{
	productName: string;
	quantity: string;
}> = ({ productName, quantity }) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="vinisto-overview__table d-flex justify-content-between">
			<div>{productName}</div>
			<div className="fw-bold">
				{t(
					{ id: 'overview.topSellingProducts.inPeriod.quantity' },
					{ count: quantity }
				)}
			</div>
		</div>
	);
};

export default TopSellingProductsCard;

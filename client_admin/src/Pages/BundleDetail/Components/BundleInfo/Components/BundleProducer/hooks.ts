import { useContext } from 'react';
import { useMatch } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';

const useShouldProducerOpenInNewTab = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const matchCategory = useMatch(`/${t({ id: 'routes.category.route' })}/*`);
	const matchTag = useMatch(`/${t({ id: 'routes.tag.route' })}/*`);
	const matchProducts = useMatch(`/${t({ id: 'routes.products.route' })}/*`);
	const matchOffers = useMatch(`/${t({ id: 'routes.offers.route' })}/*`);
	const matchCollectibleWines = useMatch(
		`/${t({ id: 'routes.collectibleWines.route' })}/*`
	);

	return (
		!!matchCategory ||
		!!matchTag ||
		!!matchProducts ||
		!!matchOffers ||
		!!matchCollectibleWines
	);
};

export default useShouldProducerOpenInNewTab;

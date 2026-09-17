import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { Chip } from 'vinisto_ui';

interface AvailabilityFomoProps {
	stock: number;
}

const AvailabilityFomo = ({ stock }: AvailabilityFomoProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	if (stock < 1) return null;

	const text = getFomoLocaleKey(stock);

	if (!text) return null;

	return (
		<Chip
			variant="gray"
			label={t({ id: text })?.toString() ?? ''}
		/>
	);
};

export default AvailabilityFomo;

const getFomoLocaleKey = (stock: number): string => {
	if (stock === 1) return 'availabilityFomo.1';
	if (stock >= 2 && stock <= 3) return 'availabilityFomo.2';
	if (stock >= 4 && stock <= 5) return 'availabilityFomo.3';
	return 'availabilityFomo.4';
};

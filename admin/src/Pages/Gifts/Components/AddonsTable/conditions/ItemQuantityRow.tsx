import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { ItemQuantityConditionResponse } from '@/api-types/addons-api';

type Props = {
	condition: ItemQuantityConditionResponse;
};

const CategoryRow = (props: Props) => {
	const getLocalizedValue = useLocalizedValue();

	const { data: item } = useBundleById({
		bundleId: props.condition.itemId ?? '',
	});

	if (!props.condition.minItemQuantity) return null;

	return (
		<div>
			Minimální množství pro bundle {getLocalizedValue(item?.name)}:
			{props.condition.minItemQuantity}
		</div>
	);
};

export default CategoryRow;

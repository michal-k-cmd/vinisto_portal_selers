import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { ItemCategoryConditionResponse } from '@/api-types/addons-api';
import api from '@/api';
import { ProductApi } from '@/api-types/product-api';

type Props = {
	condition: ItemCategoryConditionResponse;
};

const CategoryRow = (props: Props) => {
	const { condition } = props;
	const getLocalizedValue = useLocalizedValue();

	const { data: category } = useQuery({
		queryKey: ['category', condition.itemCategoryId],
		queryFn: () => {
			return api.get<ProductApi.CategoriesDetail.ResponseBody>(
				`product-api/categories/${condition.itemCategoryId}`
			);
		},
		enabled: !!condition.itemCategoryId,
	});

	return <div>Kategorie: {getLocalizedValue(category?.category?.name)}</div>;
};

export default CategoryRow;

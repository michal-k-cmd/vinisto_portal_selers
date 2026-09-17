// This component is most likely not used anywhere and can be removed.
import { useMemo } from 'react';
import useLocalizedValue, {
	isLangValuePairArray,
} from 'Hooks/useLocalizedValue';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';

import { CategoryListProps } from './interfaces';

const TableCategoryList = ({
	itemCategories,
	categories,
}: CategoryListProps) => {
	const getLocalizedValue = useLocalizedValue();

	const filteredCategories = useMemo(() => {
		if (!itemCategories || !categories) return [];

		return categories.filter((category) =>
			itemCategories.includes(String(category.id))
		);
	}, [itemCategories, categories]);
	return (
		<>
			{filteredCategories.map((category) => (
				<div key={category.id}>
					{isLangValuePairArray(category?.name) &&
						getLocalizedValue(category?.name as LangValuePair[])}
				</div>
			))}
		</>
	);
};

export default TableCategoryList;

import { useEffect, useState } from 'react';
import CategoryService from 'Services/Category';
import { CategoryType } from 'Services/Category/interfaces';

const useProductDetails = (loadedIds: string[]) => {
	const [categories, setCategories] = useState<CategoryType[] | undefined>();

	const loadProductDetails = async () => {
		const categories = (await CategoryService.getAll())?.filter(
			(category): category is CategoryType => category !== undefined
		);
		setCategories(categories);
	};

	useEffect(() => {
		if (loadedIds.length > 0) {
			loadProductDetails();
		}
	}, [loadedIds]);

	return { categories };
};

export default useProductDetails;

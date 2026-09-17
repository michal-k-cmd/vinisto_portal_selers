import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';

import { ProductCategoryListProps } from './interfaces';

const ProductCategoryList = ({
	productCategories,
	categories,
}: ProductCategoryListProps) => {
	const language = useContext(LocalizationContext)
		.activeLanguageKey as VinistoHelperDllEnumsLanguage;

	return (
		<>
			{productCategories.map((productCategoryId) => {
				const foundCategory = categories.find(
					(category) => category.id === productCategoryId
				);
				const categoryName =
					foundCategory?.translations[language ?? 'CZECH']?.name;

				return (
					<div key={`product-category-name-${productCategoryId}`}>
						{categoryName}
					</div>
				);
			})}
		</>
	);
};

export default ProductCategoryList;

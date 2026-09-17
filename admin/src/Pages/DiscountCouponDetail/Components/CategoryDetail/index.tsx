import { useQuery } from '@tanstack/react-query';
import CategoryService from 'Services/Category';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const CategoryDetail = ({ categoryId }: { categoryId: string }) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const language = useContext(LocalizationContext).activeLanguageKey;

	const categoryQuery = useQuery(
		['getCategoryById', categoryId],
		() => CategoryService.get(categoryId),
		{
			enabled: !!categoryId,
		}
	);
	return (
		<div>
			{t({ id: 'admin.header.coupon.limitationType.category' })}:{' '}
			<Link to={`/category-detail/${categoryId}`}>
				{categoryQuery.data?.translations[language ?? 'CZECH']?.name}
			</Link>
		</div>
	);
};

export default CategoryDetail;

import { useQuery } from '@tanstack/react-query';
import CmsImageService from 'Services/ApiService/Cms/Image';

const useArticleTitleImages = (titleImageIds: string[]) => {
	return useQuery(
		['article-title-images', titleImageIds],
		async () =>
			await Promise.all(
				titleImageIds.map(async (id) => CmsImageService.getById(id), {
					enabled: !!titleImageIds.length,
				})
			)
	);
};

export default useArticleTitleImages;

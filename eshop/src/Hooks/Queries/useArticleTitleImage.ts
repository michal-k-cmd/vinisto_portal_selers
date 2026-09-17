import { useQuery } from '@tanstack/react-query';
import CmsImageService from 'Services/ApiService/Cms/Image';

const useArticleTitleImage = (titleImageId: string) => {
	const { data: imageData } = useQuery(
		['article-image', titleImageId],
		() => CmsImageService.getById(titleImageId),
		{
			enabled: !!titleImageId,
		}
	);

	return imageData;
};

export default useArticleTitleImage;

import { useQuery } from '@tanstack/react-query';
import { useInViewport } from 'react-in-viewport';
import BlogSection from 'vinisto_ui/src/components/product-detail/blog-section';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useRef } from 'react';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import api from 'vinisto_api_client/src/api';
import {
	VinistoCmsDllModelsApiReturnCmsArticlesReturn,
	VinistoCmsDllModelsApiReturnCmsTagsReturn,
} from 'vinisto_api_client/src/api-types/cms-api';

interface BlogSectionWrapperProps {
	bundleId: string;
	isNext?: boolean;
}

const FOOD_AND_WINE_TAG_URL = 'vino-a-jidlo';
const FOOD_AND_WINE_TAG_ID = '64b92d0418296b563ab5659b';

const ROOT_MARGIN = '500px';

const BlogSectionWrapper = ({ bundleId, isNext }: BlogSectionWrapperProps) => {
	const getLocalizedValue = useLocalizedValue();
	const t = useContext(LocalizationContext).useFormatMessage();

	const blogSectionContainerRef = useRef<HTMLDivElement>(null);
	const { inViewport } = useInViewport(blogSectionContainerRef, {
		rootMargin: ROOT_MARGIN,
	});

	const expandText = t({ id: 'blog.section.showAll' });
	const contractText = t({ id: 'blog.section.showLess' });
	const readMore = t({ id: 'blog.section.readMore' });

	const bundleRelatedArticles = useQuery(
		[bundleId],
		async () => {
			const [articlesResponse, foodAndWineTagResponse] = await Promise.all([
				api.get<VinistoCmsDllModelsApiReturnCmsArticlesReturn>(
					`cms-api/articles/by-bundles-tags`,
					{ BundleIds: [bundleId], TagIds: [FOOD_AND_WINE_TAG_ID] }
				),
				api.get<VinistoCmsDllModelsApiReturnCmsTagsReturn>(`cms-api/tags`, {
					SearchUrl: FOOD_AND_WINE_TAG_URL,
					Limit: 1,
				}),
			]);

			const multilangTitles = foodAndWineTagResponse.tags?.[0]?.name ?? [];
			const multilangDescriptions =
				foodAndWineTagResponse.tags?.[0]?.description ?? [];
			return {
				...articlesResponse,
				title: getLocalizedValue(multilangTitles),
				description: getLocalizedValue(multilangDescriptions),
			};
		},
		{
			enabled: inViewport,
		}
	);

	return (
		<div ref={blogSectionContainerRef}>
			<BlogSection
				title={bundleRelatedArticles.data?.title ?? ''}
				description={bundleRelatedArticles.data?.description ?? ''}
				articles={bundleRelatedArticles.data?.articles ?? []}
				baseBlogUrl={`${t({ id: 'routes.community.route' })}`}
				expandText={expandText}
				contractText={contractText}
				readMore={readMore}
				isNext={isNext}
			/>
		</div>
	);
};

export default BlogSectionWrapper;

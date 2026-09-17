import {
	createContext,
	FC,
	ReactNode,
	Suspense,
	useEffect,
	useState,
} from 'react';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Middleware } from 'Hooks/useMiddlewareReducer/types';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import ContentPreloader from 'Components/ContentPreloader';

import {
	BlogArticleDetailContextValue,
	BlogArticleDetailLoaderReturnValue,
	BlogArticleDetailReducerAction,
	BlogArticleDetailState,
} from './interfaces';
import { BlogArticleDetailAction } from './constants';
import { blogArticleDetailReducer } from './reducer';
import LoadError from './Components/LoadError';

const defaultState: BlogArticleDetailState = {
	article: null,
	specifications: null,
	bundles: [],
	bundleDetails: [],
	cmsImageTags: [],
	postTags: [],
	articleAuthors: [],
	selectedImageUrl: '',
	selectedImageId: '',
	selectedImageDescription: '',
	selectedImageAltText: '',
};

export const BlogArticleDetailContext =
	createContext<BlogArticleDetailContextValue>({
		...defaultState,
		dispatch: () => {},
	});

const BlogArticleDetailContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const {
		articlePromise,
		cmsImageTagsPromise,
		articleAuthorsPromise,
		postTagsPromise,
	} = useLoaderData() as BlogArticleDetailLoaderReturnValue;
	const { id: blogArticleId } = useParams();
	const navigate = useNavigate();

	const blogArticleDetailMiddleware: Middleware<
		BlogArticleDetailState,
		BlogArticleDetailReducerAction
	> = () => (next) => async (action) => {
		const [type] = action;
		switch (type) {
			case BlogArticleDetailAction.reload:
				navigate(`/blog/article-detail/${blogArticleId}`);
				return;
		}
		return next(action);
	};

	const [state, dispatch] = useMiddlewareReducer(
		blogArticleDetailReducer,
		{
			...defaultState,
		},
		[blogArticleDetailMiddleware]
	);

	//TODO: correct type, i am lost in them - but one exists for sure
	const [blogArticle, setBlogArticle] = useState<any>(null);

	useEffect(() => {
		if (blogArticle?.bundles) {
			dispatch([
				BlogArticleDetailAction.setInitialBundles,
				blogArticle.bundles,
			]);
		}
		if (blogArticle?.bundleDetails) {
			dispatch([
				BlogArticleDetailAction.setInitialBundleDetails,
				blogArticle.bundleDetails,
			]);
		}
		if (blogArticle?.specificationDetails) {
			dispatch([
				BlogArticleDetailAction.setInitialSpecifications,
				blogArticle.specificationDetails,
			]);
		}
	}, [blogArticle, dispatch]);

	return (
		<Suspense
			fallback={
				<div className="h-100 d-flex align-items-center justify-content-center">
					<ContentPreloader />
				</div>
			}
		>
			<Await
				resolve={Promise.all([
					articlePromise,
					cmsImageTagsPromise,
					articleAuthorsPromise,
					postTagsPromise,
				])}
				errorElement={<LoadError />}
			>
				{([fetchedBlogArticle, cmsImageTags, articleAuthors, postTags]) => {
					setBlogArticle(fetchedBlogArticle);

					return (
						<BlogArticleDetailContext.Provider
							value={{
								...state,
								article: fetchedBlogArticle,
								cmsImageTags: cmsImageTags,
								postTags: postTags,
								articleAuthors: articleAuthors,
								specifications: state.specifications ?? [],
								bundles: state.bundles ?? [],
								bundleDetails: state.bundleDetails ?? [],
								selectedImageUrl:
									state.selectedImageUrl && state.selectedImageUrl.length > 0
										? state.selectedImageUrl
										: fetchedBlogArticle?.image ?? '',
								dispatch,
							}}
						>
							{children}
						</BlogArticleDetailContext.Provider>
					);
				}}
			</Await>
		</Suspense>
	);
};

export default BlogArticleDetailContextProvider;

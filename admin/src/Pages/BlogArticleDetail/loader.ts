import { defer, LoaderFunction } from 'react-router-dom';
import BlogService from 'Services/CmsService/Blog';
import AuthorService from 'Services/CmsService/Author';
import CmsImageTagService from 'Services/CmsService/ImageTag';
import { Author, CmsImageTag, PostTag } from 'Services/CmsService/interfaces';
import PostTagService from 'Services/CmsService/PostTag';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters } from 'vinisto_api_client/src/api-types/cms-api/';

import { BlogArticleDetailLoaderReturnValue } from './interfaces';

const getArticleAuthorList = async (
	userLoginHash: string
): Promise<Author[]> => {
	const response = await AuthorService.getList([
		{
			key: 'UserLoginHash',
			value: userLoginHash,
		},
		{
			key: 'Limit',
			value: 0,
		},
	]);
	return response ?? [];
};

const getCmsImageTagList = async (
	userLoginHash: string
): Promise<CmsImageTag[]> => {
	const response = await CmsImageTagService.getList([
		{
			key: 'UserLoginHash',
			value: userLoginHash,
		},
		{
			key: 'Limit',
			value: 0,
		},
	]);
	return response ?? [];
};

const getCmsPostTagList = async (userLoginHash: string): Promise<PostTag[]> => {
	const response = await PostTagService.getList([
		{
			key: 'UserLoginHash',
			value: userLoginHash,
		},
		{
			key: 'Limit',
			value: 0,
		},
	]);

	return response ?? [];
};

export const useAuthorsQuery = (userLoginHash: string) =>
	useQuery(['authors', userLoginHash], () =>
		getArticleAuthorList(userLoginHash)
	);

export const useCreateAuthorMutation = (userLoginHash: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		(
			newAuthor: VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters
		) => AuthorService.create(newAuthor),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['authors', userLoginHash]);
			},
		}
	);
};

const blogArticleLoader: (userLoginHash: string) => LoaderFunction =
	(userLoginHash) =>
	async ({ params }) => {
		const data: BlogArticleDetailLoaderReturnValue = {
			articlePromise:
				params.id === undefined
					? Promise.resolve(null)
					: BlogService.getArticle(params.id, userLoginHash),
			cmsImageTagsPromise: getCmsImageTagList(userLoginHash),
			articleAuthorsPromise: getArticleAuthorList(userLoginHash),
			postTagsPromise: getCmsPostTagList(userLoginHash),
		};
		return defer(data);
	};

export default blogArticleLoader;

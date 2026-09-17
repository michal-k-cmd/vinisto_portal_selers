import { LoaderFunction } from 'react-router-dom';
import { CmsImage, CmsImageTag } from 'Services/CmsService/interfaces';
import CmsImageService from 'Services/CmsService/Image';
import CmsImageTagService from 'Services/CmsService/ImageTag';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CmsImageListLoader } from './interfaces';

const getCmsImageList = async (userLoginHash: string): Promise<CmsImage[]> => {
	const response = await CmsImageService.getList([
		{
			key: 'UserLoginHash',
			value: userLoginHash,
		},
	]);
	const cmsImages = response.images ?? [];
	// @ts-expect-error TODO: add adapter in CmsImageService
	return cmsImages;
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

export const useCmsImageTagListQuery = (userLoginHash: string) =>
	useQuery(['cmsImageTagList', userLoginHash], () =>
		getCmsImageTagList(userLoginHash)
	);

export const useCmsImageListMutation = (userLoginHash: string) => {
	const queryClient = useQueryClient();

	return useMutation(
		(newCmsImage: Omit<CmsImageTag, 'id'>) =>
			CmsImageTagService.create({
				name: newCmsImage.name,
				userLoginHash: userLoginHash,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['cmsImageList', userLoginHash]);
			},
		}
	);
};

export const cmsImageListLoader: (userLoginHash: string) => LoaderFunction =
	(userLoginHash) => async (): Promise<CmsImageListLoader> => {
		try {
			const cmsImages = await getCmsImageList(userLoginHash);
			const cmsImageTags = await getCmsImageTagList(userLoginHash);

			return {
				cmsImages,
				cmsImageTags,
			};
		} catch {
			return {};
		}
	};

export default cmsImageListLoader;

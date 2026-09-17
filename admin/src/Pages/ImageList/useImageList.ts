import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { CmsImage, CmsImageTag } from 'Services/CmsService/interfaces';
import CmsImageService from 'Services/CmsService/Image';
import useDebounce from 'Hooks/useDebounce';
import { useIntersectionObserver } from 'Hooks/useIntersectionObserver';
import { Option } from 'Components/Multiselect/interfaces';
import { IMAGE_LIST_DEFAULT_LIMIT } from 'Components/Modal/Components/CmsImageList/constants';

const useImageList = () => {
	const {
		vinistoUser: { loginHash: userLoginHash },
	} = useContext(AuthenticationContext);

	const [searchName, setSearchName] = useState('');
	const [searchTags, setSearchTags] = useState<CmsImageTag[]>([]);

	const debouncedSearchName = useDebounce(searchName);
	const debouncedSearchTags = useDebounce(searchTags);

	const fetchImages = async (
		page: number,
		limit = IMAGE_LIST_DEFAULT_LIMIT
	) => {
		const params = [
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
			{
				key: 'Limit',
				value: limit,
			},
			{
				key: 'Offset',
				value: (page - 1) * limit,
			},
		];

		if (debouncedSearchName) {
			params.push({
				key: 'SearchName',
				value: debouncedSearchName,
			});
		}

		if (debouncedSearchTags.length > 0) {
			debouncedSearchTags.forEach((tag) => {
				params.push({
					key: 'SearchTagIds',
					value: tag.id,
				});
			});
		}

		const res = await CmsImageService.getList(params);
		return res.images;
	};

	const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage } =
		useInfiniteQuery(
			['CmsImages', userLoginHash, debouncedSearchName, debouncedSearchTags],
			({ pageParam = 1 }) => fetchImages(pageParam),
			{
				getNextPageParam: (lastPage, allPages) => {
					if (!lastPage?.length || lastPage.length < IMAGE_LIST_DEFAULT_LIMIT) {
						return undefined;
					}
					return allPages.length + 1;
				},
			}
		);

	const loadMoreRef = useRef(null);
	const entry = useIntersectionObserver(loadMoreRef, {
		freezeOnceVisible: false,
	});

	useEffect(() => {
		if (entry?.isIntersecting && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [entry, isFetchingNextPage, fetchNextPage]);

	const images = (data?.pages.flat() || []) as CmsImage[];

	const handleFilterByName = useCallback((name: string) => {
		setSearchName(name);
	}, []);

	const handleFilterByTags = useCallback((tags: Option[]) => {
		const cmsTags: CmsImageTag[] = tags.map((tag) => ({
			id: tag.value,
			name: tag.label,
		}));
		setSearchTags(cmsTags);
	}, []);

	return {
		images,
		loadMoreRef,
		handleFilterByName,
		handleFilterByTags,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
	};
};

export default useImageList;

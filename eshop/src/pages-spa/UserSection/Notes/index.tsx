'use client';

import { useCallback, useContext, useMemo, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PaginationNav from 'Components/Pagination';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from 'nuqs';
import { useGetAllUserNotes } from 'Components/BundleNotes/hooks';
import { SortingTab, SortingTabs } from 'Components/SortingTabs';
import api from 'vinisto_api_client/src/api';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';
import { ProductApi } from 'vinisto_api_client/src/api-types/product-api';

import BreadCrumbsUserSection from '../Breadcrumbs';

import styles from './styles.module.css';
import {
	BUNDLES_WITH_NOTES_SORTING_COLUMNS,
	DEFAULT_LIMIT_PER_PAGE,
} from './constants';
import BundleWithNote from './BundleWithNote';
import BundlesWithoutNotes from './BundlesWithoutNotes';

const Notes = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const queryClient = useQueryClient();

	const userNotesQuery = useGetAllUserNotes();

	const [page, setPage] = useQueryState(
		'page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const [sorting, setSorting] = useQueryStates({
		column: parseAsString.withDefault('date'),
		isDescending: parseAsBoolean.withDefault(false),
	});

	const userNotes = useMemo(() => {
		const userNotes = userNotesQuery.data ?? [];
		const notesByBundleId = new Map<string, BundleNote[]>();
		userNotes.forEach((note) => {
			const notes = notesByBundleId.get(note.bundleId) ?? [];
			notes.push(note);
			notesByBundleId.set(note.bundleId, notes);
		});
		return notesByBundleId;
	}, [userNotesQuery.data]);

	const userNotesBundleIds = useMemo(() => {
		const allUserNotesByBundleIds = sorting.isDescending
			? Array.from(userNotes.keys()).reverse()
			: Array.from(userNotes.keys());

		const offset = ((page[0] ?? 1) - 1) * DEFAULT_LIMIT_PER_PAGE;
		const limit =
			((page[1] ?? page[0] ?? 1) - (page[0] ?? 0)) * DEFAULT_LIMIT_PER_PAGE +
			DEFAULT_LIMIT_PER_PAGE;

		const bundlesWithNotesPageSlice = allUserNotesByBundleIds.slice(
			offset,
			offset + limit
		);

		return bundlesWithNotesPageSlice;
	}, [page, sorting.isDescending, userNotes]);

	const userBundlesQuery = useQuery({
		queryKey: ['bundlesByIds', userNotesBundleIds],
		queryFn: () =>
			api.get<
				ProductApi.BundlesByIdsList.ResponseBody,
				ProductApi.BundlesByIdsList.RequestQuery
			>(`product-api/bundles/by-ids`, {
				bundleIds: userNotesBundleIds,
			}),
		enabled: userNotesBundleIds.length > 0,
		keepPreviousData: true,
	});

	// This is here to prevent showing the same bundle twice in the lists
	const [recentlyNotedBundleIds, setRecentyNotedBundleIds] = useState<
		Set<string>
	>(new Set());

	const bundlesJoinedWithNotes = useMemo(() => {
		const bundles = userBundlesQuery.data?.bundles ?? [];
		const allBundlesWithNotes = userNotesBundleIds.map((bundleId) => {
			const bundle = bundles.find((bundle) => bundle.id === bundleId);
			if (!bundle) return null;
			const { images, name, id, url, specificationDetails } = bundle;

			const image = images?.find((image) => image.isMain) ?? images?.[0];

			const notes = userNotes.get(bundle.id) ?? [];
			return {
				image,
				bundleName: getLocalizedValue(name),
				bundleId: id,
				bundleUrl: getLocalizedValue(url),
				bundleSpecificationDetails: specificationDetails,
				bundle,
				notes,
			};
		});
		return allBundlesWithNotes.filter(
			(bundle) => !recentlyNotedBundleIds.has(`${bundle?.bundleId}`)
		);
	}, [
		getLocalizedValue,
		userBundlesQuery.data?.bundles,
		userNotes,
		userNotesBundleIds,
		recentlyNotedBundleIds,
	]);

	const bundlesWithNotesById = new Set(
		userNotesQuery.data?.map((note) => note.bundleId)
	);

	const currentPage = (page.length ?? 0) > 1 ? page[1] ?? 1 : page[0] ?? 1;

	const bundlesWithNotesCount = Array.from(bundlesWithNotesById).length;

	const userNotesToLoadMore = useMemo(() => {
		const notesLeft =
			bundlesWithNotesCount - currentPage * DEFAULT_LIMIT_PER_PAGE;
		if (notesLeft < 1) return 0;
		if (notesLeft > DEFAULT_LIMIT_PER_PAGE) return DEFAULT_LIMIT_PER_PAGE;
		return notesLeft;
	}, [bundlesWithNotesCount, currentPage]);

	const totalPaginationPages =
		bundlesWithNotesCount <= DEFAULT_LIMIT_PER_PAGE
			? 0
			: Math.ceil(bundlesWithNotesCount / DEFAULT_LIMIT_PER_PAGE);

	const handleOnSelectPage = useCallback(
		(page: number) => setPage([page]),
		[setPage]
	);

	const handleOnIncreasePage = useCallback(() => {
		setPage([currentPage + 1]);
	}, [currentPage, setPage]);

	const handleOnDecreasePage = useCallback(() => {
		currentPage > 1 && setPage([currentPage - 1]);
	}, [currentPage, setPage]);

	const handleOnLoadMore = useCallback(() => {
		setPage((oldPage) => [
			oldPage?.[0] ?? 1,
			(oldPage?.[1] ?? oldPage?.[0] ?? 1) + 1,
		]);
	}, [setPage]);

	const handleOnSelectSorting = useCallback(
		(sortingColumn: (typeof BUNDLES_WITH_NOTES_SORTING_COLUMNS)[number]) => {
			setSorting({
				column: sortingColumn.column,
				isDescending: sortingColumn.isDescending,
			});
		},
		[setSorting]
	);

	return (
		<>
			<BreadCrumbsUserSection />
			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'routes.user-section.notes.name' })}
			</h1>
			<div>
				<SortingTabs>
					{BUNDLES_WITH_NOTES_SORTING_COLUMNS.map((sortingColumn, index) => (
						<SortingTab
							key={'usnotes' + index}
							label={`${t({ id: sortingColumn.label })}`}
							onClick={() => handleOnSelectSorting(sortingColumn)}
							isActive={
								sorting.column === sortingColumn.column &&
								sorting.isDescending === sortingColumn.isDescending
							}
						/>
					))}
				</SortingTabs>

				{userNotesQuery.isSuccess &&
					userNotes.size === 0 &&
					bundlesJoinedWithNotes.length === 0 && (
						<div className={styles.noProducts}>
							<span>{t({ id: 'userSection.myNotes.empty' })}</span>
						</div>
					)}

				{bundlesJoinedWithNotes.map((bundleWithNotes) => (
					/* @ts-expect-error TODO fix types */
					<BundleWithNote
						{...bundleWithNotes}
						refetchBundleNotes={userNotesQuery.refetch}
						onDeleteNote={() => {
							queryClient.refetchQueries(['infiniteBoughtProductsQuery']);
						}}
						key={'usnotesbwn' + bundleWithNotes?.bundleId}
					/>
				))}

				{totalPaginationPages > 1 && (
					<PaginationNav
						currentPage={currentPage}
						totalPaginationPages={totalPaginationPages}
						itemsToLoadMoreCount={userNotesToLoadMore}
						handleOnLoadMore={handleOnLoadMore}
						handleOnSelectPreviousPage={handleOnDecreasePage}
						handleOnSelectNextPage={handleOnIncreasePage}
						handleOnSelectPage={handleOnSelectPage}
						className="pe-1 mb-5"
					/>
				)}
			</div>

			<BundlesWithoutNotes
				bundlesWithNotesById={bundlesWithNotesById}
				isBundlesWithNotesByIdQueryEnabled={userNotesQuery.isSuccess}
				userNotes={userNotes}
				refetchBundleNotes={userNotesQuery.refetch}
				setRecentyNotedBundleIds={setRecentyNotedBundleIds}
			/>
		</>
	);
};

export default Notes;

import { useInfiniteQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { BOUGHT_PRODUCT_SORTING_COLUMNS } from 'pages-spa/UserSection/BoughtProducts/BoughtProduct/constants';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { SortingTab, SortingTabs } from 'Components/SortingTabs';
import {
	VinistoHelperDllEnumsUserBundleSortableColumns,
	VinistoOrderDllModelsApiReturnDataUserBundlesReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import api from 'vinisto_api_client/src/api';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';
import { parseAsBoolean, parseAsStringEnum, useQueryStates } from 'nuqs';

import BundleWithNote from '../BundleWithNote';

import { BUNDLES_WITHOUT_NOTES_SORTING_COLUMNS } from './constants';

const BundlesWithoutNotes = ({
	bundlesWithNotesById,
	isBundlesWithNotesByIdQueryEnabled,
	userNotes,
	refetchBundleNotes,
	setRecentyNotedBundleIds,
}: {
	bundlesWithNotesById: Set<string>;
	isBundlesWithNotesByIdQueryEnabled: boolean;
	userNotes: Map<string, BundleNote[]>;
	refetchBundleNotes: () => void;
	setRecentyNotedBundleIds: Dispatch<SetStateAction<Set<string>>>;
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const authenticationContext = useContext(AuthenticationContext);
	const { id, loginHash } = authenticationContext.vinistoUser;
	const getLocalizedValue = useLocalizedValue();

	const boughtProductRequestParamsInfinite = {
		userId: id,
		UserLoginHash: loginHash,
	};

	const LIMIT = 10;

	const [sorting, setSorting] = useQueryStates({
		not_noted_column:
			parseAsStringEnum<VinistoHelperDllEnumsUserBundleSortableColumns>(
				Object.values(VinistoHelperDllEnumsUserBundleSortableColumns)
			).withDefault(
				VinistoHelperDllEnumsUserBundleSortableColumns.ORDER_DELIVERY_TIME
			),
		not_noted_isDescending: parseAsBoolean.withDefault(true),
	});

	const infiniteBoughtProductsQuery = useInfiniteQuery({
		queryKey: [
			'boughtProductsOnNotesPageInfinite',
			boughtProductRequestParamsInfinite,
			sorting,
			bundlesWithNotesById,
		],
		queryFn: async ({ pageParam = 0 }) => {
			const response =
				await api.get<VinistoOrderDllModelsApiReturnDataUserBundlesReturn>(
					'order-api/user-bundles',
					{
						...boughtProductRequestParamsInfinite,
						Offset: pageParam * LIMIT,
						Limit: LIMIT,
						Language: 'CZECH',
						SortingColumn: sorting.not_noted_column,
						IsSortingDescending: sorting.not_noted_isDescending,
					}
				);
			setRecentyNotedBundleIds(new Set<string>());
			return {
				...response,
				userBundles: response.userBundles?.filter(
					(userBundle) => !bundlesWithNotesById.has(`${userBundle.bundle?.id}`)
				),
			};
		},

		getNextPageParam: (lastPage, pages) => {
			const totalPages = Math.floor((lastPage.count ?? 0) / LIMIT);

			return pages.length <= totalPages ? pages.length : undefined;
		},
		keepPreviousData: true,
		enabled: isBundlesWithNotesByIdQueryEnabled,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		staleTime: 0,
	});

	const handleOnSelectSorting = useCallback(
		(sortingColumn: (typeof BOUGHT_PRODUCT_SORTING_COLUMNS)[number]) => {
			setSorting({
				not_noted_column: sortingColumn.column,
				not_noted_isDescending: sortingColumn.isDescending,
			});
		},
		[setSorting]
	);

	const hasVisibleBundles = infiniteBoughtProductsQuery.data?.pages.some(
		(page) => (page.userBundles?.length ?? 0) > 0
	);

	if (
		infiniteBoughtProductsQuery.isSuccess &&
		!hasVisibleBundles &&
		!infiniteBoughtProductsQuery.hasNextPage
	)
		return null;

	return (
		<>
			<h2 className={cx(userSectionStyles.userSectionHeader, 'mt-4')}>
				{t({ id: 'userSection.myNotes.subtitle' })}
			</h2>

			<SortingTabs>
				{BUNDLES_WITHOUT_NOTES_SORTING_COLUMNS.map((sortingColumn, index) => (
					<SortingTab
						key={'usnoteswithout' + index}
						label={`${t({ id: sortingColumn.label })}`}
						onClick={() => handleOnSelectSorting(sortingColumn)}
						isActive={
							sorting.not_noted_column === sortingColumn.column &&
							sorting.not_noted_isDescending === sortingColumn.isDescending
						}
					/>
				))}
			</SortingTabs>

			{infiniteBoughtProductsQuery.data?.pages.map((page, pageIndex) =>
				page.userBundles?.map((userBundle, itemIndex) => {
					return (
						<BundleWithNote
							key={`${userBundle.bundle?.id}-${pageIndex}-${itemIndex}`}
							image={userBundle.image}
							bundleId={`${userBundle.bundle?.id}`}
							bundleName={unescape(
								getLocalizedValue(userBundle.bundle?.name ?? [])
							)}
							bundleUrl={getLocalizedValue(userBundle.bundle?.url ?? [])}
							bundle={userBundle.bundle}
							bundleSpecificationDetails={userBundle.specificationDetails}
							notes={userNotes.get(`${userBundle.bundle?.id}`) ?? []}
							refetchBundleNotes={refetchBundleNotes}
							showMoreButton={false}
							showMoreButtonIfOpen={true}
							addNoteText={t({ id: 'userSection.bought-products.addMyNote' })}
							setRecentyNotedBundleIds={setRecentyNotedBundleIds}
						/>
					);
				})
			)}

			<div
				className={cx('d-flex justify-content-center my-3', {
					invisible: !infiniteBoughtProductsQuery.hasNextPage,
				})}
			>
				<button
					className="vinisto-btn vinisto-bg-green"
					onClick={() => {
						infiniteBoughtProductsQuery.fetchNextPage();
					}}
					disabled={
						!infiniteBoughtProductsQuery.hasNextPage ||
						infiniteBoughtProductsQuery.isFetchingNextPage
					}
				>
					Zobrazit další
				</button>
			</div>
		</>
	);
};

export default BundlesWithoutNotes;

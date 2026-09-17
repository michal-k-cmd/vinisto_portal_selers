'use client';

import { useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { useMemo } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useQuery } from '@tanstack/react-query';
import { WarehouseContext } from 'Services/WarehouseService';
import api from 'vinisto_api_client/src/api';
import {
	UserBundlesListParams,
	VinistoHelperDllEnumsUserBundleSortableColumns,
	VinistoOrderDllModelsApiReturnDataUserBundlesReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsStringEnum,
	useQueryState,
	useQueryStates,
} from 'nuqs';

import BreadCrumbsUserSection from '../Breadcrumbs';

import { EVALUATED, LIMITS_PER_PAGE, NOT_EVALUATED } from './constants';
import NotEvaluatedBundlesList from './NotEvaluatedBundlesList';
import EvaluatedBundlesList from './EvaluatedBundlesList';

const Reviews = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const language = useContext(LocalizationContext).activeLanguageKey;
	const warehouseContext = useContext(WarehouseContext);

	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	/* ===================== */
	/* Not evaluated bundles */
	/* ===================== */

	const [notEvaluatedPage, setNotEvaluatedPage] = useQueryState(
		'not_evaluated_page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const [notEvaluatedSorting, setNotEvaluatedSorting] = useQueryStates({
		not_evaluated_column:
			parseAsStringEnum<VinistoHelperDllEnumsUserBundleSortableColumns>(
				Object.values(VinistoHelperDllEnumsUserBundleSortableColumns)
			).withDefault(
				VinistoHelperDllEnumsUserBundleSortableColumns.ORDER_DELIVERY_TIME
			),
		not_evaluated_isDescending: parseAsBoolean.withDefault(true),
	});

	const notEvaluatedBoughtProductsQueryParams: UserBundlesListParams = useMemo(
		() => ({
			UserLoginHash: loginHash,
			Language: language,
			SortingColumn: notEvaluatedSorting.not_evaluated_column,
			IsSortingDescending: notEvaluatedSorting.not_evaluated_isDescending,
			Offset:
				(Number(notEvaluatedPage[0]) - 1) * LIMITS_PER_PAGE[NOT_EVALUATED],
			Limit:
				notEvaluatedPage.length === 1
					? LIMITS_PER_PAGE[NOT_EVALUATED]
					: (Number(notEvaluatedPage[1]) - Number(notEvaluatedPage[0]) + 1) *
					  LIMITS_PER_PAGE[NOT_EVALUATED],
			HasEvaluationFromUser: false,
		}),
		[loginHash, language, notEvaluatedSorting, notEvaluatedPage]
	);

	const notEvaluatedBoughtProductsQuery = useQuery(
		['notEvaluatedboughtProducts', notEvaluatedBoughtProductsQueryParams],
		async () => {
			const response =
				await api.get<VinistoOrderDllModelsApiReturnDataUserBundlesReturn>(
					'order-api/user-bundles',
					notEvaluatedBoughtProductsQueryParams
				);

			return response;
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: true,
		}
	);

	/* ================= */
	/* Evaluated bundles */
	/* ================= */

	const [page, setPage] = useQueryState(
		'page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const [sorting, setSorting] = useQueryStates({
		column: parseAsStringEnum<VinistoHelperDllEnumsUserBundleSortableColumns>(
			Object.values(VinistoHelperDllEnumsUserBundleSortableColumns)
		).withDefault(VinistoHelperDllEnumsUserBundleSortableColumns.BUNDLE_NAME),
		isDescending: parseAsBoolean.withDefault(true),
	});

	const evaluatedBoughtProductsQueryParams: UserBundlesListParams = useMemo(
		() => ({
			UserLoginHash: loginHash,
			Language: language,
			SortingColumn: sorting.column,
			IsSortingDescending: sorting.isDescending,
			Offset: (Number(page[0]) - 1) * LIMITS_PER_PAGE[EVALUATED],
			Limit:
				page.length === 1
					? LIMITS_PER_PAGE[EVALUATED]
					: (Number(page[1]) - Number(page[0]) + 1) *
					  LIMITS_PER_PAGE[EVALUATED],
			HasEvaluationFromUser: true,
		}),
		[loginHash, language, sorting, page]
	);

	const evaluatedBoughtProductsQuery = useQuery(
		['evaluatedBoughtProducts', evaluatedBoughtProductsQueryParams],
		async () => {
			const response =
				await api.get<VinistoOrderDllModelsApiReturnDataUserBundlesReturn>(
					'order-api/user-bundles',
					evaluatedBoughtProductsQueryParams
				);

			const bundleIds = response.userBundles
				?.map((userBundle) => userBundle.bundle?.id)
				.filter((id): id is string => id !== null && id !== undefined);

			if (bundleIds && bundleIds.length > 0)
				warehouseContext.fetchQuantity(bundleIds);
			return response;
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: true,
		}
	);

	const refetchBothQueries = useCallback(() => {
		notEvaluatedBoughtProductsQuery.refetch();
		evaluatedBoughtProductsQuery.refetch();
	}, [notEvaluatedBoughtProductsQuery, evaluatedBoughtProductsQuery]);

	// TODO Zvážit sjednotit NotEvaluatedBundlesList a EvaluatedBundles do jedné komponenty
	// Liší se pouze query parametry, query key a titulek (a budou se lišit vnitřní komponenty)
	return (
		<>
			<BreadCrumbsUserSection />

			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'routes.user-section.reviews.name' })}
			</h1>

			<NotEvaluatedBundlesList
				page={notEvaluatedPage}
				// @ts-expect-error The intellisense shows types that are not exported from the library
				setPage={setNotEvaluatedPage}
				sorting={notEvaluatedSorting}
				setSorting={setNotEvaluatedSorting}
				query={notEvaluatedBoughtProductsQuery}
				refetchCallback={refetchBothQueries}
			/>
			<EvaluatedBundlesList
				page={page}
				// @ts-expect-error The intellisense shows types that are not exported from the library
				setPage={setPage}
				sorting={sorting}
				setSorting={setSorting}
				query={evaluatedBoughtProductsQuery}
				refetchCallback={refetchBothQueries}
			/>
		</>
	);
};

export default Reviews;

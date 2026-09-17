export const DEFAULT_PAGE = [1];
export const API_EVALUATIONS_URL = 'product-api/evaluations';
export const GET_BUNDLE_EVALUATIONS_QUERY_KEY = 'reviews';

export type ReviewSortingType = keyof typeof SORTING;

export const SORTING = {
	NEWEST: 'NEWEST',
	HIGHEST_RATING: 'HIGHEST_RATING',
	LOWEST_RATING: 'LOWEST_RATING',
};

export const SORTING_API_COLUMN: { [k in ReviewSortingType]: string } = {
	NEWEST: 'TIME',
	HIGHEST_RATING: 'STARS',
	LOWEST_RATING: 'STARS',
};

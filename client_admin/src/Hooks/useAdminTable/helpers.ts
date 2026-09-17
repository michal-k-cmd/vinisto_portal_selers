import {
	DEFAULT_ITEMS_PER_PAGE,
	MIN_PAGE_NUMBER,
	NOT_FOUND,
	PAGE_SIZES,
} from './constants';

export const validatePageSize = (size: number) =>
	!isFinite(size) || PAGE_SIZES.indexOf(size) === NOT_FOUND
		? DEFAULT_ITEMS_PER_PAGE
		: size;

export const validatePageNumber = (page: number) =>
	!isFinite(page) || page < MIN_PAGE_NUMBER ? MIN_PAGE_NUMBER : page;

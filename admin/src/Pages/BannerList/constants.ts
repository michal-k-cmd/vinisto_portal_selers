import { MapObject } from './interfaces';

export const TITLE_COLUMN = 'title';
export const AVAILABLE_ON_PLATFORMS_COLUMN = 'availableOnPlatforms';
export const VALID_FROM_COLUMN = 'validFrom';
export const VALID_TO_COLUMN = 'validTo';
export const POSITION_COLUMN = 'type';
export const ORDER_COLUMN = 'order';
export const ACTIVE_COLUMN = 'active';

export const FILTER_COLUMN_MAP: MapObject = {
	[TITLE_COLUMN]: 'SearchTitle',
	[AVAILABLE_ON_PLATFORMS_COLUMN]: 'PlatformId',
	[VALID_FROM_COLUMN]: 'SearchAvailableFrom',
	[VALID_TO_COLUMN]: 'SearchAvailableTo',
	[POSITION_COLUMN]: 'SearchType',
};

export const SORTING_COLUMN_MAP: MapObject = {
	[TITLE_COLUMN]: 'TITLE',
	[VALID_FROM_COLUMN]: 'AVAILABLE_FROM',
	[VALID_TO_COLUMN]: 'AVAILABLE_TO',
	[POSITION_COLUMN]: 'TYPE',
	[ORDER_COLUMN]: 'POSITION',
};

export const NAME_COLUMN = 'name';
export const AVAILABLE_ON_PLATFORM_COLUMN = 'availableOnPlatform';
export const CONDITIONS_COLUMN = 'conditions';
export const ACTIONS_COLUMN = 'actions';
export const VALID_FROM_COLUMN = 'validFrom';
export const VALID_TO_COLUMN = 'validTo';
export const IS_ACTIVE_COLUMN = 'isActive';
export const HANDLERS_COLUMN = 'handlers';

export const SORTING_COLUMN_MAP: Record<string, string> = {
	[NAME_COLUMN]: 'Name',
	[VALID_FROM_COLUMN]: 'ValidFrom',
	[VALID_TO_COLUMN]: 'ValidTo',
	[IS_ACTIVE_COLUMN]: 'IsActive',
};

export const FILTER_COLUMN_MAP: Record<string, string> = {
	[NAME_COLUMN]: 'Name',
	[AVAILABLE_ON_PLATFORM_COLUMN]: 'AvailableOnPlatform',
	[VALID_FROM_COLUMN]: 'ValidFrom',
	[VALID_TO_COLUMN]: 'ValidTo',
	[IS_ACTIVE_COLUMN]: 'IsActive',
};

import type { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

export const BROADCAST_CHANNELS = {
	BASKET_SYNC: 'BASKET_SYNC_CHANNEL',
	AUTH_SYNC: 'AUTH_SYNC_CHANNEL',
	LOCALIZATION_SYNC: 'LOCALIZATION_SYNC_CHANNEL',
} as const;

export type BroadcastChannelName =
	(typeof BROADCAST_CHANNELS)[keyof typeof BROADCAST_CHANNELS];

export const AUTH_BROADCAST_MESSAGE_TYPES = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	USER_UPDATED: 'USER_UPDATED',
	FORCE_LOGOUT: 'FORCE_LOGOUT',
} as const;

export type AuthBroadcastMessageType =
	(typeof AUTH_BROADCAST_MESSAGE_TYPES)[keyof typeof AUTH_BROADCAST_MESSAGE_TYPES];

export type AuthBroadcastMessage = {
	type: AuthBroadcastMessageType;
};

export const BASKET_BROADCAST_MESSAGE_TYPES = {
	CLEAR_PRIMARY_BASKET: 'CLEAR_PRIMARY_BASKET',
} as const;

export type BasketBroadcastMessageType =
	(typeof BASKET_BROADCAST_MESSAGE_TYPES)[keyof typeof BASKET_BROADCAST_MESSAGE_TYPES];

export type BasketBroadcastMessage = {
	type: BasketBroadcastMessageType;
};

export const LOCALIZATION_BROADCAST_MESSAGE_TYPES = {
	CURRENCY_CHANGED: 'CURRENCY_CHANGED',
} as const;

export type LocalizationBroadcastMessage = {
	type: typeof LOCALIZATION_BROADCAST_MESSAGE_TYPES.CURRENCY_CHANGED;
	currency: VinistoHelperDllEnumsCurrency;
};

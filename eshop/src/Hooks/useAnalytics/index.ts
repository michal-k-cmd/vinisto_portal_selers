'use client';

import debounce from 'lodash-es/debounce';
import { useCallback, useRef } from 'react';

import { DATA_LAYER_PUSH_DEBOUNCE_TIME, GA_EVENT } from './constants';
import { GaEventParameters, SendEvent } from './types';

const isAnalyticsConfigured = Boolean(
	process.env.NEXT_PUBLIC_GTM_ID || process.env.NEXT_PUBLIC_GA4_ID
);

const ECOMMERCE_EVENTS = new Set<GA_EVENT>([
	GA_EVENT.VIEW_ITEM_LIST,
	GA_EVENT.SELECT_ITEM,
	GA_EVENT.VIEW_ITEM,
	GA_EVENT.ADD_TO_CART,
	GA_EVENT.REMOVE_FROM_CART,
	GA_EVENT.VIEW_CART,
	GA_EVENT.ADD_TO_WISHLIST,
	GA_EVENT.BEGIN_CHECKOUT,
	GA_EVENT.ADD_SHIPPING_INFO,
	GA_EVENT.ADD_PAYMENT_INFO,
	GA_EVENT.PURCHASE,
	GA_EVENT.VIEW_PROMOTION,
	GA_EVENT.SELECT_PROMOTION,
]);

const CLARITY_EVENTS = new Set<GA_EVENT>([
	GA_EVENT.ADD_TO_CART,
	GA_EVENT.REMOVE_FROM_CART,
	GA_EVENT.BEGIN_CHECKOUT,
	GA_EVENT.ADD_SHIPPING_INFO,
	GA_EVENT.ADD_PAYMENT_INFO,
	GA_EVENT.PURCHASE,
	GA_EVENT.VIEW_PROMOTION,
	GA_EVENT.SELECT_PROMOTION,
]);

const sendClarityEvent = (eventType: GA_EVENT) => {
	if (!process.env.NEXT_PUBLIC_GTM_ID) return;
	if (!CLARITY_EVENTS.has(eventType)) return;
	if (typeof window === 'undefined' || !window.clarity) return;

	window.clarity('event', eventType);
};

const getDataLayerEvent = (
	eventType: GA_EVENT,
	data: GaEventParameters | Record<string, any>
) => {
	if (!ECOMMERCE_EVENTS.has(eventType)) {
		return {
			event: eventType,
			...data,
		};
	}

	const dataLayerData = data as Record<string, any>;
	const ecommerce = dataLayerData.ecommerce ?? dataLayerData;

	return {
		event: eventType,
		...dataLayerData,
		ecommerce,
	};
};

const handleDataLayerEvent = (eventType: GA_EVENT, data: GaEventParameters) => {
	if (!isAnalyticsConfigured) return;
	if (typeof window === 'undefined' || !window.dataLayer) return;
	if (!eventType) return;

	if (ECOMMERCE_EVENTS.has(eventType)) {
		window.dataLayer.push({ ecommerce: null });
	}

	window.dataLayer.push(getDataLayerEvent(eventType, data));
	sendClarityEvent(eventType);
};

const useAnalytics = () => {
	const debouncedEventsRef = useRef(
		new Map<GA_EVENT, (parameters: GaEventParameters) => void>()
	);

	const getDebouncedEvent = useCallback((eventType: GA_EVENT) => {
		if (!debouncedEventsRef.current.has(eventType)) {
			const debouncedSendEvent = debounce((parameters: GaEventParameters) => {
				handleDataLayerEvent(eventType, parameters);
			}, DATA_LAYER_PUSH_DEBOUNCE_TIME);
			debouncedEventsRef.current.set(eventType, debouncedSendEvent);
		}
		return debouncedEventsRef.current.get(eventType);
	}, []);

	const sendEvent: SendEvent = useCallback(
		(eventType, parameters) => {
			if (!isAnalyticsConfigured) return;

			const debouncedSend = getDebouncedEvent(eventType);
			if (debouncedSend) debouncedSend(parameters);
		},
		[getDebouncedEvent]
	);

	/**
	 * @deprecated Use sendEvent instead
	 */
	const pushToDataLayer = (data: Record<string, any>) => {
		if (!isAnalyticsConfigured) return;
		if (typeof window === 'undefined' || !window.dataLayer) return;

		const eventType = data.event as GA_EVENT | undefined;
		if (!eventType) return;

		if (ECOMMERCE_EVENTS.has(eventType)) {
			window.dataLayer.push({ ecommerce: null });
		}

		window.dataLayer.push(getDataLayerEvent(eventType, data));
		sendClarityEvent(eventType);
	};

	return {
		sendEvent,
		pushToDataLayer,
	};
};

export default useAnalytics;

interface fbqType {
	(action: string, eventName: string, contents: Record<string, unknown>): void;
}

declare global {
	interface Window {
		fbq?: fbqType;
	}
}

export type TrackEventType =
	| 'ViewContent'
	| 'AddToCart'
	| 'Purchase'
	| 'InitiateCheckout'
	| 'AddPaymentInfo';

export const TrackEvent = (
	action: string,
	eventName: TrackEventType,
	contents: Record<string, unknown>
) => {
	if (!process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_KEY) return;
	if (typeof window === 'undefined' || !window.fbq) return;
	window.fbq(action, eventName, contents);
};

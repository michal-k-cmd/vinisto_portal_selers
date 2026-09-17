export interface StockAvailabilityProps {
	availableQuantity: number[] | null;
	deliveryDate?: Date;
	fallback?: JSX.Element | null;
	isTemporaryUnavailable?: boolean;
	isSaleOver?: boolean;
	isIntangible?: boolean;
}

export const normalizeWarehouseQuantity = (
	quantity: number | null | undefined
) => Math.max(quantity ?? 0, 0);

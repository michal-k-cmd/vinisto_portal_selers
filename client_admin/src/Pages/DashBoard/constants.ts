export const BusinessType = {
	B2C: 'B2C',
	B2B: 'B2B',
} as const;

export type BusinessTypeType = (typeof BusinessType)[keyof typeof BusinessType];

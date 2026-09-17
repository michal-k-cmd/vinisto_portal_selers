export const billingFormMode = {
	CREATE: 'CREATE',
	EDIT: 'EDIT',
} as const;

export type BillingFormMode =
	(typeof billingFormMode)[keyof typeof billingFormMode];

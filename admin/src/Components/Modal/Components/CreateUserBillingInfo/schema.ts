import { z } from 'zod';

const userBillingInfoFormSchema = z.object({
	title: z.string().optional().nullable(),
	name: z.string().min(1, 'Name is required'),
	surname: z.string().min(1, 'Surname is required'),
	company: z.string().optional(),
	ico: z.string().optional().nullable(),
	dic: z.string().optional().nullable(),
	street: z.string().min(1, 'Street is required'),
	landRegistryNumber: z.string().min(1, 'Land registry number is required'),
	houseNumber: z.string().optional().nullable(),
	zip: z.string().min(1, 'ZIP code is required'),
	city: z.string().min(1, 'City is required'),
	accountNumber: z
		.string()
		.transform((accNumber) => accNumber.replace(/^[-]+/, ''))
		.optional()
		.nullable(),
	bankCode: z.string().optional().nullable(),
	countryCode: z.string().optional().nullable(),
	phone: z.string().min(1, 'Phone is required'),
	email: z.string().email('Invalid email format').optional().nullable(),
});

type UserBillingInfoFormValues = z.infer<typeof userBillingInfoFormSchema>;

export default userBillingInfoFormSchema;
export type { UserBillingInfoFormValues };

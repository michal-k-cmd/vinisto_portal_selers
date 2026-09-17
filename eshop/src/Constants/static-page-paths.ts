export const B2B_STATIC_PAGE_PATHS = {
	delivery: '/doprava-a-zavozy-pro-firmy',
	payments: '/moznosti-platby-pro-firmy',
	returns: '/reklamace-a-vraceni-pro-firmy',
	faq: '/casto-kladene-otazky-pro-firmy',
	aboutUs: '/o-nas-pro-firmy',
	contact: '/kontakty-pro-firmy',
	fulfillment: '/fullfilment-pro-firmy',
	termsAndConditions: '/obchodni-podminky-pro-firmy',
	privacyProtection: '/ochrana-osobnich-udaju-pro-firmy',
} as const;

export type B2bStaticPage = keyof typeof B2B_STATIC_PAGE_PATHS;

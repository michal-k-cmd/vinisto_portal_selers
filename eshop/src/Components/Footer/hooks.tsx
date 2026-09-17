'use client';

import { useContext } from 'react';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import { LocalizationContext } from 'Services/LocalizationService';
import type { AvailableLocale } from 'Services/LocalizationService/interfaces';
import { getCustomerSupportContact } from 'Hooks/useCustomerSupportContact';
import Config from 'Config';
import { B2B_STATIC_PAGE_PATHS } from 'Constants/static-page-paths';

import type { FooterConfig } from './interfaces';

const getLocalizedPath = (
	paths: Record<AvailableLocale, string>,
	activeLanguage: AvailableLocale
) => paths[activeLanguage];

export const useFooterConfig = ({
	activeLanguage,
	isB2b,
}: {
	activeLanguage: AvailableLocale;
	isB2b: boolean;
}): FooterConfig => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const customerSupport = getCustomerSupportContact(isB2b ? 'b2b' : 'b2c');
	const businessCustomerSales = Config.market.businessCustomerSales;

	if (isB2b) {
		const paths = B2B_STATIC_PAGE_PATHS;

		return {
			newsletterTitle: t({ id: 'footer.b2b.newsletter' }),
			customerCarePhone: customerSupport.phone,
			mobileSecondaryContact: {
				label: t({ id: 'footer.b2b.salesDepartment' }),
				phone: businessCustomerSales.phone,
			},
			infoColumns: [
				{
					id: 'orders-and-delivery',
					title: t({ id: 'footer.b2b.ordersAndDelivery' }),
					links: [
						{
							name: t({ id: 'footer.b2b.delivery' }),
							to: paths.delivery,
						},
						{
							name: t({ id: 'routes.payments.name' }),
							to: paths.payments,
						},
						{
							name: t({ id: 'routes.returns.name' }),
							to: paths.returns,
						},
						{
							name: t({ id: 'routes.faq.name' }),
							to: paths.faq,
						},
					],
				},
				{
					id: 'business-customers',
					title: t({ id: 'footer.b2b.businessCustomers' }),
					links: [
						{
							name: t({ id: 'routes.aboutUs.name' }),
							to: paths.aboutUs,
						},
						{
							name: t({ id: 'routes.contact.name' }),
							to: paths.contact,
						},
						{
							name: t({ id: 'footer.b2b.fulfillment' }),
							to: paths.fulfillment,
						},
						{
							name: t({ id: 'routes.termsAndConditions.name' }),
							to: paths.termsAndConditions,
						},
						{
							name: t({ id: 'routes.privacyProtection.name' }),
							to: paths.privacyProtection,
						},
					],
				},
				{
					id: 'customer-support',
					title: t({ id: 'footer.b2b.customerSupport' }),
					links: [
						{
							name: (
								<>
									{t({ id: 'footer.b2b.customerSupport.description' })}
									<br />
									<a
										href={`tel:${customerSupport.phone}`}
										className="vnav-link underline-item"
									>
										{formatPhoneNumber(customerSupport.phone)}
									</a>
									<br />
									<a
										href={`mailto:${customerSupport.email}`}
										className="vnav-link underline-item"
									>
										{customerSupport.email}
									</a>
								</>
							),
							to: null,
						},
					],
				},
				{
					id: 'sales-department',
					title: t({ id: 'footer.b2b.salesDepartment' }),
					links: [
						{
							name: (
								<>
									{t({ id: 'footer.b2b.salesDepartment.description' })}
									<br />
									<a
										href={`tel:${businessCustomerSales.phone}`}
										className="vnav-link underline-item"
									>
										{formatPhoneNumber(businessCustomerSales.phone)}
									</a>
									<br />
									<a
										href={`mailto:${businessCustomerSales.email}`}
										className="vnav-link underline-item"
									>
										{businessCustomerSales.email}
									</a>
								</>
							),
							to: null,
						},
					],
				},
			],
		};
	}

	return {
		newsletterTitle: t({ id: 'footer.newsletter' }),
		customerCarePhone: customerSupport.phone,
		infoColumns: [
			{
				id: 'how-to-buy',
				title: t({ id: 'footer.howToBuy' }),
				links: [
					{
						name: t({ id: 'routes.delivery.name' }),
						to: '/moznosti-dopravy',
					},
					{
						name: t({ id: 'routes.payments.name' }),
						to: '/moznosti-platby',
					},
					{
						name: t({ id: 'routes.faq.name' }),
						to: '/casto-kladene-otazky',
					},
					{
						name: t({ id: 'routes.termsAndConditions.name' }),
						to: getLocalizedPath(
							{
								cs: '/obchodni-podminky',
								sk: '/obchodne-podmienky',
							},
							activeLanguage
						),
					},
					{
						name: t({ id: 'routes.privacyProtection.name' }),
						to: getLocalizedPath(
							{
								cs: '/ochrana-osobnich-udaju',
								sk: '/ochrana-osobnych-udajov',
							},
							activeLanguage
						),
					},
					{
						name: t({ id: 'routes.returns.name' }),
						to: getLocalizedPath(
							{
								cs: '/reklamace-a-vraceni',
								sk: '/reklamacie-a-vratenie-tovaru',
							},
							activeLanguage
						),
					},
					{
						name: t({ id: 'routes.contractWithdraw.name' }),
						to: '/odstoupeni-od-smlouvy',
					},
				],
			},
			{
				id: 'information',
				title: t({ id: 'footer.information' }),
				links: [
					{
						name: t({ id: 'routes.aboutUs.name' }),
						to: '/o-nas',
					},
					{
						name: t({ id: 'routes.contact.name' }),
						to: '/kontakty',
					},
					{
						name: t({ id: 'routes.producers.name' }),
						to: '/rejstrik-producentu',
					},
					{
						name: t({ id: 'routes.blog.name' }),
						to: '/blog/tag/blog',
					},
				],
			},
			{
				id: 'sell-with-us',
				title: t({ id: 'footer.sellWithUs' }),
				links: [
					{
						name: t({ id: 'routes.faqSeller.name' }),
						to: getLocalizedPath(
							{
								cs: '/nejcastejsi-dotazy-prodejcu',
								sk: '/najcastejsie-otazky-predajcov',
							},
							activeLanguage
						),
					},
					{
						name: t({ id: 'routes.becomeSupplier.name' }),
						to: getLocalizedPath(
							{
								cs: '/jak-se-stat-prodejcem',
								sk: '/ako-sa-stat-predajcom',
							},
							activeLanguage
						),
					},
					{
						name: t({ id: 'routes.horeca.name' }),
						to: process.env.NEXT_PUBLIC_B2B_URI ?? '#',
						as: 'button',
					},
				],
			},
			{
				id: 'contact',
				title: t({ id: 'footer.contact' }),
				links: [
					{
						name: (
							<>
								vinisto s.r.o.
								<br />
								Jankovcova 1057/6 170 00, Praha 7
								<br />
								<a
									href="mailto:info@vinisto.cz"
									className="vnav-link underline-item"
								>
									info@vinisto.cz
								</a>
								<br />
								{formatPhoneNumber(customerSupport.phone)}
							</>
						),
						to: null,
					},
				],
			},
		],
	};
};

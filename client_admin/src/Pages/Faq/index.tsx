import { FC, useContext } from 'react';
import { map } from 'lodash-es';
import Accordion from 'react-bootstrap/Accordion';
import { LocalizationContext } from 'Services/LocalizationService';
import Config from 'Config';

import './styles.css';

const FaqPage: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const beforeIStartSellingAccordion = [
		{
			title: (
				<span>
					{t(
						{ id: 'faq.beforeSell.question.whySellOnVinisto' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistu: <span className="vinisto-color-success">vinistu</span>,
						}
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.beforeSell.info.whySellOnVinisto' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistem: <span className="vinisto-color-success">vinistem</span>,
							vinista: <span className="vinisto-color-success">vinista</span>,
						}
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.beforeSell.question.howItWorks' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.beforeSell.info.howItWorks' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							marketplace: <span>„marketplace“</span>,
						}
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.beforeSell.question.howCanIStartSelling' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistu: <span className="vinisto-color-success">vinistu</span>,
						}
					)}
				</span>
			),
			content: (
				<p>
					{t({ id: 'faq.beforeSell.info.howCanIStartSelling.step1.heading' })}
					<br />
					{t(
						{ id: 'faq.beforeSell.info.howCanIStartSelling.step1.info' },
						{
							prodejceVinisto: (
								<a
									href="https://www.prodejce.vinisto.cz"
									className="vinisto-color-success"
								>
									www.prodejce.vinisto.cz
								</a>
							),
						}
					)}
					<br />
					{t({ id: 'faq.beforeSell.info.howCanIStartSelling.step2.heading' })}
					<br />
					{t(
						{ id: 'faq.beforeSell.info.howCanIStartSelling.step2.info' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
					<br />
					{t({ id: 'faq.beforeSell.info.howCanIStartSelling.step3.heading' })}
					<br />
					{t({ id: 'faq.beforeSell.info.howCanIStartSelling.step3.info' })}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.beforeSell.question.conditions' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: <p>{t({ id: 'faq.beforeSell.info.conditions' })}</p>,
		},
		{
			title: <span>{t({ id: 'faq.beforeSell.question.contract' })}</span>,
			content: <p>{t({ id: 'faq.beforeSell.info.contract' })}</p>,
		},
	];

	const whatCanBeSoldOnVinistoAccordion = [
		{
			title: (
				<span>
					{t(
						{ id: 'faq.whatToSell.question.items' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistu: <span className="vinisto-color-success">vinistu</span>,
						}
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.whatToSell.info.items' },
						{ vinistu: <span className="vinisto-color-success">vinistu</span> }
					)}
				</p>
			),
		},
		{
			title: <span>{t({ id: 'faq.whatToSell.question.promotions' })}</span>,
			content: <p>{t({ id: 'faq.whatToSell.info.promotions' })}</p>,
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.whatToSell.question.tasting' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistu: <span className="vinisto-color-success">vinistu</span>,
						}
					)}
				</span>
			),
			content: <p>{t({ id: 'faq.whatToSell.info.tasting' })}</p>,
		},
	];

	const howItWorksAccordion = [
		{
			title: (
				<span>
					{t(
						{ id: 'faq.howItWorks.question.cooperation' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.howItWorks.info.cooperation' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinista: <span className="vinisto-color-success">vinista</span>,
							phone: Config.contact.phone,
						}
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t({ id: 'faq.howItWorks.question.canBeChangedCooperation' })}
				</span>
			),
			content: (
				<p>{t({ id: 'faq.howItWorks.info.canBeChangedCooperation' })}</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.howItWorks.question.myProducts' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.howItWorks.info.myProducts' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.howItWorks.question.customerCare' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.howItWorks.info.customerCare' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistu: <span className="vinisto-color-success">vinistu</span>,
						}
					)}
				</p>
			),
		},
	];

	const commissionsAccordion = [
		{
			title: (
				<span>
					{t(
						{ id: 'faq.commission.question.whenToPay' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.commission.info.whenToPay' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinistu: <span className="vinisto-color-success">vinistu</span>,
						}
					)}
				</p>
			),
		},
		{
			title: <span>{t({ id: 'faq.commission.question.howYouPayMe' })}</span>,
			content: (
				<p>
					{t(
						{ id: 'faq.commission.info.howYouPayMe' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.commission.question.canFeesBeChanged' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.commission.info.canFeesBeChanged' },
						{ vinistu: <span className="vinisto-color-success">vinistu</span> }
					)}
				</p>
			),
		},
	];

	const pricingAccordion = [
		{
			title: (
				<span>
					{t(
						{ id: 'faq.prices.question.howToSet' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: <p>{t({ id: 'faq.prices.info.howToSet' })}</p>,
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.prices.question.canVinistoEditMyPrices' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.prices.info.canVinistoEditMyPrices' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinista: <span className="vinisto-color-success">vinista</span>,
						}
					)}
				</p>
			),
		},
	];

	const promotionsAccordion = [
		{
			title: (
				<span>
					{t(
						{ id: 'faq.promotions.question.howItWorks' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.promotions.info.howItWorks' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.promotions.question.canIPromote' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.promotions.info.canIPromote' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							phone: Config.contact.phone,
						}
					)}
				</p>
			),
		},
	];

	const shippingAndWarehouseAccordion = [
		{
			title: (
				<span>
					{t({ id: 'faq.shippingAndWarehouse.question.whereStored' })}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.shippingAndWarehouse.info.whereStored' },
						{
							vinisto: <span className="vinisto-color-success">vinisto</span>,
							vinista: <span className="vinisto-color-success">vinista</span>,
						}
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.shippingAndWarehouse.question.howItWorks' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: <p>{t({ id: 'faq.shippingAndWarehouse.info.howItWorks' })}</p>,
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.shippingAndWarehouse.question.howToChangeDate' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>
					{t(
						{ id: 'faq.shippingAndWarehouse.info.howToChangeDate' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</p>
			),
		},
		{
			title: (
				<span>
					{t(
						{ id: 'faq.shippingAndWarehouse.question.nobodyPickedUpGoods' },
						{ vinisto: <span className="vinisto-color-success">vinisto</span> }
					)}
				</span>
			),
			content: (
				<p>{t({ id: 'faq.shippingAndWarehouse.info.nobodyPickedUpGoods' })}</p>
			),
		},
	];

	const accordions = [
		{
			header: t({ id: 'faq.beforeSell.heading' }),
			items: beforeIStartSellingAccordion,
		},
		{
			header: t(
				{ id: 'faq.whatToSell.heading' },
				{
					vinistu: <span className="vinisto-color-success">vinistu</span>,
					vinisto: <span className="vinisto-color-success">vinisto</span>,
				}
			),
			items: whatCanBeSoldOnVinistoAccordion,
		},
		{
			header: t(
				{ id: 'faq.howItWorks.heading' },
				{ vinisto: <span className="vinisto-color-success">vinisto</span> }
			),
			items: howItWorksAccordion,
		},
		{
			header: t({ id: 'faq.commission.heading' }),
			items: commissionsAccordion,
		},
		{
			header: t({ id: 'faq.prices.heading' }),
			items: pricingAccordion,
		},
		{
			header: t({ id: 'faq.promotions.heading' }),
			items: promotionsAccordion,
		},
		{
			header: t({ id: 'faq.shippingAndWarehouse.heading' }),
			items: shippingAndWarehouseAccordion,
		},
	];

	return (
		<section id="content-wrapper">
			{map(accordions, (acc, key) => (
				<div
					className="row mx-1 mb-3"
					key={key}
				>
					<div className="col-12">
						<div className="vinisto-card pb-4">
							<div className="vinisto-accordions vinisto-font-18">
								<h2 className="vinisto-accordions__heading">{acc?.header}</h2>
								<Accordion>
									{map(acc?.items, (item, key) => (
										<Accordion.Item
											eventKey={key.toString()}
											key={key}
										>
											<Accordion.Header>{item?.title}</Accordion.Header>
											<Accordion.Body>{item?.content}</Accordion.Body>
										</Accordion.Item>
									))}
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default FaqPage;

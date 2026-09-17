'use client';

import * as React from 'react';
import { requireEmail } from 'Components/Form/validators';
import {
	Form,
	InputEmail,
	InputPhone,
	InputText,
	InputTextArea,
} from 'Components/Form';
import ImageLocal from 'Components/View/ImageLocal';

import './styles.css';

const SellerLanding = () => {
	return (
		<section
			id="content-wrapper"
			className="vinisto-seller-landing"
		>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card vinisto-seller-landing__banner">
							<div className="row">
								<div className="col-12 col-md-6">
									<div className="vinisto-seller-landing__banner__left">
										<div className="vinisto-seller-landing__banner__left__primary">
											Nabídněte svá vína komunitě na prvním českém{' '}
											<span className="vinisto-color-success">
												{' '}
												online tržišti{' '}
											</span>{' '}
											s vínem.
										</div>
										<div className="vinisto-seller-landing__banner__left__secondary">
											Bez paušálu, bez omezení, bez{' '}
											<span className="vinisto-color-success">starostí</span>
										</div>
										<div className="vinisto-seller-landing__banner__left__cta">
											<button
												className="vinisto-btn vinisto-bg-green vinisto-seller-landing__banner__left__cta__btn"
												type="submit"
											>
												Začít prodávat
											</button>
										</div>
									</div>
								</div>
								<div className="col-6 d-md-block d-none"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card text-center py-4">
							<h2 className="vinisto-seller-landing__heading">
								Co pro Vás znamená prodej na vinisto?
							</h2>
							<div className="vinisto-seller-landing__text">
								<span className="color-primary fw-bolder">*Krátký pitch*</span>
								<br />
								<br />
								Že to tak jednoduché být nemůže? Ale ano, podívejte se,
								<br />
								co Vám vinisto nabízí a jak můžete začít prodávat ještě dnes.
							</div>
							<div>
								<iframe
									width="560"
									height="315"
									src="https://www.youtube-nocookie.com/embed/AXFK753sFF8?controls=0"
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card text-center py-4">
							<h2 className="vinisto-seller-landing__heading text-center">
								Co pro Vás znamená vinisto?
							</h2>
							<div className="vinisto-seller-landing__meaning-boxes">
								<div className="vinisto-seller-landing__meaning-boxes__box">
									<div className="vinisto-seller-landing__meaning-boxes__box__img">
										<ImageLocal
											fileName="meaning-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__meaning-boxes__box__bottom">
										<div className="vinisto-seller-landing__meaning-boxes__box__heading">
											Platformu pro více, než jen prodej ..
										</div>
										<div className="vinisto-seller-landing__meaning-boxes__box__text vinisto-font-18">
											Místo, kde můžete, stejně jako na klasickém tržišti rozbít
											stánek a nabízet svůj produkt, jednoduše a bez starostí ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__meaning-boxes__box">
									<div className="vinisto-seller-landing__meaning-boxes__box__img">
										<ImageLocal
											fileName="meaning-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__meaning-boxes__box__bottom">
										<div className="vinisto-seller-landing__meaning-boxes__box__heading">
											.. logisticko-technologický servis ..
										</div>
										<div className="vinisto-seller-landing__meaning-boxes__box__text vinisto-font-18">
											.. vyřešíme Vám logistiku, od svozu až po last-mile
											dopravu, transakce a reklamace, Vy se tak můžete plně
											soustředit na své řemeslo ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__meaning-boxes__box">
									<div className="vinisto-seller-landing__meaning-boxes__box__img">
										<ImageLocal
											fileName="meaning-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__meaning-boxes__box__bottom">
										<div className="vinisto-seller-landing__meaning-boxes__box__heading">
											.. zákaznický servis, služby a reklamace ..
										</div>
										<div className="vinisto-seller-landing__meaning-boxes__box__text vinisto-font-18">
											.. jedinou komunikaci se zákazníkem, kterou budete řešit
											je jejich chvála na Vaše víno, o všechno ostatní se pro
											Vás postaráme my ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__meaning-boxes__box">
									<div className="vinisto-seller-landing__meaning-boxes__box__img">
										<ImageLocal
											fileName="meaning-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__meaning-boxes__box__bottom">
										<div className="vinisto-seller-landing__meaning-boxes__box__heading">
											.. místo, kde můžete budovat svou značku ..
										</div>
										<div className="vinisto-seller-landing__meaning-boxes__box__text vinisto-font-18">
											.. v rámci prodeje máte k dispozici širokou škálu
											marketingových služeb, které Vám pomohou nabízet své víno
											nejen u nás na platformě ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__meaning-boxes__box">
									<div className="vinisto-seller-landing__meaning-boxes__box__img">
										<ImageLocal
											fileName="meaning-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__meaning-boxes__box__bottom">
										<div className="vinisto-seller-landing__meaning-boxes__box__heading">
											.. prodeje, statistiky a tok produktů pod kontrolou.
										</div>
										<div className="vinisto-seller-landing__meaning-boxes__box__text vinisto-font-18">
											.. veškeré objednávky, příjmy, statistiky prodejů,
											sledování toku produktů a prodejů na jednom místě.
											Přehledně, jednoduše a vždy k dispozici.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card text-center py-4">
							<h2 className="vinisto-seller-landing__heading text-center">
								Jak funguje prodej?
							</h2>
							<div className="vinisto-seller-landing__working-text">
								Na vinisto nejsou žádné paušální poplatky, příplatky, a Cena
								služeb je vždy počítána ze zboží, které prodáte. Přesně tedy
								víte kolik která služba stojí a co můžete očekávat. Vše{' '}
								<span className="vinisto-color-success">jednoduše</span>,{' '}
								<span className="vinisto-color-success">přehledně</span>, a{' '}
								<span className="vinisto-color-success">transparentně</span>!
							</div>
							<div className="vinisto-seller-landing__wide-boxes">
								<div className="vinisto-seller-landing__wide-boxes__box">
									<div className="vinisto-seller-landing__wide-boxes__box__img">
										<ImageLocal
											fileName="working-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__wide-boxes__box__right">
										<div className="vinisto-seller-landing__wide-boxes__box__heading">
											Vyberte produkty, které chcete prodávat ..
										</div>
										<div className="vinisto-seller-landing__wide-boxes__box__text vinisto-font-18">
											Místo, kde můžete, stejně jako na klasickém tržišti rozbít
											stánek a nabízet svůj produkt, jednoduše a bez starostí ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__wide-boxes__box">
									<div className="vinisto-seller-landing__wide-boxes__box__img">
										<ImageLocal
											fileName="working-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__wide-boxes__box__right">
										<div className="vinisto-seller-landing__wide-boxes__box__heading">
											.. vyberte způsob, jakým bude realizována doprava a o vše
											ostatní se postaráme my ..
										</div>
										<div className="vinisto-seller-landing__wide-boxes__box__text vinisto-font-18">
											.. nabízíme mnoho možností dopravy, od využití vlastní
											logistiky, až po kompletní logistický servis, je to jen na
											Vás ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__wide-boxes__box">
									<div className="vinisto-seller-landing__wide-boxes__box__img">
										<ImageLocal
											fileName="working-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__wide-boxes__box__right">
										<div className="vinisto-seller-landing__wide-boxes__box__heading">
											.. propagujte své produkty na vinisto i mimo něj ..
										</div>
										<div className="vinisto-seller-landing__wide-boxes__box__text vinisto-font-18">
											.. v rámci služeb nabízíme mnoho marketingových nástrojů,
											které Vám pomohou s prodejem, a to jak v rámci platformy,
											tak i mimo ..
										</div>
									</div>
								</div>
								<div className="vinisto-seller-landing__wide-boxes__box">
									<div className="vinisto-seller-landing__wide-boxes__box__img">
										<ImageLocal
											fileName="working-box.webp"
											alt="ALT"
										/>
									</div>
									<div className="vinisto-seller-landing__wide-boxes__box__right">
										<div className="vinisto-seller-landing__wide-boxes__box__heading">
											.. počítejte peníze
										</div>
										<div className="vinisto-seller-landing__wide-boxes__box__text vinisto-font-18">
											.. prodej na vinisto funguje komisní formou, neexistují
											žádné skryté poplatky. Všechny služby mají fixní sazby a
											poplatky se odečítají ze zboží, které prodáte.
										</div>
									</div>
								</div>
							</div>
							<div className="vinisto-seller-landing__bigbtn">
								<button
									className="vinisto-btn vinisto-bg"
									type="submit"
								>
									Spočítejte si, kolik Vám může prodej na vinisto přinést
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card text-center py-4">
							<h2 className="vinisto-seller-landing__heading text-center">
								Jak začít prodávat?
							</h2>
							<div className="vinisto-seller-landing__subheader">
								Pět{' '}
								<span className="vinisto-color-success fw-bolder">
									jednoduchých kroků
								</span>
								, které nezaberou ani{' '}
								<span className="vinisto-color-success fw-bolder">
									30 minut!
								</span>
							</div>
							<div className="vinisto-seller-landing__sell-boxes">
								<div className="vinisto-seller-landing__sell-boxes__box">
									<div className="vinisto-seller-landing__sell-boxes__box__img">
										<ImageLocal
											fileName="step-box.svg"
											alt="Krok číslo 1"
										/>
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__heading">
										Registrace
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__text vinisto-font-18">
										Místo, kde můžete, stejně jako na klasickém tržišti rozbít
										stánek a nabízet svůj produkt, jednoduše a bez starostí ..
									</div>
								</div>
								<div className="vinisto-seller-landing__sell-boxes__box">
									<div className="vinisto-seller-landing__sell-boxes__box__img">
										<ImageLocal
											fileName="step-box.svg"
											alt="Krok číslo 1"
										/>
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__heading">
										Vaše informace
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__text vinisto-font-18">
										Místo, kde můžete, stejně jako na klasickém tržišti rozbít
										stánek a nabízet svůj produkt, jednoduše a bez starostí ..
									</div>
								</div>
								<div className="vinisto-seller-landing__sell-boxes__box">
									<div className="vinisto-seller-landing__sell-boxes__box__img">
										<ImageLocal
											fileName="step-box.svg"
											alt="Krok číslo 1"
										/>
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__heading">
										Způsob dopravy
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__text vinisto-font-18">
										Místo, kde můžete, stejně jako na klasickém tržišti rozbít
										stánek a nabízet svůj produkt, jednoduše a bez starostí ..
									</div>
								</div>
								<div className="vinisto-seller-landing__sell-boxes__box">
									<div className="vinisto-seller-landing__sell-boxes__box__img">
										<ImageLocal
											fileName="step-box.svg"
											alt="Krok číslo 1"
										/>
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__heading">
										Produkty
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__text vinisto-font-18">
										Místo, kde můžete, stejně jako na klasickém tržišti rozbít
										stánek a nabízet svůj produkt, jednoduše a bez starostí ..
									</div>
								</div>
								<div className="vinisto-seller-landing__sell-boxes__box">
									<div className="vinisto-seller-landing__sell-boxes__box__img">
										<ImageLocal
											fileName="step-box.svg"
											alt="Krok číslo 1"
										/>
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__heading">
										Schválení a prodej
									</div>
									<div className="vinisto-seller-landing__sell-boxes__box__text vinisto-font-18">
										Místo, kde můžete, stejně jako na klasickém tržišti rozbít
										stánek a nabízet svůj produkt, jednoduše a bez starostí ..
									</div>
								</div>
							</div>
							<div className="vinisto-seller-landing__sell-boxes-cta">
								<button
									className="vinisto-btn vinisto-bg-green"
									type="submit"
								>
									Jdem na to!
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card text-center py-4">
							<h2 className="vinisto-seller-landing__heading text-center">
								Často kladené otázky
							</h2>
							<div className="vinisto-seller-landing__faqs">
								<div className="vinisto-seller-landing__faqs__item">
									<div className="vinisto-seller-landing__faqs__item__heading vinisto-font-18">
										Jak se zaregistruji?
									</div>
									<ImageLocal
										fileName="faq-plus.svg"
										className="vinisto-seller-landing__faqs__item__plus"
										alt="rozbalit"
									/>
								</div>
								<div className="vinisto-seller-landing__faqs__item">
									<div className="vinisto-seller-landing__faqs__item__heading vinisto-font-18">
										Jaké jsou poplatky za prodej na vinisto?
									</div>
									<ImageLocal
										fileName="faq-plus.svg"
										className="vinisto-seller-landing__faqs__item__plus"
										alt="rozbalit"
									/>
								</div>
								<div className="vinisto-seller-landing__faqs__item">
									<div className="vinisto-seller-landing__faqs__item__heading vinisto-font-18">
										Co musím splňovat pro prodej na vinisto?
									</div>
									<ImageLocal
										fileName="faq-plus.svg"
										className="vinisto-seller-landing__faqs__item__plus"
										alt="rozbalit"
									/>
								</div>
								<div className="vinisto-seller-landing__faqs__item">
									<div className="vinisto-seller-landing__faqs__item__heading vinisto-font-18">
										Jaké produkty mohu zalisovat na vinisto?
									</div>
									<ImageLocal
										fileName="faq-plus.svg"
										className="vinisto-seller-landing__faqs__item__plus"
										alt="rozbalit"
									/>
								</div>
								<div className="vinisto-seller-landing__faqs__item">
									<div className="vinisto-seller-landing__faqs__item__heading vinisto-font-18">
										Jak probíhá zalistování produktů?
									</div>
									<ImageLocal
										fileName="faq-plus.svg"
										className="vinisto-seller-landing__faqs__item__plus"
										alt="rozbalit"
									/>
								</div>
								<div className="vinisto-seller-landing__faqs__item">
									<div className="vinisto-seller-landing__faqs__item__heading vinisto-font-18">
										Jakým způsobem mohu své produkty na vinisto propagovat?
									</div>
									<ImageLocal
										fileName="faq-plus.svg"
										className="vinisto-seller-landing__faqs__item__plus"
										alt="rozbalit"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card py-4">
							<h1 className="vinisto-seller-landing__heading text-center">
								Máte dotaz? Jsme tu pro Vás!
							</h1>
							<div className="vinisto-seller-landing__form">
								<Form>
									<InputText
										name="name"
										label="Jméno a příjmení"
									/>
									<InputText
										name="company"
										label="Název společnosti"
									/>
									<InputText
										name="ico"
										label="IČO"
									/>
									<InputPhone
										name="phone"
										label="sellerLanding.form.phoneField.label"
										placeholder="sellerLanding.form.phoneField.placeholder"
									/>
									<InputEmail
										name="email"
										label="E-mailová adresa"
										validate={requireEmail}
									/>
									<InputText
										name="website"
										label="Webová stránka"
									/>
									<InputTextArea
										name="question"
										label="Váš dotaz"
									/>
									<div className="vinisto-seller-landing__form__btn-wrap">
										<button
											className="vinisto-btn vinisto-bg-green vinisto-seller-landing__form__btn"
											type="submit"
										>
											Odeslat dotaz
										</button>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SellerLanding;

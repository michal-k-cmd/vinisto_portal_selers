'use client';

import { FC, lazy, Suspense, useCallback, useContext, useState } from 'react';
import Link from 'next/link';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Accordion } from 'react-bootstrap';
import { Form, InputEmail, InputPassword } from 'Components/Form';
import { validateIfEmailExists } from 'Components/Form/validators';
import Loader from 'Components/View/Loader';
import ImageLocal from 'Components/View/ImageLocal';
import './styles.css';
const FacebookIcon = lazy(() => import('Components/Icons/FacebookIcon'));
const InstagramIcon = lazy(() => import('Components/Icons/InstagramIcon'));
const LinkedInIcon = lazy(() => import('Components/Icons/LinkedinIcon'));
const XIcon = lazy(() => import('Components/Icons/XIcon'));

const Contest: FC = (): JSX.Element => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { handleOnRegister } = useContext(AuthenticationContext);

	const [submited, setSubmited] = useState<boolean>(false);

	const handleOnSubmit = useCallback(
		(formValues: Record<any, any>) => {
			setSubmited(true);

			handleOnRegister({
				email: formValues.email,
				password: formValues.password,
				isNewsletterActive: true,
				isAgreementCC: true,
			});
		},
		[handleOnRegister]
	);

	return (
		<section
			id="content-wrapper"
			className="vinisto-contest"
		>
			<div className="container vinisto-contest__container">
				<div className="row">
					<div className="col-12">
						<h1 className="vinisto-contest__h1">
							<span className="fw-bold vinisto-color-success">Vyhrajte</span>{' '}
							degustační set 5+1
							<br />
							od českého vinařství{' '}
							<span className="fw-bold vinisto-color-success">Wilomenna</span>
						</h1>
					</div>
				</div>
			</div>

			<div className="vinisto-contest__hills">
				<div className="vinisto-contest__hills__left"></div>
				<ImageLocal
					fileName="contest-bottles.webp"
					className="vinisto-contest__hills__bottles"
					alt=""
				/>
				<div className="vinisto-contest__hills__form">
					<h2 className="vinisto-contest__h2 text-white">
						Stačí se registrovat
					</h2>
					<p className="vinisto-contest__hills__form__text">
						Nejen, že máte šanci{' '}
						<span className="fw-bold color-wine-red">vyhrát výborné víno</span>,
						ale za registraci rovnou získáváte{' '}
						<span className="fw-bold color-wine-red">
							dárek - slevu 150 Kč na první nákup!
						</span>
					</p>
					<div className="vinisto-contest__hills__form__wrap">
						{!submited ? (
							<Form
								submitCallback={handleOnSubmit}
								submitText={'navbar.actionButton.register'}
							>
								<InputEmail validate={validateIfEmailExists} />
								<InputPassword />
							</Form>
						) : (
							<div className="vinisto-contest__hills__form__success">
								Děkujeme za registraci do soutěže,
								<br />
								na email jsme Vám poslali
								<br />
								<span className="fw-bold color-wine-red">
									slevový kupon 150 Kč
								</span>
								<br />
								<span className="fw-bold color-wine-red">na první nákup!</span>
								<br />
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="container vinisto-contest__container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-contest__wrap">
							<p className="h2 color-darker-gray fw-bold mb-2 mb-lg-3 mt-0">
								Jak to funguje?
							</p>
						</div>
					</div>
					<div className="col-12">
						<div className="vinisto-contest__wrap">
							<div className="d-flex align-items-start gap-4 mb-3 mb-xl-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									className="mt-1"
									alt=""
								/>
								<p className="color-darker-gray text-start">
									Zaregistrujte se do našeho{' '}
									<Link
										href={`/${t({
											id: 'routes.aboutUs.route',
										})}`}
										className="fw-bold vinisto-color-success"
									>
										vinisto
									</Link>
									,<br /> tím získáváte šanci na výhru, a také{' '}
									<span className="fw-bold color-wine-red">slevu</span>
									<br />
									na první nákup, v hodnotě{' '}
									<span className="fw-bold color-wine-red">150 Kč!</span>
								</p>
							</div>
							<div className="d-flex align-items-start gap-4 mb-3 mb-xl-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									className="mt-1"
									alt=""
								/>
								<p className="color-primary text-start">
									Chcete mít{' '}
									<span className="fw-bold color-wine-red">
										větší šanci na výhru?
									</span>{' '}
									Sdílejte nás na sociálních sítích a my Vaši účast zaevidujeme
									dvakrát!
								</p>
							</div>

							<div className="col-12 social-media-icons d-flex flex-wrap justify-content-center gap-1 mx-0 my-3">
								<a
									className="me-2"
									href="https://www.facebook.com/vinistocz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<FacebookIcon className="fb" />
									</Suspense>
								</a>
								<a
									className="me-2"
									href="https://x.com/vinistocz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<XIcon className="x" />
									</Suspense>
								</a>
								<a
									className="me-2"
									href="https://www.instagram.com/vinisto_cz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<InstagramIcon className="insta" />
									</Suspense>
								</a>
								<a
									className="me-2"
									href="https://www.linkedin.com/company/vinisto/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<LinkedInIcon className="linkedin" />
									</Suspense>
								</a>
							</div>

							<div className="d-flex align-items-start gap-4 mb-3 mb-xl-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="text-start">
									Soutěž probíhá od 15. 5. 2023 do 22. 5. 2023
								</p>
							</div>
							<div className="d-flex align-items-start gap-4 mb-3 mb-xl-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="text-start">23. 5. 2023 vylosujeme vítěze</p>
							</div>
							<div className="d-flex align-items-start gap-4 mb-3 mb-xl-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									className="mt-1"
									alt=""
								/>
								<p className="text-start">
									Zúčastnit se mohou pouze osoby starší 18 let trvale žijící v
									České republice
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="vinisto-contest__green-bg">
				<div className="container py-3">
					<div className="row">
						<div className="col-12">
							<div className="vinisto-contest__wrap">
								<h2 className="vinisto-contest__h2 text-white">
									O co hrajeme?
								</h2>
							</div>
						</div>
						<div className="col-12">
							<div className="vinisto-contest__wrap text-white">
								<p>
									Hrajeme o degustační set{' '}
									<Link
										href={`/blog/wilomenna-vulkanicka-vina-z-ceskeho-stredohori`}
										className="fw-bold text-decoration-underline color-wine-red"
									>
										Vinařství Wilomenna
									</Link>
									, <br />
									který se skládá z těchto šesti výborných vín.
								</p>
							</div>
						</div>

						<div className="col-12">
							<div className="vinisto-contest__wines">
								<Link
									href={`/produkt-detail/wilomenna-sauvignon-suche-2022`}
									className="vinisto-contest__wine"
								>
									<div>
										<div className="vinisto-contest__wine__img">
											<ImageLocal
												fileName="contest-wine-1.webp"
												alt="Sauvignon suché 2022"
											/>
										</div>
										<div className="vinisto-contest__wine__link">
											Sauvignon suché 2022
										</div>
									</div>
									<div className="vinisto-contest__wine__text">
										Vyvážené svěží víno s vůní broskve, lehoučkým kopřivovým
										podtextem ...
									</div>
								</Link>
								<Link
									href={`/produkt-detail/wilomenna-rynsky-ryzlink-suche-2020`}
									className="vinisto-contest__wine"
								>
									<div>
										<div className="vinisto-contest__wine__img">
											<ImageLocal
												fileName="contest-wine-2.webp"
												alt="Ryzlink rýnský Pozdní sběr Suché 2020"
											/>
										</div>
										<div className="vinisto-contest__wine__link">
											Ryzlink rýnský Pozdní sběr Suché 2020
										</div>
									</div>
									<div className="vinisto-contest__wine__text">
										Čisté, přímé víno s vůní lipového květu a jasmínu. Jeho
										svěží chuť s tóny ...
									</div>
								</Link>
								<Link
									href={`/produkt-detail/wilomenna-rulandske-sede-2021`}
									className="vinisto-contest__wine"
								>
									<div>
										<div className="vinisto-contest__wine__img">
											<ImageLocal
												fileName="contest-wine-3.webp"
												alt="Rulandské šedé 2021"
											/>
										</div>
										<div className="vinisto-contest__wine__link">
											Rulandské šedé 2021
										</div>
									</div>
									<div className="vinisto-contest__wine__text">
										Vynikající víno zlatavé barvy, které vás ihned okouzlí svou
										kořenito-ovocnou vůní ...
									</div>
								</Link>
								<Link
									href={`/produkt-detail/wilomenna-muskat-moravsky-suche-2022`}
									className="vinisto-contest__wine"
								>
									<div>
										<div className="vinisto-contest__wine__img">
											<ImageLocal
												fileName="contest-wine-4.webp"
												alt="Muškát moravský suché 2022"
											/>
										</div>
										<div className="vinisto-contest__wine__link">
											Muškát moravský suché 2022
										</div>
									</div>
									<div className="vinisto-contest__wine__text">
										Netypicky sušší, osvěžující muškát se šťavnatou vůní citrusů
										a pelargonie ...
									</div>
								</Link>
								<Link
									href={`/produkt-detail/wilomenna-mystery-rose-suche-2019`}
									className="vinisto-contest__wine"
								>
									<div>
										<div className="vinisto-contest__wine__img">
											<ImageLocal
												fileName="contest-wine-5.webp"
												alt="Mystery Rosé suché 2019"
											/>
										</div>
										<div className="vinisto-contest__wine__link">
											Mystery Rosé suché 2019
										</div>
									</div>
									<div className="vinisto-contest__wine__text">
										Mysticky tmavě růžové cuvée se základem Pinot Noir oslní
										aromatem ...
									</div>
								</Link>
								<Link
									href={`/produkt-detail/wilomenna-sekt-wilomenna-2015`}
									className="vinisto-contest__wine"
								>
									<div>
										<div className="vinisto-contest__wine__img">
											<ImageLocal
												fileName="contest-wine-6.webp"
												alt="Sekt Wilomenna brut 2015"
											/>
										</div>
										<div className="vinisto-contest__wine__link">
											Sekt Wilomenna brut 2015
										</div>
									</div>
									<div className="vinisto-contest__wine__text">
										Sekt Wilomenna Brut, ve kterém se snoubí tři odrůdy – Pinot
										Noir klaret, Chardonnay ...
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container vinisto-contest__container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-contest__wrap--bottom">
							<p>
								Ať už se stanete šťastnými výherci nebo ne, s{' '}
								<span className="fw-bold vinisto-color-success">vinistem</span>{' '}
								vyhrává každý. Zapojením do soutěže se totiž automaticky stáváte
								členem
							</p>
						</div>
					</div>
					<div className="col-12">
						<div className="mx-auto mt-2 mt-xl-4 mb-3 mb-xl-5 text-center">
							<Link
								href={`/${t({
									id: 'routes.aboutUs.route',
								})}`}
								className="fw-bold vinisto-color-success"
							>
								<ImageLocal
									fileName="christmas-banner1.webp"
									alt="vinisto"
									title="vinisto"
									className="mw-100"
								/>
							</Link>
						</div>
					</div>
					<div className="col-12">
						<div className="vinisto-contest__wrap--bottom">
							<p>
								díky kterému na sebe odměny nenechají dlouho čekat. Exkluzivní
								slevy a informace o vyhlášených vínech či destilátech, zajímavé
								rozhovory, slevové kupóny i možnost hodnotit svá oblíbená vína a
								destiláty a vytvořit si tak jedinečnou databázi, díky které se
								stanete hlavní hvězdou každého rozhovoru. Členství ve{' '}
								<span className="fw-bold vinisto-color-success">vinisto</span>{' '}
								samo o sobě přináší spoustu výhod.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white">
				<div className="container pb-5">
					<div className="row">
						<div className="col-12">
							<div className="vinisto-contest__wrap--bottom vinisto-contest__rules">
								<Accordion>
									<Accordion.Item eventKey="0">
										<Accordion.Header>
											Pravidla soutěže a ochrana osobních údajů
										</Accordion.Header>
										<Accordion.Body>
											<div className="vinisto-contest__text-20 mt-3">
												<p className="h5">1. POŘADATEL SOUTĚŽĚ</p>
												<p>
													vinisto s.r.o., IČ: 08746893
													<br />
													Jankovcova 1057/6
													<br />
													Praha 7- Holešovice, 170 04
												</p>
												<br />
												<p className="h5">2. TERMÍN KONÁNÍ</p>
												<p>Soutěž probíhá od 15. 5. 2023 do 22. 5. 2023</p>
												<br />
												<p className="h5">3. ÚČASTNÍCÍ SOUTĚŽE</p>
												<p>
													Účastníkem soutěže může být pouze zletilá fyzická
													osoba s doručovací adresou v České republice, která
													splní další podmínky dle těchto pravidel. Soutěže se
													nemohou zúčastnit právnické osoby a zaměstnanci
													Pořadatele či Organizátora ani osoby jim blízké ve
													smyslu § 22 zákona č. 89/2012 Sb., občanského
													zákoníku. Registrací v soutěži účastník souhlasí se
													zasíláním obchodních sdělení.
												</p>
												<br />
												<p className="h5">4. MECHANIKA SOUTĚŽE</p>
												<p>
													Soutěžící se zapojí do soutěže tím, že se zaregistrují
													ve vinisto.
												</p>
												<br />
												<p className="h5">5. VÝHRA A VÝHERCI</p>
												<p>
													Soutěž má 1 soutěžní kolo, po jeho skončení pořadatel
													vysoluje celkem 1 výherce, který získá degustační set
													šesti vín z Vinařství Wilomenna:
												</p>
												<p>
													Sekt brut 2015
													<br />
													Mystery rosé suché 2019
													<br />
													Sauvignon suché 2022
													<br />
													Ryzlink rýnský suché 2020
													<br />
													Muškát moravský suché 2022
													<br />
													Rulandské šedé 2021
												</p>
												<p>
													Zároveň pořadatel vysoluje jednoho náhradníka pro
													případ, že výherce neodpoví do 5 dnů na soukromou
													zprávu přes e-mailovou, facebookovou nebo
													instagramovou platformu.
												</p>
												<br />
												<p className="h5">6. OZNÁMENÍ A PŘEDÁNÍ VÝHRY</p>
												<p>
													Výherci budou vyhlášení na webu a v sekci komentářů
													pod příspěvkem na sociálních sítích.
												</p>
												<p>
													Předání výhry bude distribuováno nejpozději do 5 dnů
													od konce soutěžního kola. V případě, že se výherce do
													5 dnů od vyhlášení výherců nespojí s pořadatelem a
													nesdělí mu náležité informace pro předání výhry,
													budeme kontaktovat náhradníka.
												</p>
												<p>
													Výherce nemá nárok na jinou výhru od Pořadatele, než
													uvedenou výše, či na jiné protiplnění.
												</p>
												<br />
												<p className="h5">7. OCHRANA OSOBNÍCH ÚDAJŮ</p>
												<p>
													Soutěžící bere účastí v Soutěži na vědomí, že jeho
													osobní údaje budou Organizátorem jako správcem
													zpracovávány pro účely konání Soutěže a mohou být
													zveřejněny na Facebook (vinistocz) a Instagram
													(vinisto_cz) za účelem oznámení výherců. Výherce
													Soutěže bere na vědomí, že v případě výhry bude pro
													účely poskytnutí a doručení výhry potřebné́ poskytnout
													Organizátorovi další osobní údaje v rozsahu jméno,
													příjmení, doručovací adresa. Osobní údaje ve výše
													uvedeném rozsahu budou zpracovávány na základě článku
													6 písm. b) Nařízení Evropského Parlamentu a Rady (EÚ)
													2016/679 o ochraně fyzických osob v souvislosti se
													zpracováním osobních údajů a o volném pohybu takových
													údajů a o zrušení směrnice 95/46/ES (obecné́ nařízení o
													ochraně osobních údajů) (dále jen &ldquo;GDPR&rdquo;).
													Výherce Soutěže dále bere na vědomí, že Organizátor
													může požadovat rovněž sdělení data narození, a to pro
													ověření skutečnosti, zda výherce Soutěže splňuje
													věkovou hranici stanovenou pro účast v Soutěži. Osobní
													údaje budou Organizátorem zpracovávány po Dobu konání
													Soutěže až do jejího vyhodnocení a v případě výherce
													po dobu nezbytně nutnou pro poskytnutí výhry.
												</p>
											</div>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contest;

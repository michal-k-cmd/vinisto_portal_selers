'use client';

import { lazy, Suspense, useContext, useEffect } from 'react';
import { DocumentHeaderAction } from 'Components/DocumentHeader/constants';
import { DocumentHeaderContext } from 'Components/DocumentHeader/context';
import { LocalizationContext } from 'Services/LocalizationService';
import './styles.css';
import Link from 'next/link';
import ImageLocal from 'Components/View/ImageLocal';
import Loader from 'Components/View/Loader';
const FacebookIconDark = lazy(
	() => import('Components/Icons/FacebookIconDark')
);
const InstagramIconDark = lazy(
	() => import('Components/Icons/InstagramIconDark')
);
const LinkedInIconDark = lazy(
	() => import('Components/Icons/LinkedinIconDark')
);
const XIconDark = lazy(() => import('Components/Icons/XIconDark'));
import { Accordion } from 'react-bootstrap';

const ContestEaster = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const documentHeaderContext = useContext(DocumentHeaderContext);

	useEffect(() => {
		documentHeaderContext.dispatch({
			type: DocumentHeaderAction.setTitle,
			value: `${t(
				{ id: 'app.title.page' },
				{ title: `${t({ id: 'routes.easterContest.name' })}` }
			)}`,
		});
	}, []);

	return (
		<section id="content-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<ImageLocal
							fileName="easter-banner-1.png"
							alt=""
							className="mw-100"
						/>
					</div>
				</div>
			</div>

			<div className="container vinisto-contest-easter__container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-contest-easter__wrap">
							<p className="h2 color-primary fw-bold mb-2 mb-lg-3">
								Jak se zúčastnit
							</p>
						</div>
					</div>
					<div className="col-12">
						<div className="vinisto-contest-easter__wrap">
							<div className="d-flex align-items-center gap-3 mb-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="color-primary fw-bolder text-start">
									Zaregistrujte se do našeho{' '}
									<Link
										href={`/${t({
											id: 'routes.aboutUs.route',
										})}`}
										className="vinisto-color-success"
									>
										vinisto
									</Link>{' '}
									a uskutečněte objednávku.
								</p>
							</div>

							<Link
								href={`/${t({
									id: 'routes.registration.route',
								})}`}
								className="d-inline-block vinisto-btn vinisto-bg-green vinisto-contest-easter__btn text-light"
							>
								Zaregistrovat se a soutěžit
							</Link>

							<div className="d-flex align-items-center gap-3 mb-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="color-primary fw-bolder text-start">
									Chcete mít větší šanci na výhru? Sdílejte nás na sociálních
									sítích a my Vaši účast zaevidujeme dvakrát!
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
										<FacebookIconDark />
									</Suspense>
								</a>
								<a
									className="me-2"
									href="https://x.com/vinistocz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<XIconDark />
									</Suspense>
								</a>
								<a
									className="me-2"
									href="https://www.instagram.com/vinisto_cz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<InstagramIconDark />
									</Suspense>
								</a>
								<a
									className="me-2"
									href="https://www.linkedin.com/company/vinisto/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Suspense fallback={<Loader blank />}>
										<LinkedInIconDark />
									</Suspense>
								</a>
							</div>

							<div className="d-flex align-items-center gap-3 mb-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="color-primary fw-bolder text-start">
									Soutěž trvá do 31. 3. 2024 23:59
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 mb-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="color-primary fw-bolder text-start">
									První týden v dubnu vylosujeme vítěze, které budeme
									kontaktovat
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 mb-4">
								<ImageLocal
									fileName="about-us-dot.svg"
									alt=""
								/>
								<p className="color-primary fw-bolder text-start">
									Zúčastnit se mohou pouze osoby starší 18 let trvale žijící v
									České republice
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white">
				<div className="container py-3">
					<div className="row">
						<div className="col-12">
							<div className="vinisto-contest-easter__wrap">
								<p className="h2 color-primary fw-bold mb-2 mb-lg-3">
									O co hrajeme?
								</p>
							</div>
						</div>
						<div className="col-12">
							<div className="vinisto-contest-easter__wrap">
								<p>
									Hrajeme o 5 degustačních setů{' '}
									<Link
										href={`/blog/vino-hort-nejen-ruzova-vina-z-jizni-moravy`}
										className="fw-bolder text-decoration-underline"
									>
										Vinařství VINO HORT
									</Link>
									, <br />
									který se skládá z těchto šesti výborných vín.
								</p>
							</div>
						</div>

						<div className="col-12">
							<div className="vinisto-contest-easter__wines">
								<Link
									href={`/produkt-detail/hort-veltlinske-zelene-voc-2022-tri-duby`}
									className="vinisto-contest-easter__wine"
								>
									<div className="vinisto-contest-easter__wine__img">
										<ImageLocal
											fileName="easter-contest-wine-2.webp"
											alt="Veltlínské zelené VOC 2022"
										/>
									</div>
									<div className="vinisto-contest-easter__wine__link">
										Veltlínské zelené VOC 2022
									</div>
									<div className="vinisto-contest-easter__wine__text">
										Víno má nažloutlou barvu s výraznou vůní čerstvého manga a
										pikantností zeleného pepře. Kořenitost pepře přechází do
										chuti, a nenechá vás nepokoji.
									</div>
								</Link>
								<Link
									href={`/produkt-detail/hort-sauvignon-2020`}
									className="vinisto-contest-easter__wine"
								>
									<div className="vinisto-contest-easter__wine__img">
										<ImageLocal
											fileName="easter-contest-wine-1.webp"
											alt="Sauvignon VOC 2020"
										/>
									</div>
									<div className="vinisto-contest-easter__wine__link">
										Sauvignon VOC 2020
									</div>
									<div className="vinisto-contest-easter__wine__text">
										Víno se zlatavou barvou a výraznou vůni černého rybízu s
										lehkým nádechem broskve. V chuti se projevuje silným černým
										rybízem, který s věkem přechází do kompotového angreštu.
										Víno se vyznačuje výraznou kyselostí a příjemně vyváženým
										cukrem, což zajišťuje naprosto dokonalou harmonii a
										předurčuje ho k dlouhému skladování.
									</div>
								</Link>
								<Link
									href={`/produkt-detail/hort-ryzlink-rynsky-2021`}
									className="vinisto-contest-easter__wine"
								>
									<div className="vinisto-contest-easter__wine__img">
										<ImageLocal
											fileName="easter-contest-wine-6.webp"
											alt="Ryzlink rýnský VOC 2021"
										/>
									</div>
									<div className="vinisto-contest-easter__wine__link">
										Ryzlink rýnský VOC 2021
									</div>
									<div className="vinisto-contest-easter__wine__text">
										Žlutavé víno s vůni meruněk a pomerančové kůry s kořenitým
										dojmem v závěru. V chuti se přechází do medové vyzrálosti.
										Víno je harmonické a výrazné díky výrazné kyselině, je svěží
										a plné s minerálním charakterem. Doporučujeme podávat k
										rybím pokrmům a tvrdým sýrům.
									</div>
								</Link>
								<Link
									href={`/produkt-detail/hort-pinot-noir-rose-2022`}
									className="vinisto-contest-easter__wine"
								>
									<div className="vinisto-contest-easter__wine__img">
										<ImageLocal
											fileName="easter-contest-wine-5.webp"
											alt="Pinot Noir pozdní sběr rosé 2022"
										/>
									</div>
									<div className="vinisto-contest-easter__wine__link">
										Pinot Noir pozdní sběr rosé 2022
									</div>
									<div className="vinisto-contest-easter__wine__text">
										Světle narůžovělá barva vína hraje rovněž odstíny meruňkové.
										Ve vůni najdete čerstvé třešně a lesní jahody, které také
										kouzelně přecházejí do chuti. Víno je harmonické s
										vyrovnanou dochutí jahod a medu. Disponuje výraznou
										kyselinou v kombinaci s cukrem. Svojí povahou je předurčeno
										pro delší pití.
									</div>
								</Link>
								<Link
									href={`/produkt-detail/hort-selection-2016`}
									className="vinisto-contest-easter__wine"
								>
									<div className="vinisto-contest-easter__wine__img">
										<ImageLocal
											fileName="easter-contest-wine-4.webp"
											alt="Selection 2016"
										/>
									</div>
									<div className="vinisto-contest-easter__wine__link">
										Selection 2016
									</div>
									<div className="vinisto-contest-easter__wine__text">
										Představte si, že se před Vámi otevře louka plná temně
										zbarvených fialek. Přesně taková je barva tohoto vína. Za
										jeho vůní ale musíte jinam, velmi totiž připomíná přezrálé
										ostružiny a borůvky. Nyní můžete přiložit víno k ústům a
										ochutnat. Přivítají vás jemné, ale výrazné ovocné tóny chuti
										s nasládlými taniny a dlouhou dlouhou dochutí. Víno Hort
										Červená vína suché Francie Languedoc-Roussillon IGP Francie
									</div>
								</Link>
								<Link
									href={`/produkt-detail/hort-ryzlink-rynsky-2021`}
									className="vinisto-contest-easter__wine"
								>
									<div className="vinisto-contest-easter__wine__img">
										<ImageLocal
											fileName="easter-contest-wine-6.webp"
											alt="Ryzlink rýnský VOC 2021"
										/>
									</div>
									<div className="vinisto-contest-easter__wine__link">
										Ryzlink rýnský VOC 2021
									</div>
									<div className="vinisto-contest-easter__wine__text">
										Žlutavé víno s vůni meruněk a pomerančové kůry s kořenitým
										dojmem v závěru. V chuti se přechází do medové vyzrálosti.
										Víno je harmonické a výrazné díky výrazné kyselině, je svěží
										a plné s minerálním charakterem. Doporučujeme podávat k
										rybím pokrmům a tvrdým sýrům. Víno Hort Bílá vína suché
										Česká republika Morava U Hájku VOC
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container vinisto-contest-easter__container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-contest-easter__wrap">
							<p>
								Ať už se stanete šťastnými výherci nebo ne, s{' '}
								<span className="vinisto-color-success">vinistem</span> vyhrává
								každý. Zapojením do soutěže se totiž automaticky stáváte členem
							</p>
						</div>
					</div>
					<div className="col-12">
						<div className="mx-auto mt-4 mb-5 text-center">
							<ImageLocal
								fileName="christmas-banner1.webp"
								alt=""
								className="mw-100"
							/>
						</div>
					</div>
					<div className="col-12">
						<div className="vinisto-contest-easter__wrap">
							<p>
								díky kterému na sebe odměny nenechají dlouho čekat. Exkluzivní
								slevy a informace o vyhlášených vínech či destilátech, zajímavé
								rozhovory, slevové kupóny i možnost hodnotit svá oblíbená vína a
								destiláty a vytvořit si tak jedinečnou databázi, díky které se
								stanete hlavní hvězdou každého rozhovoru. Členství ve{' '}
								<span className="vinisto-color-success">vinisto</span> samo o
								sobě přináší spoustu výhod.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white">
				<div className="container py-3">
					<div className="row">
						<div className="col-12">
							<div className="vinisto-contest-easter__wrap vinisto-contest-easter__rules">
								<Accordion>
									<Accordion.Item eventKey="0">
										<Accordion.Header>
											Pravidla soutěže a ochrana osobních údajů
										</Accordion.Header>
										<Accordion.Body>
											<div className="vinisto-font-18">
												<p className="h5">1. POŘADATEL SOUTĚŽE</p>
												<p>
													Vinisto s.r.o.,
													<br />
													IČ: 08746893
													<br />
													Jankovcova 1057/6
													<br />
													Praha 7- Holešovice, 170 04
												</p>
												<br />
												<p className="h5">2. TERMÍN KONÁNÍ</p>
												<p>
													Soutěž probíhá od 1. 3. 2024 do 31. 3. 2024 23:59.
												</p>
												<br />
												<p className="h5">3. ÚČASTNÍCI SOUTĚŽE</p>
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
													ve vinisto a dokončí svou objednávku.
												</p>
												<br />
												<p className="h5">5. VÝHRA A VÝHERCI</p>
												<p>
													Soutěž má 1 soutěžní kolo, po jeho skončení pořadatel
													vysoluje celkem 5 výherců, kteří získají degustační
													set šesti vín z Vinařství VINO HORT: Veltlínské zelené
													VOC 22, Sauvignon VOC 2020, Ryzlink rýnský VOC 2021
													2x, Pinot Noir pozdní sběr rosé 2022, Selection 2016.
													Zároveň pořadatel vysoluje jednoho náhradníka pro
													případ, že výherce neodpoví do 5 dnů na soukromou
													zprávu přes e-mailovou, facebookovou nebo
													instagramovou platformu.
												</p>
												<br />
												<p className="h5">6. OZNÁMENÍ A PŘEDÁNÍ VÝHRY</p>
												<p>
													Výherci budou vyhlášení na webu a v sekci komentářů
													pod příspěvkem na sociálních sítích. Předání výhry
													bude distribuováno nejpozději do 5 dnů od konce konce
													soutěžního kola. V případě, že se výherce do 5 dnů od
													vyhlášení výherců nespojí s pořadatelem a nesdělí mu
													náležité informace pro předání výhry, budeme
													kontaktovat náhradníka. Výherce nemá nárok na jinou
													výhru od Pořadatele, než uvedenou výše, či na jiné
													protiplnění.
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
													účely poskytnutí a doručení výhry potřebné poskytnout
													Organizátorovi další osobní údaje v rozsahu jméno,
													příjmení, doručovací adresa. Osobní údaje ve výše
													uvedeném rozsahu budou zpracovávány na základě článku
													6 písm. b) Nařízení Evropského Parlamentu a Rady (EÚ)
													2016/679 o ochraně fyzických osob v souvislosti se
													zpracováním osobních údajů a o volném pohybu takových
													údajů a o zrušení směrnice 95/46/ES (obecné nařízení o
													ochraně osobních údajů) (dále jen &quot;GDPR&quot;).
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

export default ContestEaster;

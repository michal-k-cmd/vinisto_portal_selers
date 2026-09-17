'use client';

import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { DocumentHeaderContext } from 'Components/DocumentHeader/context';
import { DocumentHeaderAction } from 'Components/DocumentHeader/constants';
import ImageLocal from 'Components/View/ImageLocal';
import TextHighlighted from 'Components/View/TextHighlighted';
import styles from 'pages-spa/SommelierAdvice/styles.module.css';

import { BASE_IMAGE_HEIGHT, BASE_IMAGE_WIDTH } from './constants';

const Vinistoteque = () => {
	const localizationContext = useContext(LocalizationContext);
	const tAll = localizationContext.useFormatMessageAllStrings();
	const t = localizationContext.useFormatMessage();
	const { dispatch } = useContext(DocumentHeaderContext);
	const title = `${t(
		{ id: 'app.title.page' },
		{ title: `${t({ id: 'routes.vinistoteque.name' })}` }
	)}`;

	useEffect(() => {
		dispatch({
			type: DocumentHeaderAction.setTitle,
			value: title,
		});
	}, [dispatch, title]);

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>vinistotéka - podzimní výběr someliéra</h1>
			<section className={styles.section}>
				<div>
					<ImageLocal
						alt="vinisto someliér degustace červeného vína"
						className={styles.image}
						fileName="vinistoteque+sommelier-advice/somelier_1_512x304.webp"
						width={BASE_IMAGE_WIDTH}
						height={BASE_IMAGE_HEIGHT}
					/>
				</div>
				<div className={styles.textContent}>
					<p>Dobrý den,</p>
					<p>
						jsem someliér pro marketplace{' '}
						<TextHighlighted>vinisto.cz</TextHighlighted> a rád bych Vám
						představil podzimní výběr do mé vinotéky. Vína, která byste měli
						určitě ochutnat a která byste neměli minout.
					</p>
					<p>
						Víno má v podzimním období jedinečnou schopnost propojit přátele při
						útulných večerech. Pohár vínka v ruce přináší radost a klid, ať už
						sedíme u praskajícího krbu, pod zlatavými listy stromů v parku nebo
						si užíváme krásu barevné krajiny při procházkách
					</p>
					<Link
						href={`/${tAll({ id: 'routes.tag.route' })}/${tAll({
							id: 'routes.vinistoteque.route',
						})}`}
						className={styles.cta}
					>
						objevit vinistotéku
					</Link>
				</div>
			</section>

			<section className={styles.section}>
				<div>
					<ImageLocal
						alt="pohled na vinistotéku"
						className={styles.image}
						fileName="vinistoteque+sommelier-advice/vinoteka_512x304.webp"
						width={BASE_IMAGE_WIDTH}
						height={BASE_IMAGE_HEIGHT}
					/>
				</div>
				<div className={styles.textContent}>
					<p>
						Ve společnosti blízkých přátel a rodiny se stává víno symbolem
						radosti a sdílení. Podzimní období je také ideální pro objevování
						nových chutí a vůní na které v průběhu roku nemáme tolik času.
					</p>
					<p>
						Sklenička plná kvalitního vína může být jako výlet a cesta do světa
						chutí, kde se setkávají jemné tóny ovoce, koření a dřeva. Pokud jde
						o gastronomii, podzimní období nám přináší celkově bohatší a sytější
						jídla, která skvěle ladí s různými druhy vína, která jsem při výběru
						zohlednil. U každého vína proto naleznete informaci, k čemu jej
						doporučujeme.
						<br />
						<br />
						Na zdraví!
					</p>
				</div>
			</section>
		</div>
	);
};

export default Vinistoteque;

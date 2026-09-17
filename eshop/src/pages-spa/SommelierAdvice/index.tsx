'use client';

import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { DocumentHeaderContext } from 'Components/DocumentHeader/context';
import { DocumentHeaderAction } from 'Components/DocumentHeader/constants';
import useChat from 'Hooks/useChat';
import TextHighlighted from 'Components/View/TextHighlighted';
import ImageLocal from 'Components/View/ImageLocal';

import { BASE_IMAGE_HEIGHT, BASE_IMAGE_WIDTH } from './constants';
import styles from './styles.module.css';

const SommelierAdvice = () => {
	const localizationContext = useContext(LocalizationContext);
	const tAll = localizationContext.useFormatMessageAllStrings();
	const t = localizationContext.useFormatMessage();
	const { openChat } = useChat();

	const { dispatch } = useContext(DocumentHeaderContext);
	const title = `${t(
		{ id: 'app.title.page' },
		{ title: `${t({ id: 'routes.sommelierAdvice.name' })}` }
	)}`;

	useEffect(() => {
		dispatch({
			type: DocumentHeaderAction.setTitle,
			value: title,
		});
	}, [dispatch, title]);

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Rady someliéra</h1>
			<div className={styles.subheading}>
				<p>
					Vítejte na <TextHighlighted>vinisto.cz</TextHighlighted> - Prvním
					Marketplace pro Vína a Destiláty
				</p>
				<p>
					Potřebujete poradit s výběrem nejlepšího vína či destilátu? Jsem zde
					pro vás!
				</p>
			</div>
			<section className={styles.section}>
				<div>
					<ImageLocal
						alt="vinisto someliér degustace růžového vína"
						className={styles.image}
						fileName="vinistoteque+sommelier-advice/somelier_2_512x304.webp"
						width={BASE_IMAGE_WIDTH}
						height={BASE_IMAGE_HEIGHT}
					/>
				</div>
				<div className={styles.textContent}>
					<h2 className={styles.h2}>O mně</h2>
					<p>
						Jsem someliérem platformy{' '}
						<TextHighlighted>vinisto.cz</TextHighlighted>, prvním online
						marketplace specializujícím se na víno a destiláty. Mým hlavním
						cílem je zajistit, že vaše nákupy budou nejen snadné, ale také
						nezapomenutelné.
					</p>
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
					<h2 className={styles.h2}>vinistotéka</h2>
					<p>
						Využijte moji vinistotéku - sezonní sbírku nejlepších vín. S mými
						dlouholetými zkušenostmi a znalostmi pečlivě vybírám, a pravidelně
						obměňuji, širokou škálu produktů, abyste mohli snadno najít ideální
						víno, které se hodí k aktuálnímu období. Nevíte, co si dát v zimě,
						na jaře, v létě nebo na podzim? Pak skvělé tipy najdete právě ve
						vinistotéce.
					</p>
					<Link
						href={`/${tAll({ id: 'routes.tag.route' })}/${tAll({
							id: 'routes.vinistoteque.route',
						})}`}
						className={styles.cta}
					>
						Objevit vinistotéku
					</Link>
				</div>
			</section>
			<section className={styles.section}>
				<div>
					<ImageLocal
						alt="odkorkování červeného vína"
						className={styles.image}
						fileName="vinistoteque+sommelier-advice/lahev_512x304.webp"
						width={BASE_IMAGE_WIDTH}
						height={BASE_IMAGE_HEIGHT}
					/>
				</div>
				<div className={styles.textContent}>
					<h2 className={styles.h2}>Průvodce nákupem</h2>
					<p>
						Nechte mě být vaším průvodcem nákupem. S mými tipy a doporučeními
						vám pomohu vybrat to nejlepší víno nebo destilát, který bude
						dokonale ladit s vašimi představami a potřebami.
					</p>
					<Link
						href={`${tAll({
							id: 'routes.advisor.route',
						})}`}
						className={styles.cta}
					>
						Spustit průvodce
					</Link>
				</div>
			</section>
			<section className={styles.section}>
				<div>
					<ImageLocal
						alt="hodnocení vín someliérem"
						className={styles.image}
						fileName="vinistoteque+sommelier-advice/degustace_512x304.webp"
						width={BASE_IMAGE_WIDTH}
						height={BASE_IMAGE_HEIGHT}
					/>
				</div>
				<div className={styles.textContent}>
					<h2 className={styles.h2}>Chatování se mnou</h2>
					<p>
						Můžete se mnou okamžitě spojit prostřednictvím chatu. Rád budu
						odpovídat na vaše otázky a doporučovat produkty, které vám budou
						nejvíce vyhovovat.
					</p>
					<button
						className={styles.cta}
						onClick={() => {
							openChat();
						}}
					>
						Zahájit chat
					</button>
				</div>
			</section>
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
					<h2 className={styles.h2}>Odborné znalosti</h2>
					<p>
						S mými znalostmi a vášní pro víno a destiláty vám zajistím, že každý
						nákup na <TextHighlighted>vinisto.cz</TextHighlighted> bude skvělým
						zážitkem. Jsem zde, abych vám poskytl nejlepší službu a zážitek z
						nákupu.
					</p>
				</div>
			</section>
		</div>
	);
};

export default SommelierAdvice;

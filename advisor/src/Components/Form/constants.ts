import step_1a from '../../assets/images/step_1/hledam_lahev_pro_sebe.webp';
import step_1b from '../../assets/images/step_1/hledam_darek.webp';
import step_2aa from '../../assets/images/step_2/Charakter/charakter_romanticke.webp';
import step_2ab from '../../assets/images/step_2/Charakter/charakter_na_pohodu.webp';
import step_2ac from '../../assets/images/step_2/Charakter/charakter_originalni.webp';
import step_2ad from '../../assets/images/step_2/Charakter/charakter_na_oslavu.webp';
import step_2ae from '../../assets/images/step_2/Charakter/charakter_letni.webp';
import step_2ba from '../../assets/images/step_2/Pro_Koho/pro_koho_pro_muze.webp';
import step_2bb from '../../assets/images/step_2/Pro_Koho/pro_koho_pro_zenu.webp';
import step_2bc from '../../assets/images/step_2/Pro_Koho/pro_koho_pro_par.webp';
import step_2bd from '../../assets/images/step_2/Pro_Koho/pro_koho_pro_skupinu_osob.webp';
import step_2be from '../../assets/images/step_2/Pro_Koho/pro_koho_pro_abstinenty.webp';
import step_3a from '../../assets/images/step_3/druh_cervene.webp';
import step_3b from '../../assets/images/step_3/druh_bile.webp';
import step_3c from '../../assets/images/step_3/druh_ruzove.webp';
import step_3d from '../../assets/images/step_3/druh_sumive.webp';
import step_3x from '../../assets/images/step_3/druh_multi.webp';
import step_4a from '../../assets/images/step_4/typ_suche.webp';
import step_4b from '../../assets/images/step_4/typ_polosuche.webp';
import step_4c from '../../assets/images/step_4/typ_polosladke.webp';
import step_4d from '../../assets/images/step_4/typ_sladke.webp';
import step_4x from '../../assets/images/step_4/typ_multi.webp';
import step_5a from '../../assets/images/step_5/zeme_puvodu_ceska_a_moravska.webp';
import step_5b from '../../assets/images/step_5/zeme_puvodu_evropska.webp';
import step_5c from '../../assets/images/step_5/zeme_puvodu_svetova.webp';
import step_5x from '../../assets/images/step_5/zeme_puvodu_multi.webp';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

export const dataKeys = {
	FOR_MYSELF_OR_PRESENT_TOGGLE: 'forMyselfOrPresentToggle',
	CHARACTER: 'character',
	PRESENT_RECIEVER: 'presentReciever',
	KIND: 'kind',
	TYPE: 'type',
	COUNTRY_OF_ORIGIN: 'countryOfOrigin',
	IS_FOR_LOGGED_USERS: 'isForLoggedUsers',
} as const;

const {
	FOR_MYSELF_OR_PRESENT_TOGGLE,
	CHARACTER,
	PRESENT_RECIEVER,
	KIND,
	TYPE,
	COUNTRY_OF_ORIGIN,
} = dataKeys;

export const mapStepsToFormFields = [
	[FOR_MYSELF_OR_PRESENT_TOGGLE],
	[CHARACTER, PRESENT_RECIEVER],
	[KIND],
	[TYPE],
	[COUNTRY_OF_ORIGIN],
];

export const formSteps = {
	[FOR_MYSELF_OR_PRESENT_TOGGLE]: {
		options: [
			{
				title: '… lahev pro sebe',
				value: 'forMyself',
				description: '',
				image: step_1a,
			},
			{
				title: '… dárek',
				value: 'present',
				description: '',
				image: step_1b,
			},
		],
		multiValueImage: null,
	},

	[CHARACTER]: {
		options: [
			{
				title: 'Romantika',
				value: 'romantika',
				description:
					'Hodí se k romantické večeři nebo k oslavě výročí. Víno může být lehce poetické a snoubit se nejen s dobrým jídlem, ale i romantikou.',
				image: step_2aa,
			},
			{
				title: 'Na pohodu',
				value: 'na-pohodu',
				description:
					'Víno s nižším obsahem alkoholu a naopak vyšším množstvím kyseliny listové. Tato vína uklidňují mysl a pomáhají k relaxaci a pohodě.',
				image: step_2ab,
			},
			{
				title: 'Originální',
				value: 'originalni',
				description:
					'Poznejte dosud nepoznané chutě a vína, která rozzáří všechny Vaše smysly. Originální, netypická a mnohdy i chuťově nestandardní.',
				image: step_2ac,
			},
			{
				title: 'Na oslavu',
				value: 'na-oslavu',
				description:
					'Vhodná na párty a oslavy. Lehká a přirozená vína s přirozenou funkcí nakopnout a současně udržet Vás co nejdéle v maximální formě.',
				image: step_2ad,
			},
			{
				title: 'Letní',
				value: 'letni',
				description:
					'Poznejte typická vína vhodná na letní večery. Skloubením pohody, teplého počasí a kvalitního vína dosáhnete nezapomenutelného prožitku.',
				image: step_2ae,
			},
		],
		multiValueImage: null,
	},

	[PRESENT_RECIEVER]: {
		options: [
			{
				title: 'Pro muže',
				value: 'pro-muze',
				description:
					'Originální a chuťově komplexnější vína určená pro mladé i starší muže, kteří ví, co přesně od vína očekávat.',
				image: step_2ba,
			},
			{
				title: 'Pro ženu',
				value: 'pro-zenu',
				description:
					'Vína s jemnými podtóny, která zachutnají jakékoli ženě. Svěží, odlehčená, avšak nesmírně chutná vína.',
				image: step_2bb,
			},
			{
				title: 'Pro pár',
				value: 'pro-par',
				description:
					'Ať už jde o první nebo poslední rande, pod touto speciální kategorií naleznete vína vhodná na romantické večery ve dvou.',
				image: step_2bc,
			},
			{
				title: 'Pro skupinu osob',
				value: 'pro-skupinu',
				description:
					'Slavte. Ideálně až do rána. Vína z této kategorie se mohou pochlubit jedinečnou vlastností, která Vám dovolí slavit co nejdéle.',
				image: step_2bd,
			},
			{
				title: 'Pro abstinenty',
				value: 'pro-abstinenty',
				description:
					'Co by dělal abstinent na stránkách vinista? A co takhle, kdyby vybíral z nejlepší nabídky kvalitních nealkoholických vín?',
				image: step_2be,
			},
		],
		multiValueImage: null,
	},

	[KIND]: {
		options: [
			{
				value: 'cervena-vina',
				title: 'Červené',
				image: step_3a,
				description: '',
			},
			{ value: 'bila-vina', title: 'Bílé', image: step_3b, description: '' },
			{
				value: 'ruzova-vina',
				title: 'Růžové',
				image: step_3c,
				description: '',
			},
			{
				value: 'sumiva-vina',
				title: 'Šumivé',
				image: step_3d,
				description: '',
			},
		],
		multiValueImage: step_3x,
	},

	[TYPE]: {
		options: [
			{
				value: 'sucha',
				title: 'suché',
				description:
					'Jsou charakteristická svou kyselostí a různými chuťovými tóny, které mohou zahrnovat ovocné, květinové, dřevité nebo minerální.',
				image: step_4a,
			},
			{
				value: 'polosucha',
				title: 'polosuché',
				description:
					'Polosuchá vína mají jemnou rovnováhu mezi sladkostí a kyselostí. Jsou osvěžující a lehčí než v případě suchých vín.',
				image: step_4b,
			},
			{
				value: 'polosladka',
				title: 'polosladké',
				description:
					'Jak již název dokazuje, mají sladší chuťový profil. Současně však u nich najdeme určitou míru kyselosti, která jim dodává rovnováhu.',
				image: step_4c,
			},
			{
				value: 'sladka',
				title: 'sladké',
				description:
					'Obsahují nefermentovaný nebo jen částečně fermentovaný cukr z vinných hroznů. Vína s nižší kyselostí, spíše plné a sladké.',
				image: step_4d,
			},
		],
		multiValueImage: step_4x,
	},

	[COUNTRY_OF_ORIGIN]: {
		options: [
			{
				value: 'ceska-republika',
				title: 'Česká a Moravská',
				image: step_5a,
				description: '',
			},
			{
				value:
					'bulharsko,dansko,finsko,francie,chorvatsko,irsko,italie,lotyssko,madarsko,makedonie,nemecko,polsko,portugalsko,rakousko,rusko,recko,slovensko,slovinsko,spanelsko,svedsko,svycarsko,ukrajina,velka-britanie',
				title: 'Evropská',
				image: step_5b,
				description: '',
			},
			{
				value:
					'argentina,armenie,australie,bahamy,balkansky-poloostrov,barbados,bermudy,dominikanska-republika,fidzi,filipiny,gruzie,guatemala,guyano,holandsko,chile,indie,izrael,jamajka,japonsko,jihoafricka-republika,karibik,kolumbie,kostarika,kuba,mauricius,mexico,moldavie,nikaragua,novy-zeland,panama,peru,reunion,skotsko,usa,venezuela',
				title: 'Světová',
				image: step_5c,
				description: '',
			},
		],
		multiValueImage: step_5x,
	},
} as const;

const selfPriceRanges = [
	{ min: 0, max: 299, id: '63877aaf6d136d20d10520cd' },
	{ min: 300, max: 499, id: '63877aaf6d136d20d10520cd' },
	{ min: 500, max: 50000, id: '63877aaf6d136d20d10520cd' },
];

const giftPriceRanges = [
	{ min: 0, max: 399, id: '63877aaf6d136d20d10520cd' },
	{ min: 400, max: 599, id: '63877aaf6d136d20d10520cd' },
	{ min: 600, max: 50000, id: '63877aaf6d136d20d10520cd' },
];

const priceLevelEnumToIntegerMap: Partial<
	Record<VinistoHelperDllEnumsPriceLevel, number>
> = {
	[VinistoHelperDllEnumsPriceLevel.Level1]: 0,
	[VinistoHelperDllEnumsPriceLevel.Level2]: 1,
	[VinistoHelperDllEnumsPriceLevel.Level3]: 2,
	[VinistoHelperDllEnumsPriceLevel.Level4]: 3,
	[VinistoHelperDllEnumsPriceLevel.Level5]: 4,
	[VinistoHelperDllEnumsPriceLevel.Level6]: 5,
	[VinistoHelperDllEnumsPriceLevel.Level7]: 6,
	[VinistoHelperDllEnumsPriceLevel.Level8]: 7,
	[VinistoHelperDllEnumsPriceLevel.Level9]: 8,
	[VinistoHelperDllEnumsPriceLevel.Level10]: 9,
	[VinistoHelperDllEnumsPriceLevel.VinistoPlus]: 10,
};

export { selfPriceRanges, giftPriceRanges, priceLevelEnumToIntegerMap };

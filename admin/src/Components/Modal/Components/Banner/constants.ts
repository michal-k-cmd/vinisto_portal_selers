import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import { POSITION } from 'Services/Banner/constants';

export const DEFAULT_LANGUAGE = LANGUAGES[0].value;

export const recommendedImageSizes = {
	[POSITION.TOP]: {
		width: 950,
		height: 360,
	},
	[POSITION.BOTTOM]: {
		width: 500,
		height: 260,
	},
	[POSITION.HP_USP]: {
		width: 40,
		height: 40,
	},
	[POSITION.PRODUCT_DETAIL_USP]: {
		width: 30,
		height: 30,
	},
	[POSITION.PRODUCT_LIST]: {
		width: 156,
		height: 500,
	},
	[POSITION.PRODUCT]: {
		width: 1200,
		height: 266,
	},
};

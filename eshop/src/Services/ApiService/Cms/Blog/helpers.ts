import { VinistoCmsDllModelsApiCmsArticleCmsArticle } from 'vinisto_api_client/src/api-types/cms-api';

import {
	ARTICLE_PRODUCT_TYPE,
	ARTICLE_PRODUCT_TYPE_VALUES_MAP,
	ARTICLE_STATE,
	ARTICLE_STATE_VALUES_MAP,
} from './constants';

const getProductType = (
	blogArticle: VinistoCmsDllModelsApiCmsArticleCmsArticle
) => {
	let blogArticleProducType = ARTICLE_PRODUCT_TYPE.NONE;
	for (const productType of Object.values(ARTICLE_PRODUCT_TYPE)) {
		if (
			blogArticle.carouselListingType ===
			ARTICLE_PRODUCT_TYPE_VALUES_MAP[productType]
		) {
			blogArticleProducType = productType;
			break;
		}
	}
	return blogArticleProducType;
};

const getState = (blogArticle: VinistoCmsDllModelsApiCmsArticleCmsArticle) => {
	let blogArticleState = ARTICLE_STATE.CONCEPT;
	for (const state of Object.values(ARTICLE_STATE)) {
		if (blogArticle.state === ARTICLE_STATE_VALUES_MAP[state]) {
			blogArticleState = state;
			break;
		}
	}
	return blogArticleState;
};

export { getProductType, getState };

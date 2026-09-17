export enum BlogArticleDetailAction {
	setArticleData = 'setArticleData',
	addSpecification = 'addSpecification',
	updateSpecification = 'updateSpecification',
	removeSpecification = 'removeSpecification',
	setImage = 'setImage',
	addBundle = 'addBundle',
	removeBundle = 'removeBundle',
	setInitialBundles = 'setInitialBundles',
	setInitialBundleDetails = 'setInitialBundleDetails',
	setInitialSpecifications = 'setInitialSpecifications',
	reload = 'reload',
	setArticleTinyMceCache = 'setArticleTinyMceCache',
}

export const META_MAX_LENGTH = 160;

export const SANITIZE_HTML_OPTIONS = {
	allowedTags: [],
};

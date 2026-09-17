const isUrlAbsolute = (url: string = '') =>
	url.indexOf('://') > 0 || url.indexOf('//') === 0;

const isExternalLink = (url: string = '') =>
	isUrlAbsolute(url)
		? location.href.replace(/https?:\/\//, '').split('/')[0] !==
		  url.replace(/https?:\/\//, '').split('/')[0]
		: false;

export default isExternalLink;

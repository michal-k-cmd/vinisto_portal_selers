import Config from 'Config';

import { IDocumentHeaderState } from './interfaces';

export const DOCUMENT_HEADER_INIT_STATE: IDocumentHeaderState = {
	title: 'Vinisto',
};

export enum DocumentHeaderAction {
	set,
	setTitle,
	setDescription,
	setJsonLd,
	setXCard,
	setOpenGraph,
}

export const PREFIX_ATTRIBUTE = 'prefix';

export enum XCardType {
	summary = 'summary',
	summaryLargeImage = 'summary_large_image',
	app = 'app',
	player = 'player',
}

export enum OpenGraphItemType {
	article = 'article',
	product = 'og:product',
	website = 'website',
}

export const DEFAULT_OG_IMAGE = `${Config.baseUrl}og.jpg`;

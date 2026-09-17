import { Dispatch } from 'react';

import {
	DocumentHeaderAction as Action,
	OpenGraphItemType,
	XCardType,
} from './constants';

export interface IXCard {
	card: XCardType;
	site?: string;
	title: string;
	description?: string;
	image?: string;
	imageAlt?: string;
}

export interface IOpenGraphProduct {
	type: OpenGraphItemType.product;
	title: string;
	url: string;
	description: string;
	image: string;
	imageAlt?: string;
	productPriceAmount: number;
	productPriceCurrency: string;
}

export interface IOpenGraphObject {
	type: Exclude<OpenGraphItemType, OpenGraphItemType.product>;
	title: string;
	url: string;
	description: string;
	image: string;
	imageAlt?: string;
	fbAdmins?: string;
}

export type OpenGraphItem = IOpenGraphProduct | IOpenGraphObject;

export interface IDocumentHeaderState {
	title: string;
	description?: string;
	jsonLd?: Record<string, any> | Record<string, any>[];
	xCard?: IXCard;
	openGraph?: OpenGraphItem;
}

export type IDocumentHeaderReducerAction =
	| { type: Action.set; value: Partial<IDocumentHeaderState> }
	| { type: Action.setTitle; value: IDocumentHeaderState['title'] }
	| {
			type: Action.setDescription;
			value: IDocumentHeaderState['description'];
	  }
	| { type: Action.setJsonLd; value: IDocumentHeaderState['jsonLd'] }
	| {
			type: Action.setXCard;
			value: IDocumentHeaderState['xCard'];
	  }
	| { type: Action.setOpenGraph; value: IDocumentHeaderState['openGraph'] };

export interface IDocumentHeaderContextModel {
	state: IDocumentHeaderState;
	dispatch: Dispatch<IDocumentHeaderReducerAction>;
}

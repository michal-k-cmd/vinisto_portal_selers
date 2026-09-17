import { ReactNode } from 'react';
import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api';

import carouselsConfig from './config';

type CarouselType = keyof typeof carouselsConfig;

export interface ICarouselProps {
	children?: ReactNode;
	products?: VinistoProductDllModelsApiBundleBundle[];
	carouselType: CarouselType;
	cardType?: CARD_TYPE;
	data?: Record<any, any> | null | undefined;
	btnLabel?: string;
	btnUrl?: string;
	isLoading?: boolean;
	handleOnSelectTab?: any;
	activeTabId?: string | number | null;
	openCrossSellModal?: boolean;
	displayPriceAsRange?: boolean;
	isCrossSell?: boolean;
	variableWidth?: boolean;
	showAddToBasketBtn?: boolean;
	quantityBoxType?: QuantityBoxTypes;
	centered?: boolean;
	analyticsListId?: string;
	analyticsListName?: string;
}

export enum CARD_TYPE {
	CAROUSEL_CLASSIC,
	CAROUSEL_PRODUCER,
	CAROUSEL_REVIEW,
	CAROUSEL_TAB,
}

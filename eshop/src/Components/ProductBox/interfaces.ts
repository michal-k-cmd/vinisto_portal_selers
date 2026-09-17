import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import { ReactNode } from 'react';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

export enum CARD_TYPE {
	SINGLE,
}

export type IProductBoxProps =
	| {
			bundleData: Bundle;
			cardType?: CARD_TYPE;
			isLoading?: false;
			openCrossSellModal?: boolean;
			displayPriceAsRange?: boolean;
			isCrossSell?: boolean;
			showAddToBasketBtn?: boolean;
			quantityBoxType?: QuantityBoxTypes;
			showSpecifications?: boolean;
			showAddToFavoritesBtn?: boolean;
			showProducer?: boolean;
			carouselType?: string;
			itemListId?: string;
			itemListName?: string;
			position?: number;
			page?: number;
			searchString?: string | null;
	  }
	| {
			bundleData?: null;
			cardType?: CARD_TYPE;
			isLoading: true;
			openCrossSellModal?: boolean;
			displayPriceAsRange?: boolean;
			isCrossSell?: boolean;
			showAddToBasketBtn?: boolean;
			quantityBoxType?: QuantityBoxTypes;
			showSpecifications?: boolean;
			showAddToFavoritesBtn?: boolean;
			showProducer?: boolean;
			carouselType?: string;
			itemListId?: string;
			itemListName?: string;
			position?: undefined;
			page?: number;
			searchString?: string | null;
	  };

export interface ProductBoxContextProps {
	addToBasketCallback: () => void;
	addToBasketButtonLabel?: string;
}

export interface ProductBoxProviderProps extends ProductBoxContextProps {
	children?: ReactNode;
}

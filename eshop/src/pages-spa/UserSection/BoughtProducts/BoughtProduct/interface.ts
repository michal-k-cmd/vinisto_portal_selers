import { ReactNode } from 'react';
import {
	VinistoOrderDllModelsApiUserBundleBundle,
	VinistoOrderDllModelsApiUserBundleSpecificationDetail,
	VinistoOrderDllModelsApiUserBundleUserBundleEvaluation,
	VinistoOrderDllModelsApiUserBundleUserOrder,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoImageDllModelsApiImageImage } from 'vinisto_api_client/src/api-types/product-api';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';

export interface BoughtProductProps {
	image: VinistoImageDllModelsApiImageImage | null | undefined;
	bundleName: string;
	bundleId: string;
	bundleUrl: string;
	bundleSpecificationDetails:
		| VinistoOrderDllModelsApiUserBundleSpecificationDetail[]
		| null
		| undefined;
	bundle: VinistoOrderDllModelsApiUserBundleBundle | null | undefined;
	orders: VinistoOrderDllModelsApiUserBundleUserOrder[] | null | undefined;
	rating:
		| VinistoOrderDllModelsApiUserBundleUserBundleEvaluation
		| null
		| undefined;
	notes?: BundleNote[];
	refetchBoughtProducts: () => void;
	refetchBundleNotes?: () => void;
	showRatingButton?: boolean;
	showNewNoteButton?: boolean;
	showBuyAgainButton?: boolean;
	showMoreButton?: boolean;
	showLastOrder?: boolean;
	showEditRatingButton?: boolean;
	productClassName?: string;
	lastOrderClassName?: string;
	showMoreContent?: ReactNode;
}

export interface Order {
	order_number: string;
	order_id: string;
}

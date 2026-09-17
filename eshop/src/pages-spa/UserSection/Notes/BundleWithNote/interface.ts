import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
	VinistoOrderDllModelsApiUserBundleBundle,
	VinistoOrderDllModelsApiUserBundleSpecificationDetail,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoImageDllModelsApiImageImage } from 'vinisto_api_client/src/api-types/product-api';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';

export interface BundleWithNoteProps {
	image: VinistoImageDllModelsApiImageImage | null | undefined;
	bundleName: string;
	bundleId: string;
	bundleUrl: string;
	bundleSpecificationDetails:
		| VinistoOrderDllModelsApiUserBundleSpecificationDetail[]
		| null
		| undefined;
	bundle: VinistoOrderDllModelsApiUserBundleBundle | null | undefined;
	notes?: BundleNote[];
	refetchBoughtProducts?: () => void;
	refetchBundleNotes?: () => void;
	showMoreButton?: boolean;
	showMoreButtonIfOpen?: boolean;
	addNoteText?: ReactNode | string;
	setRecentyNotedBundleIds?: Dispatch<SetStateAction<Set<string>>>;
	onDeleteNote?: () => void;
}

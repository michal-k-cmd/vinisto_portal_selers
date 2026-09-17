import type Image from '../image';
import type Price from '../price';
import type { Language, LangValuePair, LangValuesPair } from '../../shared';
import type Supplier from '../supplier';
import type ProductTag from '../tag';
import type Product from '../product';
import { bundleAdapter } from '../../index';

import type BundleOrderLimitation from './order-limitation';
import type BundleEvaluation from './evaluation';
import type BundleItem from './item';
import { BundleSpecificationDetails } from './specification-details';

import {
	VinistoHelperDllEnumsBundleBundleState,
	VinistoHelperDllEnumsBundleSetType,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundle,
} from '../../api-types/product-api';
import { BundlePrice, DiscountedPrice, SetDiscount } from '../price';

type BundleFlags =
	| 'isSet'
	| 'isDeleted'
	| 'isEnabled'
	| 'isDeliveryFree'
	| 'isGift'
	| 'isForLogged'
	| 'isTemporaryUnavailable'
	| 'isClearanceSale'
	| 'isIntangible'
	| 'canSendToWms'
	| 'isSaleOver'
	| 'isApproved'
	| 'CanSendToWms';

interface Bundle {
	id: string;
	name: LangValuePair[];
	description: LangValuePair[];
	metaDescription: LangValuePair[];
	shortDescription: LangValuePair[];
	keywords: LangValuesPair[];
	text: LangValuePair[];
	url: LangValuePair[];
	prices: Price[];
	lowestInternetPrice?: number | null;
	discountedPrices: (DiscountedPrice | SetDiscount)[];
	bundlePrices: BundlePrice;
	items: BundleItem[];
	images?: Image[];
	tags?: ProductTag[];
	products?: Product[];
	setBundles?: Bundle[];
	setType?: VinistoHelperDllEnumsBundleSetType | null;
	categoryIds?: string[];
	alternativeBundles?: Bundle[];
	language: Language;
	alternativeBundleIds?: string[];
	specificationDetails?: BundleSpecificationDetails[];
	supplier: Supplier | null;
	flags: Record<BundleFlags, boolean>;
	bundleEvaluation?: BundleEvaluation;
	scoring?: number;
	scoringWarehouse?: number;
	scoringDiscount?: number;
	scoringAdmin?: number;
	orderLimitation?: BundleOrderLimitation;
	piecesPerPackage?: number;
	packagesOnPallet?: number;
	warehouseId: string[];
	state?: `${VinistoHelperDllEnumsBundleBundleState}`;
	allowedCountries?: VinistoHelperDllEnumsCountryCode[];
	availableCount?: number;
	availableOnPlatforms?: number[] | null;
}

class DomainBundle {
	private domainData: Bundle;

	constructor(
		data: VinistoProductDllModelsApiBundleBundle,
		request: {
			currency:
				| VinistoHelperDllEnumsCurrency
				| keyof typeof VinistoHelperDllEnumsCurrency
		}
	) {
		this.domainData = bundleAdapter.fromApi(data, request);
	}

	getDomainData(): Bundle {
		return this.domainData;
	}
}

export type { Bundle };
export default DomainBundle;

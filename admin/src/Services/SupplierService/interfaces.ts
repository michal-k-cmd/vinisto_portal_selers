import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoHelperDllEnumsStockingRequestDeliveryType,
	VinistoHelperDllEnumsStockingRequestStockingState,
	VinistoOrderDllModelsApiDeliveryDelivery,
} from 'vinisto_api_client/src/api-types/supplier-api/';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { SpecificationDetail } from 'Services/Specification/interfaces';

interface Supplier {
	userLoginHash: string;
	nameWeb: string;
	nameBilling: string;
	ico: string;
	dic?: string;
	countryCode: string;
	supplierType: string;
	isShipping?: boolean;
	language?: string;
	web?: string;
	companyDescription?: string;
	mainProfile?: string;
	wineRegion?: string;
	couponPrefix?: string;
	pickupAddress?: SupplierPickupAddress;
	address: SupplierAddress;
}

interface SupplierAddress {
	street?: string;
	landRegistryNumber?: string;
	houseNumber?: string;
	zip?: string;
	city?: string;
	phone?: string;
	email?: string;
	note?: string;
	title?: string;
	countryCode?: string;
	addressee?: string;
}

interface SupplierPickupAddress {
	street?: string;
	landRegistryNumber?: string;
	houseNumber?: string;
	zip?: string;
	city?: string;
	phone?: string;
	email?: string;
	note?: string;
	title?: string;
	countryCode?: string;
	addressee?: string;
}

interface StockingRequestBundle {
	id: string;
	name: LangValuePair[];
	specificationDetails: SpecificationDetail[];
	requestedCount: number;
	deliveredCount: number;
	countDifference: number;
	note: string;
	warehouseId: string;
}

interface StockingRequest {
	id: string;
	supplierId: string;
	requestNumber?: number;
	createDate: Date;
	deliveryDate?: Date;
	stockingDate?: Date;
	isStocked: boolean;
	isSent: boolean;
	isConfirmed: boolean;
	supplier: Supplier;
	state: VinistoHelperDllEnumsStockingRequestStockingState;
	deliveryType: VinistoHelperDllEnumsStockingRequestDeliveryType;
	delivery: VinistoOrderDllModelsApiDeliveryDelivery; //TODO: domain type
	trackingNumber: string;
	transporterName?: LangValuePair[];
	trackingUrl: string;
	bundles: StockingRequestBundle[];
}

interface GetAllStockingRequestsQueryArgument extends IQueryArgument {
	key:
		| 'isSent'
		| 'SearchSupplierName'
		| 'SearchSupplierId'
		| 'Language'
		| 'SortingColumn'
		| 'IsSortingDescending'
		| 'Limit'
		| 'Offset'
		| 'UserLoginHash';
}

interface DownloadPdfQueryArgument extends IQueryArgument {
	key: 'stockingRequestId' | 'UserLoginHash';
}

interface DeleteStockingRequestQueryArgument extends IQueryArgument {
	key: 'stockingRequestId' | 'UserLoginHash';
}

export type {
	Supplier,
	StockingRequest,
	StockingRequestBundle,
	DownloadPdfQueryArgument,
	DeleteStockingRequestQueryArgument,
	GetAllStockingRequestsQueryArgument,
};

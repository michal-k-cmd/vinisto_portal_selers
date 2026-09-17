import Image from '../image';
import { CountryCode, LangValuePair } from '../../shared';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

//TODO: add user domain type.
interface User {}
//TODO: add address domain type.
interface Address {}
//TODO: add certificate domain type.
interface Certificate {}

const supplierTypes = ['Producer', 'Importer'] as const;
type SupplierType = (typeof supplierTypes)[keyof typeof supplierTypes];

interface Supplier {
	id: string;
	nameWeb: string;
	nameBilling: string;
	ico: string;
	dic?: string;
	//TODO: add address domain type
	address: Address;
	pickupAddress?: Address;
	countryCode?: VinistoHelperDllEnumsCountryCode;
	users: User[];
	supplierType?: SupplierType;
	isShipping: boolean;
	web: LangValuePair[];
	companyDescription: LangValuePair[];
	mainProfile: LangValuePair[];
	wineRegion: LangValuePair[];
	logo: Image;
	baseImage: Image;
	certificates: Certificate[];
	bankAccountNumber?: string;
}

export default Supplier;
export type { SupplierType };
export { supplierTypes };

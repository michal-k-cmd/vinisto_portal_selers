import { StockRequestBundle } from 'Services/StockRequest/interfaces';
import { OmitConstrained } from 'types';

export interface StockRequestBundleTableModel
	extends OmitConstrained<StockRequestBundle, 'name'> {
	name: string;
}

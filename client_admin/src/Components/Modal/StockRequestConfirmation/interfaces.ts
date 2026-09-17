import { TimeSlot } from 'Services/StockRequest/constants';

export interface StockRequestConfirmationModalData {
	stockRequestId: string;
	reloadData: () => void;
}

export interface StockRequestConfirmationFormValues {
	date: string;
	time: TimeSlot;
}

import { Bundle } from '@/domain/bundle';

export interface SellInfoProps {
	supplierName: string;
	deliveryDate?: Date;
	availableQuantity: number;
	bundle: Bundle;
	discountCoupon?: React.ReactNode;
	isLoading?: boolean;
	unavailableReason?: 'temporary' | 'saleOver';
}

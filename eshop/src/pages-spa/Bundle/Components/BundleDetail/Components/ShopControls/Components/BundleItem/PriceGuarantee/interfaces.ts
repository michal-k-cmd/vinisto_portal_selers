import { Bundle } from '@/domain/bundle';

export interface PriceGuaranteeProps {
	bundle: Bundle | undefined;
	isLoading?: boolean;
}

import { Bundle } from 'vinisto_api_client/src/domain/bundle';

export interface ProductTitleAndImageProps {
	bundle: Bundle | null;
	search: string[];
	isLoading?: boolean;
	isInViewport?: boolean;
}

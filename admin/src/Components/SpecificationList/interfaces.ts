import { getSpecificationValue } from './helpers';

import { BundleSpecificationDetails } from '@/domain/bundle/specification-details';

export interface SpecificationListProps {
	title?: string;
	specifications: BundleSpecificationDetails[];
	handleOnRemove: (specificationId: string) => () => void;
	handleOnEdit: (specification: BundleSpecificationDetails) => () => void;
	specificationValueMapper?: typeof getSpecificationValue;
	className?: string;
	showDetailInNewWindow?: boolean;
}

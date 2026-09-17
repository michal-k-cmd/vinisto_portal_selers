import { Dispatch } from 'react';

export interface IQuantityBoxProps {
	isLoading?: boolean;
	isUniqueBundle?: boolean;
	availableQuantity: number;
	quantity: number | null;
	setQuantity: Dispatch<React.SetStateAction<IQuantityBoxProps['quantity']>>;
	className?: string;
}

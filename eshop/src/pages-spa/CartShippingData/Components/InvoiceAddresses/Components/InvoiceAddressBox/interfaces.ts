export interface IInvoiceAddressBoxProps {
	data: Record<any, any>;
	handleOnEdit: () => void;
	handleOnSelect: () => void;
	handleOnDelete: (event: React.MouseEvent<HTMLDivElement>) => void;
	isSelected?: boolean;
	isLoading?: boolean;
}

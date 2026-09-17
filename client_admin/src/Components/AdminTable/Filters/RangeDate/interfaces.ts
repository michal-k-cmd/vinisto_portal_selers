export interface RangeDateFilterProps {
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

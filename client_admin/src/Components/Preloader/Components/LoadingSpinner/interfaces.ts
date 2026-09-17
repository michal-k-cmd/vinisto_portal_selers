export type IStyle = {
	[key: string]: string;
};

export interface ILoadingSpinnerProps {
	height?: string | number;
	width?: string | number;
	color?: string;
	ariaLabel?: string;
	wrapperStyle?: IStyle;
	wrapperClass?: string;
	radius?: string | number;
	visible?: boolean;
}

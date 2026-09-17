import { FC } from 'react';
import { IIconProps } from 'Components/Icons/Interfaces';

export interface RatingProps {
	defaultValue?: number;
	readOnly?: boolean;
	handleOnChange?: (value: number) => void;
	handleOnClick?: () => void;
	isLarge?: boolean;
	precision?: number;
	starCount?: number;
	className?: string;
	EmptyIcon?: FC<IIconProps>;
	FilledIcon?: FC<IIconProps>;
}

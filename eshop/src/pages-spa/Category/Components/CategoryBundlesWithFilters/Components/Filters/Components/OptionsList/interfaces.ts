import React, { HTMLProps } from 'react';

export interface Option extends Omit<HTMLProps<HTMLDivElement>, 'prefix'> {
	id: string;
	value: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	checked?: boolean;
	soundex?: string;
	disabled?: boolean;
	valueLink?: string;
}

export interface OptionsListProps {
	options: Option[];
	search?: string;
	searchPlaceholderValue?: string;
	type?: 'checkbox' | 'radio';
	showMax?: number;
	value?: [id: number];
	isLoading?: boolean;
	onChange: (options: Option[]) => void;
	onSearchChange?: (search: string) => void;
	renderOption?: (option: Option) => React.ReactNode;
}

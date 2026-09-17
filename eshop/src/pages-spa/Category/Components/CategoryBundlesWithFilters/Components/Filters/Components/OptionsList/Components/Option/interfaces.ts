import React from 'react';

export interface IOptionProps {
	type: 'radio' | 'checkbox';
	prefix: React.ReactNode;
	placeholder: React.ReactNode;
	value: string;
	suffix: React.ReactNode;
	checked: boolean;
	onCheck: () => void;
	disabled?: boolean;
}

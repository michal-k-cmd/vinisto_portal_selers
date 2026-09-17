import { TestIdType } from 'Constants/test-ids';
import { ReactNode } from 'react';

export interface IPasswordProps {
	name?: string;
	id?: string;
	type?: string;
	label?: ReactNode;
	readOnly?: boolean;
	showPasswordToggle?: boolean;
	hideLabel?: boolean;
	className?: string;
	classNameWrapper?: string;
	classNameLabel?: string;
	dataTestid?: TestIdType;
}

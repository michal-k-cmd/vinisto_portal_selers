import { TestIdType } from 'Constants/test-ids';
import React from 'react';

export interface ICheckBoxProps {
	identifier: string;
	name: string;
	label?: string | React.ReactNode;
	onClick?: () => void;
	isErrorVisible?: boolean;
	showError?: boolean;
	dataTestid?: TestIdType;
}

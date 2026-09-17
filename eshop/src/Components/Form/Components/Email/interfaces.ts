import { TestIdType } from 'Constants/test-ids';
import { ReactNode } from 'react';

type EmailValidator = (
	email: string
) => string | undefined | Promise<string | undefined>;

export interface IEmailProps {
	label?: ReactNode | boolean;
	readOnly?: boolean;
	className?: string;
	classNameLabel?: string;
	classNameWrapper?: string;
	customId?: string;
	customName?: string;
	validate?: EmailValidator | EmailValidator[];
	dataTestid?: TestIdType;
	name?: string;
}

import { Validator } from 'Components/Form/interfaces';

export interface ErrorProps {
	errorMessage?: ReturnType<Validator> | undefined;
	touched: boolean | undefined;
	show?: boolean;
}

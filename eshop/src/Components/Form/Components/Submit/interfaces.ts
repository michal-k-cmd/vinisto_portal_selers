import { TestIdType } from 'Constants/test-ids';

export interface ISubmitButtonProps {
	submitting: boolean;
	valid: boolean;
	pristine: boolean;
	submitText: string;
	dataTestid?: TestIdType;
}

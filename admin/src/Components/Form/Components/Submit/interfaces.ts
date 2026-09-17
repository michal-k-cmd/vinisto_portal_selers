export interface SubmitButtonProps {
	submitting: boolean;
	valid: boolean;
	pristine: boolean;
	submitText: string;
	extraText?: string;
	isBackButton?: boolean;
	isDisabled?: boolean;
}

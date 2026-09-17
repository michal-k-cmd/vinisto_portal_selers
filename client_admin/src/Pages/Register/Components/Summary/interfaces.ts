import { RegistrationStep } from 'Pages/Register/interfaces';
import { ValidationErrors } from 'final-form';

export interface StepSummary extends RegistrationStep {
	valid: boolean;
	errors: ValidationErrors;
	warnings: ValidationErrors;
}

export interface SummaryBlockProps {
	step: StepSummary;
	formValues: Record<string, any>;
	handleOnNavigateToStep: (step: number) => () => void;
}

import { ReactNode } from 'react';

export interface RegistrationStepError {
	field: string;
	fieldLabel: ReactNode;
	error: string;
	errorLabel: string;
}

export interface RegistrationStep {
	order: number;
	id: string;
	title: string;
	fields: Record<string, string>;
}

export interface RegistrationStepProgress extends RegistrationStep {
	valid: boolean;
	errors: RegistrationStepError[];
	warnings: RegistrationStepError[];
}

export interface IRegisterPageContextValue {
	activeStep: number;
	latestVisitedStep: number;
	navigateToStep: (stepNumber: number) => void;
	steps: RegistrationStep[];
}

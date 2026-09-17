import { ReactNode } from 'react';

export interface IFormProps {
	children: ReactNode;
	submitCallback?: (formValues: any) => void;
	submitText?: string;
	customValidationFunction?: (values: Record<any, any>) => Record<any, any>;
	initializationValues?: Record<any, any>;
	formReference?: Record<any, any>;
	formStateSubscriber?: React.Dispatch<React.SetStateAction<any>>;
	className?: string;
}

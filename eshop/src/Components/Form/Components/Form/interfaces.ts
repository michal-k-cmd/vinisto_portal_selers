import { ReactNode } from 'react';

export interface IFormProps {
	children: ReactNode;
	// any type for formValues to allow specifying formValues as custom type. Record<any, any> does not allow this.
	submitCallback?: (formValues: any) => void;
	submitText?: string;
	customValidationFunction?: (values: Record<any, any>) => Record<any, any>;
	initializationValues?: Record<any, any>;
	customSubmitContent?: ReactNode;
	mutators?: Record<any, any>;
	subscribeCallback?: (currentFormInstance: Record<any, any>) => void;
	mutatorsReference?: React.MutableRefObject<Record<string, unknown>>;
	formReference?: Record<any, any>;
}

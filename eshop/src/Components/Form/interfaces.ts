import {
	Config,
	FieldState,
	FieldValidator,
	FormApi,
	FormState,
	FormSubscription,
} from 'final-form';

export interface FormRenderProps<S> extends FormState<S> {
	form: FormApi<S>;
	handleSubmit: (
		event?: React.SyntheticEvent<HTMLFormElement>
	) => Promise<object | undefined> | undefined;
}

export interface FormConfig<FormValues> extends Config<FormValues> {
	subscription?: FormSubscription;
	initialValuesEqual?: (a: object, b: object) => boolean;
}

type NonFunctionPropertyNames<T> = {
	// eslint-disable-next-line @typescript-eslint/ban-types
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export interface FieldRenderProps<V = any, T = string> {
	input: {
		name: string;
		onBlur: <T>(event?: React.FocusEvent<T>) => void;
		onChange: <T>(event: React.ChangeEvent<T> | V) => void;
		onFocus: <T>(event?: React.FocusEvent<T>) => void;
		value: V;
		checked?: boolean;
	};
	meta: NonFunctionProperties<FieldState<T>>;
}

export interface FormField<T> {
	validate: FieldValidator<T> | FieldValidator<T>[];
}

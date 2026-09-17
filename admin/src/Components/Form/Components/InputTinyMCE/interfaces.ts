import { TinyMCEProps } from 'Components/TinyMCE/interfaces';
import { FieldRenderProps } from 'react-final-form';

interface TinyMCEInputProps
	extends FieldRenderProps<string, HTMLElement>,
		TinyMCEProps {}

interface TinyMCEInputPropsWithoutInput
	extends Omit<TinyMCEInputProps, 'input'> {
	name: string;
}

export type { TinyMCEInputProps, TinyMCEInputPropsWithoutInput };

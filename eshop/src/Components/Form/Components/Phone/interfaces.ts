export interface IInputPhoneProps {
	name: string;
	identifier?: string;
	label?: string;
	placeholder?: string;
	validate?: (phone: string) => string | undefined;
}

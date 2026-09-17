export interface IPhoneCode {
	code: number;
	flag: string;
}

export interface IInputPhoneCodeProps {
	phoneCodes: IPhoneCode[];
	value: number;
	onChange?: (number: number) => void;
}

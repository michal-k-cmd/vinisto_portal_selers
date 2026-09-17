import { HTMLProps, ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import Label from './Components/Label';
import Input from './Components/Input';
import Textarea from './Components/Textarea';
import Select from './Components/Select';
import Checkbox from './Components/Checkbox';
import Radio from './Components/Radio';
import Message from './Components/Message';
import PhoneInput from './Components/Phone';
import BankInput from './Components/Bank';
import BankField from './Components/BankField';
import InputField from './Components/InputField';
import PhoneField from './Components/PhoneField';
import Autocomplete from './Components/Autocomplete';
import AutocompleteField from './Components/AutocompleteField';
import CountryCode from './Components/CountryCode';
import CountField from './Components/CountField';
import TextareaField from './Components/TextareaField';
import Hint from './Components/Hint';

type TFormProps = HTMLProps<HTMLFormElement> & {
	children: ReactNode;
};

const Form = ({ children, ...props }: TFormProps) => {
	return <form {...props}>{children}</form>;
};

Form.Provider = FormProvider;
Form.Label = Label;
Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;
Form.Checkbox = Checkbox;
Form.Radio = Radio;
Form.Message = Message;
Form.PhoneInput = PhoneInput;
Form.PhoneField = PhoneField;
Form.BankInput = BankInput;
Form.BankField = BankField;
Form.InputField = InputField;
Form.Autocomplete = Autocomplete;
Form.AutocompleteField = AutocompleteField;
Form.TextareaField = TextareaField;
Form.CountryCode = CountryCode;
Form.Count = CountField;
Form.Hint = Hint;

export default Form;

export * as Label from './Components/Label';
export * as Input from './Components/Input';
export * as Textarea from './Components/Textarea';
export * as Select from './Components/Select';
export * as Checkbox from './Components/Checkbox';
export * as Radio from './Components/Radio';
export * as Message from './Components/Message';
export * as PhoneInput from './Components/Phone';
export * as BankInput from './Components/Bank';
export * as BankField from './Components/BankField';
export * as InputField from './Components/InputField';
export * as PhoneField from './Components/PhoneField';
export * as Autocomplete from './Components/Autocomplete';
export * as AutocompleteField from './Components/AutocompleteField';
export * as CountryCode from './Components/CountryCode';
export * as CountField from './Components/CountField';

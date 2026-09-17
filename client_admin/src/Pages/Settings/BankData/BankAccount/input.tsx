import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputBankAccount } from 'Components/Form';

import { FIELD_NAME } from './constants';

const BankAccountInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<InputBankAccount
			identifier={FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.bank.bankAccount.label' }))}
			className="flex-grow-1"
			disabled={disabled}
		/>
	);
};

export default BankAccountInput;

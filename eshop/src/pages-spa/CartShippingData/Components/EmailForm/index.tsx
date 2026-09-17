import useFormatMessage from 'Hooks/useFormatMessage';
import Form from 'Components/Forms';
import { TEST_IDS } from 'Constants/test-ids';

import styles from './styles.module.css';

const EmailForm = () => {
	const t = useFormatMessage();

	const requiredMessage = `${t({ id: 'form.input.required' })}`;
	const invalidEmailMessage = `${t({
		id: 'form.input.email.badEmailValidation',
	})}`;

	return (
		<Form.InputField
			id="delivery.email"
			name="email.delivery"
			type="email"
			autocomplete="email"
			placeholder={`${t({ id: 'form.input.email.label' })}`}
			label={`${t({ id: 'cartShippingData.startBy' })}`}
			inputClassName={styles.input}
			showSuccess
			showSuccessIcon
			isRequired
			rules={{
				required: { message: requiredMessage, value: true },
				pattern: {
					value:
						/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
					message: invalidEmailMessage,
				},
			}}
			dataTestid={TEST_IDS.BASKET_ADDRESS_EMAIL}
		/>
	);
};

export default EmailForm;

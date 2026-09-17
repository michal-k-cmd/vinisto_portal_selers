import { type AnimationEvent, useContext } from 'react';
import { Field, useForm } from 'react-final-form';
import { InputEmail, InputPassword, Validators } from 'Components/Form';
import { PASSWORD_TYPE } from 'Components/Form/Components/Password/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import StepPanel from '../StepPanel';
import { FormValues } from '../../interfaces';
import styles from '../../styles.module.css';

const LOGIN_EMAIL_VALIDATORS = [
	Validators.requireEmail,
	Validators.validateIfEmailExists,
];

const AccountStep = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const form = useForm<FormValues>();

	const handleAutofill = (event: AnimationEvent<HTMLDivElement>) => {
		const input = event.target;
		if (!(input instanceof HTMLInputElement)) return;
		if (input.name !== 'email' && input.name !== 'password') return;

		// Browser autofill can update the DOM without notifying React Final Form.
		form.change(input.name, input.value);
		form.blur(input.name);
	};

	return (
		<StepPanel
			titleId="modal.b2bRegistration.account.title"
			subtitleId="modal.b2bRegistration.account.subtitle"
		>
			<div
				className={styles.fields}
				onAnimationStart={handleAutofill}
			>
				<InputEmail
					label={t({
						id: 'modal.b2bRegistration.account.emailLabel',
					})}
					validate={LOGIN_EMAIL_VALIDATORS}
				/>
				<InputPassword type={PASSWORD_TYPE} />
				<Field
					name="preferredCommunication"
					render={({ input }) => (
						<label className={styles.selectField}>
							<span>
								{t({
									id: 'modal.b2bRegistration.account.communication',
								})}
							</span>
							<select
								{...input}
								className="form-select vinisto-input"
							>
								<option value="emailAndPhone">
									{t({
										id: 'modal.b2bRegistration.account.emailAndPhone',
									})}
								</option>
								<option value="email">Email</option>
								<option value="phone">
									{t({
										id: 'modal.b2bRegistration.account.phone',
									})}
								</option>
							</select>
						</label>
					)}
				/>
			</div>
		</StepPanel>
	);
};

export default AccountStep;

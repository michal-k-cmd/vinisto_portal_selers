import { useContext } from 'react';
import { Field } from 'react-final-form';
import { InputEmail, InputPhone, InputText, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

import StepPanel from '../StepPanel';
import { INDUSTRY_TYPE_OPTIONS } from '../../constants';
import styles from '../../styles.module.css';

const ContactStep = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<StepPanel
			titleId="modal.b2bRegistration.contact.title"
			subtitleId="modal.b2bRegistration.contact.subtitle"
		>
			<div className={styles.fields}>
				<div className={styles.twoColumns}>
					<InputText
						name="firstName"
						label="cartShippingData.form.nameField.label"
						placeholder="cartShippingData.form.nameField.placeholder"
						validate={Validators.required}
					/>
					<InputText
						name="surname"
						label="cartShippingData.form.surnameField.label"
						placeholder="cartShippingData.form.surnameField.placeholder"
						validate={Validators.required}
					/>
				</div>
				<InputText
					name="positionInCompany"
					label="modal.b2bRegistration.contact.positionInCompany"
					placeholder="modal.b2bRegistration.contact.positionInCompanyPlaceholder"
				/>
				<div>
					<InputEmail
						customName="companyEmail"
						customId="b2b-companyEmail"
						label={t({
							id: 'modal.b2bRegistration.contact.companyEmail',
						})}
						validate={Validators.requireEmail}
					/>
					<p className={styles.fieldMessage}>
						{t({
							id: 'modal.b2bRegistration.contact.companyEmailHint',
						})}
					</p>
				</div>
				<div>
					<InputPhone
						name="phone"
						label="addAddressForm.phoneField.label"
						placeholder="addAddressForm.phoneField.placeholder"
						validate={Validators.required}
					/>
				</div>
				<Field
					name="industryType"
					render={({ input }) => (
						<label className={styles.selectField}>
							<span>
								{t({
									id: 'modal.b2bRegistration.contact.industryType',
								})}
							</span>
							<select
								{...input}
								className="form-select vinisto-input"
							>
								<option value="">
									{t({
										id: 'modal.b2bRegistration.contact.industryTypePlaceholder',
									})}
								</option>
								{INDUSTRY_TYPE_OPTIONS.map(({ value, labelId }) => (
									<option
										key={value}
										value={value}
									>
										{t({ id: labelId })}
									</option>
								))}
							</select>
						</label>
					)}
				/>
			</div>
		</StepPanel>
	);
};

export default ContactStep;

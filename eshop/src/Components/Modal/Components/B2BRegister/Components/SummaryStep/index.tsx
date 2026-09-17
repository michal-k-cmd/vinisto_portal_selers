import { useContext } from 'react';
import { Field } from 'react-final-form';
import { InputCheckBox } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

import StepPanel from '../StepPanel';
import SummarySection from '../SummarySection';
import { SummaryStepProps } from '../../interfaces';
import styles from '../../styles.module.css';

const validateAgreement = (isAgreed?: boolean) =>
	isAgreed ? undefined : 'modal.registration.isAgreementCC.requiredValidation';

const SummaryStep = ({ values }: SummaryStepProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const emptyValue = t({
		id: 'modal.b2bRegistration.summary.emptyValue',
	});
	const getValue = (value?: string) => value?.trim() || emptyValue;
	const billingAddress = [
		values.billingStreet,
		[values.billingZip, values.billingCity].filter(Boolean).join(' '),
	]
		.filter(Boolean)
		.join(', ');
	const deliveryAddress = [
		values.deliveryStreet,
		[values.deliveryZip, values.deliveryCity].filter(Boolean).join(' '),
	]
		.filter(Boolean)
		.join(', ');
	const contactName = [values.firstName, values.surname]
		.filter(Boolean)
		.join(' ');

	return (
		<StepPanel
			titleId="modal.b2bRegistration.summary.title"
			subtitleId="modal.b2bRegistration.summary.subtitle"
		>
			<div className={styles.summarySections}>
				<SummarySection titleId="modal.b2bRegistration.summary.account">
					<dl className={styles.summaryList}>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.email' })}</dt>
							<dd>{getValue(values.email)}</dd>
						</div>
					</dl>
				</SummarySection>

				<SummarySection titleId="modal.b2bRegistration.summary.company">
					<dl className={styles.summaryList}>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.companyName' })}</dt>
							<dd>{getValue(values.company)}</dd>
						</div>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.ico' })}</dt>
							<dd>{getValue(values.ico)}</dd>
						</div>
						<div className={styles.summaryRow}>
							<dt>
								{t({ id: 'modal.b2bRegistration.summary.billingAddress' })}
							</dt>
							<dd>{getValue(billingAddress)}</dd>
						</div>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.bankAccount' })}</dt>
							<dd>{getValue(values.accountNumberAndBankCode)}</dd>
						</div>
					</dl>
				</SummarySection>

				<SummarySection titleId="modal.b2bRegistration.summary.deliveryAddress">
					{values.useBillingAddressForDelivery ? (
						<strong className={styles.summaryStandaloneValue}>
							{t({ id: 'modal.b2bRegistration.summary.sameAsBilling' })}
						</strong>
					) : (
						<dl className={styles.summaryList}>
							<div className={styles.summaryRow}>
								<dt>{t({ id: 'modal.b2bRegistration.summary.address' })}</dt>
								<dd>{getValue(deliveryAddress)}</dd>
							</div>
							{values.deliveryNote && (
								<div className={styles.summaryRow}>
									<dt>
										{t({ id: 'modal.b2bRegistration.summary.deliveryNote' })}
									</dt>
									<dd>{values.deliveryNote}</dd>
								</div>
							)}
						</dl>
					)}
				</SummarySection>

				<SummarySection titleId="modal.b2bRegistration.summary.contact">
					<dl className={styles.summaryList}>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.name' })}</dt>
							<dd>{getValue(contactName)}</dd>
						</div>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.email' })}</dt>
							<dd>{getValue(values.companyEmail)}</dd>
						</div>
						<div className={styles.summaryRow}>
							<dt>{t({ id: 'modal.b2bRegistration.summary.phone' })}</dt>
							<dd>{getValue(values.phone)}</dd>
						</div>
					</dl>
				</SummarySection>
			</div>

			<div className={styles.summaryConsents}>
				<Field
					name="isAgreementCC"
					type="checkbox"
					validate={validateAgreement}
					render={({ input, meta }) => (
						<div>
							<label
								className="vinisto-popup__checkbox"
								htmlFor="b2b-isAgreementCC"
							>
								{t({
									id: 'modal.b2bRegistration.summary.agreement',
								})}
								<input
									id="b2b-isAgreementCC"
									name={input.name}
									type="checkbox"
									checked={input.checked}
									onBlur={input.onBlur}
									onChange={input.onChange}
									onFocus={input.onFocus}
								/>
								<span className="vinisto-popup__checkmark" />
							</label>
							{meta.touched && meta.error && (
								<p className={styles.errorMessage}>{t({ id: meta.error })}</p>
							)}
						</div>
					)}
				/>
				<InputCheckBox
					identifier="isNewsletterActive"
					name="isNewsletterActive"
					label="modal.b2bRegistration.summary.newsletter"
					isErrorVisible={false}
				/>
			</div>
		</StepPanel>
	);
};

export default SummaryStep;

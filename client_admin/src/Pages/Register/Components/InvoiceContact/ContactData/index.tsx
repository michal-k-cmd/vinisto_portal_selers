import { FC, useContext } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { STEP_INVOICE_CONTACT } from 'Pages/Register/constants';
import { required } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input, InputEmail, InputPhone } from 'Components/Form';

import { ContactDataProps } from './interfaces';

const ContactData: FC<ContactDataProps> = ({ showErrors }) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<CCard>
			<CCardBody>
				<CCardTitle
					component="h2"
					className="vinisto-card__heading"
				>
					{t({ id: 'register.invoiceContact.contact.heading' })}
				</CCardTitle>
				<CCardText>
					{t({ id: 'register.invoiceContact.contact.description' })}
				</CCardText>
				<div className="register-process__input-wrap">
					<Input
						identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ADDRESSEE}`}
						name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ADDRESSEE}`}
						label="register.form.address.addressee.label"
						placeholder="register.form.address.addressee.placeholder"
						validate={required}
						showError={showErrors}
					/>
				</div>
				<div className="register-process__input-wrap">
					<InputEmail
						identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CONTACT_EMAIL}`}
						name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CONTACT_EMAIL}`}
						label="register.form.address.email.label"
						placeholder="register.form.address.email.placeholder"
						showError={showErrors}
					/>
				</div>
				<div className="register-process__input-wrap">
					<InputPhone
						identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CONTACT_PHONE}`}
						name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CONTACT_PHONE}`}
						validate={required}
						label="register.form.address.phone.label"
						showError={showErrors}
					/>
				</div>
			</CCardBody>
		</CCard>
	);
};

export default ContactData;

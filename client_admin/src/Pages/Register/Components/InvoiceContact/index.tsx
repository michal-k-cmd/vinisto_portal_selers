import { FC, useContext } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { STEP_INVOICE_CONTACT } from 'Pages/Register/constants';
import { required } from 'Components/Form/validators';
import { hasErrors } from 'Pages/Register/helpers';
import { RegisterPageContext } from 'Pages/Register/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputCheckBox } from 'Components/Form';
import { ErrorSmallIcon } from 'Components/Icons';

import ContactData from './ContactData';
import InvoiceData from './InvoiceData';

import './styles.css';

/**
 * @category Component Register Page
 */
const RegisterInvoiceContactPage: FC = () => {
	const { activeStep, latestVisitedStep } = useContext(RegisterPageContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();
	const form = useForm();

	const showErrors = activeStep < latestVisitedStep;
	const isError = hasErrors(form.getState()?.errors?.form ?? {});

	const handleOnNavigateToStep3 = () => navigate('/register/step/3');

	return (
		<div className="register-process">
			<h1 className="visually-hidden">
				{t({ id: STEP_INVOICE_CONTACT.title })}
			</h1>
			<div className="register-process__body">
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.invoiceContact.heading' })}
						</CCardTitle>
						<CCardText>
							{t({ id: 'register.invoiceContact.description' })}
						</CCardText>
					</CCardBody>
				</CCard>
				<InvoiceData showErrors={showErrors} />
				<ContactData showErrors={showErrors} />
				<CCard>
					<CCardBody>
						<InputCheckBox
							identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.IS_AGREEMENT_VOP}`}
							name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.IS_AGREEMENT_VOP}`}
							label="register.form.isAgreementVOP.label"
							showError={showErrors}
							validate={required}
						/>
						<div className="mt-2">
							<div className="vinisto-cart-header__step__info continue error">
								<Button
									className="vinisto-bg-green"
									onClick={handleOnNavigateToStep3}
									disabled={isError}
								>
									{`${t({ id: 'register.continue' })}`}
								</Button>
								<div className="vinisto-cart-header__step__info__text">
									<div className="vinisto-cart-header__step__info__heading">
										<ErrorSmallIcon />
										{t({ id: 'register.navbar.errors.title' })}
									</div>
									<ul>
										<li key="0">Název společnosti</li>
									</ul>
								</div>
							</div>
						</div>
					</CCardBody>
				</CCard>
			</div>
		</div>
	);
};

export default RegisterInvoiceContactPage;

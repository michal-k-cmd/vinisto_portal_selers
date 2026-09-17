import { FC, useContext, useMemo } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import {
	STEP_INVOICE_CONTACT,
	STEP_SUPPLIER,
	SUPPLIER_TYPE,
} from 'Pages/Register/constants';
import { required, requiredWarning } from 'Components/Form/validators';
import { hasErrors } from 'Pages/Register/helpers';
import { RegisterPageContext } from 'Pages/Register/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input, InputCheckBox, InputTextArea } from 'Components/Form';

import './styles.css';

/**
 * @category Component Register Page
 */
const RegisterProfilePage: FC = () => {
	const { activeStep, latestVisitedStep } = useContext(RegisterPageContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();

	const showErrors = useMemo<boolean>(
		() => activeStep < latestVisitedStep,
		[activeStep, latestVisitedStep]
	);
	const form = useForm();
	const isError = hasErrors(form.getState()?.errors?.supplier ?? {});

	const isProducer =
		form.getFieldState(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.SUPPLIER_TYPE}`
		)?.value === String(SUPPLIER_TYPE.PRODUCER);

	const handleOnNavigateToStep5 = () => navigate('/register/step/5');

	return (
		<div className="register-process">
			<h1 className="visually-hidden">{t({ id: STEP_SUPPLIER.title })}</h1>
			<div className="register-process__body">
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.profile.title' })}
						</CCardTitle>
						<CCardText>{t({ id: 'register.profile.description' })}</CCardText>
						<div className="register-process__wrap">
							<Input
								identifier={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.NAME}`}
								name={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.NAME}`}
								label="register.supplier.name.label"
								placeholder="register.supplier.name.placeholder"
								validate={required}
								showError={showErrors}
							/>
							<Input
								identifier={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.WEB}`}
								name={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.WEB}`}
								label="register.supplier.web.label"
								placeholder="register.supplier.web.placeholder"
								validate={requiredWarning}
								showError={showErrors}
							/>

							{/* <div className="d-flex gap-3">
                <div className="vinisto-file-input-wrap mb-3">
                  <span>Logo</span>
                  <div className="d-flex align-items-center justify-content-center">
                    <FormRB.Control type="file" className="vinisto-file-input logo" />
                  </div>
                </div>
                <div className="vinisto-file-input-wrap mb-3">
                  <span>Úvodní fotografie</span>
                  <div className="d-flex align-items-center justify-content-center">
                    <FormRB.Control type="file" className="vinisto-file-input main-photo" />
                  </div>
                </div>
              </div>*/}

							<InputTextArea
								identifier={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.COMPANY_DESCRIPTION}`}
								name={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.COMPANY_DESCRIPTION}`}
								label="register.supplier.companyDescription.label"
								placeholder="register.supplier.companyDescription.placeholder"
								validate={requiredWarning}
								showError={showErrors}
							/>

							{isProducer && (
								<>
									<InputTextArea
										identifier={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.MAIN_PROFILE}`}
										name={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.MAIN_PROFILE}`}
										label="register.supplier.mainProfile.label"
										placeholder="register.supplier.mainProfile.placeholder"
										validate={requiredWarning}
										showError={showErrors}
									/>

									<Input
										identifier={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.WINE_REGION}`}
										name={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.WINE_REGION}`}
										label="register.supplier.wineRegion.label"
										placeholder="register.supplier.wineRegion.placeholder"
										validate={requiredWarning}
										showError={showErrors}
									/>

									{/*<div className="vinisto-file-input-wrap mb-3">
                    <span>Ocenění / certifikáty</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <FormRB.Control type="file" className="vinisto-file-input" />
                    </div>
                  </div>*/}
								</>
							)}

							<InputCheckBox
								identifier={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.IS_AGREEMENT_FILL_OUT}`}
								name={`${STEP_SUPPLIER.id}.${STEP_SUPPLIER.fields.IS_AGREEMENT_FILL_OUT}`}
								label="register.supplier.isAgreementFillOut.label"
								validate={required}
								showError={showErrors}
							/>

							<div className="mt-2">
								{/*<Button
                  className="vinisto-bg"
                  onClick={handleOnNavigateToStep5}
                >
                  Vyplnit později
                </Button>
                <Button
                  className="vinisto-bg-green ms-3"
                  onClick={handleOnNavigateToStep5}
                >
                  Vyplnit kompletní údaje
                </Button>*/}
								<Button
									className="vinisto-bg-green"
									onClick={handleOnNavigateToStep5}
									disabled={isError}
								>
									{t({ id: 'register.continue' })}
								</Button>
							</div>
						</div>
					</CCardBody>
				</CCard>
			</div>
		</div>
	);
};

export default RegisterProfilePage;

import { useContext, useMemo } from 'react';
import { get, isEmpty } from 'lodash-es';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import { STEP_CREDENTIALS } from 'Pages/Register/constants';
import { validatePassword } from 'Components/Form/validators';
import { useRegisterPageContext } from 'Pages/Register/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	InputCheckBox,
	InputEmail,
	InputPassword,
	Validators,
} from 'Components/Form';
import { CCard } from '@coreui/react';

import { MIN_PASSWORD_LENGTH } from './constants';

const RegisterCredentialsPage = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();
	const { activeStep, latestVisitedStep } = useRegisterPageContext();
	const form = useForm();

	const showErrors = useMemo<boolean>(
		() => activeStep < latestVisitedStep,
		[activeStep, latestVisitedStep]
	);
	const isError = !isEmpty(get(form.getState(), 'errors.credentials', {}));

	const handleOnNavigateToNextStep = () => navigate('/register/step/2');

	return (
		<div className="login">
			<CCard>
				<section className="modal-body">
					<header className="vinisto-popup__heading-wrap">
						<h1 className="vinisto-popup__heading">
							{t({ id: STEP_CREDENTIALS.title })}
						</h1>
					</header>
					<InputEmail
						identifier={`${STEP_CREDENTIALS.id}.${STEP_CREDENTIALS.fields.EMAIL}`}
						name={`${STEP_CREDENTIALS.id}.${STEP_CREDENTIALS.fields.EMAIL}`}
						label="register.credentials.email.label"
						placeholder="register.credentials.email.placeholder"
						validate={[Validators.required, Validators.validateEmail]}
						showError={showErrors}
					/>
					<InputPassword
						identifier={`${STEP_CREDENTIALS.id}.${STEP_CREDENTIALS.fields.PASSWORD}`}
						name={`${STEP_CREDENTIALS.id}.${STEP_CREDENTIALS.fields.PASSWORD}`}
						label="register.credentials.password.label"
						showError={showErrors}
						validate={validatePassword(MIN_PASSWORD_LENGTH)}
					/>
					<InputCheckBox
						identifier={`${STEP_CREDENTIALS.id}.${STEP_CREDENTIALS.fields.IS_AGREEMENT_CC}`}
						name={`${STEP_CREDENTIALS.id}.${STEP_CREDENTIALS.fields.IS_AGREEMENT_CC}`}
						label="register.credentials.isAgreementCC.label"
						validate={Validators.required}
						showError={showErrors}
					/>
					<footer className="vinisto-popup__links underline-effect underline-effect--vinisto">
						<Link
							to="/login"
							className="vinisto-popup__link underline-item"
						>
							&lt; {t({ id: 'admin.btn.back' })}
						</Link>
						<Button
							className="vinisto-bg-green"
							onClick={handleOnNavigateToNextStep}
							disabled={isError}
						>
							{`${t({ id: 'register.continue' })}`}
						</Button>
					</footer>
				</section>
			</CCard>
		</div>
	);
};

export default RegisterCredentialsPage;

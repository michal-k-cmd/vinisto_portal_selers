import * as React from 'react';
import {
	CONFIRM_PASSWORD_TYPE,
	PASSWORD_TYPE,
} from 'Components/Form/Components/Password/constants';
import { requireEmail } from 'Components/Form/validators';
import { Form, InputEmail, InputPassword } from 'Components/Form';

import './styles.css';

const RegistrationFinish: React.FunctionComponent = () => {
	return (
		<section id="content-wrapper">
			<div className="container">
				<div className="row"></div>
			</div>
			<div className="container mt-0">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card vinisto-registration-finish pb-3">
							<h1 className="vinisto-registration-finish__heading">
								Dokončení registrace
							</h1>
							<div className="vinisto-registration-finish__wrap">
								<Form>
									<InputEmail
										validate={requireEmail}
										label="Registrační email"
									/>
									<InputPassword
										type={PASSWORD_TYPE}
										label="Zadejte heslo"
									/>
									<InputPassword
										type={CONFIRM_PASSWORD_TYPE}
										label="Zadejte heslo znovu pro potvrzení"
									/>
									<div className="vinisto-registration-finish__center">
										<button className="vinisto-btn vinisto-bg-green vinisto-registration-finish__btn">
											Dokončit registraci
										</button>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegistrationFinish;

'use client';

import * as React from 'react';
import { get } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputPassword } from 'Components/Form';
import {
	FIELD_IDENTIFIER,
	PASSWORD_TYPE,
} from 'Components/Form/Components/Password/constants';

import './styles.css';

const ResetPassword = ({ hash }: { hash: string }): JSX.Element => {
	const authenticationContext = React.useContext(AuthenticationContext);
	const router = useRouter();

	React.useEffect(() => {
		if (authenticationContext.isLoggedIn) {
			router.push('/');
		}
	}, [authenticationContext, router]);

	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const notificationsContext = React.useContext(NotificationsContext);

	const handleOnSubmit = React.useCallback(
		(formValues: Record<any, any>) => {
			authenticationContext
				.handleOnResetPassword(hash, get(formValues, FIELD_IDENTIFIER, ''))
				?.then(() => {
					router.push('/');
					notificationsContext.handleShowSuccessNotification(
						'notification.message.resetPassword.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'notification.message.resetPassword.error'
					);
				});
		},
		[hash, router, notificationsContext, authenticationContext]
	);

	return (
		<section id="content-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="vinisto-card vinisto-registration-finish pb-3">
							<h1 className="vinisto-registration-finish__heading">
								{t({ id: 'resetPassword.header' })}
							</h1>
							<div className="vinisto-registration-finish__wrap">
								<Form
									submitCallback={handleOnSubmit}
									customSubmitContent={() => (
										<div className="vinisto-registration-finish__center">
											<button
												type="submit"
												className="vinisto-btn vinisto-bg vinisto-registration-finish__btn"
											>
												{t({
													id: 'resetPassword.submit',
												})}
											</button>
										</div>
									)}
								>
									<InputPassword
										type={PASSWORD_TYPE}
										label={t({
											id: 'resetPassword.newPassword',
										})}
									/>
									{/* <InputPassword
                    type={CONFIRM_PASSWORD_TYPE}
                    label={t({ id: 'resetPassword.confirmPassword' })}
                  /> */}
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;

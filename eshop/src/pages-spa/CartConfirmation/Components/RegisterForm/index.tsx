import { lazy, Suspense, useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import { InputEmail, InputPassword } from 'Components/Form';
import { requireEmail } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import Loader from 'Components/View/Loader';
const AdvantageIcon = lazy(() => import('Components/Icons/Advantage'));

import styles from './styles.module.css';

interface RegisterFormProps {
	email?: string;
}

const RegisterForm = ({ email }: RegisterFormProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOnRegister } = useContext(AuthenticationContext);

	const handleOnSubmit = useCallback(
		(formValues: Record<any, any>): void => {
			handleOnRegister({
				email: formValues.email,
				password: formValues.password,
				isNewsletterActive: false,
				isAgreementCC: true,
			});
		},
		[handleOnRegister]
	);

	const initialValues = {} as Record<any, any>;

	if (email) {
		initialValues.email = email;
	}

	return (
		<Form
			initialValues={initialValues}
			onSubmit={handleOnSubmit}
			render={({ handleSubmit }) => {
				return (
					<form onSubmit={handleSubmit}>
						<h2 className={styles.heading}>
							{t(
								{
									id: 'order.finalRegisterForm.title',
								},
								{
									subtitle: (
										<span
											className="fw-bold"
											key="subtitle"
										>
											{t({ id: 'order.finalRegisterForm.title.subtitle' })}
										</span>
									),
								}
							)}
						</h2>
						<div className={styles.content}>
							<div className={styles.form}>
								<div className={styles.email}>
									<InputEmail validate={requireEmail} />
								</div>

								<div className={styles.password}>
									<InputPassword
										label={`${t({
											id: 'order.finalRegisterForm.password.label',
										})}`}
									/>
								</div>

								<div>
									<button
										type="submit"
										className={styles.submit}
									>
										{t({
											id: 'order.finalRegisterForm.submit',
										})}
									</button>
								</div>
							</div>
							<div>
								<div className={styles.registerHeading}>
									{t({ id: 'order.finalRegisterForm.advantage' })}
								</div>
								<div className={styles.advantagesGrid}>
									<div>
										<Suspense fallback={<Loader blank />}>
											<AdvantageIcon alt={t({ id: 'alt.advantage' })} />
										</Suspense>
										<span>{t({ id: 'order.finalRegisterForm.text1' })}</span>
									</div>
									<div>
										<Suspense fallback={<Loader blank />}>
											<AdvantageIcon alt={t({ id: 'alt.advantage' })} />
										</Suspense>
										<span>{t({ id: 'order.finalRegisterForm.text2' })}</span>
									</div>
									<div>
										<Suspense fallback={<Loader blank />}>
											<AdvantageIcon alt={t({ id: 'alt.advantage' })} />
										</Suspense>
										<span>{t({ id: 'order.finalRegisterForm.text3' })}</span>
									</div>
									<div>
										<Suspense fallback={<Loader blank />}>
											<AdvantageIcon alt={t({ id: 'alt.advantage' })} />
										</Suspense>
										<span>{t({ id: 'order.finalRegisterForm.text4' })}</span>
									</div>
									<div>
										<Suspense fallback={<Loader blank />}>
											<AdvantageIcon alt={t({ id: 'alt.advantage' })} />
										</Suspense>
										<span>{t({ id: 'order.finalRegisterForm.text5' })}</span>
									</div>
								</div>
							</div>
						</div>
					</form>
				);
			}}
		/>
	);
};

export default RegisterForm;

import { FC, useCallback, useContext, useMemo } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { filter, get, includes, map, size, split } from 'lodash-es';
import { useForm } from 'react-final-form';
import { registrationSteps, STEP_SUMMARY } from 'Pages/Register/constants';
import { getKeys } from 'Pages/Register/helpers';
import { RegisterPageContext } from 'Pages/Register/context';
import { LocalizationContext } from 'Services/LocalizationService';

import { StepSummary } from './interfaces';
import CredentialsSummary from './Credentials';
import InvoiceContactSummary from './InvoiceContact';
import ProfileSummary from './Profile';
import ReviewSummary from './Review';
import ServicesSummary from './Services';
// import ProductsSummary from './Products';

/**
 * @category Component Register Page
 */
const RegisterSummaryPage: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const { navigateToStep } = useContext(RegisterPageContext);

	const t = localizationContext.useFormatMessage();
	const form = useForm();
	const formValues = get(form.getState(), 'values');
	const formErrors = get(form.getState(), 'errors');

	const steps: StepSummary[] = useMemo(() => {
		return registrationSteps.map((step) => {
			// TODO: rewrite without lodash
			// TODO: think of a better solution to distinguish warnings from errors (for now based on error msg localization key)
			const errors = filter(
				map(getKeys(formErrors ?? {}), (field: string) => ({
					field,
					fieldLabel: t({ id: `register.${field}.label` }),
					error: get(formErrors, field),
					errorLabel: `${t({ id: get(formErrors, field, 'validation') })}`,
				})),
				(error) =>
					get(split(get(error, 'field', ''), '.'), '[0]') === step.id &&
					!includes(get(error, 'error'), 'validation.warning.')
			);
			const warnings = filter(
				map(getKeys(formErrors ?? {}), (field: string) => ({
					field,
					fieldLabel: t({ id: `register.${field}.label` }),
					error: get(formErrors, field),
					errorLabel: `${t({ id: get(formErrors, field, 'validation') })}`,
				})),
				(error) =>
					get(split(get(error, 'field', ''), '.'), '[0]') === step.id &&
					includes(get(error, 'error'), 'validation.warning.')
			);

			return {
				...step,
				valid: size(errors) === 0 && size(warnings) === 0,
				errors,
				warnings,
			};
		});
	}, [formErrors, t]);

	const handleOnNavigateToStep = useCallback(
		(step: number) => () => {
			navigateToStep(step);
		},
		[navigateToStep]
	);

	return (
		<div className="register-process w-100">
			<h1 className="visually-hidden">{t({ id: STEP_SUMMARY.title })}</h1>
			<div className="register-process__body">
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.summary.info.title' })}
						</CCardTitle>
						<CCardText>
							{t({ id: 'register.summary.info.description' })}
						</CCardText>
					</CCardBody>
				</CCard>

				<CredentialsSummary
					step={steps[0]}
					formValues={formValues}
					handleOnNavigateToStep={handleOnNavigateToStep}
				/>

				<InvoiceContactSummary
					step={steps[1]}
					formValues={formValues}
					handleOnNavigateToStep={handleOnNavigateToStep}
				/>

				<ServicesSummary
					step={steps[2]}
					formValues={formValues}
					handleOnNavigateToStep={handleOnNavigateToStep}
				/>

				<ProfileSummary
					step={steps[3]}
					formValues={formValues}
					handleOnNavigateToStep={handleOnNavigateToStep}
				/>

				{/* <ProductsSummary
          step={...}
          formValues={formValues}
          handleOnNavigateToStep={handleOnNavigateToStep}
        > */}

				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							Další postup / co dál - naskladnění produktů - co kdy kde a proč,
							vše lze najít v adminu
						</CCardTitle>
						<CCardText>
							informace o svozu/dovozu zboží, avíza, komunikace
						</CCardText>
					</CCardBody>
				</CCard>

				<ReviewSummary steps={steps} />
			</div>
		</div>
	);
};

export default RegisterSummaryPage;

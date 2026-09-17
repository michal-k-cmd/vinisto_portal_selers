import { FC, useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { filter, get, includes, map, size, split } from 'lodash-es';
import { useForm } from 'react-final-form';
import { registrationSteps, STEP_STATUS } from 'Pages/Register/constants';
import { getKeys } from 'Pages/Register/helpers';
import { useRegisterPageContext } from 'Pages/Register/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	ErrorSmallIcon,
	SuccessSmallIcon,
	WarnSmallIcon,
} from 'Components/Icons';
import { RegistrationStepProgress } from 'Pages/Register/interfaces';

import { getStepStatus, hasCardStatusIcon } from './helpers';
import './styles.css';

const getCardStatusIcon = (status: STEP_STATUS) => {
	switch (status) {
		case STEP_STATUS.SUCCESS:
			return <SuccessSmallIcon />;
		case STEP_STATUS.WARNING:
			return <WarnSmallIcon />;
		case STEP_STATUS.ERROR:
			return <ErrorSmallIcon />;
	}
	return <></>;
};

const RegisterNavigation: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const { activeStep, latestVisitedStep, navigateToStep } =
		useRegisterPageContext();

	const t = localizationContext.useFormatMessage();

	const form = useForm();
	const formErrors = get(form.getState(), 'errors', {});

	const steps = useMemo((): RegistrationStepProgress[] => {
		return map(registrationSteps, (step) => {
			const errors = filter(
				map(getKeys(formErrors), (field: string) => ({
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
				map(getKeys(formErrors), (field: string) => ({
					field,
					fieldLabel: t({ id: `register.${field}.label` }),
					error: get(formErrors, field),
					errorLabel: `${t({ id: get(formErrors, field, 'validation') })}`,
				})),
				(error) =>
					get(split(get(error, 'field', ''), '.'), '[0]') === step.id &&
					includes(get(error, 'error'), 'validation.warning.')
			);

			const valid = size(errors) === 0 && size(warnings) === 0;
			return {
				...step,
				valid,
				errors,
				warnings,
			};
		});
	}, [t, formErrors]);

	const handleOnNavigateToStep = useCallback(
		(step: number) => () => navigateToStep(step),
		[navigateToStep]
	);

	return (
		<div className="vinisto-cart-header">
			{map(steps, (step, index) => {
				const stepStatus = getStepStatus(step, activeStep);
				return (
					<div
						key={index}
						className={cx(
							'vinisto-cart-header__step',
							{
								pointer:
									stepStatus !== STEP_STATUS.DISABLED &&
									step.order <= latestVisitedStep &&
									step.order !== activeStep,
							},
							{ active: stepStatus === STEP_STATUS.ACTIVE },
							{
								success:
									stepStatus === STEP_STATUS.SUCCESS &&
									step.order <= latestVisitedStep &&
									step.order !== activeStep,
							},
							{
								error:
									stepStatus === STEP_STATUS.ERROR &&
									step.order <= latestVisitedStep &&
									step.order !== activeStep,
							},
							{
								warn:
									stepStatus === STEP_STATUS.WARNING &&
									step.order <= latestVisitedStep &&
									step.order !== activeStep,
							}
						)}
						onClick={handleOnNavigateToStep(step.order)}
					>
						<div className="vinisto-cart-header__step__number">
							<div className="vinisto-cart-header__step__number__circle">
								{step.order}
							</div>
						</div>
						<div className="vinisto-cart-header__step__name vinisto-font-18">
							{t({ id: step.title })}
						</div>
						{hasCardStatusIcon(stepStatus) &&
							step.order <= latestVisitedStep &&
							step.order !== activeStep && (
								<div className="vinisto-cart-header__step__info">
									{getCardStatusIcon(stepStatus)}
									{stepStatus !== STEP_STATUS.SUCCESS && (
										<div className="vinisto-cart-header__step__info__text">
											{step.errors.length > 0 && (
												<>
													<div className="vinisto-cart-header__step__info__heading">
														{getCardStatusIcon(STEP_STATUS.ERROR)}
														{t({ id: 'register.navbar.errors.title' })}
													</div>
													<ul>
														{step.errors.map((error) => {
															return (
																<li key={error.field}>{error.fieldLabel}</li>
															);
														})}
													</ul>
													<div className="text-end underline-effect underline-effect--vinisto">
														<span className="underline-item">
															{t({ id: 'register.navbar.fillInMissing' })} &gt;
														</span>
													</div>
												</>
											)}
											{step.errors.length > 0 && step.warnings.length > 0 && (
												<hr className="vinisto-cart-header__step__info__line" />
											)}
											{step.warnings.length > 0 && (
												<>
													<div className="vinisto-cart-header__step__info__heading">
														{getCardStatusIcon(STEP_STATUS.WARNING)}
														{t({ id: 'register.navbar.warnings.title' })}
													</div>
													<ul>
														{step.warnings.map((warning) => {
															return (
																<li key={warning.field}>
																	{warning.fieldLabel}
																</li>
															);
														})}
													</ul>
													<div className="text-end underline-effect underline-effect--vinisto">
														<span className="underline-item">
															{t({ id: 'register.navbar.fillInMissing' })} &gt;
														</span>
													</div>
												</>
											)}
										</div>
									)}
									{stepStatus === STEP_STATUS.SUCCESS && (
										<div className="vinisto-cart-header__step__info__text">
											<div className="vinisto-cart-header__step__info__heading">
												{getCardStatusIcon(STEP_STATUS.SUCCESS)}
												{t({ id: 'register.navbar.success.title' })}
											</div>
										</div>
									)}
								</div>
							)}
					</div>
				);
			})}
		</div>
	);
};

export default RegisterNavigation;

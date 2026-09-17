import { FC, useContext, useMemo } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { get, isUndefined } from 'lodash-es';
import { Button } from 'react-bootstrap';
import { Field, useForm } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { STEP_SERVICES } from 'Pages/Register/constants';
import { required } from 'Components/Form/validators';
import { hasErrors } from 'Pages/Register/helpers';
import { RegisterPageContext } from 'Pages/Register/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input, InputError, InputPhone } from 'Components/Form';

import './styles.css';

/**
 * @category Component Register Page
 */
const RegisterServicesPage: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const { activeStep, latestVisitedStep } = useContext(RegisterPageContext);

	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();
	const form = useForm();

	const showErrors = useMemo<boolean>(
		() => activeStep < latestVisitedStep,
		[activeStep, latestVisitedStep]
	);
	const isShippingFieldName = `${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING}`;
	const isShipping: boolean | undefined = get(
		form.getState(),
		`values.${isShippingFieldName}`,
		undefined
	);
	const isError = hasErrors(form.getState()?.errors?.services ?? {});

	const handleOnSubmit = () => navigate('/register/step/4');
	const handleOnIsShipping = () => form.change(isShippingFieldName, true);
	const handleOnIsNotShipping = () => form.change(isShippingFieldName, false);
	const handleOnUnselectIsShipping = () =>
		form.change(isShippingFieldName, undefined);

	return (
		<div className="register-process">
			<h1 className="visually-hidden">{t({ id: STEP_SERVICES.title })}</h1>
			<div className="register-process__body">
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.services.saleType.title' })}
						</CCardTitle>
						<CCardText>
							{t({ id: 'register.services.saleType.description' })}
						</CCardText>
						<div className="register-process__boxes">
							<div className="register-process__boxes__box">
								{/* <div className="d-none">
                      <InputCheckBox
                        identifier="volba1"
                        label="Chci prodávat na platformě vinisto"
                        name="volba1"
                      />
                    </div>
                */}
								<p>{t({ id: 'register.services.saleType.wine.label' })}</p>
								<div className="register-process__boxes__box__info">
									{t({ id: 'register.services.saleType.wine.charge' })}
								</div>
							</div>
							<div className="register-process__boxes__box">
								{/* <div className="d-none">
                      <InputCheckBox
                        identifier="volba2"
                        name="volba2"
                        label="Chci prodávat na platformě vinisto"
                      />
                    </div>
                */}
								<p>{t({ id: 'register.services.saleType.liquor.label' })}</p>
								<div className="register-process__boxes__box__info">
									{t({ id: 'register.services.saleType.liquor.charge' })}
								</div>
							</div>
							<div className="register-process__boxes__box">
								{/* <div className="d-none">
                      <InputCheckBox
                        name="volba3"
                        label="Chci prodávat na platformě vinisto"
                        identifier="volba3"
                      />
                    </div>
                */}
								<p>
									{t({ id: 'register.services.saleType.accessories.label' })}
								</p>
								<div className="register-process__boxes__box__info">
									{t({ id: 'register.services.saleType.accessories.charge' })}
								</div>
							</div>
						</div>
					</CCardBody>
				</CCard>
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.services.shipping.title' })}
						</CCardTitle>
						<CCardText>
							{t({ id: 'register.services.shipping.description' })}
						</CCardText>
						<div className="register-process__boxes">
							{isShipping === undefined && (
								<>
									<div className="register-process__boxes__box">
										<p>
											{t({ id: 'register.services.shipping.delivery.label' })}
										</p>
										<div className="register-process__boxes__box__info">
											{t({
												id: 'register.services.shipping.delivery.charge',
											})}
										</div>
										<p className="mt-3">
											{t({
												id: 'register.services.shipping.delivery.description',
											})}
										</p>
										<Button
											className="vinisto-bg-green"
											onClick={handleOnIsShipping}
										>
											{t({ id: 'register.services.shipping.choose' })}
										</Button>
									</div>
									<div className="register-process__boxes__box">
										<p>
											{t({ id: 'register.services.shipping.pickup.label' })}
										</p>
										<div className="register-process__boxes__box__info">
											{t({ id: 'register.services.shipping.pickup.charge' })}
										</div>
										<p className="mt-3">
											{t({
												id: 'register.services.shipping.pickup.description',
											})}
										</p>
										<Button
											className="vinisto-bg-green"
											onClick={handleOnIsNotShipping}
										>
											{t({ id: 'register.services.shipping.choose' })}
										</Button>
									</div>
								</>
							)}
							{isShipping === false && (
								<div className="register-process__boxes__box open">
									<p>
										{t({ id: 'register.services.shipping.delivery.title' })}
									</p>
									<div className="register-process__boxes__box__info">
										{t({ id: 'register.services.shipping.delivery.charge' })}
									</div>
									<div className="register-process__boxes__box__selected">
										<div>
											{/* TODO */}
											<ul>
												<li>popis dopravy</li>
												<li>výhody</li>
												<li>nevýhody</li>
											</ul>
										</div>
										<div>
											<div className="mb-2">
												{t({
													id: 'register.services.shipping.delivery.collectPoint.label',
												})}
											</div>
											{/* TODO */}
											<div className="vinisto-radio-check mb-1">
												<input
													className="vinisto-radio-check__radio"
													type="radio"
													name="vinar"
													checked={true}
													readOnly
												/>
												<label htmlFor="vinar">
													Město, ulice, adresa, telefon, fax
												</label>
											</div>
										</div>
									</div>
								</div>
							)}
							{isShipping === true && (
								<div className="register-process__boxes__box open">
									<p>{t({ id: 'register.services.shipping.pickup.title' })}</p>
									<div className="register-process__boxes__box__info">
										{t({ id: 'register.services.shipping.pickup.charge' })}
									</div>
									<div className="register-process__boxes__box__selected">
										<div>
											{/* TODO */}
											<ul>
												<li>popis dopravy</li>
												<li>výhody</li>
												<li>nevýhody</li>
											</ul>
										</div>
										<div>
											<div className="mb-2">
												{t({
													id: 'register.services.shipping.pickup.address.label',
												})}
											</div>
											<Input
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_STREET}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_STREET}`}
												label="register.services.isShippingTrue.street.label"
												placeholder="register.services.isShippingTrue.street.placeholder"
												validate={required}
											/>
											<Input
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_LAND_REGISTRY_NUMBER}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_LAND_REGISTRY_NUMBER}`}
												label="register.services.isShippingTrue.landRegistryNumber.label"
												placeholder="register.services.isShippingTrue.landRegistryNumber.placeholder"
												validate={required}
											/>
											<Input
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_HOUSE_NUMBER}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_HOUSE_NUMBER}`}
												label="register.services.isShippingTrue.houseNumber.label"
												placeholder="register.services.isShippingTrue.houseNumber.placeholder"
											/>
											<Input
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_CITY}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_CITY}`}
												label="register.services.isShippingTrue.city.label"
												placeholder="register.services.isShippingTrue.city.placeholder"
												validate={required}
											/>
											<Input
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_ZIP}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_ZIP}`}
												label="register.services.isShippingTrue.zip.label"
												placeholder="register.services.isShippingTrue.zip.placeholder"
												validate={required}
											/>
											<Input
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_ADDRESSEE}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_ADDRESSEE}`}
												label="register.services.isShippingTrue.addressee.label"
												placeholder="register.services.isShippingTrue.addressee.placeholder"
												validate={required}
											/>
											<InputPhone
												identifier={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_PHONE}`}
												name={`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_PHONE}`}
												validate={required}
												label="register.services.isShippingTrue.phone.label"
												showError={showErrors}
											/>
											{/*<InputCheckBox
                      identifier="volba1"
                      name="volba1"
                      label="Kontaktní osoba pro svoz zboží se liší od kontaktní osoby pro komunikaci"
                    />*/}
											{/*<div className="mt-4 mb-2">Časová okna svozu</div>
                    <div className="register-process__boxes__box__selected__times">
                      <div className="register-process__boxes__box__selected__time">
                        <div className="register-process__boxes__box__selected__time__close">
                          <img src={require("assets/images/close.svg").default} alt="Zavřít" />
                        </div>
                        <div className="d-flex gap-3">
                        </div>
                        <div className="d-flex gap-3">
                          <InputCheckBox
                            identifier="Po"
                            name="Po"
                            label="Po"
                          />
                          <InputCheckBox
                            identifier="Út"
                            name="Út"
                            label="Út"
                          />
                          <InputCheckBox
                            identifier="St"
                            name="St"
                            label="St"
                          />
                          <InputCheckBox
                            identifier="Čt"
                            name="Čt"
                            label="Čt"
                          />
                          <InputCheckBox
                            identifier="Pá"
                            name="Pá"
                            label="Pát"
                          />
                          <InputCheckBox
                            identifier="So"
                            name="So"
                            label="So"
                          />
                          <InputCheckBox
                            identifier="Ne"
                            name="Ne"
                            label="Ne"
                          />
                        </div>
                      </div>
                      <div className="register-process__boxes__box__selected__time pt-2 pointer">
                        + Přidat časové okno
                      </div>
                    </div>*/}
										</div>
									</div>
								</div>
							)}
						</div>
						{isShipping !== undefined && (
							<div
								className="mt-3"
								onClick={handleOnUnselectIsShipping}
							>
								<button className="vinisto-btn vinisto-bg fs-6 py-1 px-3">
									&lt; {t({ id: 'register.services.shipping.change' })}
								</button>
							</div>
						)}
						<Field
							name={isShippingFieldName}
							validate={(value) =>
								isUndefined(value)
									? 'validation.error.shippingIsRequired'
									: undefined
							}
						>
							{({ meta }) => (
								<InputError
									touched={meta.touched}
									errorMessage={meta.error}
									show={showErrors}
								/>
							)}
						</Field>
						<details className="mt-4">
							<summary>
								{t({ id: 'register.services.shipping.moreInfo.toggle' })}
							</summary>
							<p>{t({ id: 'register.services.shipping.moreInfo.text' })}</p>
						</details>
					</CCardBody>
				</CCard>
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.services.marketing.title' })}
						</CCardTitle>
						<CCardText>
							{t({ id: 'register.services.marketing.description' })}
						</CCardText>
					</CCardBody>
				</CCard>
				<CCard>
					<CCardBody>
						<CCardTitle
							component="h2"
							className="vinisto-card__heading"
						>
							{t({ id: 'register.services.summary.title' })}
						</CCardTitle>
						<CCardText>
							{/* TODO */}
							*** shrnutí vybraných služeb a dodatečné info ***
						</CCardText>
						<div className="mt-2">
							<Button
								className="vinisto-bg-green"
								onClick={handleOnSubmit}
								disabled={isError}
							>
								{t({ id: 'register.continue' })}
							</Button>
						</div>
					</CCardBody>
				</CCard>
			</div>
		</div>
	);
};

export default RegisterServicesPage;

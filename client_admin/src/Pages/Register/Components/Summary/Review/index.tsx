import { FC, useContext, useMemo } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';
import { REGISTER_API_ENDPOINT } from 'Pages/Register/constants';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { PreloaderContext } from 'Components/Preloader/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { getCountryCodeFromLanguageKey } from 'Helpers/get-country-code';

import { COUNTRY_DEFAULT } from '../constants';

import { ReviewSummaryProps } from './interfaces';
import FieldList from './FieldList';

const ReviewSummary: FC<ReviewSummaryProps> = ({ steps }) => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const preloaderContext = useContext(PreloaderContext);

	const t = localizationContext.useFormatMessage();

	const form = useForm();

	const isWarning = useMemo(() => {
		return steps.some(
			(step) => step.warnings !== undefined && step.warnings.length > 0
		);
	}, [steps]);

	const isError = useMemo(() => {
		return steps.some(
			(step) => step.errors !== undefined && step.errors.length > 0
		);
	}, [steps]);

	const handleOnSubmit = () => {
		preloaderContext.togglePreloader(true);
		const formValues = form.getState().values;
		const isShipping = formValues?.services?.isShipping === true;
		const requestData: Record<any, any> = {
			name: formValues?.form?.company,
			ico: formValues?.form?.ico,
			dic: formValues?.form?.dic,
			countryCode: COUNTRY_DEFAULT,
			supplierType: formValues?.form?.supplierType,
			registrationCountry: getCountryCodeFromLanguageKey(
				localizationContext.activeLanguageKey
			),
			isShipping,
			address: {
				street: formValues?.form?.address?.street,
				landRegistryNumber: formValues?.form?.address?.landRegistryNumber,
				houseNumber: formValues?.form?.address?.houseNumber,
				zip: formValues?.form?.address?.zip,
				city: formValues?.form?.address?.city,
				phone: formValues?.form?.address?.phone,
				email: formValues?.form?.address?.email,
				note: '',
				title: `${t({ id: 'register.invoiceContact.address.title' })}`,
				countryCode: COUNTRY_DEFAULT,
				addressee: formValues?.form?.address?.addressee,
			},
			email: formValues?.credentials?.email,
			password: formValues?.credentials?.password,
			isAgreementCC: formValues?.credentials?.isAgreementCC,
			isNewsletterActive: false,
		};

		if (isShipping) {
			requestData.pickupAddress = {
				street: formValues?.services?.isShippingTrue?.street,
				landRegistryNumber:
					formValues?.services?.isShippingTrue?.landRegistryNumber,
				houseNumber: formValues?.services?.isShippingTrue?.houseNumber,
				zip: formValues?.services?.isShippingTrue?.zip,
				city: formValues?.services?.isShippingTrue?.city,
				note: '',
				title: `${t({ id: 'register.services.isShippingTrue.title' })}`,
				countryCode: COUNTRY_DEFAULT,
				phone: formValues?.services?.isShippingTrue?.phone,
				addressee: formValues?.services?.isShippingTrue?.addressee,
			};
		}

		apiServiceInstance
			.post(REGISTER_API_ENDPOINT, requestData)
			.then(() => {
				authenticationContext.dispatch({
					type: AuthenticationAction.logIn,
					payload: {
						email: get(formValues, 'credentials.email', null),
						password: get(formValues, 'credentials.password', null),
					},
				});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'register.createSupplierAndUser.error'
				);
			})
			.finally(() => {
				preloaderContext.togglePreloader(false);
			});
	};

	return (
		<>
			<CCard>
				<CCardBody>
					<CCardTitle
						className={cx(
							'vinisto-card__heading d-flex justify-content-between',
							{
								'vinisto-color-success': !isError,
								'vinisto-color-error': isError,
							}
						)}
					>
						{t({
							id: isError
								? 'register.summary.resume.title.error'
								: 'register.summary.resume.title.success',
						})}
					</CCardTitle>
					{(isWarning || isError) && (
						<CCardText>
							{t({ id: 'register.summary.resume.missingData' })}
						</CCardText>
					)}
					{isError && (
						<FieldList
							fieldKey="errors"
							steps={steps}
						/>
					)}
					{isWarning && (
						<FieldList
							fieldKey="warnings"
							steps={steps}
						/>
					)}
					{/*<p>{t({ id: 'register.summary.resume.missingVerification.text' })}</p>*/}
					<div>
						<Button
							onClick={handleOnSubmit}
							className="vinisto-bg"
							disabled={isError}
						>
							{t({ id: 'register.summary.submit' })}
						</Button>
					</div>
				</CCardBody>
			</CCard>

			{/* LAYOUT VARIANTS */}

			{/* <CCard>
        <CCardBody>
          <CCardTitle className="vinisto-card__heading vinisto-color-success">
            Skvělé! Máte vyplněny všechny potřebné údaje ke startu prodeje!
          </CCardTitle>
          <CCardText>Poslední co zbývá je ověření. Přejete si ověřit účet přes email, či Vám máme zavolat?</CCardText>
          <div>
            <Button
              className="vinisto-bg"
            >
              Zavolejte mi na uvedený telefon
            </Button>
            <Button
              className="vinisto-bg-green ms-3"
            >
              Zašlete mi link na uvedený email
            </Button>
          </div>
        </CCardBody>
      </CCard> */}

			{/* <CCard>
        <CCardBody>
          <CCardTitle className="vinisto-card__heading vinisto-color-error">
            Skvělé! Máte vyplněny všechny potřebné údaje ke startu prodeje!
          </CCardTitle>
          <CCardText>Chybějící údaje můžete vyplnit teď, a nebo dokončit registraci ověřením a doplnit je později v administraci účtu.</CCardText>
          <p className="vinisto-color-error">Údaje/akce potřebné ke startu prodeje:</p>
          <p className="mb-0 fw-bolder">Zalistované produkty:</p>
          <ul>
            <li>zkontrolovat cenu produktů</li>
          </ul>
          <p className="color-primary underline-effect underline-effect--vinisto"><span className="underline-item">Přejít na zalistované produkty a vyřešit problém &gt;</span></p>
          <p className="vinisto-color-warn">Doplňující údaje k vyplnění:</p>
          <p className="mb-0 fw-bolder">Profil společnosti:</p>
          <ul>
            <li>název</li>
          </ul>
          <p className="color-primary underline-effect underline-effect--vinisto"><span className="underline-item">Přejít na údaje o společnosti a doplnit údaje &gt;</span></p>
          <div>
            <Button
              className="vinisto-bg"
            >
              Údaje doplním později, ověřit účet po telefonu
            </Button>
            <Button
              className="vinisto-bg-green ms-3"
            >
              Údaje doplním později, zaslat ověřovací email
            </Button>
          </div>
        </CCardBody>
      </CCard> */}

			{/* <CCard>
        <CCardBody>
          <CCardTitle className="vinisto-card__heading vinisto-color-success">
            Skvělé! Máte vyplněny všechny potřebné údaje ke startu prodeje!
          </CCardTitle>
          <CCardText>Na Vašem profilu zbývá doplnit ještě pár doplňujících údajů, ty Však můžete doplnit kdykoliv z administrace.</CCardText>
          <p className="vinisto-color-warn">Doplňující údaje k vyplnění:</p>
          <p className="mb-0 fw-bolder">Profil společnosti:</p>
          <ul>
            <li>název</li>
          </ul>
          <p className="color-primary underline-effect underline-effect--vinisto"><span className="underline-item">Přejít na údaje o společnosti a doplnit údaje &gt;</span></p>
          <p className="mt-3">Poslední co zbývá je ověření. Přejete si ověřit účet přes email, či Vám máme zavolat?</p>
          <div>
            <Button
              className="vinisto-bg"
            >
              Údaje doplním později, ověřit účet po telefonu
            </Button>
            <Button
              className="vinisto-bg-green ms-3"
            >
              Údaje doplním později, zaslat ověřovací email
            </Button>
          </div>
        </CCardBody>
      </CCard> */}
		</>
	);
};

export default ReviewSummary;

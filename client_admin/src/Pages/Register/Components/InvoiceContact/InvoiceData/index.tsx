import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';
import {
	STEP_INVOICE_CONTACT,
	STEP_SERVICES,
	SUPPLIER_TYPE,
} from 'Pages/Register/constants';
import { required, validateIco } from 'Components/Form/validators';
import { PreloaderContext } from 'Components/Preloader/context';
import AresService from 'Services/AresService';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input, InputBankAccount, InputRadio } from 'Components/Form';

import { InvoiceDataProps } from './interfaces';

const InvoiceData: FC<InvoiceDataProps> = ({ showErrors }) => {
	const localizationContext = useContext(LocalizationContext);
	const preloaderContext = useContext(PreloaderContext);

	const t = localizationContext.useFormatMessage();
	const form = useForm();

	const [isAresSuccess, setIsAresSuccess] = useState(false);
	const [isAresLoaded, setIsAresLoaded] = useState(false);
	const [shouldUpdateIco, setShouldUpdateIco] = useState(0);
	const [isIcoValid, setIsIcoValid] = useState(false);

	const clearAddressFields = useCallback(() => {
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.DIC}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.COMPANY}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.STREET}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.LAND_REGISTRY_NUMBER}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.HOUSE_NUMBER}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CITY}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ZIP}`,
			''
		);
		form.change(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.BANK_ACCOUNT}`,
			''
		);
	}, [form]);

	const handleOnLoadAresData = useCallback(() => {
		preloaderContext.togglePreloader();

		const ic = form.getFieldState(
			`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ICO}`
		)?.value;

		AresService.getDataByIco(ic)
			.then((aresData) => {
				setIsAresSuccess(true);
				form.batch(() => {
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.DIC}`,
						`CZ${ic}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.COMPANY}`,
						`${aresData.obchodniJmeno}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.STREET}`,
						`${aresData.sidlo.nazevUlice}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.LAND_REGISTRY_NUMBER}`,
						`${aresData.sidlo.cisloDomovni}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.HOUSE_NUMBER}`,
						`${aresData.sidlo.cisloOrientacni}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CITY}`,
						`${aresData.sidlo.nazevObce}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ZIP}`,
						`${aresData.sidlo.psc}`
					);
					form.change(
						`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.BANK_ACCOUNT}`,
						''
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_STREET}`,
						`${aresData.sidlo.nazevUlice}`
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_LAND_REGISTRY_NUMBER}`,
						`${aresData.sidlo.cisloOrientacni}`
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_HOUSE_NUMBER}`,
						`${aresData.sidlo.cisloDomovni}`
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_CITY}`,
						`${aresData.sidlo.nazevObce}`
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_ZIP}`,
						`${aresData.sidlo.psc}`
					);
				});
			})
			.catch(() => {
				setIsAresSuccess(false);
				setShouldUpdateIco((oldState) => oldState + 1);
				form.batch(() => {
					clearAddressFields();
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_STREET}`,
						''
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_LAND_REGISTRY_NUMBER}`,
						''
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_HOUSE_NUMBER}`,
						''
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_CITY}`,
						''
					);
					form.change(
						`${STEP_SERVICES.id}.${STEP_SERVICES.fields.IS_SHIPPING_TRUE_ZIP}`,
						''
					);
				});
			})
			.finally(() => {
				setIsAresLoaded(true);
				preloaderContext.togglePreloader();
			});
	}, [form, preloaderContext, clearAddressFields]);

	useEffect(() => {
		if (isAresLoaded) return;
		form.batch(() => clearAddressFields);
	}, [isAresLoaded, form, clearAddressFields]);

	const icoFieldState = form.getFieldState(
		`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ICO}`
	);
	useEffect(() => {
		if (!icoFieldState?.value) return;
		setIsAresSuccess(false);
		setIsAresLoaded(false);
		setIsIcoValid(icoFieldState?.invalid === false);
	}, [icoFieldState?.value, icoFieldState?.invalid, form]);

	return (
		<CCard>
			<CCardBody>
				<CCardTitle
					component="h2"
					className="vinisto-card__heading"
				>
					{t({ id: 'register.invoiceContact.invoice.heading' })}
				</CCardTitle>
				<CCardText>
					{t({ id: 'register.invoiceContact.invoice.description' })}
				</CCardText>
				<InputRadio
					identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.SUPPLIER_TYPE_PRODUCER}`}
					name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.SUPPLIER_TYPE}`}
					value={String(SUPPLIER_TYPE.PRODUCER)}
					label="register.form.supplierType.producer.label"
				/>
				<InputRadio
					identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.SUPPLIER_TYPE_IMPORTER}`}
					name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.SUPPLIER_TYPE}`}
					value={String(SUPPLIER_TYPE.IMPORTER)}
					label="register.form.supplierType.importer.label"
				/>
				<div className="register-process__ico-wrap">
					<div className="register-process__input-wrap">
						<Input
							key={shouldUpdateIco}
							identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ICO}`}
							name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ICO}`}
							validate={[
								required,
								validateIco,
								() =>
									isAresLoaded && !isAresSuccess
										? 'validation.error.wrongIco'
										: undefined,
							]}
							placeholder="register.form.ico.placeholder"
							showError={showErrors}
						/>
					</div>
					{!isAresSuccess && (
						<Button
							className="btn btn-ok"
							onClick={handleOnLoadAresData}
							disabled={!isIcoValid || (isAresLoaded && !isAresSuccess)}
						>
							{t({ id: 'register.form.btnCheckIco.label' })}
						</Button>
					)}
				</div>
				{isAresSuccess && (
					<>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.DIC}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.DIC}`}
								label="register.form.dic.label"
								placeholder="register.form.dic.placeholder"
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.COMPANY}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.COMPANY}`}
								label="register.form.company.label"
								placeholder="register.form.company.placeholder"
								validate={required}
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.STREET}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.STREET}`}
								label="register.form.address.street.label"
								placeholder="register.form.address.street.placeholder"
								validate={required}
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.LAND_REGISTRY_NUMBER}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.LAND_REGISTRY_NUMBER}`}
								label="register.form.address.landRegistryNumber.label"
								placeholder="register.form.address.landRegistryNumber.placeholder"
								validate={required}
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.HOUSE_NUMBER}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.HOUSE_NUMBER}`}
								label="register.form.address.houseNumber.label"
								placeholder="register.form.address.houseNumber.placeholder"
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CITY}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.CITY}`}
								label="register.form.address.city.label"
								placeholder="register.form.address.city.placeholder"
								validate={required}
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<Input
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ZIP}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.ZIP}`}
								label="register.form.address.zip.label"
								placeholder="register.form.address.zip.placeholder"
								validate={required}
								showError={showErrors}
							/>
						</div>
						<div className="register-process__input-wrap">
							<InputBankAccount
								identifier={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.BANK_ACCOUNT}`}
								name={`${STEP_INVOICE_CONTACT.id}.${STEP_INVOICE_CONTACT.fields.BANK_ACCOUNT}`}
								showError={showErrors}
								label="form.bankAccount.label"
							/>
						</div>
					</>
				)}
			</CCardBody>
		</CCard>
	);
};

export default InvoiceData;

import { useCallback, useContext, useState } from 'react';
import { Field } from 'react-final-form';
import {
	InputCheckBox,
	InputIco,
	InputText,
	Validators,
} from 'Components/Form';
import AresService from 'Services/AresService';
import B2BRegistrationService from 'Services/B2BRegistrationService';
import { LocalizationContext } from 'Services/LocalizationService';

import StepPanel from '../StepPanel';
import { COUNTRY_OPTIONS } from '../../constants';
import { validateStreetAndNumber } from '../../helpers';
import { CompanyStepProps } from '../../interfaces';
import styles from '../../styles.module.css';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

const CompanyStep = ({
	form,
	useBillingAddressForDelivery,
	onLoadingChange,
}: CompanyStepProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [aresError, setAresError] = useState(false);
	const [isAresLoading, setIsAresLoading] = useState(false);
	const validateCompanyIco = useCallback(
		(ico?: string) => {
			if (
				!ico ||
				Validators.validateIco(ico) ||
				form.getState().active === 'ico'
			)
				return;

			return B2BRegistrationService.isCompanyIcoAlreadyUsed(ico)
				.then((isAlreadyUsed) =>
					isAlreadyUsed
						? 'modal.b2bRegistration.error.companyAlreadyRegistered'
						: undefined
				)
				.catch(() => 'modal.b2bRegistration.error.companyValidationFailed');
		},
		[form]
	);

	const handleAres = useCallback(
		async (ico: string) => {
			setAresError(false);
			setIsAresLoading(true);
			onLoadingChange(true);

			try {
				const aresData = await AresService.getDataByIco(ico);
				const countryCode = COUNTRY_OPTIONS.find(
					(code) => code === aresData.sidlo.kodStatu
				);
				const street = [
					aresData.sidlo.nazevUlice,
					aresData.sidlo.cisloDomovni,
					aresData.sidlo.cisloOrientacni
						? `/ ${aresData.sidlo.cisloOrientacni}`
						: '',
				]
					.filter(Boolean)
					.join(' ');

				form.batch(() => {
					form.change('company', aresData.obchodniJmeno ?? '');
					form.change('dic', aresData.dic ?? '');
					form.change('billingStreet', street);
					form.change('billingCity', aresData.sidlo.nazevObce ?? '');
					form.change('billingZip', aresData.sidlo.psc ?? '');
					form.change(
						'billingCountryCode',
						countryCode ?? VinistoHelperDllEnumsCountryCode.CZ
					);
				});
			} catch {
				setAresError(true);
			} finally {
				setIsAresLoading(false);
				onLoadingChange(false);
			}
		},
		[form, onLoadingChange]
	);

	return (
		<StepPanel
			titleId="modal.b2bRegistration.company.title"
			subtitleId="modal.b2bRegistration.company.subtitle"
		>
			<div className={styles.fields}>
				<div className={styles.companyIdentification}>
					<div className={styles.aresField}>
						<InputIco
							name="ico"
							label="addInvoiceForm.icoField.label"
							placeholder="addInvoiceForm.icoField.placeholder"
							validate={[Validators.required, validateCompanyIco]}
							validateOnBlur
							onAres={handleAres}
						/>
						{isAresLoading && (
							<p className={styles.fieldMessage}>
								{t({
									id: 'modal.b2bRegistration.company.aresLoading',
								})}
							</p>
						)}
						{aresError && (
							<p className={styles.errorMessage}>
								{t({ id: 'addAddressForm.ares.requestError' })}
							</p>
						)}
					</div>
					<InputText
						name="dic"
						label="addInvoiceForm.dicField.label"
						placeholder="addInvoiceForm.dicField.placeholder"
						validate={Validators.validateDic}
					/>
				</div>
				<InputText
					name="company"
					label="addInvoiceForm.companyField.label"
					placeholder="addInvoiceForm.companyField.placeholder"
					validate={Validators.required}
				/>

				<h5 className={styles.subheading}>
					{t({
						id: 'modal.b2bRegistration.company.billingAddress',
					})}
				</h5>
				<div className={styles.twoColumns}>
					<InputText
						name="billingStreet"
						label="addInvoiceForm.streetField.label"
						placeholder="addInvoiceForm.streetField.placeholder"
						validate={[Validators.required, validateStreetAndNumber]}
					/>
					<InputText
						name="billingCity"
						label="addInvoiceForm.cityField.label"
						placeholder="addInvoiceForm.cityField.placeholder"
						validate={Validators.required}
					/>
				</div>
				<InputText
					name="billingZip"
					label="addInvoiceForm.zipField.label"
					placeholder="addInvoiceForm.zipField.placeholder"
					validate={Validators.required}
					classNameWrapper={styles.shortField}
				/>
				<Field
					name="billingCountryCode"
					validate={Validators.required}
					render={({ input }) => (
						<label className={styles.selectField}>
							<span className="vinisto-label--required">
								{t({
									id: 'modal.b2bRegistration.company.country',
								})}
							</span>
							<select
								{...input}
								className="form-select vinisto-input"
							>
								{COUNTRY_OPTIONS.map((country) => (
									<option
										key={country}
										value={country}
									>
										{t({
											id: `modal.b2bRegistration.company.country.${country}`,
										})}
									</option>
								))}
							</select>
						</label>
					)}
				/>
				<div>
					<InputText
						name="accountNumberAndBankCode"
						label="modal.b2bRegistration.company.bankAccount"
						placeholder="modal.b2bRegistration.company.bankAccountPlaceholder"
					/>
					<p className={styles.fieldMessage}>
						{t({
							id: 'modal.b2bRegistration.company.bankAccountHint',
						})}
					</p>
				</div>

				<div className={styles.sameDeliveryCheckbox}>
					<InputCheckBox
						identifier="useBillingAddressForDelivery"
						name="useBillingAddressForDelivery"
						label="modal.b2bRegistration.company.sameDeliveryAddress"
						isErrorVisible={false}
					/>
				</div>

				{!useBillingAddressForDelivery && (
					<div className={styles.deliveryFields}>
						<h5 className={styles.subheading}>
							{t({
								id: 'modal.b2bRegistration.company.deliveryAddress',
							})}
						</h5>
						<div className={styles.twoColumns}>
							<InputText
								name="deliveryStreet"
								label="addInvoiceForm.streetField.label"
								placeholder="addInvoiceForm.streetField.placeholder"
								validate={[Validators.required, validateStreetAndNumber]}
							/>
							<InputText
								name="deliveryCity"
								label="addInvoiceForm.cityField.label"
								placeholder="addInvoiceForm.cityField.placeholder"
								validate={Validators.required}
							/>
						</div>
						<InputText
							name="deliveryZip"
							label="addInvoiceForm.zipField.label"
							placeholder="addInvoiceForm.zipField.placeholder"
							validate={Validators.required}
							classNameWrapper={styles.shortField}
						/>
						<InputText
							name="deliveryNote"
							label="modal.b2bRegistration.company.deliveryNote"
							placeholder="modal.b2bRegistration.company.deliveryNotePlaceholder"
						/>
					</div>
				)}
			</div>
		</StepPanel>
	);
};

export default CompanyStep;

import { FC, memo, useEffect } from 'react';
import { MutableState } from 'final-form';
import { debounce, invoke, omit } from 'lodash-es';
import { Form, useForm } from 'react-final-form';
import { useParams } from 'react-router-dom';
import { storageServiceInstance } from 'Services/StorageService';
import RegisterCredentialsPage from 'Pages/Register/Components/Credentials';
import RegisterInvoiceContactPage from 'Pages/Register/Components/InvoiceContact';
import RegisterNavigation from 'Pages/Register/Components/Navigation';
import RegisterProfilePage from 'Pages/Register/Components/Profile';
import RegisterServicesPage from 'Pages/Register/Components/Services';
import RegisterSummaryPage from 'Pages/Register/Components/Summary';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { getKeys } from './helpers';
import RegisterPageContextProvider, { useStoredRegisterData } from './context';
import {
	AUTOSAVE_TIMEOUT,
	STEP_INVOICE_CONTACT,
	SUPPLIER_TYPE,
} from './constants';

const RegisterContent = ({ values }: { values: Record<string, any> }) => {
	const { step } = useParams();
	const activeStep = Number(step);

	const form = useForm();
	const storedFormValues = useStoredRegisterData();

	useEffect(() => {
		getKeys(storedFormValues).forEach((key) => {
			invoke(form.mutators, 'setFieldTouched', [key]);
		});
	}, [storedFormValues, form]);

	useEffect(() => {
		const callback = debounce(() => {
			storageServiceInstance.setItem(
				LocalStorageKeys.REGISTER_VALUES,
				omit(
					values,
					'credentials.password',
					'credentials.password_confirm',
					'form.dic',
					'form.company',
					'form.address.street',
					'form.address.landRegistryNumber',
					'form.address.houseNumber',
					'form.address.city',
					'form.address.zip',
					'form.address.bank_account'
				)
			);
		}, AUTOSAVE_TIMEOUT);
		callback();
		return () => callback.cancel();
	}, [values]);

	return (
		<>
			<div className={activeStep === 1 ? 'align-self-center' : 'd-none'}>
				<RegisterCredentialsPage />
			</div>
			<div className={activeStep === 2 ? 'w-100' : 'd-none'}>
				<RegisterInvoiceContactPage />
			</div>
			<div className={activeStep === 3 ? 'w-100' : 'd-none'}>
				<RegisterServicesPage />
			</div>
			<div className={activeStep === 4 ? 'w-100' : 'd-none'}>
				<RegisterProfilePage />
			</div>
			{activeStep === 5 && <RegisterSummaryPage />}
			{/*<div className={activeStep === 5 ? 'w-100' : 'd-none'}><RegisterWineryPage /></div>*/}
			{/*<div className={activeStep === 7 ? 'w-100' : 'd-none'}><RegisterFinishPage /></div>*/}
		</>
	);
};

// !IMPORTANT! - Memoization of component is necessary because changing step would cause reinitializing <Form /> and removing certain data
const RegisterPage: FC = memo(() => {
	const storedFormValues = useStoredRegisterData();

	return (
		<Form
			onSubmit={() => {}}
			initialValues={{
				[STEP_INVOICE_CONTACT.id]: {
					[STEP_INVOICE_CONTACT.fields.SUPPLIER_TYPE]: SUPPLIER_TYPE.PRODUCER,
				},
				...storedFormValues,
			}}
			mutators={{
				setFieldTouched: (
					[name, touched = true]: [string, boolean],
					state: MutableState<Record<string, any>>
				) => {
					const field = state.fields[name];
					if (field) {
						field.touched = !!touched;
					}
				},
			}}
		>
			{({ handleSubmit, values }) => (
				<RegisterPageContextProvider>
					<div className="d-flex flex-column justify-content-between">
						<RegisterNavigation />
						<form
							className="d-flex flex-grow-1 justify-content-center m-2"
							onSubmit={handleSubmit}
						>
							<RegisterContent values={values} />
						</form>
						{/* TODO fix condition */}
					</div>
				</RegisterPageContextProvider>
			)}
		</Form>
	);
});

RegisterPage.displayName = 'RegisterPage';

export default RegisterPage;

import { useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import Config from 'Config';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputSelect, InputTimePicker } from 'Components/Form';

import { getValidDate } from './helpers';
import { API_ENDPOINT, countryCodesOptions } from './constants';
import { ExportInvoicesFormFields } from './interfaces';

const ExportInvoicesPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnSubmit = useCallback(
		(formValues: ExportInvoicesFormFields) => {
			const dateFrom = getValidDate(formValues.dateFrom);
			const dateTo = getValidDate(formValues.dateTo);

			const searchParams = new URLSearchParams([
				['userLoginHash', authenticationContext.vinistoUser?.loginHash],
			]);
			if (dateFrom !== false) {
				searchParams.append('timeFrom', String(dateFrom.unix()));
			}
			if (dateTo !== false) {
				searchParams.append('timeTo', String(dateTo.unix()));
			}
			if (formValues.countryCode && formValues.countryCode !== 'all') {
				searchParams.append('CountryOfSale', formValues.countryCode);
			}
			const url = new URL(
				`${Config.apiUrl}${API_ENDPOINT}?${String(searchParams)}`
			);
			window.open(url);
		},
		[authenticationContext.vinistoUser]
	);

	return (
		<Form<ExportInvoicesFormFields>
			onSubmit={handleOnSubmit}
			initialValues={{ countryCode: 'all' }}
		>
			{({ handleSubmit }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<InputTimePicker
						name="dateFrom"
						identifier="dateFrom"
						label="admin.exportInvoices.dateFrom.label"
					/>
					<InputTimePicker
						name="dateTo"
						identifier="dateTo"
						label="admin.exportInvoices.dateTo.label"
					/>
					<InputSelect
						options={countryCodesOptions}
						name="countryCode"
						identifier="countryCode"
						label="admin.invoicesExport.countryOfSale.label"
					/>
					<button
						type="submit"
						className="btn btn-primary"
					>
						{t({ id: 'admin.exportInvoices.submit' })}
					</button>
				</form>
			)}
		</Form>
	);
};
export default ExportInvoicesPage;

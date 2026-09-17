import { FC, useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import Config from 'Config';
import { ExportInvoicesFormFields } from 'Pages/ExportInvoices/interfaces';
import { getValidDate } from 'Pages/ExportInvoices/helpers';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputDatePicker } from 'Components/Form';

import { API_ENDPOINT } from './constants';

const ExportInvoicesResellersPage: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnSubmit = useCallback(
		(formValues: ExportInvoicesFormFields) => {
			const date = getValidDate(formValues.month);

			const searchParams = new URLSearchParams([
				['userLoginHash', authenticationContext.vinistoUser?.loginHash],
			]);

			if (date !== false) {
				searchParams.append('timeFrom', String(date.unix()));
				searchParams.append('timeTo', String(date.add(1, 'M').unix() - 1));
			}

			const url = new URL(
				`${Config.apiUrl}${API_ENDPOINT}?${String(searchParams)}`
			);

			window.open(url);
		},
		[authenticationContext.vinistoUser]
	);

	return (
		<Form<ExportInvoicesFormFields> onSubmit={handleOnSubmit}>
			{({ handleSubmit }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<InputDatePicker
						name="month"
						identifier="month"
						label="admin.exportInvoices.month.label"
						monthYearOnly
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

export default ExportInvoicesResellersPage;

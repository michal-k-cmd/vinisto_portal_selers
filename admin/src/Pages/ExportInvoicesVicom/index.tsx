import { FC, useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import Config from 'Config';
import { ExportInvoicesFormFields } from 'Pages/ExportInvoices/interfaces';
import { getValidDate } from 'Pages/ExportInvoices/helpers';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputDatePicker } from 'Components/Form';
import { CSV_EXPORT_SUPPLIER_URI } from 'Services/OrderService/constants';
import { SUPPLIER_ID_VICOM } from 'Pages/ExportInvoicesVicom/constants';

const ExportInvoicesVicomPage: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnSubmit = useCallback(
		(formValues: ExportInvoicesFormFields) => {
			const date = getValidDate(formValues.month);

			const searchParams = new URLSearchParams([
				['userLoginHash', authenticationContext.vinistoUser?.loginHash],
				['supplierId', SUPPLIER_ID_VICOM],
			]);

			if (date !== false) {
				searchParams.append('timeFrom', String(date.unix()));
				searchParams.append('timeTo', String(date.add(1, 'M').unix() - 1));
			}

			const url = new URL(
				`${Config.apiUrl}${CSV_EXPORT_SUPPLIER_URI}?${String(searchParams)}`
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

export default ExportInvoicesVicomPage;

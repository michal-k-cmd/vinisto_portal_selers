import { Form } from 'react-final-form';
import { ChangeEvent, useContext, useMemo } from 'react';
import Config from 'Config';
import {
	API_ENDPOINT,
	countryOfSaleOptions,
} from 'Pages/ExportOrders/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { getValidDate } from 'Pages/ExportInvoices/helpers';
import {
	StatisticsListParams,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsOrderOrderState,
	VinistoHelperDllEnumsOrderOrderStatisticExportType,
} from 'vinisto_api_client/src/api-types/order-api';
import { InputSelect, InputTimePicker } from 'Components/Form';

import './styles.css';

const ExportOrdersPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const orderStates: VinistoHelperDllEnumsOrderOrderState[] = useMemo(
		() =>
			Object.values(VinistoHelperDllEnumsOrderOrderState).filter(
				(state) => state !== VinistoHelperDllEnumsOrderOrderState.NONE
			),
		[]
	);

	const handleChangeOrderState = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			orderStates.push(e.target.value as VinistoHelperDllEnumsOrderOrderState);
		} else {
			const index = orderStates.indexOf(
				e.target.value as VinistoHelperDllEnumsOrderOrderState
			);
			if (index !== -1) {
				orderStates.splice(index, 1);
			}
		}
	};

	const handleSubmit = (formValues: StatisticsListParams) => {
		const dateFrom = getValidDate(String(formValues.TimeFrom));
		const dateTo = getValidDate(String(formValues.TimeTo));

		const searchParams = new URLSearchParams([
			['userLoginHash', authenticationContext.vinistoUser?.loginHash],
		]);
		if (dateFrom !== false) {
			searchParams.append('timeFrom', String(dateFrom.unix()));
		}
		if (dateTo !== false) {
			searchParams.append('timeTo', String(dateTo.unix()));
		}
		if (
			formValues.CountryOfSale &&
			formValues.CountryOfSale !==
				('all' as unknown as VinistoHelperDllEnumsCountryCode)
		) {
			searchParams.append('CountryOfSale', formValues.CountryOfSale);
		}

		formValues.OrderStates?.map((orderState) => {
			searchParams.append('OrderStates', orderState);
		});

		formValues.ExportType &&
			searchParams.append('ExportType', formValues.ExportType);

		const url = new URL(
			`${Config.apiUrl}${API_ENDPOINT}?${String(searchParams)}`
		);

		window.open(url);
	};

	return (
		<Form<StatisticsListParams>
			onSubmit={handleSubmit}
			initialValues={{
				OrderStates: orderStates,
				ExportType: VinistoHelperDllEnumsOrderOrderStatisticExportType.BY_ORDER,
			}}
		>
			{({ handleSubmit }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<InputTimePicker
						name="TimeFrom"
						identifier="TimeFrom"
						label="exportOrders.dateFrom.label"
						className="half-width-input"
					/>
					<InputTimePicker
						name="TimeTo"
						identifier="TimeTo"
						label="exportOrders.dateTo.label"
						className="half-width-input"
					/>
					<div className="checkbox-grid">
						{orderStates.map((state) => (
							<div key={state}>
								<label
									className="form-label vinisto-label--semibold vinisto-checkbox"
									htmlFor={state}
								>
									<span>{t({ id: `exportOrders.order.state.${state}` })}</span>
									<input
										type="checkbox"
										id={state}
										name={state}
										value={state}
										defaultChecked={true}
										onChange={handleChangeOrderState}
									/>
									<span className="vinisto-checkbox__checkmark"></span>
								</label>
							</div>
						))}
					</div>
					<InputSelect
						options={Object.values(
							VinistoHelperDllEnumsOrderOrderStatisticExportType
						).map((state) => {
							return {
								value: state,
								label:
									t({
										id: `exportOrders.order.exportType.${state}`,
									})?.toString() ?? '',
							};
						})}
						name="ExportType"
						identifier="ExportType"
						label="exportOrders.exportType.label"
						className="mt-3"
					/>
					<InputSelect
						options={countryOfSaleOptions}
						name="CountryOfSale"
						identifier="CountryOfSale"
						label="admin.ordersExport.countryOfSale.label"
					/>
					<button
						type="submit"
						className="btn btn-primary"
					>
						{t({ id: 'exportOrders.submit' })}
					</button>
				</form>
			)}
		</Form>
	);
};

export default ExportOrdersPage;

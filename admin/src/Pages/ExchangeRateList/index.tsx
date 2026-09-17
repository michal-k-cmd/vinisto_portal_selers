import { useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { EDIT_EXCHANGE_RATE_COEFFICIENT } from 'Components/Modal/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import { exchangeRateListTableKeys } from './constants';

const ExchangeRateListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.exchangeRateList.date.label' })}`,
			id: exchangeRateListTableKeys.DATE,
			accessorFn: (row) => get(row, 'day', []),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.exchangeRateList.currency.label' })}`,
			id: exchangeRateListTableKeys.CURRENCY,
			accessorFn: (row) => get(row, 'currency', []),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.exchangeRateList.value.label' })}`,
			id: exchangeRateListTableKeys.VALUE,
			accessorFn: (row) => get(row, 'value', []),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.exchangeRateList.valueGoods.label' })}`,
			id: exchangeRateListTableKeys.VALUE_GOODS,
			accessorFn: (row) => get(row, 'valueGoods', []),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.exchangeRateList.valueDiscountCoupons.label',
			})}`,
			id: exchangeRateListTableKeys.VALUE_DISCOUNT_COUPONS,
			accessorFn: (row) => get(row, 'valueDiscountCoupons', []),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.exchangeRateList.coefficient.label' })}`,
			id: exchangeRateListTableKeys.COEFFICIENT,
			accessorFn: (row) => get(row, 'coefficient', []),
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(EDIT_EXCHANGE_RATE_COEFFICIENT, {
			resetCoefficientList: () => dispatch({ type: PageListAction.reset }),
			exchangeRateData: state,
		});
	}, [modalContext, dispatch, state]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{ key: 'userLoginHash', value: loginHash },
		];

		fetchData(
			'services-api/exchange-rates',
			apiParams,
			(payload) => get(payload, 'exchangeRates', []) ?? [],
			'admin.exchangeRateList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, loginHash, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.exchangeRateList.changeCoefficient.label"
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			handleOnTableRowClick={() => undefined}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				exchangeRateListTableKeys.DATE,
				exchangeRateListTableKeys.CURRENCY,
				exchangeRateListTableKeys.VALUE,
				exchangeRateListTableKeys.VALUE_GOODS,
				exchangeRateListTableKeys.VALUE_DISCOUNT_COUPONS,
				exchangeRateListTableKeys.COEFFICIENT,
			]}
		/>
	);
};

export default ExchangeRateListPage;

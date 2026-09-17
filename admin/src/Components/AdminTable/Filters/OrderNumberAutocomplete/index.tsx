import {
	FC,
	MouseEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import api from '@/api';
import {
	VinistoOrderDllModelsApiReturnDataOrderReturn,
	VinistoOrderDllModelsApiReturnDataOrdersReturn,
} from '@/api-types/order-api';

interface OrderNumberAutocompleteFilterProps {
	/** Receives the selected order id (or '' when cleared). */
	onChange: (value: string) => void;
	onClick?: (event: MouseEvent) => void;
	value?: string;
}

interface OrderOption {
	label: string;
	value: string;
}

/**
 * Table column filter that lets the user search orders by order number and
 * filters the list by the matching order id. The fee-record API only supports
 * filtering by OrderId, so we resolve order number -> id through order-api.
 */
const OrderNumberAutocompleteFilter: FC<OrderNumberAutocompleteFilterProps> = ({
	onChange,
	onClick,
	value,
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState<OrderOption[]>([]);
	const [selected, setSelected] = useState<OrderOption[]>([]);

	const getInitialOrder = useCallback(
		async (orderId: string) =>
			await api
				.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
					`order-api/orders/${orderId}`,
					{
						UserLoginHash: userLoginHash,
					}
				)
				.then((res) => res.order)
				.then((order) => {
					if (order)
						setSelected([
							{ label: `${order.orderNumber}`, value: `${order.id}` },
						]);
				})
				.catch(() => {
					// Do nothing
				}),
		[userLoginHash]
	);

	const handleSearch = useCallback(
		async (query: string) => {
			await api
				.get<VinistoOrderDllModelsApiReturnDataOrdersReturn>(
					`order-api/orders`,
					{
						OrderNumber: query,
						Limit: 20,
						UserLoginHash: userLoginHash,
					}
				)
				.then((res) => res.orders ?? [])
				.then((orders) =>
					setOptions(
						orders
							.filter((order) => order.id && order.orderNumber)
							.map((order) => ({
								label: `${order.orderNumber}`,
								value: `${order.id}`,
							}))
					)
				)
				.catch(() => setOptions([]))
				.finally(() => setIsLoading(false));
		},
		[userLoginHash]
	);

	useEffect(() => {
		if (!value || selected.length) return;
		getInitialOrder(value);
	}, [value, selected.length, getInitialOrder]);

	return (
		<div onClick={onClick}>
			<AsyncTypeahead
				id="admin-table-order-number-autocomplete-filter"
				className="vinisto-admin-table__text-input"
				isLoading={isLoading}
				labelKey="label"
				minLength={2}
				useCache={false}
				options={options}
				selected={selected}
				onSearch={handleSearch}
				onChange={(picked) => {
					const next = picked as OrderOption[];
					setSelected(next);
					onChange(next[0]?.value ?? '');
				}}
				positionFixed
			/>
		</div>
	);
};

export default OrderNumberAutocompleteFilter;

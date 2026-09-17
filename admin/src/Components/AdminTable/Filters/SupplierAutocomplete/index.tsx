import {
	FC,
	MouseEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import useAutocompleteSuppliers, {
	AutocompleteSupplierOption,
} from 'Hooks/useAutocompleteSuppliers';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { VinistoSupplierDllModelsApiSupplierSupplierReturn } from '@/api-types/supplier-api';
import api from '@/api';

interface SupplierAutocompleteFilterProps {
	/** Receives the selected supplier id (or '' when cleared). */
	onChange: (value: string) => void;
	onClick?: (event: MouseEvent) => void;
	value?: string;
}

/**
 * Table column filter that lets the user search suppliers by name and filters
 * the list by the selected supplier id. The server filters by SupplierId, so we
 * resolve name -> id through the supplier autocomplete instead of fetching the
 * whole supplier list up front.
 */
const SupplierAutocompleteFilter: FC<SupplierAutocompleteFilterProps> = ({
	onChange,
	onClick,
	value,
}) => {
	const { autocompleteOptions, handleOnSearch } = useAutocompleteSuppliers({});
	const [isLoading, setIsLoading] = useState(false);
	const [selected, setSelected] = useState<AutocompleteSupplierOption[]>([]);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const getInitialSupplier = useCallback(async (supplierId: string) => {
		await api
			.get<VinistoSupplierDllModelsApiSupplierSupplierReturn>(
				`supplier-api/suppliers/${supplierId}`,
				{ userLoginHash }
			)
			.then((res) => {
				if (res.supplier) {
					setSelected([
						{
							...res.supplier,
							label: res.supplier.nameWeb,
							value: supplierId,
						},
					]);
				}
			})
			.catch(() => {
				// do nothing
			});
	}, []);

	useEffect(() => {
		if (!value || selected.length) return;
		getInitialSupplier(value);
	}, [value, selected.length, getInitialSupplier]);

	useEffect(() => {
		setIsLoading(false);
	}, [autocompleteOptions]);

	return (
		<div onClick={onClick}>
			<AsyncTypeahead
				id="admin-table-supplier-autocomplete-filter"
				className="vinisto-admin-table__text-input"
				isLoading={isLoading}
				labelKey="label"
				minLength={2}
				useCache={false}
				options={autocompleteOptions}
				selected={selected}
				onSearch={(query) => {
					setIsLoading(true);
					handleOnSearch(query);
				}}
				onChange={(options) => {
					const next = options as AutocompleteSupplierOption[];
					setSelected(next);
					onChange(next[0]?.value ?? '');
				}}
				positionFixed
			/>
		</div>
	);
};

export default SupplierAutocompleteFilter;

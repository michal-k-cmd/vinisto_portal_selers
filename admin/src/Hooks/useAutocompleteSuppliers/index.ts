import { useContext, useState } from 'react';
import SupplierService from 'Services/SupplierService/Supplier';
import { NotificationsContext } from 'Services/NotificationService';
import { VinistoSupplierDllModelsApiSupplierSupplier } from 'vinisto_api_client/src/api-types/user-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

export interface AutocompleteSupplierOption
	extends VinistoSupplierDllModelsApiSupplierSupplier {
	label: string;
	value: string;
}

type useAutocompleteSuppliersProps = {
	alreadyUsedSupplierIds?: string[];
};

const useAutocompleteSuppliers = ({
	alreadyUsedSupplierIds = [],
}: useAutocompleteSuppliersProps) => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteSupplierOption[]
	>([]);
	const notificationsContext = useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const handleOnSearch = (searchText: string, params = {}) => {
		SupplierService.getAutocompleteSuppliers(userLoginHash, searchText, params)
			.then((response) => {
				const suppliers =
					response?.suppliers?.filter(
						(supplier) => !alreadyUsedSupplierIds.includes(supplier?.id ?? '')
					) || [];

				const formattedSuppliers = suppliers.map((supplier) => {
					return {
						...supplier,
						value: supplier.id,
						label: supplier.nameWeb,
					};
				});

				setAutocompleteOptions(formattedSuppliers);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.supplier.autocomplete.error'
				);
				setAutocompleteOptions([]);
			});
	};

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAutocompleteSuppliers;

import { AsyncTypeahead, TypeaheadProps } from 'react-bootstrap-typeahead';
import { useMemo, useState } from 'react';
import useDebounce from 'Hooks/useDebounce';
import useGetCompanies from 'Hooks/Queries/useGetCompanies';

import { DEBOUNCE_TIMEOUT, MIN_SEARCH_LENGTH } from './constants';

import { UserApi } from '@/api-types/user-api';
import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

interface AutocompleteB2bCustomerProps
	extends Omit<
		TypeaheadProps<{ value: string; label: string }>,
		'onChange' | 'onInputChange' | 'isLoading' | 'options'
	> {
	onChange: (companies: { label: string; value: string }[]) => void;
	onInputChange: (query: string) => void;
	data: VinistoAuthDllModelsApiUserCompany[];
	isLoading: boolean;
}

interface UseAutocompleteCompaniesParams
	extends UserApi.UsersList.RequestQuery {
	userLoginHash: string;
	SearchCompaniesByMerchantId?: string;
}

export const useAutocompleteCompanies = ({
	userLoginHash,
	SearchCompaniesByMerchantId,
	...params
}: UseAutocompleteCompaniesParams) => {
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, DEBOUNCE_TIMEOUT);

	const companySearchParams = useMemo(() => {
		if (debouncedSearch.length < MIN_SEARCH_LENGTH) return {};
		if (/\d+/.test(debouncedSearch))
			return {
				SearchByCompanyIco: debouncedSearch,
			};

		if (debouncedSearch.includes('@'))
			return {
				SearchByCompanyEmail: debouncedSearch.toLowerCase(),
			};
		return {
			SearchByCompanyName: debouncedSearch,
		};
	}, [debouncedSearch]);

	const isCompaniesQueryEnabled = !(debouncedSearch.length < MIN_SEARCH_LENGTH);

	const companiesQuery = useGetCompanies(
		{
			userLoginHash,
			params: {
				...params,
				...companySearchParams,
				...(SearchCompaniesByMerchantId && { SearchCompaniesByMerchantId }),
			},
		},
		{ enabled: isCompaniesQueryEnabled }
	);

	const result = useMemo(
		() => ({
			companiesQuery,
			setSearch,
			isCompaniesQueryEnabled,
		}),
		[companiesQuery, isCompaniesQueryEnabled]
	);

	return result;
};

const AutocompleteB2bCustomer = ({
	onChange,
	onInputChange,
	data,
	isLoading,
	...props
}: AutocompleteB2bCustomerProps) => {
	const options =
		data?.map((customer) => {
			const companyName =
				customer.validationData?.companyName ??
				customer.billingAddress?.company;
			const companyUserName = `${customer.firstName} ${customer.surname}`;
			const companyAddress = `${customer.billingAddress?.street} ${
				customer.billingAddress?.landRegistryNumber
			}${
				customer.billingAddress?.houseNumber
					? `/${customer.billingAddress?.houseNumber}`
					: ``
			} ${customer.billingAddress?.city}`;
			return {
				label: `${companyName ?? companyUserName} ${companyAddress}`,
				value: customer.id,
			};
		}) ?? [];

	return (
		<AsyncTypeahead
			id="b2bCustomerAutocomplete"
			isLoading={isLoading}
			labelKey={(option) => `${option.label}`}
			onSearch={() => {
				// This does not seem to do anything useful, but it's a required prop, so…
			}}
			onInputChange={onInputChange}
			onChange={onChange}
			filterBy={() => true}
			options={options}
			renderMenuItemChildren={(option) => {
				return <div>{option.label}</div>;
			}}
			placeholder={'Hledat podle názvu, IČO nebo e-mailu'}
			emptyLabel={'Žádné výsledky'}
			promptText={'Zadejte název, IČO nebo e-mail'}
			searchText={'Hledání…'}
			useCache={false}
			{...props}
		/>
	);
};

export default AutocompleteB2bCustomer;

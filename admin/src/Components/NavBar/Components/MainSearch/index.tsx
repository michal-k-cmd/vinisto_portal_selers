import { useCallback, useContext, useState } from 'react';
import { forEach, get, head, map } from 'Helpers/lodash';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useNavigate } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';
import { apiServiceInstance } from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import './styles.css';

const MainSearch = ({ ...props }) => {
	const navigate = useNavigate();
	const [options, setOptions] = useState<Record<any, any>[]>([]);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const localizedValue = useLocalizedValue();

	const handleOnSearch = useCallback(
		(searchTerm: string) => {
			const searchPromises = [
				new Promise((resolve, reject) => {
					return apiServiceInstance
						.post(
							'product-api/bundles/get-bundles',
							{
								searchName: searchTerm,
								IsPriceRequired: false,
							},
							true
						)
						.then((bundleSearchResponse) => {
							const nextBundleOptions = map(
								get(bundleSearchResponse, 'bundles', []),
								(bundle) => ({
									id: get(bundle, 'id'),
									value: get(bundle, 'id'),
									label: `BUNDLE - ${localizedValue(get(bundle, 'name', []))}`,
									type: 'BUNDLE',
								})
							);

							return resolve(nextBundleOptions);
						})
						.catch((error: Error) => {
							return reject(error);
						});
				}),
				new Promise((resolve, reject) => {
					return apiServiceInstance
						.get('product-api/products', true, undefined, [
							{
								key: 'searchName',
								value: searchTerm,
							},
						])
						.then((productsSearchResponse) => {
							const nextProductOptions = map(
								get(productsSearchResponse, 'products', []),
								(product) => ({
									id: get(product, 'id'),
									value: get(product, 'id'),
									label: `PRODUKT - ${localizedValue(
										get(product, 'name', [])
									)}`,
									type: 'PRODUCT',
								})
							);

							return resolve(nextProductOptions);
						})
						.catch((error: Error) => {
							return reject(error);
						});
				}),
				new Promise((resolve, reject) => {
					return apiServiceInstance
						.get('product-api/admin/specifications', true, undefined, [
							{
								key: 'searchName',
								value: searchTerm,
							},
						])
						.then((specificationsSearchResponse) => {
							const nextSpecificationOptions = map(
								get(specificationsSearchResponse, 'specifications', []),
								(specification) => ({
									id: get(specification, 'id'),
									value: get(specification, 'id'),
									label: `SPECIFIKACE - ${localizedValue(
										get(specification, 'name', [])
									)}`,
									type: 'SPECIFICATION',
								})
							);

							return resolve(nextSpecificationOptions);
						})
						.catch((error: Error) => {
							return reject(error);
						});
				}),
			] as any[];

			Promise.all(searchPromises).then((searchResults) => {
				const finalResults = [] as Record<any, any>[];
				forEach(searchResults, (singleResults: Record<any, any>[]) => {
					forEach(singleResults, (singleResult: Record<any, any>) => {
						finalResults.push(singleResult);
					});
				});
				setOptions(finalResults);
			});
		},
		[localizedValue]
	);

	const handleOnSelect = useCallback(
		(selectedItem: Record<any, any>[]) => {
			const item = head(selectedItem);
			if (item) {
				if (get(item, 'type', null) === 'BUNDLE') {
					navigate(`/bundle-detail/${get(item, 'id', '')}`);
				}
				if (get(item, 'type', null) === 'PRODUCT') {
					navigate(`/product-detail/${get(item, 'id', '')}`);
				}
			}
		},
		[navigate]
	);

	return (
		<div
			className="main-search-wrap"
			style={{
				display: get(props, 'searchOpen') ? 'flex' : 'none',
			}}
		>
			<AsyncTypeahead
				isLoading={false}
				onSearch={handleOnSearch}
				onChange={handleOnSelect}
				options={options}
				id="main-search"
				className="main-search"
				minLength={3}
				filterBy={() => true}
				placeholder={`${t({ id: 'search' })}`}
				aria-label={`${t({ id: 'search' })}`}
				emptyLabel={`${t({ id: 'search.popup.noResults' })}`}
			></AsyncTypeahead>
		</div>
	);
};

export default MainSearch;

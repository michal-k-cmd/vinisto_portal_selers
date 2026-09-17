import { useCallback, useContext, useMemo, useState } from 'react';
import { get, head, map } from 'Helpers/lodash';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Form,
	InputAutocompleteAsync,
	InputNumber,
	Validators,
} from 'Components/Form';

import { ModalContext } from '../../context';

const AddProductToBundleModal = () => {
	const { data, handleCloseModal } = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteOption[]
	>([]);

	const refetchBundleDetail = data?.refetchBundleDetail;
	const bundleId = data?.bundle?.id;

	const apiService = useMemo(() => new ApiService(), []);
	const getLocalizedValue = useLocalizedValue();

	const handleOnAddProductToBundle = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: vinistoUser.loginHash,
				itemId: get(head(get(formValues, 'productName', [])), 'value'),
				amount: get(formValues, 'amount', ''),
			};
			apiService
				.post(`product-api/bundles/${bundleId}/products`, requestData, true)
				.then(() => {
					handleShowSuccessNotification('admin.addProductToBundle.success');
					refetchBundleDetail();
					handleCloseModal();
				})
				.catch(() => {
					handleShowErrorNotification('admin.addProductToBundle.error');
				});
		},
		[
			apiService,
			vinistoUser.loginHash,
			bundleId,
			handleCloseModal,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBundleDetail,
		]
	);

	const handleOnSearch = useCallback(
		(searchingNameString: string) => {
			apiService
				.getCollection(
					`product-api/products/GetAutocompleteNames`,
					[
						{
							key: 'searchingNameString',
							value: searchingNameString,
						},
						{
							key: 'limit',
							value: 1000,
						},
					],
					true
				)
				.then((response: Record<any, any>) => {
					const alreadyUsedProductIds = data?.bundleState?.bundle?.items?.map(
						(item: Record<any, any>) => item?.productId
					);
					const searchOptions = [
						...map(
							get(response, 'products', [])?.filter(
								(product: Record<any, any>) =>
									!alreadyUsedProductIds?.includes(product?.id)
							),
							(bundle: Record<any, any>) => ({
								value: get(bundle, 'id', ''),
								label: getLocalizedValue(get(bundle, 'name', [])),
							})
						),
					];
					setAutocompleteOptions(searchOptions);
				})
				.catch(() => {
					handleShowErrorNotification(
						'admin.modal.addProductToBundle.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[
			apiService,
			data?.bundleState?.bundle?.items,
			getLocalizedValue,
			handleShowErrorNotification,
		]
	);

	return (
		<Form
			submitCallback={handleOnAddProductToBundle}
			submitText={'admin.modal.addProductToBundle.submit'}
			initializationValues={{
				amount: 0,
			}}
		>
			<InputAutocompleteAsync
				label="admin.modal.addProductToBundle.autocomplete.label"
				placeholder="admin.modal.addProductToBundle.autocomplete.placeholder"
				labelKey={'label'}
				name="productName"
				identifier="productName"
				onSearchCallback={handleOnSearch}
				options={autocompleteOptions}
				validate={Validators.required}
			/>
			<InputNumber
				name="amount"
				identifier="amount"
				label="admin.modal.form.amount"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddProductToBundleModal;

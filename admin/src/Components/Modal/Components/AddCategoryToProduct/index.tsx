import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import ProductService from 'Services/ProductService/Product';
import { apiServiceInstance } from 'Services/ApiService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { VinistoProductDllModelsApiCategoryCategoriesReturn } from 'vinisto_api_client/src/api-types/product-api/';
import { useQueryClient } from '@tanstack/react-query';

import { ModalContext } from '../../context';

import { AddCategoryToProductModalData } from './interfaces';

interface AddCategoryToProductFormValues {
	categoryId: {
		label: string;
		value: string;
	}[];
}

interface PreparedCategories {
	value: string | null | undefined;
	label: string;
}

const AddCategoryToProductModal = () => {
	const modalContext = useContext(ModalContext);
	const { selectedIds, onModalClose } =
		modalContext.data as AddCategoryToProductModalData;

	const notificationsContext = useContext(NotificationsContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const getLocalizedValue = useLocalizedValue();

	const [autocompleteCategories, setAutocompleteCategories] = useState<
		PreparedCategories[]
	>([]);

	const handleOnAddCategoryToProduct = useCallback(
		async (
			formValues: AddCategoryToProductFormValues,
			productId: string | null
		) => {
			const requestData = {
				userLoginHash: loginHash,
				itemId: formValues.categoryId[0].value,
			};
			await apiServiceInstance.post(
				`product-api/products/${productId}/categories`,
				requestData,
				true
			);
		},
		[loginHash]
	);

	const queryClient = useQueryClient();

	const handleBatchAdd = useCallback(
		async (formValues: AddCategoryToProductFormValues) => {
			const itemId = formValues.categoryId[0]?.value;

			ProductService.addCategoryToProducts({
				itemId,
				objectIds: selectedIds,
				userLoginHash: loginHash,
			})
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addCategoryToProduct.success'
					);
					onModalClose();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addCategoryToProduct.error'
					);
				});
		},
		[loginHash, modalContext, notificationsContext, onModalClose, selectedIds]
	);

	const handleSubmit = useCallback(
		(formValues: AddCategoryToProductFormValues) => {
			if (selectedIds) handleBatchAdd(formValues);
			else {
				const productId = modalContext.data?.product?.id;

				handleOnAddCategoryToProduct(formValues, productId)
					.then(async () => {
						await queryClient.invalidateQueries(['productDetail', productId]);
						notificationsContext.handleShowSuccessNotification(
							'admin.addCategoryToProduct.success'
						);
						modalContext.handleCloseModal();
					})
					.catch(() => {
						notificationsContext.handleShowErrorNotification(
							'admin.addCategoryToProduct.error'
						);
					});
			}
		},
		[
			handleBatchAdd,
			handleOnAddCategoryToProduct,
			modalContext,
			notificationsContext,
			queryClient,
			selectedIds,
		]
	);

	useEffect(() => {
		apiServiceInstance
			.getCollection<VinistoProductDllModelsApiCategoryCategoriesReturn>(
				'product-api/categories',
				[
					{ key: 'userLoginHash', value: loginHash },
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((res1) => {
				apiServiceInstance
					.getCollection<VinistoProductDllModelsApiCategoryCategoriesReturn>(
						'product-api/categories',
						[
							{ key: 'userLoginHash', value: loginHash },
							{ key: 'limit', value: res1.count ?? 0 },
							{ key: 'offset', value: 0 },
							{ key: 'type', value: 'STATIC' },
						],
						true
					)
					.then((res2) => {
						const preparedCategories = res2.categories
							?.map((category) => {
								return {
									value: category.id,
									label: getLocalizedValue(category.name ?? []),
								};
							})
							.filter((preparedCategory) => {
								const productCategoryIds = modalContext.data?.categories ?? [];

								return !productCategoryIds.includes(preparedCategory.value);
							});

						setAutocompleteCategories(preparedCategories ?? []);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.categoryHomePageCreate.autocomplete.error'
				);
				setAutocompleteCategories([]);
			});
	}, [getLocalizedValue, loginHash, modalContext, notificationsContext]);

	return (
		<Form
			submitCallback={handleSubmit}
			submitText={'admin.modal.addCategoryToProduct'}
		>
			<InputAutocomplete
				options={autocompleteCategories}
				label="admin.modal.categoryHomePageCreate.autocomplete.label"
				placeholder="search.category.singular"
				labelKey={'label'}
				name="categoryId"
				identifier="categoryId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddCategoryToProductModal;

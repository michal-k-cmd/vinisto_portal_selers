import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import ApiService from 'Services/ApiService';
import ProductService from 'Services/ProductService/Product';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';
import { useQueryClient } from '@tanstack/react-query';

import { ModalContext } from '../../context';

import {
	AddTagToProductModalContextData,
	AddTagToProductModalFormValues,
	AddTagToProductModalFormValuesTagItem,
	AddTagToProductModalRequestData,
	AddTagToProductModalTagsReturn,
} from './interfaces';

/**
 * @category Component Add Tag To Product Modal Content
 */
const AddTagToProductModal: FC = () => {
	const { data, handleCloseModal } = useContext(ModalContext);
	const { product, productIds, onModalClose } =
		data as AddTagToProductModalContextData;
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const {
		vinistoUser: { loginHash },
	} = useContext(AuthenticationContext);

	const queryClient = useQueryClient();

	const [autocompleteTags, setAutocompleteTags] = useState<
		Array<AddTagToProductModalFormValuesTagItem>
	>([]);

	// This handles both adding a single tag from detail or batch adding from list
	// TODO: refactor - split into two separate handlers
	const handleOnAddTagToProduct = ({
		tagId,
	}: AddTagToProductModalFormValues) => {
		const { value } = tagId[0];
		const ids = [...(productIds ?? [])];
		if (product) ids.push(product.id);
		const requestData: AddTagToProductModalRequestData = {
			userLoginHash: loginHash,
			objectIds: ids,
			itemId: value,
		};
		ProductService.addProductsTag(requestData)
			.then(async () => {
				handleShowSuccessNotification('admin.addTagToProduct.success');
				for (const id of ids) {
					await queryClient.invalidateQueries(['productDetail', id]);
				}
				onModalClose && onModalClose();
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.addTagToProduct.error');
			});
	};

	useEffect(() => {
		const apiServiceInstance = new ApiService();
		const userLoginHash = loginHash;
		apiServiceInstance
			.getCollection<AddTagToProductModalTagsReturn>(
				'product-api/tags',
				[
					{ key: 'userLoginHash', value: userLoginHash },
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then(({ count }) => {
				apiServiceInstance
					.getCollection<AddTagToProductModalTagsReturn>(
						'product-api/tags',
						[
							{ key: 'userLoginHash', value: loginHash },
							{ key: 'limit', value: count ?? 0 },
							{ key: 'offset', value: 0 },
						],
						true
					)
					.then(({ tags }) => {
						const preparedTags =
							tags?.map((tag) => ({
								value: tag.id ?? '',
								label: tag.name,
							})) ?? [];
						setAutocompleteTags(preparedTags);
					});
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.modal.addTagToProduct.autocomplete.error'
				);
				setAutocompleteTags([]);
			});
	}, []);

	return (
		<Form
			submitCallback={handleOnAddTagToProduct}
			submitText={'admin.modal.addTagToProduct'}
		>
			<InputAutocomplete
				options={autocompleteTags}
				label="admin.modal.addTagToProduct.autocomplete.label"
				placeholder="admin.modal.addTagToProduct.autocomplete.placeholder"
				labelKey={'label'}
				name="tagId"
				identifier="tagId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddTagToProductModal;

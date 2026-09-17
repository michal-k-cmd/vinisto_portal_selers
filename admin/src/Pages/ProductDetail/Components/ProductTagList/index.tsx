import { useCallback, useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { get, map } from 'Helpers/lodash';
import DeleteIcon from 'Components/Icons/Delete';
import { MdCategory } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { useQueryClient } from '@tanstack/react-query';
import './styles.css';

import type Product from '@/domain/product';

interface Props {
	product?: Product;
}

const ProductTagList = ({ product }: Props) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const apiService = apiServiceInstance;

	const handleOnRemoveProductCategory = useCallback(
		(productCategoryId: string) => () => {
			const productId = product?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteProductTag.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteProductTag.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							apiService
								.delete(
									`product-api/products/${productId}/tags`,
									productCategoryId,
									true,
									[
										{
											key: 'userLoginHash',
											value: authenticationContext.vinistoUser.loginHash,
										},
									]
								)
								.then(async () => {
									await queryClient.invalidateQueries([
										'productDetail',
										productId,
									]);
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteProductTag.success'
									);
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteProductTag.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.no',
						})}`,
						onClick: () => null,
					},
				],
			});
		},
		[
			product?.id,
			t,
			apiService,
			authenticationContext.vinistoUser.loginHash,
			queryClient,
			notificationsContext,
		]
	);

	const handleOnClickRedirect = useCallback(
		(productTagId: string) => () => {
			navigate(`/tag-detail/${productTagId}`);
		},
		[navigate]
	);

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.productTags' })}
			</div>
			{product?.id &&
				map(product.tags, (productTag: Record<string, any>) => (
					<div
						key={`product-category-${get(productTag, 'id')}`}
						className="product-category"
					>
						<MdCategory className="product-category-icon" />
						<div className="product-category-label">
							{getLocalizedValue(get(productTag, 'name', []))}
						</div>
						<BiLink
							onClick={handleOnClickRedirect(get(productTag, 'id'))}
							className="product-category-icon pointer"
						/>
						<DeleteIcon
							onClick={handleOnRemoveProductCategory(get(productTag, 'id'))}
							className="product-category-icon pointer"
						/>
					</div>
				))}
		</div>
	);
};

export default ProductTagList;

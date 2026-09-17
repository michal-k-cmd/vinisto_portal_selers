import { FC, useCallback, useContext } from 'react';
import { MdCategory } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import DeleteIcon from 'Components/Icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CategoryService from 'Services/Category';

import './styles.css';

import type Product from '@/domain/product';

interface Props {
	product?: Product;
}

/**
 * @category Component Product Detail Category List
 */
const ProductCategoryList: FC<Props> = ({ product }): JSX.Element => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const handleOnRemoveProductCategory = useCallback(
		(productCategoryId: string) => () => {
			const productId = product?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteProductCategory.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteProductCategory.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							const apiService = new ApiService();
							apiService
								.delete(
									`product-api/products/${productId}/categories`,
									productCategoryId,
									true,
									[
										{
											key: 'userLoginHash',
											value: authenticationContext.vinistoUser.loginHash,
										},
									]
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteProductCategory.success'
									);
									queryClient.invalidateQueries(['productDetail', productId]);
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteProductCategory.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.no',
						})}`,
						onClick: () => {},
					},
				],
			});
		},
		[
			product?.id,
			t,
			authenticationContext.vinistoUser.loginHash,
			notificationsContext,
			queryClient,
		]
	);

	const handleOnClickRedirect = useCallback(
		(productCategoryId: string) => () => {
			navigate(`/category-detail/${productCategoryId}`);
		},
		[navigate]
	);

	const { data: categories } = useQuery({
		queryKey: ['categories', product?.categoryIds],
		queryFn: () => CategoryService.getByIds(product?.categoryIds ?? []),
		enabled: !!product?.categoryIds && product?.categoryIds.length > 0,
	});

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.productCategories' })}
			</div>
			{categories?.map((category) => (
				<div
					key={`product-category-${category.id}`}
					className="product-category"
				>
					<MdCategory className="product-category-icon" />
					<div className="product-category-label">
						{getLocalizedValue(category.name)}
					</div>
					<BiLink
						onClick={handleOnClickRedirect(category.id)}
						className="product-category-icon pointer"
					/>
					<DeleteIcon
						onClick={handleOnRemoveProductCategory(category.id)}
						className="product-category-icon pointer"
					/>
				</div>
			))}
		</div>
	);
};

export default ProductCategoryList;

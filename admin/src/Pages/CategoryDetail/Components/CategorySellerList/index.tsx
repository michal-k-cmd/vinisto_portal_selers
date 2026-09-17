import { useCallback, useContext } from 'react';
import { ADD_SELLER_TO_CATEGORY } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import { BiLink, BiPlus } from 'react-icons/bi';
import './styles.css';
import { BsFillTagsFill } from 'react-icons/bs';
import DeleteIcon from 'Components/Icons/Delete';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

import { CategorySellerListProps } from './interfaces';

const CategorySellerList = ({ category }: CategorySellerListProps) => {
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const navigate = useNavigate();

	const revalidator = useRevalidator();

	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnRemove = useCallback(
		(categorySupplierId: string) => () => {
			const categoryId = category?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteCategorySeller.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteCategorySeller.message',
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
									`product-api/categories/${categoryId}/suppliers`,
									categorySupplierId,
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
										'admin.deleteCategorySeller.success'
									);

									revalidator.revalidate();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteCategorySeller.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.no',
						})}`,
					},
				],
			});
		},
		[
			category?.id,
			t,
			authenticationContext.vinistoUser.loginHash,
			notificationsContext,
			revalidator,
		]
	);

	const handleOnClickRedirect = (supplierId: string) => () => {
		navigate(`/supplier-detail/${supplierId}`);
	};

	return (
		<div className="category-sellers">
			<header className="category-sellers__header">
				<h2 className="category-detail__heading category-sellers__heading">
					{t({ id: 'admin.category.sellers.title' })}
				</h2>
			</header>

			{(category?.suppliersDetail ?? []).map((supplier) => (
				<div
					key={`product-category-${supplier?.id}`}
					className="product-category"
				>
					<BsFillTagsFill className="product-category-icon" />
					<div className="product-category-label">{supplier?.nameWeb}</div>
					<BiLink
						onClick={handleOnClickRedirect(supplier?.id)}
						className="product-category-icon pointer"
					/>
					<DeleteIcon
						onClick={handleOnRemove(supplier?.id)}
						className="product-category-icon pointer"
					/>
				</div>
			))}
			<ActionButton
				onClick={() =>
					handleOpenModal(ADD_SELLER_TO_CATEGORY, {
						categoryId: category.id,
					})
				}
				label="admin.category.actionButtons.supplier.label"
				icon={BiPlus}
			/>
		</div>
	);
};

export default CategorySellerList;

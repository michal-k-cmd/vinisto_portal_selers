import { useCallback, useContext } from 'react';
import { ADD_TAG_TO_CATEGORY } from 'Components/Modal/constants';
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

import { CategoryTagListProps } from './interfaces';

const CategoryTagList = ({ category }: CategoryTagListProps) => {
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const navigate = useNavigate();

	const revalidator = useRevalidator();

	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnRemove = useCallback(
		(categoryTagId: string) => () => {
			const categoryId = category?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteCategoryTag.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteCategoryTag.message',
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
									`product-api/categories/${categoryId}/tags`,
									categoryTagId,
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
										'admin.deleteCategoryTag.success'
									);

									revalidator.revalidate();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteCategoryTag.error'
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

	const handleOnClickRedirect = (categoryTagId: string) => () => {
		navigate(`/tag-detail/${categoryTagId}`);
	};

	return (
		<div className="category-tags">
			<header className="category-tags__header">
				<h2 className="category-detail__heading category-tags__heading">
					{t({ id: 'admin.category.tags.title' })}
				</h2>
			</header>

			{(category?.tagsDetail ?? []).map((tag) => (
				<div
					key={`product-category-${tag?.id}`}
					className="product-category"
				>
					<BsFillTagsFill className="product-category-icon" />
					<div className="product-category-label">{tag.name}</div>
					<BiLink
						onClick={handleOnClickRedirect(tag?.id)}
						className="product-category-icon pointer"
					/>
					<DeleteIcon
						onClick={handleOnRemove(tag?.id)}
						className="product-category-icon pointer"
					/>
				</div>
			))}
			<ActionButton
				onClick={() =>
					handleOpenModal(ADD_TAG_TO_CATEGORY, {
						categoryId: category.id,
					})
				}
				label="admin.category.tags.button.add"
				icon={BiPlus}
			/>
		</div>
	);
};

export default CategoryTagList;

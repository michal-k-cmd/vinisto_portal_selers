import { FC, useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { sortBy } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import { useRevalidator } from 'react-router-dom';
import { ADD_IMAGE_TO_CATEGORY } from 'Components/Modal/constants';
import { USER_ADMIN_IMAGE } from 'Services/AuthorizationService/Components/RequirePermissions/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import DeleteIcon from 'Components/Icons/Delete';
import { BsFillTagsFill } from 'react-icons/bs';

import { CategoryImageListProps } from './interfaces';

import './styles.css';

const CategoryImageList: FC<CategoryImageListProps> = ({ category }) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const t = useFormatMessage();
	const revalidator = useRevalidator();

	const images = useMemo(
		() =>
			sortBy(category.images, (image: { isMain: boolean }) => !image.isMain),
		[category.images]
	);

	const handleOnDeleteImage = useCallback(
		(imageId: string) => () => {
			confirmAlert({
				title: `${t({ id: 'admin.confirm.deleteImage.title' })}`,
				message: `${t({ id: 'admin.confirm.deleteImage.message' })}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							const parameters = [
								{
									key: 'UserLoginHash',
									value: vinistoUser.loginHash,
								},
							];

							apiServiceInstance
								.delete(
									`image-api/images/${imageId}`,
									undefined,
									true,
									parameters
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.confirm.deleteImage.success'
									);
									revalidator.revalidate();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.confirm.deleteImage.error'
									);
								});
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
						onClick: () => {},
					},
				],
			});
		},
		[revalidator, notificationsContext]
	);

	return (
		<section className="category-detail-image-list">
			<h2 className="category-detail__heading">
				{t({ id: 'admin.images.title' })}
			</h2>
			<div className="category-detail-images-container">
				{images.map((image, index) => (
					<div
						key={image.id ?? index}
						className={cx('category-detail-images-container-image-wrapper', {
							main: image.isMain,
						})}
					>
						<button
							className="btn delete-icon"
							onClick={handleOnDeleteImage(image.id ?? '')}
						>
							<DeleteIcon />
						</button>
						<img
							className="image"
							src={image.domainUrls?.original_png}
							alt={`${t({ id: 'admin.image.alt' })}`}
						/>
						{image.isMain && (
							<div className="main-title">{t({ id: 'admin.image.main' })}</div>
						)}
					</div>
				))}
			</div>
			{vinistoUser.permissions.includes(USER_ADMIN_IMAGE) && (
				<ActionButton
					onClick={() =>
						handleOpenModal(ADD_IMAGE_TO_CATEGORY, {
							category,
						})
					}
					label="admin.btn.uploadImage"
					icon={BsFillTagsFill}
				/>
			)}
		</section>
	);
};

export default CategoryImageList;

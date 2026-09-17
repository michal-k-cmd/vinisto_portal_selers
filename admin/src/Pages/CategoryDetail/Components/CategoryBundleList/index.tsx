import { FC, useContext } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useLoaderData } from 'react-router-dom';
import { useRevalidator } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import CategoryService from 'Services/Category';
import { CategoryDetailLoader } from 'Pages/CategoryDetail/interfaces';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import { ADD_BUNDLE_TO_CATEGORY } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { BundleItemList } from 'Components/BundleItem';
import useWarehouseCount from 'Hooks/Queries/useWarehouseCount';

import { CategoryBundleListProps } from './interfaces';

const CategoryBundleList: FC<CategoryBundleListProps> = ({ categoryId }) => {
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);

	const { vinistoUser } = useContext(AuthenticationContext);
	const t = useFormatMessage();
	const data = useLoaderData() as CategoryDetailLoader;

	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const revalidator = useRevalidator();

	const handleOnDelete = (bundleId: string) => {
		confirmAlert({
			title: `${t({
				id: 'admin.category.bundle.delete.title',
			})}`,
			message: `${t({
				id: 'admin.category.bundle.delete.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						CategoryService.removeBundle(
							categoryId,
							bundleId ?? '',
							vinistoUser.loginHash
						)
							.then(() => {
								handleShowSuccessNotification(
									'admin.category.bundle.delete.success'
								);
								revalidator.revalidate();
							})
							.catch(() => {
								handleShowErrorNotification(
									'admin.category.bundle.delete.error'
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
	};

	const bundleCountQuery = useWarehouseCount(
		(data.bundles ?? []).map((bundle) => bundle.id ?? '')
	);

	return (
		<section>
			<h2 className="category-detail__heading">
				{t({ id: 'admin.categoryDetail.bundles.label' })}
			</h2>
			<BundleItemList
				bundles={data.bundles ?? []}
				onRemove={(bundleId) => handleOnDelete(bundleId)}
				idAvailableCountMaps={bundleCountQuery.data?.map((item) => ({
					itemId: item.id,
					quantity: item.quantity,
				}))}
			/>
			<ActionButton
				onClick={() =>
					handleOpenModal(ADD_BUNDLE_TO_CATEGORY, {
						categoryId,
						bundles: data.bundles,
					})
				}
				label="admin.category.bundle.button.add"
				icon={BiPlus}
			/>
		</section>
	);
};

export default CategoryBundleList;

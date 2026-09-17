import { useQuery } from '@tanstack/react-query';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import { ADD_PARENT_CATEGORY_TO_CATEGORY } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { lazy, Suspense, useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { MdCategory, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';
import { CategoryService } from 'vinisto_api_client';
import { confirmAlert } from 'react-confirm-alert';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

const BreadcrumbHomeIcon = lazy(
	() => import('Components/Icons/BreadcrumbHome')
);

interface CategoryParentCategoryProps {
	categoryId: string;
}

const CategoryParentCategory = ({
	categoryId,
}: CategoryParentCategoryProps) => {
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const { data: breadcrumbs, refetch: refetchBreadcrumbs } = useQuery(
		['breadcrumbs', categoryId],
		() => CategoryService.getBreadcrumbs({ categoryId: categoryId ?? '' }),
		{
			enabled: !!categoryId,
		}
	);

	return (
		<div>
			<h2 className="category-detail__heading">
				{t({ id: 'admin.btn.parentCategoryHeading' })}
			</h2>
			<div>
				<h3 className={styles.h3}>
					{t({ id: 'admin.addParentCategoryToCategory.preview' })}:
				</h3>
				<Breadcrumb>
					<Breadcrumb.Item
						linkAs={Link}
						linkProps={{ to: '/' }}
						className={styles.home}
					>
						<Suspense fallback={<></>}>
							<BreadcrumbHomeIcon
								title={``}
								className={`BreadcrumbHomeIcon`}
							/>
						</Suspense>
					</Breadcrumb.Item>
					{breadcrumbs?.map((breadcrumb, index) => (
						<Breadcrumb.Item
							key={index}
							linkAs={Link}
							linkProps={{
								to: `/category-detail/${breadcrumb.id}`,
							}}
							active={index === breadcrumbs.length - 1}
						>
							{getLocalizedValue(breadcrumb.name)}
						</Breadcrumb.Item>
					))}
				</Breadcrumb>
			</div>
			<div>
				<ActionButton
					onClick={() =>
						handleOpenModal(ADD_PARENT_CATEGORY_TO_CATEGORY, {
							submitButtonLabel:
								'admin.modal.parentCategory.translation.add.submit',
							categoryId,
							refetchBreadcrumbs,
						})
					}
					label="admin.btn.addParentCategory"
					icon={MdCategory}
				/>
				{breadcrumbs && breadcrumbs.length > 1 && (
					<ActionButton
						onClick={() => {
							confirmAlert({
								title: `${t({
									id: 'admin.parentCategory.delete.title',
								})}`,
								message: `${t({
									id: 'admin.parentCategory.delete.message',
								})}`,
								buttons: [
									{
										label: `${t({
											id: 'admin.confirm.yes',
										})}`,
										onClick: () => {
											CategoryService.removeCategoryParent({
												UserLoginHash: loginHash,
												categoryId,
											})
												.then(() => {
													handleShowSuccessNotification(
														'admin.parentCategory.delete.success'
													);
												})
												.catch(() => {
													handleShowErrorNotification(
														'admin.parentCategory.delete.error'
													);
												})
												.finally(() => {
													refetchBreadcrumbs();
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
						}}
						label="admin.btn.deleteParentCategory"
						icon={MdOutlineDelete}
					/>
				)}
			</div>
			<br />
		</div>
	);
};

export default CategoryParentCategory;

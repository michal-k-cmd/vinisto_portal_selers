import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCategory } from 'react-icons/md';
import { BiLink } from 'react-icons/bi';
import DeleteIcon from 'Components/Icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import CategoryService from 'Services/Category';
import { useQuery } from '@tanstack/react-query';

import './styles.css';

import { Bundle } from '@/domain/bundle';

const BundleCategoryList = ({
	bundle,
	refetchBundleDetail,
}: {
	bundle: Bundle | undefined;
	refetchBundleDetail: () => void;
}) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();

	const handleOnRemoveBundleCategory = useCallback(
		(bundleCategoryId: string) => () => {
			const bundleId = bundle?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteBundleCategory.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteBundleCategory.message',
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
									`product-api/bundles/${bundleId}/categories`,
									bundleCategoryId,
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
										'admin.deleteBundleCategory.success'
									);
									refetchBundleDetail();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteBundleCategory.error'
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
			bundle?.id,
			t,
			authenticationContext.vinistoUser.loginHash,
			notificationsContext,
			refetchBundleDetail,
		]
	);

	const { data: categories } = useQuery({
		queryKey: ['categories', bundle?.categoryIds],
		queryFn: () => CategoryService.getByIds(bundle?.categoryIds ?? []),
		enabled: !!bundle?.categoryIds && bundle.categoryIds.length > 0,
	});

	const handleOnClickRedirect = (bundleCategoryId: string) => () => {
		navigate(`/category-detail/${bundleCategoryId}`);
	};

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetails.categories' })}
			</div>
			{bundle &&
				categories &&
				(bundle?.categoryIds ?? []).map((bundleCategoryId: string) => (
					<div
						key={`product-category-${bundleCategoryId}`}
						className="product-category"
					>
						<MdCategory className="product-category-icon" />
						<div className="product-category-label">
							{getLocalizedValue(
								categories?.find(
									(category) => category?.id === bundleCategoryId
								)?.name ?? []
							)}
						</div>
						<BiLink
							onClick={handleOnClickRedirect(bundleCategoryId)}
							className="product-category-icon pointer"
						/>
						<DeleteIcon
							onClick={handleOnRemoveBundleCategory(bundleCategoryId)}
							className="product-category-icon pointer"
						/>
					</div>
				))}
		</div>
	);
};

export default BundleCategoryList;

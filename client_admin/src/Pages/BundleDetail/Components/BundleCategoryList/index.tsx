import React from 'react';
import { get, map } from 'lodash-es';
import { MdCategory } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { confirmAlert } from 'react-confirm-alert';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';

/**
 * @category Component Bundle Detail Category List
 */
const BundleCategoryList: React.FC<Record<any, any>> = (
	props: Record<any, any>
) => {
	const bundleState: Record<any, any> = get(props, 'customData', {});
	const bundleMethods: Record<any, any> = get(props, 'customMethods', {});
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnRemoveBundleCategory = React.useCallback(
		(bundleCategoryId: string) => () => {
			const bundleId = get(bundleState, 'bundle.id');

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
							id: 'admin.confirm.deleteBundleCategory.yes',
						})}`,
						onClick: () => {
							apiServiceInstance
								.delete(
									`product-api/bundles/${bundleId}/categories`,
									bundleCategoryId,
									true,
									[
										{
											key: 'userLoginHash',
											value: authenticationContext.vinistoUser?.loginHash ?? '',
										},
									]
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteBundleCategory.success'
									);
									bundleMethods.setProductState({
										...bundleState,
										loaded: false,
									});
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
							id: 'admin.confirm.deleteBundleCategory.no',
						})}`,
						onClick: () => {},
					},
				],
			});
		},
		[notificationsContext, authenticationContext, bundleState, bundleMethods]
	);

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">Prirazene kategorie</div>
			{bundleState.loaded &&
				map(
					get(bundleState, 'bundle.categories', []),
					(bundleCategoryId: string) => (
						<div
							key={`product-category-${bundleCategoryId}`}
							className="product-category"
						>
							<MdCategory className="product-category-icon" />
							<div className="product-category-label">{bundleCategoryId}</div>
							<IoMdClose
								onClick={handleOnRemoveBundleCategory(bundleCategoryId)}
								style={{ cursor: 'pointer' }}
								className="product-category-icon"
							/>
						</div>
					)
				)}
		</div>
	);
};

export default BundleCategoryList;

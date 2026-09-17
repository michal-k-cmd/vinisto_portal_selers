import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { FiPackage } from 'react-icons/fi';
import { BiLink } from 'react-icons/bi';
import DeleteIcon from 'Components/Icons/Delete';

import './styles.css';

import { Bundle } from '@/domain/bundle';

const AlternativeBundlesList = ({
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
					id: 'admin.confirm.deleteAlternativeBundle.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteAlternativeBundle.message',
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
									`product-api/bundles/${bundleId}/alternative-bundles`,
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
										'admin.deleteAlternativeBundle.success'
									);
									refetchBundleDetail();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteAlternativeBundle.error'
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

	const handleOnClickRedirect = (bundleId: string) => () => {
		navigate(`/bundle-detail/${bundleId}`);
	};

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetail.alternativeBundles' })}
			</div>
			{(bundle?.alternativeBundles ?? []).map((altBundle, i) => (
				<div
					key={`product-category-${i}`}
					className="product-category"
				>
					<FiPackage className="product-category-icon" />
					<div className="product-category-label">
						{getLocalizedValue(altBundle?.name ?? [])}
					</div>
					<BiLink
						onClick={handleOnClickRedirect(altBundle.id)}
						className="product-category-icon pointer"
					/>
					<DeleteIcon
						onClick={handleOnRemoveBundleCategory(altBundle.id)}
						className="product-category-icon pointer"
					/>
				</div>
			))}
		</div>
	);
};

export default AlternativeBundlesList;

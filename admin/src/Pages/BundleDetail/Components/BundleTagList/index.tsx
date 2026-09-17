import { useCallback, useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { BsFillTagsFill } from 'react-icons/bs';
import DeleteIcon from 'Components/Icons/Delete';
import { BiLink } from 'react-icons/bi';

import './styles.css';

import { Bundle } from '@/domain/bundle';
import { VinistoHelperDllEnumsTagTagType } from '@/api-types/product-api';

const BundleTagList = ({
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
	const navigate = useNavigate();

	const handleOnRemove = useCallback(
		(bundleTagId: string) => () => {
			const bundleId = bundle?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteBundleTag.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteBundleTag.message',
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
									`product-api/bundles/${bundleId}/tags`,
									bundleTagId,
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
										'admin.deleteBundleTag.success'
									);
									refetchBundleDetail();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteBundleTag.error'
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

	const handleOnClickRedirect = (bundleTagId: string) => () => {
		navigate(`/tag-detail/${bundleTagId}`);
	};

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetails.tags' })}
			</div>
			{(bundle?.tags ?? []).map((bundleTag) => (
				<div
					key={`product-category-${bundleTag?.id}`}
					className="product-category"
				>
					<BsFillTagsFill className="product-category-icon" />
					<div className="product-category-label">{bundleTag.name}</div>
					<BiLink
						onClick={handleOnClickRedirect(bundleTag?.id)}
						className="product-category-icon pointer"
					/>
					{bundleTag.type !== VinistoHelperDllEnumsTagTagType.System && (
						<DeleteIcon
							onClick={handleOnRemove(bundleTag?.id)}
							className="product-category-icon pointer"
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default BundleTagList;

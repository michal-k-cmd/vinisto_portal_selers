import { useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import SpecificationList from 'Components/SpecificationList';
import { EDIT_SPECIFICATION_IN_BUNDLE } from 'Components/Modal/constants';
import {
	TYPE_COMBO_BOX,
	TYPE_MULTI_COMBO_BOX,
} from 'Services/Specification/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import './styles.css';

import { Bundle } from '@/domain/bundle';

const BundleSpecificationList = ({
	bundle,
	refetchBundleDetail,
}: {
	bundle: Bundle | undefined;
	refetchBundleDetail: () => void;
}) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const modalContext = useContext(ModalContext);

	const handleOnRemoveBundleSpecification = useCallback(
		(specificationId: string) => () => {
			const bundleId = bundle?.id ?? '';

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteBundleSpecification.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteBundleSpecification.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							apiServiceInstance
								.delete(
									`product-api/bundles/${bundleId}/specifications/${specificationId}`,
									undefined,
									true,
									[
										{
											key: 'UserLoginHash',
											value: authenticationContext.vinistoUser.loginHash,
										},
									]
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteSpecificationInBundle.success'
									);
									refetchBundleDetail();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteSpecificationInBundle.error'
									);
								});
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
						onClick: () => undefined,
					},
				],
			});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			bundle?.id,
			notificationsContext,
			refetchBundleDetail,
			t,
		]
	);

	const handleOnEditBundleSpecification = useCallback(
		(specification: Record<string, any>) => () => {
			const bundleId = bundle?.id ?? '';
			if (
				get(specification, 'definition.specificationType', '') ===
					TYPE_COMBO_BOX ||
				get(specification, 'definition.specificationType', '') ===
					TYPE_MULTI_COMBO_BOX
			) {
				apiServiceInstance
					.get(
						`product-api/specifications/${specification?.definition?.id}/GetSpecification`,
						true
					)
					.then((payload) => {
						modalContext.handleOpenModal(EDIT_SPECIFICATION_IN_BUNDLE, {
							specification,
							bundleSpecification: payload?.specification,
							bundleId: bundleId,
							refetchBundleDetail,
						});
					})
					.catch(() =>
						notificationsContext.handleShowErrorNotification(
							'admin.editSpecificationInBundle.error'
						)
					);
			} else {
				modalContext.handleOpenModal(EDIT_SPECIFICATION_IN_BUNDLE, {
					specification,
					bundleId: bundleId,
					refetchBundleDetail,
				});
			}
		},
		[]
	);

	return (
		<SpecificationList
			title="admin.bundleDetail.bundleSpecifications"
			specifications={bundle?.specificationDetails ?? []}
			handleOnEdit={handleOnEditBundleSpecification}
			handleOnRemove={handleOnRemoveBundleSpecification}
			className="bundle-specification-list"
		/>
	);
};

export default BundleSpecificationList;

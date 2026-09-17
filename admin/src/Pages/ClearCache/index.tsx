import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { apiServiceInstance } from 'Services/ApiService';
import { MdOutlineDelete } from 'react-icons/md';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminDetail from 'Components/AdminDetail';

import './styles.css';

const ClearCache = () => {
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const actionButtonsSchema = [
		{
			rowId: 'BUNDLE_BUTTON_ROW_1',
			items: [
				{
					label: 'admin.btn.clearCache',
					key: 'clearCache',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.clearCache.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.clearCache.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.clearCache.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(`services-api/caches`, '', true, [
												{
													key: 'userLoginHash',
													value: authenticationContext.vinistoUser.loginHash,
												},
											])
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.clearCache.success'
												);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.clearCache.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.clearCache.no',
									})}`,
									onClick: () => null,
								},
							],
						});
					},
					icon: MdOutlineDelete,
				},
				{
					label: 'admin.btn.clearCache.linkWidgets',
					key: 'clearCache.linkWidgets',
					onClick: () => {
						confirmAlert({
							title: `${t({
								id: 'admin.confirm.clearCache.title',
							})}`,
							message: `${t({
								id: 'admin.confirm.clearCache.message',
							})}`,
							buttons: [
								{
									label: `${t({
										id: 'admin.confirm.clearCache.yes',
									})}`,
									onClick: () => {
										apiServiceInstance
											.delete(
												`linkwidgets-api/links/clear-cache`,
												'',
												true,
												undefined,
												{
													headers: {
														'X-Api-Key': import.meta.env
															.VITE_LINK_WIDGET_API_KEY,
													},
												}
											)
											.then(() => {
												notificationsContext.handleShowSuccessNotification(
													'admin.clearCache.success'
												);
											})
											.catch(() => {
												notificationsContext.handleShowErrorNotification(
													'admin.clearCache.error'
												);
											});
									},
								},
								{
									label: `${t({
										id: 'admin.confirm.clearCache.no',
									})}`,
									onClick: () => null,
								},
							],
						});
					},
					icon: MdOutlineDelete,
				},
			],
		},
	];

	return (
		<AdminDetail
			detailSchema={[]}
			actionButtonsSchema={actionButtonsSchema}
			customComponentRender={() => (
				<div className="admin-page-list">
					<h1>
						{t({
							id: 'admin.clearCache.header',
						})}
					</h1>
				</div>
			)}
		/>
	);
};

export default ClearCache;

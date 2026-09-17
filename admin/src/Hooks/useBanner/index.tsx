import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import BannerService from 'Services/Banner';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';

const useBanner = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);

	const t = localizationContext.useFormatMessage();

	const removeWithConfirmation = (
		bannerId: string,
		successCallback: () => void
	) => {
		confirmAlert({
			title: `${t({
				id: 'admin.banner.remove.title',
			})}`,
			message: `${t({
				id: 'admin.banner.remove.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.form.yes',
					})}`,
					onClick: () => {
						BannerService.remove(
							bannerId,
							authenticationContext.vinistoUser.loginHash
						)
							.then(() => {
								notificationsContext.handleShowSuccessNotification(
									'admin.banner.remove.success'
								);
								successCallback();
							})
							.catch(() => {
								notificationsContext.handleShowErrorNotification(
									'admin.banner.remove.error'
								);
							});
					},
				},
				{
					label: `${t({
						id: 'admin.form.no',
					})}`,
					onClick: () => {},
				},
			],
		});
	};

	return {
		removeWithConfirmation,
	};
};

export default useBanner;

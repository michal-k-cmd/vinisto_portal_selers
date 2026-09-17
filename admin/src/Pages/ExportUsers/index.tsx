import Config from 'Config';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';

const ExportUsers = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const userLoginHash = useContext(AuthenticationContext).vinistoUser.loginHash;
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const handleClickExport = async () => {
		try {
			const response = await fetch(
				`${Config.apiUrl}user-api/export?userLoginHash=${userLoginHash}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			const blob = await response.blob();
			const fileURL = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = fileURL;
			link.download = 'users_export.xlsx';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			URL.revokeObjectURL(fileURL);

			handleShowSuccessNotification('userExport.success');
		} catch (error) {
			handleShowErrorNotification('userExport.error');
		}
	};

	return (
		<Button onClick={handleClickExport}>{t({ id: 'exportUsers' })}</Button>
	);
};

export default ExportUsers;

import { INotificationsContextModel } from 'Services/NotificationService/interfaces';
import { apiServiceInstance } from 'Services/ApiService';

import { IMAGE_API_ENDPOINT } from './constants';

export const uploadImage = async (
	couponId: string,
	image: File,
	userLoginHash: string,
	notificationsContext: INotificationsContextModel
) => {
	const params = new URLSearchParams();
	params.append('ItemType', 'DiscountCoupon');
	params.append('ItemId', couponId);
	params.append('UserLoginHash', userLoginHash);
	params.append('RemoveBackground', 'false');
	params.append('AddBackground', 'false');

	const imageData = new FormData();
	imageData.append('imageFile', image);

	return apiServiceInstance
		.upload(`${IMAGE_API_ENDPOINT}?${params}`, imageData, true)
		.then(() => {
			return true;
		})
		.catch(() => {
			notificationsContext.handleShowErrorNotification(
				'admin.modal.uploadImage.error'
			);
			return false;
		});
};

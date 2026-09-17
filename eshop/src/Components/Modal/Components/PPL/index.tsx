'use client';

import { FC, useContext } from 'react';
import { PPLSelectDetail } from 'Vendor/PPL/interfaces';
import { PPLWidgetInitialFilters } from 'Vendor/PPL/constants';
import { NotificationsContext } from 'Services/NotificationService';

import { ModalContext } from '../../context';

import PPLWidget from './Components/PPLWidget';

/**
 * @category Component PPL Modal Content
 */
const PPLModal: FC = () => {
	const { handleCloseModal, modalData, isOpened } = useContext(ModalContext);
	const notificationContext = useContext(NotificationsContext);

	const onPick = (response: PPLSelectDetail) => {
		if (response?.accessPointType !== 'ParcelShop') {
			return notificationContext.handleShowErrorNotification(
				'pplWidget.error.parcelBoxSelected'
			);
		}
		if (typeof modalData?.onPick === 'function') {
			modalData.onPick(response);
		}
		handleCloseModal();
	};

	if (!isOpened) return null;

	return (
		<PPLWidget
			onPick={onPick}
			initialFilters={`${PPLWidgetInitialFilters.ParcelShop}`}
		/>
	);
};

export default PPLModal;

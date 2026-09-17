'use client';

import { FC, useContext } from 'react';
import {
	DPDPickupPointApiResponse,
	DPDPickupPointData,
	DPDSelectDetail,
} from 'Vendor/DPD/interfaces';
import {
	DPD_WIDGET_PICKUP_POINT_DETAIL_BASE_URL,
	DPDWidgetCountry,
	DPDWidgetLanguage,
} from 'Vendor/DPD/constants';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';

import { ModalContext } from '../../context';

import DPDWidget from './Components/DPDWidget';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

const getPickupPointDetails = async (
	pickupPointId: string
): Promise<DPDPickupPointData> => {
	const response = await fetch(
		`${DPD_WIDGET_PICKUP_POINT_DETAIL_BASE_URL}${pickupPointId}`
	);
	const data = (await response.json()) as DPDPickupPointApiResponse;
	return data.data;
};

/**
 * @category Component DPD Modal Content
 */
const DPDModal: FC = () => {
	const { handleCloseModal, modalData, isOpened } = useContext(ModalContext);
	const notificationContext = useContext(NotificationsContext);
	const { countryOfSale } = useContext(LocalizationContext);

	const onPick = async (response: DPDSelectDetail) => {
		// Validate the pickup point selection
		if (!response || !response.pickupPointResult) {
			return notificationContext.handleShowErrorNotification(
				'pickupPoint.error.onPick'
			);
		}

		try {
			// Fetch details of the selected pickup point
			const pickupPointId = response.pickupPointResult.split(',')[0];
			const pickupPointDetails = await getPickupPointDetails(pickupPointId);

			// Call the callback function provided via modalData
			if (typeof modalData?.onPick === 'function') {
				modalData.onPick(pickupPointDetails);
			}

			handleCloseModal();
		} catch (error) {
			notificationContext.handleShowErrorNotification(
				'pickupPoint.error.onPick'
			);
		}
	};

	const onClose = () => {
		handleCloseModal();
	};

	if (!isOpened) return null;

	const getLanguage = (): DPDWidgetLanguage => {
		switch (countryOfSale) {
			case VinistoHelperDllEnumsCountryCode.SK:
				return DPDWidgetLanguage.Slovak;

			default:
				return DPDWidgetLanguage.Czech;
		}
	};

	const getCountries = (): DPDWidgetCountry[] => {
		switch (countryOfSale) {
			case VinistoHelperDllEnumsCountryCode.SK:
				return [DPDWidgetCountry.Slovak];

			default:
				return [DPDWidgetCountry.Czech];
		}
	};

	return (
		<DPDWidget
			onPick={onPick}
			onClose={onClose}
			language={modalData?.language || getLanguage()}
			countries={modalData?.countries || getCountries()}
			enabledCountries={modalData?.countries || getCountries()}
			hideCloseButton={modalData?.hideCloseButton}
			disableLockers={modalData?.disableLockers}
			hideFeatures={modalData?.hideFeatures}
			hideOpeningHours={modalData?.hideOpeningHours}
			hideSubmitButton={modalData?.hideSubmitButton}
			hideFilter={modalData?.hideFilter}
		/>
	);
};

export default DPDModal;

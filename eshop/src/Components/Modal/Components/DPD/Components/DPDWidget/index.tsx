'use client';

import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useIsClient } from '@uidotdev/usehooks';
import { DPDSelectDetail, DPDWidgetMessageEvent } from 'Vendor/DPD/interfaces';
import {
	DPD_WIDGET_BASE_URL,
	DPD_WIDGET_DEFAULTS,
	DPDWidgetCountry,
	DPDWidgetFilter,
	DPDWidgetLanguage,
} from 'Vendor/DPD/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

type DPDWidgetProps = {
	onPick: (result: DPDSelectDetail) => void;
	onClose?: () => void;
	language?: DPDWidgetLanguage;
	countries?: DPDWidgetCountry[];
	enabledCountries?: DPDWidgetCountry[];
	hideCloseButton?: boolean;
	disableLockers?: boolean;
	hideFeatures?: boolean;
	hideOpeningHours?: boolean;
	hideSubmitButton?: boolean;
	hideFilter?: DPDWidgetFilter[];
};

const DPDWidget = ({
	onPick,
	onClose,
	language,
	countries,
	enabledCountries,
	hideCloseButton = DPD_WIDGET_DEFAULTS.hideCloseButton,
	disableLockers = DPD_WIDGET_DEFAULTS.disableLockers,
	hideFeatures = DPD_WIDGET_DEFAULTS.hideFeatures,
	hideOpeningHours = DPD_WIDGET_DEFAULTS.hideOpeningHours,
	hideSubmitButton = DPD_WIDGET_DEFAULTS.hideSubmitButton,
	hideFilter,
}: DPDWidgetProps) => {
	const isClient = useIsClient();
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const { countryOfSale } = useContext(LocalizationContext);

	const buildWidgetUrl = useCallback(() => {
		const url = new URL(DPD_WIDGET_BASE_URL);
		const params = new URLSearchParams();

		// Language
		if (language) {
			params.append('lang', language);
		}

		// Countries
		if (countries && countries.length > 0) {
			countries.forEach((country) => {
				params.append('countries', country);
			});
		} else if (countryOfSale) {
			params.append('countries', countryOfSale.toUpperCase());
		}

		// Enabled countries
		if (enabledCountries && enabledCountries.length > 0) {
			enabledCountries.forEach((country) => {
				params.append('enabledCountries', country);
			});
		}

		// Configuration options
		if (hideCloseButton) {
			params.append('hideCloseButton', 'true');
		}

		if (disableLockers) {
			params.append('disableLockers', 'true');
		}

		if (hideFeatures) {
			params.append('hideFeatures', 'true');
		}

		if (hideOpeningHours) {
			params.append('hideOpeningHours', 'true');
		}

		if (hideSubmitButton) {
			params.append('hideSubmitButton', 'true');
		}

		// Hide filters
		if (hideFilter && hideFilter.length > 0) {
			hideFilter.forEach((filter) => {
				params.append('hideFilter', filter);
			});
		}

		url.search = params.toString();
		return url.toString();
	}, [
		language,
		countries,
		enabledCountries,
		countryOfSale,
		hideCloseButton,
		disableLockers,
		hideFeatures,
		hideOpeningHours,
		hideSubmitButton,
		hideFilter,
	]);

	const handleMessage = useCallback(
		(event: DPDWidgetMessageEvent) => {
			// Security check - ensure message is from DPD widget
			if (!event.origin.includes('api.dpd.cz')) {
				return;
			}

			if (event.data.dpdWidget) {
				const { pickupPointResult, message } = event.data.dpdWidget;

				// Handle pickup point selection
				if (pickupPointResult) {
					if (typeof onPick === 'function') {
						onPick({ pickupPointResult });
					}
					return;
				}

				// Handle widget close
				if (message === 'widgetClose') {
					if (typeof onClose === 'function') {
						onClose();
					}
					return;
				}
			}
		},
		[onPick, onClose]
	);

	useEffect(() => {
		if (!isClient) return;

		window.addEventListener('message', handleMessage, false);

		return () => {
			window.removeEventListener('message', handleMessage, false);
		};
	}, [isClient, handleMessage]);

	if (!isClient) return null;

	return (
		<div className={styles.wrapper}>
			<iframe
				ref={iframeRef}
				src={buildWidgetUrl()}
				className={styles.dpdWidget}
				title="DPD Pickup Point Widget"
				allow="geolocation"
				frameBorder="0"
			/>
		</div>
	);
};

export default DPDWidget;

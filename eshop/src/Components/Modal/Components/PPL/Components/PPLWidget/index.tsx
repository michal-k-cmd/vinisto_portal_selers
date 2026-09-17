'use client';

import React, { useContext, useEffect } from 'react';
import { useIsClient } from '@uidotdev/usehooks';
import { PPLSelectDetail } from 'Vendor/PPL/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const PPL_STYLESHEET_ID = 'ppl-widget-stylesheet';
const PPL_STYLESHEET_URL = 'https://www.ppl.cz/sources/map/main.css';
const PPL_MAP_DIV_ID = 'ppl-parcelshop-map';
const PPL_SCRIPT_URL = 'https://www.ppl.cz/sources/map/main.js';
const PPL_EVENT_NAME = 'ppl-parcelshop-map';

type PPLWidgetProps = {
	onPick: (result: PPLSelectDetail) => void;
	initialFilters?: string;
	lat?: string;
	lon?: string;
	language?: string;
	mode?: 'static' | 'catalog' | 'default';
};

const FALLBACK_COUNTRY_OF_SALE = 'cz';

const PPLWidget = ({
	onPick,
	initialFilters,
	lat,
	lon,
	language,
	mode,
}: PPLWidgetProps) => {
	const isClient = useIsClient();

	const { countryOfSale } = useContext(LocalizationContext);

	useEffect(() => {
		if (!isClient) return;

		let linkElement = document.getElementById(
			PPL_STYLESHEET_ID
		) as HTMLLinkElement | null;

		if (!linkElement) {
			linkElement = document.createElement('link');
			linkElement.id = PPL_STYLESHEET_ID;
			linkElement.rel = 'stylesheet';
			linkElement.href = PPL_STYLESHEET_URL;
			document.head.appendChild(linkElement);
		}

		const pplEventHandler = (event: any) => {
			const detail = event?.detail as PPLSelectDetail;
			if (typeof onPick === 'function') {
				onPick(detail);
			}
		};

		const script = document.createElement('script');
		script.src = PPL_SCRIPT_URL;
		document.head.appendChild(script);

		document.addEventListener(PPL_EVENT_NAME, pplEventHandler);

		return () => {
			document.removeEventListener(PPL_EVENT_NAME, pplEventHandler);
		};
	}, [isClient, onPick]);

	return (
		<div className={styles.wrapper}>
			{isClient && (
				<div
					id={PPL_MAP_DIV_ID}
					className={styles.pplWidget}
					// https://ppl-widget.apidog.io/konfigura%C4%8Dn%C3%AD-parametry-835312m0
					data-initialfilters={initialFilters}
					data-lat={lat}
					data-lon={lon}
					data-language={language}
					data-mode={mode}
					data-countries={
						countryOfSale.toLowerCase() || FALLBACK_COUNTRY_OF_SALE
					}
				/>
			)}
		</div>
	);
};

export default PPLWidget;

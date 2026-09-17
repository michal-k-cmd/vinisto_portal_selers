import { useContext, useEffect, useState } from 'react';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	ExtendedPoint,
	PacketaWidgetOptions,
	WindowWithPacketa,
} from 'Vendor/Zasilkovna/interfaces';

import { SCRIPT_ID, SCRIPT_URL } from './constants';

export const useZasilkovnaWidget = () => {
	const basketContext = useContext(BasketContext);
	const localizationContext = useContext(LocalizationContext);
	const { countryOfSale } = localizationContext;

	const openWidget = (
		callback: (response: null | ExtendedPoint) => void,
		domNode?: null | HTMLElement,
		options: PacketaWidgetOptions = {}
	) => {
		const Packeta = (window as WindowWithPacketa)?.Packeta;
		if (!Packeta) return;
		Packeta?.Widget.pick(
			process.env.NEXT_PUBLIC_ZASILKOVNA_ID as string,
			callback,
			{
				livePickupPoint: false,
				weight: basketContext?.totalBasketWeight
					? basketContext.totalBasketWeight
					: undefined,
				country: countryOfSale.toLocaleLowerCase(),
				...options,
			},
			domNode ?? null
		);
	};

	const closeWidget = () => {
		const Packeta = (window as WindowWithPacketa)?.Packeta;
		if (!Packeta) return;
		Packeta?.Widget.close();
	};

	const [state, setState] = useState({
		widget: (window as WindowWithPacketa)?.Packeta
			? {
					open: openWidget,
					close: closeWidget,
			  }
			: null,
		isFetched: !!(window as WindowWithPacketa)?.Packeta,
		isLoading: false,
		isError: false,
	});

	useEffect(() => {
		if (state.widget !== null) return;
		setState((state) => ({
			...state,
			isFetched: false,
			isLoading: true,
			isError: false,
		}));

		const script = document.createElement('script');
		script.id = SCRIPT_ID;
		script.src = SCRIPT_URL;
		document.body.appendChild(script);
		script.onload = () => {
			setState({
				widget: {
					open: openWidget,
					close: closeWidget,
				},
				isFetched: true,
				isLoading: false,
				isError: false,
			});
		};
		script.onerror = () => {
			setState((state) => ({
				...state,
				isFetched: true,
				isLoading: false,
				isError: true,
			}));
		};
	}, []);

	return state;
};

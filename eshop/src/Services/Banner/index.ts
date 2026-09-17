import useLocalizedValue from 'Hooks/useLocalizedValue';
import api from 'vinisto_api_client/src/api';
import getSrcSet from 'vinisto_shared/src/image/get-srcset';
import {
	VinistoCmsDllModelsApiSliderCarouselSliderCarousel,
	VinistoCmsDllModelsApiSliderCarouselSliderCarouselsReturn,
} from 'vinisto_api_client/src/api-types/cms-api';

import {
	BANNER_POSITION,
	GET_BANNERS_ENDPOINT,
	POSITION_VALUES_MAP,
} from './constants';
import { Banner } from './interfaces';
import { DEFAULT_RENDER_LIMIT } from './constants';

class BannerService {
	private getLocalizedValue: ReturnType<typeof useLocalizedValue>;

	constructor(getLocalizedValue: ReturnType<typeof useLocalizedValue>) {
		this.getLocalizedValue = getLocalizedValue;
	}

	// "Position" is for getting index in array, not for determinig(?) carousel type fgs
	private getPosition(
		banner: VinistoCmsDllModelsApiSliderCarouselSliderCarousel
	) {
		let position: BANNER_POSITION;
		if (banner.type === POSITION_VALUES_MAP[BANNER_POSITION.TOP]) {
			position = BANNER_POSITION.TOP;
		}
		if (banner.type === POSITION_VALUES_MAP[BANNER_POSITION.BOTTOM]) {
			position = BANNER_POSITION.BOTTOM;
		} else {
			position = BANNER_POSITION.PRODUCT_DETAIL;
		}
		return position;
	}

	private mapApiToEntity(
		banner: VinistoCmsDllModelsApiSliderCarouselSliderCarousel
	): Banner {
		return {
			position: this.getPosition(banner),
			title: this.getLocalizedValue(banner.title ?? []),
			subtitle: this.getLocalizedValue(banner.subtitle ?? []),
			// @ts-expect-error Uncompatible 'image' type union, not easy to fix, TODO
			imageOriginalUrl: banner.image?.domainUrls?.original_png ?? '',
			imageUrl:
				// @ts-expect-error Uncompatible 'image' type union, not easy to fix, TODO
				banner.image?.domainUrls?.thumb_500x500 ?? banner?.image?.url ?? '',
			ctaLabel: this.getLocalizedValue(banner.textLink ?? []),
			order: Number(banner.position ?? 0),
			url: this.getLocalizedValue(banner.url ?? []),
			srcSet:
				// @ts-expect-error Uncompatible 'image' type union, not easy to fix, TODO
				(banner.image?.domainUrls &&
					// @ts-expect-error Uncompatible 'image' type union, not easy to fix, TODO
					getSrcSet(banner.image?.domainUrls)) ??
				undefined,
			titleColor: banner.titleColor ?? null,
			subtitleColor: banner.subtitleColor ?? null,
			buttonStyle: banner.buttonStyle ?? null,
		};
	}

	fetch =
		(type: BANNER_POSITION, limit = DEFAULT_RENDER_LIMIT) =>
		async () => {
			const response =
				await api.get<VinistoCmsDllModelsApiSliderCarouselSliderCarouselsReturn>(
					GET_BANNERS_ENDPOINT,
					{
						carouselType: type,
						IsCache: true,
					}
				);

			return (
				response.sliderCarousels
					?.slice(0, limit)
					.map((banner) => this.mapApiToEntity(banner)) ?? []
			);
		};
}

export default BannerService;

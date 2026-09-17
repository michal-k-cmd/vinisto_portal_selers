import { dayjsInstance as dayjs } from 'Services/Date';
import {
	CmsApi,
	VinistoHelperDllEnumsLanguage,
	VinistoHelperDllEnumsSliderCarouselButtonStyle,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { INotificationsContextModel } from 'Services/NotificationService/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { BannerFormValues } from 'Components/Modal/Components/Banner/interfaces';
import { apiServiceInstance } from 'Services/ApiService';
import { get } from 'Helpers/lodash';

import {
	ADD_API_ENDPOINT,
	ADD_IMAGE_API_ENDPOINT,
	EDIT_API_ENDPOINT,
	POSITION,
	POSITION_IMAGE_TYPE_MAP,
	POSITION_VALUES_MAP,
	REMOVE_API_ENDPOINT,
} from './constants';
import { Banner, BannerApi, BannerImage } from './interfaces';

const getPosition = (banner: any) => {
	const dbPlacement = banner.type ?? '';
	let position: POSITION = POSITION.TOP;
	for (const pos of Object.values(POSITION)) {
		if (dbPlacement === POSITION_VALUES_MAP[pos]) {
			position = pos;
			break;
		}
	}
	return position;
};

const mapImageObject = (image: any): BannerImage => {
	return {
		id: image.id ?? '',
		url: image.domainUrls?.original_png ?? image.url ?? '',
	};
};

const isOrderRequired = (position: POSITION) =>
	position === POSITION.TOP ||
	position === POSITION.BOTTOM ||
	position === POSITION.HP_USP ||
	position === POSITION.PRODUCT_DETAIL_USP ||
	position === POSITION.PRODUCT_LIST;

const mapApiToEntity =
	(getLocalizedValue: ReturnType<typeof useLocalizedValue>) =>
	(banner: any): Banner => {
		const position = getPosition(banner);
		return {
			id: banner.id ?? '',
			position,
			title: getLocalizedValue(banner.title ?? ''),
			titleColor: banner.titleColor ?? null,
			subtitle: getLocalizedValue(banner.subtitle ?? ''),
			subtitleColor: banner.subtitleColor ?? null,
			image: mapImageObject(banner.image ?? {}),
			ctaLabel: getLocalizedValue(banner.textLink ?? ''),
			buttonStyle:
				banner.buttonStyle ??
				VinistoHelperDllEnumsSliderCarouselButtonStyle.Green,
			validFrom: dayjs.unix(banner.availableFrom ?? '').toDate(),
			validTo: dayjs.unix(banner.availableTo ?? '').toDate(),
			order: isOrderRequired(position) ? Number(banner.position ?? 1) : null,
			url: getLocalizedValue(banner.url ?? ''),
			availableOnPlatforms: banner.availableOnPlatforms,
		};
	};

const mapFormDataToApi = (
	banner: BannerFormValues
): CmsApi.SliderCarouselUpdate.RequestBody => ({
	title: banner.title,
	titleColor: banner.titleColor,
	subtitle: banner.subtitle,
	subtitleColor: banner.subtitleColor,
	textLink: banner.ctaLabel,
	buttonStyle: banner.buttonStyle,
	availableFrom:
		banner.validFrom === undefined
			? banner.validFrom
			: dayjs(banner.validFrom).unix(),
	availableTo:
		banner.validTo === undefined
			? banner.validTo
			: dayjs(banner.validTo).unix(),
	position: isOrderRequired(banner.position) ? Number(banner.order) ?? 0 : 0,
	type: POSITION_VALUES_MAP[banner.position],
	url: banner.url,
	availableOnPlatforms: banner.availableOnPlatforms,
});

const uploadImage = async (
	bannerId: string,
	position: POSITION,
	image: File,
	userLoginHash: string,
	notificationsContext: INotificationsContextModel
) => {
	const params = new URLSearchParams();
	params.append('ItemType', POSITION_IMAGE_TYPE_MAP[position]);
	params.append('ItemId', bannerId);
	params.append('UserLoginHash', userLoginHash);
	params.append('RemoveBackground', 'false');
	params.append('AddBackground', 'false');

	const imageData = new FormData();
	imageData.append('imageFile', image);

	apiServiceInstance
		.upload(`${ADD_IMAGE_API_ENDPOINT}?${params}`, imageData, true)
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

const create = async (
	data: BannerFormValues,
	language: string,
	userLoginHash: string,
	notificationsContext: INotificationsContextModel
) => {
	if (!Object.hasOwn(VinistoHelperDllEnumsLanguage, language)) {
		throw new Error(
			'Invalid language - supported languages are: ' +
				VinistoHelperDllEnumsLanguage
		);
	}

	return apiServiceInstance
		.post(
			ADD_API_ENDPOINT,
			{
				...mapFormDataToApi(data),
				userLoginHash,
				language,
			},
			true
		)
		.then((response) => {
			const banner: BannerApi = get(
				response,
				'sliderCarousel'
			) as unknown as BannerApi;

			if (banner.id === undefined) {
				throw new Error('Banner was not created');
			}

			return uploadImage(
				banner.id,
				data.position,
				data.image[0],
				userLoginHash,
				notificationsContext
			);
		});
};

const update = async (
	banner: Banner,
	data: BannerFormValues,
	language: string,
	userLoginHash: string,
	notificationsContext: INotificationsContextModel
) => {
	if (!Object.hasOwn(VinistoHelperDllEnumsLanguage, language)) {
		throw new Error(
			'Invalid language - supported languages are: ' +
				VinistoHelperDllEnumsLanguage
		);
	}
	return apiServiceInstance
		.put(
			EDIT_API_ENDPOINT,
			{
				...mapFormDataToApi(data),
				userLoginHash,
				language,
			},
			true,
			banner.id
		)
		.then((response) => {
			const newBanner = get(response, 'sliderCarousel') as unknown as BannerApi;
			if (newBanner.id === undefined) {
				throw new Error('Banner was not created');
			}
			if (!data.image || data.image.length === 0) return;
			return uploadImage(
				newBanner.id,
				data.position,
				data.image[0],
				userLoginHash,
				notificationsContext
			);
		});
};

const remove = async (bannerId: string, userLoginHash: string) => {
	return apiServiceInstance.delete(REMOVE_API_ENDPOINT, bannerId, true, [
		{
			key: 'userLoginHash',
			value: userLoginHash,
		},
	]);
};

const BannerService = {
	mapApiToEntity,
	create,
	update,
	remove,
};

export default BannerService;

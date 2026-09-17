import { v4 as uuidv4 } from 'uuid';

import { Api } from '../api-types/strapi-api';

interface SecurityDataType {
	key: string;
}

const strapiReadonlyApiInstance = new Api<SecurityDataType>({
	baseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URI,
	securityWorker: (securityData: SecurityDataType | null) => {
		if (securityData) {
			return {
				headers: {
					['Authorization']: 'bearer ' + securityData.key,
				},
			};
		}
	},
});

strapiReadonlyApiInstance.setSecurityData({
	key:
		process.env.NEXT_PUBLIC_STRAPI_READONLY_API_KEY || '',
});

const strapiWriteApiInstance = new Api<SecurityDataType>({
	baseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URI,
	securityWorker: (securityData: SecurityDataType | null) => {
		if (securityData) {
			return {
				headers: {
					['Authorization']: 'bearer ' + securityData.key,
				},
			};
		}
	},
});

strapiWriteApiInstance.setSecurityData({
	key:
		process.env.NEXT_PUBLIC_STRAPI_WRITE_API_KEY || '',
});

const getBundleNotes = async (
	bundleId: string,
	userEmail: string,
	sortOrder: 'asc' | 'desc' = 'desc',
	options?: RequestInit
) => {
	const data = await strapiReadonlyApiInstance.bundleNotes.getBundleNotes(
		{
			// @ts-expect-error wrongly typed
			['filters[bundleId][$eq]']: bundleId,
			['filters[userEmail][$eq]']: userEmail,
			sort: `createdAt:${sortOrder}`,
		},
		options?.signal ? { cancelToken: options.signal } : undefined
	);
	return data.data.data;
};

const getBundleNotesPerUser = async ({
	userEmail,
	sortOrder = 'desc',
	page,
	pageSize = 10,
	start,
}: {
	userEmail: string;
	sortOrder?: 'asc' | 'desc';
	page?: number;
	pageSize?: number;
	start?: number;
}) => {
	const data = await strapiReadonlyApiInstance.bundleNotes.getBundleNotes({
		// @ts-expect-error wrongly typed
		['filters[userEmail][$eq]']: userEmail,
		...(page !== undefined && { ['pagination[page]']: page }),
		...(start !== undefined && { ['pagination[start]']: start }),
		['pagination[pageSize]']: pageSize,
		sort: `createdAt:${sortOrder}`,
		['pagination[withCount]']: true,
	});
	return data.data.data;
};

const getBundleNotesPerBundle = async (
	bundleId: string,
	sortOrder: 'asc' | 'desc' = 'desc'
) => {
	const data = await strapiReadonlyApiInstance.bundleNotes.getBundleNotes({
		// @ts-expect-error wrongly typed
		['filters[bundleId][$eq]']: bundleId,
		sort: `createdAt:${sortOrder}`,
	});
	return data.data.data;
};

const createBundleNote = async (
	bundleId: string,
	userEmail: string,
	note: string
) => {
	const data = await strapiWriteApiInstance.bundleNotes.postBundleNotes({
		data: {
			bundleId,
			note,
			userEmail,
			noteId: uuidv4(),
		},
	});
	return data.data.data;
};

const updateBundleNote = async (
	id: number,
	bundleId: string,
	userEmail: string,
	note: string
) => {
	const data = await strapiWriteApiInstance.bundleNotes.putBundleNotesId(id, {
		data: {
			bundleId,
			note,
			userEmail,
		},
	});
	return data.data.data;
};

const deleteBundleNote = async (id?: number) => {
	if (!id) throw new Error('Id not provided');
	const data = await strapiWriteApiInstance.bundleNotes.deleteBundleNotesId(id);
	return data.data;
};

const getPromos = (promoId: string) => {
	const data = strapiReadonlyApiInstance.promos.getPromos({
		// @ts-expect-error wrongly typed
		['filters[promoId][$eq]']: promoId,
		['populate[Banners][populate][0]']: 'Icon',
		['populate']: 'HeroImage',
		['populate[PromoBlocks][populate][0]']: 'CategoryLinks',
		['populate[PromoBlocks][populate][1]']: 'CategoryLinks.Icon',
		['populate[PromoBlocks][populate][2]']: 'Products',
		['populate[PromoBlocks][populate][3]']: 'Image',
		['populate[PromoBlocks][populate][4]']: 'Products.Image',
	});
	return data;
};

const getPage = async (slug: string) => {
	const data = await strapiReadonlyApiInstance.pages.getPages({
		// @ts-expect-error wrongly typed
		['filters[Slug][$eq]']: slug,
		['populate[0]']: 'Competition_header',
		['populate[1]']: 'Competition_header.Background_image',
		['populate[2]']: 'Producer_header',
		['populate[3]']: 'Producer_header.Logo',
		['populate[4]']: 'Producer_header.Background_image',
		['populate[5]']: 'Producer_header.Info_block',
		['populate[6]']: 'Producer_header.Info_block.Item',
		['populate[7]']: 'Content',
		['populate[8]']: 'Content.Content_column',
		['populate[9]']: 'Content.Content_column.Title_and_text',
		['populate[10]']: 'Content.Content_column.Image.Image',
		['populate[11]']: 'Content.Photogallery',
		['populate[12]']: 'Content.Photogallery.Photo',
		['populate[13]']: 'Content.products_list',
		['populate[14]']: 'Content.products_list.Products',
		['populate[15]']: 'Content.Youtube_video',
		['populate[16]']: 'Content.faq',
		['populate[17]']: 'Content.faq.FAQ_items',

		['populate[18]']: 'Content.products_by_category',
		['populate[19]']: 'Content.products_by_tag',
	});

	return data;
};

const getLanding = async (slug: string, locale?: string) => {
	const data = await strapiReadonlyApiInstance.landings.getLandings({
		// @ts-expect-error wrongly typed
		['filters[slug][$eq]']: slug,
		['populate[Social_media_image][populate]']: '*',
		['populate[Content][on][header.producer-header][populate][0]']:
			'Info_block',
		['populate[Content][on][header.producer-header][populate][1]']:
			'Info_block.Item',
		['populate[Content][on][header.producer-header][populate][2]']: 'Logo',
		['populate[Content][on][header.producer-header][populate][3]']:
			'Background_image',
		['populate[Content][on][header.competition-header][populate]']: '*',
		['populate[Content][on][header.vinisto-plus][populate][0]']: 'Info_block',
		['populate[Content][on][header.vinisto-plus][populate][1]']:
			'Info_block.Item',
		['populate[Content][on][header.vinisto-plus][populate][2]']:
			'Monthly_subscription',
		['populate[Content][on][header.vinisto-plus][populate][3]']:
			'Yearly_subscription',
		['populate[Content][on][content.faq][populate][FAQ_items][populate]']: '*',
		['populate[Content][on][content.photogallery][populate][Photo][populate]']:
			'*',
		['populate[Content][on][content.youtube-video][populate]']: '*',
		['populate[Content][on][content.dynamic-row][populate][Column][populate][content][populate]']:
			'*',
		['populate[Content][on][content.products-list][populate][Products][populate]']:
			'*',
		['populate[Content][on][content.spacer][populate]']: '*',
		['populate[Content][on][content.newsletter-form][populate]']: '*',
		['populate[Content][on][content.cta][populate]']: '*',
		['populate[Content][on][content.products-by-category][populate]']: '*',
		['populate[Content][on][content.products-by-tag][populate]']: '*',
		locale: locale,
	});

	return data;
};

const searchForStringInLanding = async (search: string) => {
	const results = await strapiReadonlyApiInstance.landings.getLandings({
		// @ts-expect-error wrongly typed
		['filters[$or][0][slug][$containsi]']: search,
		['filters[$or][1][Title][$containsi]']: search,
		['filters[$or][2][Description][$containsi]']: search,
		['filters[$or][3][OG_title][$containsi]']: search,
		['filters[$or][4][OG_description][$containsi]']: search,
	})

	return results;
}

const StrapiService = {
	getBundleNotes,
	getBundleNotesPerUser,
	getBundleNotesPerBundle,
	createBundleNote,
	updateBundleNote,
	deleteBundleNote,
	getPromos,
	getPage,
	getLanding,
	searchForStringInLanding,
};

export default StrapiService;

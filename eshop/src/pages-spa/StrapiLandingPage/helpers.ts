import {
	ContentCtaComponent,
	ContentDynamicRowComponent,
	ContentFaqComponent,
	ContentImageComponent,
	ContentNewsletterFormComponent,
	ContentPhotogalleryComponent,
	ContentProductsByCategoryComponent,
	ContentProductsByTagComponent,
	ContentProductsListComponent,
	ContentSpacerComponent,
	ContentTitleAndTextComponent,
	ContentYoutubeVideoComponent,
} from '@/api-types/strapi-api';

export const isFaqComponent = (
	component: unknown
): component is ContentFaqComponent =>
	(component as any).__component === 'content.faq';

export const isTitleAndTextComponent = (
	component: unknown
): component is ContentTitleAndTextComponent =>
	(component as any).__component === 'content.title-and-text';

export const isDynamicRowComponent = (
	component: unknown
): component is ContentDynamicRowComponent =>
	(component as any).__component === 'content.dynamic-row';

export const isPhotogalleryComponent = (
	component: unknown
): component is ContentPhotogalleryComponent =>
	(component as any).__component === 'content.photogallery';

export const isYoutubeVideoComponent = (
	component: unknown
): component is ContentYoutubeVideoComponent =>
	(component as any).__component === 'content.youtube-video';

export const isSpacerComponent = (
	component: unknown
): component is ContentSpacerComponent =>
	(component as any).__component === 'content.spacer';

export const isCtaComponent = (
	component: unknown
): component is ContentCtaComponent =>
	(component as any).__component === 'content.cta';

export const isImageComponent = (
	component: unknown
): component is ContentImageComponent =>
	(component as any).__component === 'content.image';

export const isProductsListComponent = (
	component: unknown
): component is ContentProductsListComponent =>
	(component as any).__component === 'content.products-list';

export const isProductsByTagComponent = (
	component: unknown
): component is ContentProductsByTagComponent =>
	(component as any).__component === 'content.products-by-tag';

export const isProductsByCategoryComponent = (
	component: unknown
): component is ContentProductsByCategoryComponent =>
	(component as any).__component === 'content.products-by-category';

export const isNewsletterFormComponent = (
	component: unknown
): component is ContentNewsletterFormComponent =>
	(component as any).__component === 'content.newsletter-form';

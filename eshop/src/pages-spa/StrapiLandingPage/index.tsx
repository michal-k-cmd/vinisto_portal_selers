import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { ShareProductLink } from 'vinisto_ui';
import LandingHeader from 'Components/LandingComponents/LandingHeader';
import TextElement from 'Components/LandingComponents/TextElement';
import Columns from 'Components/LandingComponents/Columns';
import ImageElement from 'Components/LandingComponents/ImageElement';
import YoutubeVideo from 'Components/LandingComponents/YoutubeVideo';
import Faq from 'Components/LandingComponents/Faq';
import GalleryWide from 'Components/LandingComponents/GalleryWide';
import GalleryBig from 'Components/LandingComponents/GalleryBig';
import { Fragment } from 'react';
import ProductListSection from 'Components/LandingComponents/ProductListSection';
import Spacer from 'Components/LandingComponents/Spacer';
import Cta from 'Components/LandingComponents/Cta';
import ProductsByTag from 'Components/LandingComponents/ProductsByTag';
import ProductsByCategory from 'Components/LandingComponents/ProductsByCategory';

import ProducentBreadcrumb from '../StrapiPage/StrapiBreadcrumb';
import ProducerFooter from '../StrapiPage/StrapiFooter';
import NewsletterForm from '../StrapiPage/NewsletterForm';
import {
	backgroundColorMap,
	countryCodeToNameMap,
} from '../StrapiPage/constants';
import styles from '../StrapiPage/styles.module.css';

import {
	isCtaComponent,
	isDynamicRowComponent,
	isFaqComponent,
	isImageComponent,
	isNewsletterFormComponent,
	isPhotogalleryComponent,
	isProductsByCategoryComponent,
	isProductsByTagComponent,
	isProductsListComponent,
	isSpacerComponent,
	isTitleAndTextComponent,
	isYoutubeVideoComponent,
} from './helpers';

import {
	HeaderCompetitionHeaderComponent,
	HeaderProducerHeaderComponent,
	HeaderVinistoPlusComponent,
	Landing,
} from '@/api-types/strapi-api';

interface StrapiLandingPageProps {
	page: Landing;
	slug: string;
}

const StrapiLandingPage = ({ page, slug }: StrapiLandingPageProps) => {
	const producerName = page?.Title || slug;

	const { Content } = page;
	const Producer_header: HeaderProducerHeaderComponent | undefined =
		Content?.find(
			(contentItem) =>
				(contentItem as any).__component === 'header.producer-header'
		);
	const Competition_header: HeaderCompetitionHeaderComponent | undefined =
		Content?.find(
			(contentItem) =>
				(contentItem as any).__component === 'header.competition-header'
		);

	const VinistoPlus_header = Content?.find(
		(contentItem): contentItem is HeaderVinistoPlusComponent =>
			(contentItem as any).__component === 'header.vinisto-plus'
	);

	return (
		<section id="content-wrapper">
			<ContainerFullWidth>
				<div className="d-flex justify-content-between align-items-center">
					<ProducentBreadcrumb producerName={producerName} />
					<ShareProductLink
						bundleName={producerName}
						isTabletMobile={false}
						className={styles.shareLink}
					/>
				</div>
			</ContainerFullWidth>

			{Producer_header != undefined && (
				<LandingHeader
					bgImgUrl={
						Producer_header.Background_image?.url
							? `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${Producer_header.Background_image?.url}`
							: undefined
					}
					logoUrl={
						Producer_header.Logo?.url
							? `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${Producer_header.Logo?.url}`
							: undefined
					}
					title={producerName}
					countryCode={Producer_header.Country}
					countryName={
						Producer_header.Country
							? countryCodeToNameMap[Producer_header.Country]
							: ''
					}
					region={Producer_header.Region}
					region_slug={Producer_header.Region_slug}
					ctas={
						Producer_header.Info_block?.Item?.map((item) => ({
							id: item.id,
							icon: `/assets/strapi-icons/${item.Icon}.svg`,
							mainText: item.Value ?? '',
							subText: item.Title ?? '',
						})) ?? []
					}
					type="Producer_header"
				/>
			)}
			{Competition_header != undefined && (
				<LandingHeader
					bgImgUrl={
						Competition_header.Background_image?.url
							? `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${Competition_header.Background_image?.url}`
							: undefined
					}
					title={producerName}
					text={Competition_header.Text}
					type="Competition_header"
				/>
			)}
			{VinistoPlus_header != undefined && (
				<LandingHeader
					title={VinistoPlus_header.Title ?? ''}
					text={VinistoPlus_header.Text}
					type="VinistoPlus_header"
					ctas={
						VinistoPlus_header.Info_block?.Item?.map((item) => ({
							id: item.id,
							icon: `/assets/strapi-icons/${item.Icon}.svg`,
							mainText: item.Value ?? '',
							subText: item.Title ?? '',
						})) ?? []
					}
				/>
			)}
			{Content != null && (
				<Fragment>
					{Content.map((contentItem, i) => {
						if (isFaqComponent(contentItem)) {
							return (
								<Faq
									key={`FAQ_${contentItem.id}`}
									heading={contentItem.Title}
									questions={
										contentItem.FAQ_items?.map((question) => ({
											question: question.Question,
											answer: question.Answer_markdown
												? question.Answer_markdown
												: question.Answer,
										})) ?? []
									}
								/>
							);
						}
						if (isPhotogalleryComponent(contentItem)) {
							return contentItem?.Style === 'main image' ? (
								<GalleryBig
									key={`bigPhotogallery_${contentItem.id}`}
									pretitle={contentItem?.Subtitle}
									heading={contentItem?.Title}
									images={
										contentItem?.Photo?.map((image) => ({
											imageSrc: `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.url}`,
											previewImageSrc: `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.url}`,
											alt: image.alternativeText,
											title: image.caption,
										})) ?? []
									}
								/>
							) : (
								<GalleryWide
									key={`widePhotogallery_${contentItem.id}`}
									pretitle={contentItem?.Subtitle}
									heading={contentItem?.Title}
									images={
										contentItem?.Photo?.map((image) => ({
											imageSrc: `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.url}`,
											previewImageSrc: `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.url}`,
											alt: image.alternativeText,
											title: image.caption,
										})) ?? []
									}
								/>
							);
						}
						if (isYoutubeVideoComponent(contentItem)) {
							return contentItem.Youtube_src ? (
								<ContainerFullWidth key={`Youtube_video_${contentItem.id}`}>
									<YoutubeVideo url={contentItem.Youtube_src} />
								</ContainerFullWidth>
							) : null;
						}
						if (isCtaComponent(contentItem)) {
							return contentItem.Title && contentItem.Url ? (
								<ContainerFullWidth key={`cta_${contentItem.id}`}>
									<Cta
										title={contentItem.Title}
										url={contentItem.Url}
										align={contentItem.Align}
									/>
								</ContainerFullWidth>
							) : null;
						}
						if (isSpacerComponent(contentItem)) {
							return (
								<Spacer
									key={`spacer_${contentItem.id}`}
									height={contentItem.Height}
									backgroundColor={contentItem.Background_color}
								/>
							);
						}
						if (isProductsListComponent(contentItem)) {
							return (
								<ProductListSection
									data={contentItem}
									slug={''}
									key={`product.list_${i}`}
								/>
							);
						}

						if (isProductsByTagComponent(contentItem)) {
							return (
								<ProductsByTag
									heading={contentItem.Title ?? ''}
									tagId={contentItem.Tag_id ?? ''}
									key={`products.by.tag_${i}`}
								/>
							);
						}

						if (isProductsByCategoryComponent(contentItem)) {
							return (
								<ProductsByCategory
									heading={contentItem.Title ?? ''}
									categoryId={contentItem.Category_id ?? ''}
									key={`products.by.category_${i}`}
								/>
							);
						}

						if (isDynamicRowComponent(contentItem)) {
							return (
								<Fragment key={'strapi' + contentItem.id}>
									{contentItem.Column != null &&
										contentItem.Column.length > 0 && (
											<Columns
												key={`strapi-columns_${contentItem.id}`}
												columnsCount={contentItem.Column.length}
												elements={contentItem.Column.map((column) => {
													return (
														<div
															key={`strapi-dynamic-column_${column.id}`}
															{...(column.Background_color != null
																? column.Background_color != 'none' && {
																		style: {
																			backgroundColor:
																				'rgb(' +
																				backgroundColorMap[
																					column.Background_color
																				] +
																				')',
																			'--read-more-background':
																				backgroundColorMap[
																					column.Background_color
																				],
																			padding:
																				contentItem?.Column?.length === 1
																					? '2rem 3rem'
																					: '1rem 1rem 0.5rem',
																		},
																  }
																: {
																		style: {
																			'--read-more-background':
																				'var(--vinisto-color-white)',
																		},
																  })}
														>
															{column.content?.map((contentItem) => {
																if (isTitleAndTextComponent(contentItem)) {
																	return (
																		<TextElement
																			key={`content_${contentItem.id}`}
																			pretitle={contentItem?.Subtitle}
																			heading={contentItem?.Title}
																			text={contentItem?.Text}
																			textAlign={column.Align}
																			onlyElementInColumns={
																				column?.content?.length === 1
																			}
																			isWithReadMore={
																				contentItem?.Show_read_more
																			}
																		/>
																	);
																}
																if (isImageComponent(contentItem)) {
																	return (
																		<ImageElement
																			key={`content_${contentItem.id}`}
																			imgSource={`${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${contentItem?.Image?.url}`}
																			imgAlt={
																				contentItem?.Image?.alternativeText ??
																				''
																			}
																			imgTitle={
																				contentItem?.Image?.caption ?? ''
																			}
																		/>
																	);
																}
																if (isYoutubeVideoComponent(contentItem)) {
																	return contentItem.Youtube_src ? (
																		<ContainerFullWidth
																			key={`Youtube_video_${contentItem.id}`}
																		>
																			<YoutubeVideo
																				url={contentItem.Youtube_src}
																			/>
																		</ContainerFullWidth>
																	) : null;
																}
																if (isCtaComponent(contentItem)) {
																	return contentItem.Title &&
																		contentItem.Url ? (
																		<Cta
																			key={`cta_${contentItem.id}`}
																			title={contentItem.Title}
																			url={contentItem.Url}
																			align={contentItem.Align}
																		/>
																	) : null;
																}
																if (isSpacerComponent(contentItem)) {
																	return (
																		<Spacer
																			key={`spacer_${contentItem.id}`}
																			height={contentItem.Height}
																			backgroundColor={
																				contentItem.Background_color
																			}
																		/>
																	);
																}
															})}
														</div>
													);
												})}
											/>
										)}
								</Fragment>
							);
						}
						if (isNewsletterFormComponent(contentItem)) {
							return (
								<ContainerFullWidth
									key={`newsletter_form_${contentItem.id}`}
									containerClassName={styles.newsletterContainer}
								>
									<NewsletterForm
										type={page.Type}
										{...contentItem}
									/>
								</ContainerFullWidth>
							);
						}
					})}
				</Fragment>
			)}

			<ProducerFooter />
		</section>
	);
};

export default StrapiLandingPage;

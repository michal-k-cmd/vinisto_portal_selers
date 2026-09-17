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
import { Page } from 'vinisto_api_client/src/api-types/strapi-api';
import ProductsByCategory from 'Components/LandingComponents/ProductsByCategory';
import ProductsByTag from 'Components/LandingComponents/ProductsByTag';

import ProducentBreadcrumb from './StrapiBreadcrumb';
import styles from './styles.module.css';
import { backgroundColorMap, countryCodeToNameMap } from './constants';
import ProducerFooter from './StrapiFooter';
import NewsletterForm from './NewsletterForm';

interface ProducerPageProps {
	page: Page;
	slug: string;
}

const StrapiPage = ({ page, slug }: ProducerPageProps) => {
	const producerName = page?.Title || slug;

	const { Producer_header, Content, Competition_header } = page;

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
					bgImgUrl={`${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${Producer_header.Background_image?.url}`}
					logoUrl={`${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${Producer_header.Logo?.url}`}
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
				/>
			)}
			{Competition_header != undefined && (
				<LandingHeader
					bgImgUrl={`${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${Competition_header.Background_image?.url}`}
					title={producerName}
					text={Competition_header.Text}
				/>
			)}
			{Content != null && (
				<Fragment>
					{Content.map((contentItem) => {
						return (
							<Fragment key={'strapi' + contentItem.id}>
								{contentItem.Content_column != null &&
									contentItem.Content_column.length > 0 && (
										<Columns
											key={`strapi-columns_${contentItem.id}`}
											columnsCount={contentItem.Content_column.length}
											elements={contentItem.Content_column.map((column) => {
												return (
													<div
														key={'strapicooumni' + column.id}
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
																			contentItem?.Content_column?.length === 1
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
														{column.Title_and_text != null && (
															<TextElement
																pretitle={column.Title_and_text?.Subtitle}
																heading={column.Title_and_text?.Title}
																text={column.Title_and_text?.Text}
																textAlign={column.Align}
																onlyElementInColumns={
																	contentItem?.Content_column?.length === 1
																}
																isWithReadMore={
																	column.Title_and_text?.Show_read_more
																}
															/>
														)}
														{column.Image != null &&
															column.Image.map((image) => (
																<ImageElement
																	key={`strapiimage_${column.id}`}
																	imgSource={`${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.Image?.url}`}
																	imgAlt={image.Image?.alternativeText ?? ''}
																	imgTitle={image.Image?.caption ?? ''}
																/>
															))}
													</div>
												);
											})}
										/>
									)}
								{contentItem.Photogallery != null &&
									(contentItem.Photogallery?.Style === 'main image' ? (
										<GalleryBig
											key={`bigPhotogallery_${contentItem.id}`}
											pretitle={contentItem.Photogallery?.Title}
											heading={contentItem.Photogallery?.Subtitle}
											images={
												contentItem.Photogallery?.Photo?.map((image) => ({
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
											pretitle={contentItem.Photogallery?.Title}
											heading={contentItem.Photogallery?.Subtitle}
											images={
												contentItem.Photogallery?.Photo?.map((image) => ({
													imageSrc: `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.url}`,
													previewImageSrc: `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${image.url}`,
													alt: image.alternativeText,
													title: image.caption,
												})) ?? []
											}
										/>
									))}
								{contentItem.Youtube_video != null &&
									contentItem.Youtube_video?.Youtube_src && (
										<ContainerFullWidth>
											<YoutubeVideo
												key={`Youtube_video_${contentItem.id}`}
												url={contentItem.Youtube_video?.Youtube_src}
											/>
										</ContainerFullWidth>
									)}
								{contentItem.products_list != null &&
									!!contentItem.products_list.length && (
										<div>
											{contentItem.products_list.map((list) => (
												<ProductListSection
													data={list}
													slug={page.Producer_slug}
													key={`ProductListSection_${list.id}`}
												/>
											))}
										</div>
									)}
								{contentItem.faq != null && (
									<Faq
										key={`FAQ_${contentItem.faq.id}`}
										heading={contentItem.faq.Title}
										questions={
											contentItem.faq.FAQ_items?.map((question) => ({
												question: question.Question,
												answer: question.Answer,
											})) ?? []
										}
									/>
								)}
								{contentItem.products_by_category != null && (
									<ProductsByCategory
										key={`PRODUCTS_BY_CATEGORY${contentItem.products_by_category.id}`}
										heading={contentItem.products_by_category.Title ?? ''}
										categoryId={
											contentItem.products_by_category.Category_id ?? ''
										}
									/>
								)}
								{contentItem.products_by_tag != null && (
									<ProductsByTag
										key={`PRODUCTS_BY_TAG${contentItem.products_by_tag.id}`}
										heading={contentItem.products_by_tag.Title ?? ''}
										tagId={contentItem.products_by_tag.Tag_id ?? ''}
									/>
								)}
							</Fragment>
						);
					})}
				</Fragment>
			)}

			{
				<ContainerFullWidth containerClassName={styles.newsletterContainer}>
					<NewsletterForm type={page?.Type} />
				</ContainerFullWidth>
			}

			<ProducerFooter />
		</section>
	);
};

export default StrapiPage;

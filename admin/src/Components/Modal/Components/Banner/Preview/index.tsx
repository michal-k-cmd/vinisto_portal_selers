import { FC, useContext, useMemo } from 'react';
import cx from 'classnames';
import { POSITION } from 'Services/Banner/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { BannerListing } from 'vinisto_ui';

import ctaStyles from '../cta-styles.module.css';

import { BannerPreviewProps } from './interfaces';
import './styles.css';
import styles from './styles.module.css';
import USPBannerPreview from './Components/USPBannerPreview';
import TopBannerPreview from './Components/TopBannerPreview';

const BannerPreview: FC<BannerPreviewProps> = ({
	selectedImage,
	values,
	className = '',
	...props
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const isPositionBottom = values?.position === POSITION.BOTTOM;
	const isPositionTop = values?.position === POSITION.TOP;
	const isPositionProduct = values?.position === POSITION.PRODUCT;
	const isPositionUSP = values?.position === POSITION.HP_USP;
	const isPositionProductDetailUSP =
		values?.position === POSITION.PRODUCT_DETAIL_USP;
	const isPositionProductList = values?.position === POSITION.PRODUCT_LIST;

	const imageObject = useMemo(() => {
		if (typeof selectedImage === 'string') return selectedImage;
		if (selectedImage === null || selectedImage === undefined) return null;
		return URL.createObjectURL(selectedImage);
	}, [selectedImage]);

	const bottomBannerStyle = useMemo(
		() =>
			isPositionBottom || isPositionProduct
				? {
						backgroundImage:
							imageObject === null ? 'none' : `url(${imageObject})`,
				  }
				: {},
		[isPositionBottom, isPositionProduct, imageObject]
	);

	return (
		<div
			className={cx(
				{
					'banner-image-preview': !(
						isPositionUSP ||
						isPositionProductDetailUSP ||
						isPositionTop
					),
				},
				className,
				ctaStyles.ctaContainer
			)}
			{...props}
		>
			<div
				className={cx('vinisto-card', 'position-relative', {
					'vinisto-small-banner underline-effect underline-effect--white':
						isPositionTop,
					'vinisto-card--cta': isPositionBottom || isPositionProduct,
					'vinisto-card--product': isPositionProduct,
					[styles.bannerListingWrap]: isPositionProductList,
				})}
				style={bottomBannerStyle}
			>
				{isPositionTop && (
					<TopBannerPreview
						imageObject={imageObject}
						values={values}
					/>
				)}
				{isPositionBottom && (
					<>
						<div className={ctaStyles.ctaContainer}>
							<p
								className="vinisto-card__heading h2 w-100"
								style={{
									color: values.titleColor ?? 'rgb(var(--vinisto-color-white))',
								}}
							>
								{values?.title || t({ id: 'admin.modal.banner.title.label' })}
							</p>
							<p
								className="vinisto-card__top-text"
								style={{
									color:
										values.subtitleColor ?? 'rgb(var(--vinisto-color-white))',
								}}
							>
								{values?.subtitle ||
									t({ id: 'admin.modal.banner.subtitle.label' })}
							</p>
						</div>
						<div className="vinisto-card__bottom-link text-right underline-effect underline-effect--white">
							<span
								className={cx(
									'underline-item',
									ctaStyles.ctaStyle,
									ctaStyles[values.buttonStyle]
								)}
							>
								{values?.ctaLabel ||
									t({ id: 'admin.modal.banner.ctaLabel.label' })}{' '}
								&gt;
							</span>
						</div>
					</>
				)}
				{isPositionProduct && (
					<>
						<div className={ctaStyles.ctaContainer}>
							<p
								className="vinisto-card__heading h2 w-100"
								style={{
									color: values.titleColor ?? 'rgb(var(--vinisto-color-white))',
								}}
							>
								{values?.title || t({ id: 'admin.modal.banner.title.label' })}
							</p>
							<p
								className="vinisto-card__top-text"
								style={{
									color:
										values.subtitleColor ?? 'rgb(var(--vinisto-color-white))',
								}}
							>
								{values?.subtitle ||
									t({ id: 'admin.modal.banner.subtitle.label' })}
							</p>
						</div>
						<div className="vinisto-card__bottom-link text-right underline-effect underline-effect--white">
							<span
								className={cx(
									'underline-item',
									ctaStyles.ctaStyle,
									ctaStyles[values.buttonStyle]
								)}
							>
								{values?.ctaLabel ||
									t({ id: 'admin.modal.banner.ctaLabel.label' })}{' '}
								&gt;
							</span>
						</div>
					</>
				)}
				{(isPositionUSP || isPositionProductDetailUSP) && (
					<USPBannerPreview
						imageObject={imageObject}
						values={values}
						position={values?.position}
					/>
				)}
				{isPositionProductList && (
					<BannerListing
						title={values.title}
						titleColor={values.titleColor}
						subtitle={values.subtitle}
						subtitleColor={values.subtitleColor}
						imageUrl={imageObject ?? ''}
						buttonText={values.ctaLabel}
						buttonLink={values.url}
						buttonStyle={values.buttonStyle}
					/>
				)}
				{!values && (
					<>
						<span className="vinisto-small-banner__heading">
							{t({ id: 'admin.modal.banner.title.label' })}
						</span>
						{imageObject !== null && (
							<img
								className="vinisto-small-banner__img"
								src={imageObject}
							/>
						)}
						<span className="vinisto-small-banner__cta">
							{t({ id: 'admin.modal.banner.ctaLabel.label' })}{' '}
							<span className="bolder">&gt;</span>
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default BannerPreview;

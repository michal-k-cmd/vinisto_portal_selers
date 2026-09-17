'use client';

import { useContext, useState } from 'react';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import { LocalizationContext } from 'Services/LocalizationService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { DeviceServiceContext } from 'Services/DeviceService';

import Pretitle from '../Pretitle';
import Heading from '../Heading';

import { GalleryWideProps } from './interfaces';
import styles from './styles.module.css';

const MAX_THUMBNAILS_DESKTOP = 6;
const MAX_THUMBNAIL_MOBILE = 4;

const GalleryWide = ({ heading, pretitle, images }: GalleryWideProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isDesktop } = useContext(DeviceServiceContext);
	const MAX_THUMBNAILS = isDesktop
		? MAX_THUMBNAILS_DESKTOP
		: MAX_THUMBNAIL_MOBILE;
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const openLightbox = (index: number) => {
		setCurrentIndex(index);
		setLightboxOpen(true);
	};

	if (!images || images.length === 0) return null;

	const lightboxSlides = images.map((img) => ({
		src: img.imageSrc,
		alt: img.alt || '',
		title: img.title || '',
	}));

	const thumbnailsToShow = images.slice(0, MAX_THUMBNAILS);
	const extraCount = images.length - MAX_THUMBNAILS;

	return (
		<div className={styles.galleryWrap}>
			<ContainerFullWidth className="text-center">
				{pretitle && <Pretitle pretitle={pretitle} />}
				{heading && <Heading heading={heading} />}
			</ContainerFullWidth>
			<div className={styles.gallery}>
				<button
					className={styles.mainImageWrapper}
					onClick={() => openLightbox(0)}
				>
					<img
						src={images[0].imageSrc}
						alt={images[0].alt || ''}
						className={styles.mainImage}
					/>
				</button>

				<div className={styles.thumbnails}>
					{thumbnailsToShow.map((img, i) => {
						const isLastVisible = i === MAX_THUMBNAILS - 1 && extraCount > 0;
						return (
							<button
								key={'lag' + i}
								className={styles.thumbnailWrapper}
								onClick={() => openLightbox(i)}
							>
								<img
									src={img.previewImageSrc ?? img.imageSrc}
									alt={img.alt || ''}
									className={styles.thumbnail}
								/>
								{isLastVisible && (
									<div className={styles.overlay}>
										<span>
											+ {extraCount} <br />
											{t({ id: 'gallerybig.next' })}
										</span>
									</div>
								)}
							</button>
						);
					})}
				</div>

				<Lightbox
					open={lightboxOpen}
					close={() => setLightboxOpen(false)}
					slides={lightboxSlides}
					index={currentIndex}
				/>
			</div>
		</div>
	);
};

export default GalleryWide;

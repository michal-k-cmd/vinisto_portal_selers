'use client';

import { useState } from 'react';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import AliceCarousel from 'react-alice-carousel';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import Heading from '../Heading';
import Pretitle from '../Pretitle';

import { GalleryWideProps } from './interfaces';
import styles from './styles.module.css';

const GalleryWide = ({ pretitle, heading, images }: GalleryWideProps) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const openLightbox = (index: number) => {
		setCurrentIndex(index);
		setLightboxOpen(true);
	};

	const preparedImages = images.map((image, index) => (
		<button
			key={'lai' + index}
			className={styles.imageWrapper}
			onClick={() => openLightbox(index)}
		>
			<img
				src={image.previewImageSrc ?? image.imageSrc}
				alt={image.alt || ''}
				title={image.title || ''}
				className={styles.image}
			/>
		</button>
	));

	const lightboxSlides = images.map((image) => ({
		src: image.imageSrc,
		alt: image.alt || '',
		title: image.title || '',
	}));

	return (
		<div className={styles.galleryWide}>
			<ContainerFullWidth className="text-center">
				{pretitle && <Pretitle pretitle={pretitle} />}
				{heading && <Heading heading={heading} />}
			</ContainerFullWidth>
			<div className={styles.carouselContainer}>
				<AliceCarousel
					mouseTracking={true}
					disableDotsControls={true}
					disableButtonsControls={true}
					autoPlay={true}
					autoPlayInterval={8000}
					controlsStrategy="alternate"
					infinite
					autoWidth={true}
					autoHeight={true}
					items={preparedImages}
				/>
			</div>
			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				slides={lightboxSlides}
				index={currentIndex}
			/>
		</div>
	);
};

export default GalleryWide;

export type GalleryImage = {
	imageSrc: string;
	previewImageSrc?: string;
	title?: string;
	alt?: string;
};

export interface GalleryWideProps {
	pretitle?: string;
	heading?: string;
	images: GalleryImage[];
}

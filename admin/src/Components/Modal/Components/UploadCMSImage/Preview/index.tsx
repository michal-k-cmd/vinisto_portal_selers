import { ImagePreviewProps } from './interfaces';

const ImagePreview = ({ selectedImage }: ImagePreviewProps) => {
	if (!selectedImage) {
		return <></>;
	}

	return (
		<img
			src={selectedImage}
			alt="Preview"
			className="image-preview"
		/>
	);
};

export default ImagePreview;

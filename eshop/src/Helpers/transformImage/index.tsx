const transformImage = (
	image: string,
	width: number | string = 'auto',
	format: string = 'jpeg'
) => {
	if (!image) return;

	const enabled = process.env.NEXT_PUBLIC_IMAGE_TRANSFORM_ENABLED || true;
	const buildBaseUrl = process.env.NEXT_PUBLIC_BASE_URI;
	const dev = buildBaseUrl?.match(/(localhost)/);

	if (dev) return image;
	if (!enabled) return image;

	// call cloudflare runtime transform api for image
	return `/cdn-cgi/image/width=${width},format=${format}/${image}`;
};

export default transformImage;

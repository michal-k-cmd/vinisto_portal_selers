import { ImageLocalProps } from './interfaces';

const ImageLocal = ({
	fileName = '',
	alt = '',
	title = '',
	className,
	fallback = null,
	...props
}: ImageLocalProps) => {
	if (fileName === null || fileName === '') return <>{fallback}</>;

	return (
		<img
			{...props}
			alt={alt}
			title={title}
			className={className}
			src={`/assets/images/${fileName}`}
		/>
	);
};

export default ImageLocal;

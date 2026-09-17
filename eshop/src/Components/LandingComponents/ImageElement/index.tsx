import { ImageElementProps } from './interfaces';
import styles from './styles.module.css';

const ImageElement = ({
	imgSource,
	imgAlt,
	imgTitle,
	align,
}: ImageElementProps) => {
	return (
		<div className={styles.imageContainer}>
			<img
				src={imgSource}
				alt={imgAlt}
				title={imgTitle}
				className={styles.image}
				style={align ? { textAlign: align } : undefined}
			/>
		</div>
	);
};

export default ImageElement;

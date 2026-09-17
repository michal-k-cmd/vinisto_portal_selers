import styles from './styles.module.css';

const ImagePreview = ({ image }: { image: string | File }) => {
	const src = image instanceof File ? URL.createObjectURL(image) : image;

	return (
		<div className={styles.container}>
			<a
				href={src}
				target="_blank"
				rel="noreferrer"
				className={styles.link}
			>
				<img
					src={src}
					className={styles.image}
				/>
			</a>
		</div>
	);
};

export default ImagePreview;

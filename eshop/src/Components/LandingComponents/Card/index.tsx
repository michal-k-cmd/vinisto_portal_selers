import { CardProps } from './interfaces';
import styles from './styles.module.css';

const Card = ({
	title,
	text,
	textAlign = 'left',
	imageUrl,
	imageAlt,
	imageTitle,
}: CardProps) => {
	return (
		<div
			className={styles.card}
			style={{ textAlign: textAlign }}
		>
			<h3 className={styles.title}>{title}</h3>
			<div className={styles.text}>{text}</div>
			<div className={styles.imageContainer}>
				<img
					className={styles.image}
					src={imageUrl}
					alt={imageAlt}
					title={imageTitle}
				/>
			</div>
		</div>
	);
};

export default Card;

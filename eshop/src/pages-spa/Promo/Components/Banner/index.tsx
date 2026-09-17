import styles from '../../styles.module.css';

interface BannerProps {
	title: string | undefined;
	subtitle?: string;
	url?: string;
	imageUrl?: string;
}

const Banner = ({ title, subtitle, imageUrl, url }: BannerProps) => {
	return (
		<a
			className={styles.usp}
			href={url}
		>
			{imageUrl && (
				<div className={styles.uspIcon}>
					<img
						src={process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI + imageUrl}
						className={styles.uspIconImg}
					/>
				</div>
			)}
			<div className={styles.uspName}>{title}</div>
			<div className={styles.uspText}>{subtitle}</div>
		</a>
	);
};

export default Banner;

import cx from 'classnames';
import Link from 'next/link';
import type {
	PromoBlockCategoryLinkComponent,
	PromoBlockProductComponent,
} from 'vinisto_api_client/src/api-types/strapi-api';

import styles from '../../styles.module.css';

type OfferProps = {
	title: string | undefined;
	promoText?: string;
	imageUrl?: string;
	categoryLinks?: PromoBlockCategoryLinkComponent[];
	products?: PromoBlockProductComponent[];
};

const Offer = ({
	title,
	promoText,
	imageUrl,
	categoryLinks = [],
	products = [],
}: OfferProps) => {
	const imageBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI;

	const renderCategoryLinks = () => (
		<div className={styles.hotLinks}>
			{categoryLinks.map((link, index) => (
				<Link
					href={link.Link || '/'}
					className={cx(link.Icon ? styles.hotLink : styles.link)}
					key={`promo-category-${index}`}
				>
					{link.Icon && (
						<img
							src={`${imageBaseUrl}${link.Icon.url}`}
							alt={link.Title}
							className={styles.hotLinkImg}
						/>
					)}
					{link.Icon ? (
						<div className={styles.hotLinkText}>{link.Title}</div>
					) : (
						link.Title
					)}
				</Link>
			))}
		</div>
	);

	const renderProducts = () =>
		products && (
			<div className={styles.container}>
				<div className={styles.products}>
					{products.map((product, index) => (
						<Link
							href={product.Link || '/'}
							className={styles.product}
							key={`promo-product-${index}`}
						>
							{product.Image && (
								<img
									src={`${imageBaseUrl}${product.Image.url}`}
									alt={product.Title}
									className={styles.productImg}
								/>
							)}
							<div className={styles.productName}>{product.Title}</div>
							<div className={styles.productText}>{product.Text}</div>
						</Link>
					))}
				</div>
			</div>
		);

	return (
		<>
			<div className={styles.container}>
				<h2 className={styles.h2}>{title}</h2>
				<div className={styles.wrap}>
					<div>
						<img
							src={`${imageBaseUrl}${imageUrl}`}
							alt={title}
							className="mw-100"
						/>
					</div>
					<div className="w-100">
						{promoText && <div className={styles.text}>{promoText}</div>}
						{renderCategoryLinks()}
					</div>
				</div>
			</div>
			{renderProducts()}
		</>
	);
};

export default Offer;

'use client';

import { useQuery } from '@tanstack/react-query';
import StrapiService from 'vinisto_api_client/src/strapi-service';
import NotFoundPage from 'pages-spa/NotFound';

import styles from './styles.module.css';
import Banner from './Components/Banner';
import Offer from './Components/Offer';

const imageBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI;

const PromoPage = ({ code }: { code: string }) => {
	const { data: promo, isLoading } = useQuery(['promo', code], async () => {
		const promo = await StrapiService.getPromos(code);
		if (!promo?.data?.data || promo?.data?.data?.length === 0) {
			return null;
		}
		return promo.data.data[0];
	});

	if (!isLoading && !promo) {
		return <NotFoundPage />;
	}

	return (
		<section id="content-wrapper">
			{promo && (
				<>
					<div
						className={styles.main}
						style={{
							backgroundImage: `url('${imageBaseUrl}${promo.HeroImage?.url}')`,
						}}
					>
						<h1 className={styles.h1}>{promo.Title}</h1>
						<div className={styles.uspWrap}>
							{promo.Banners?.map((banner, index) => (
								<Banner
									key={`promo-banner-${index}`}
									title={banner.Title}
									subtitle={banner.Text}
									url={banner.Link}
									imageUrl={banner.Icon?.url}
								/>
							))}
						</div>
					</div>
					{promo.PromoBlocks?.map((offer, index) => (
						<Offer
							key={`promo-offer-${index}`}
							title={offer.Title}
							promoText={offer.PromoText}
							imageUrl={offer.Image?.url}
							categoryLinks={offer.CategoryLinks}
							products={offer.Products}
						/>
					))}
				</>
			)}
		</section>
	);
};

export default PromoPage;

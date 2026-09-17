import usePromotionAnalytics from 'Hooks/usePromotionAnalytics';
import BannerListingNext from 'vinisto_ui/src/components/banner-listing-next';
import { Banner } from 'Services/Banner/interfaces';

const TrackedProductListingBanner = ({
	banner,
	index,
}: {
	banner: Banner;
	index: number;
}) => {
	const { promotionRef, handleSelectPromotion } =
		usePromotionAnalytics<HTMLDivElement>({
			promotion_id: `${banner.position}-${banner.order ?? index}-${banner.url}`,
			promotion_name: banner.title,
			creative_name: banner.imageUrl || banner.imageOriginalUrl,
			creative_slot: banner.position,
		});

	return (
		<div
			ref={promotionRef}
			onClick={handleSelectPromotion}
		>
			<BannerListingNext
				{...banner}
				buttonText={banner.ctaLabel}
				buttonLink={banner.url}
			/>
		</div>
	);
};

export default TrackedProductListingBanner;

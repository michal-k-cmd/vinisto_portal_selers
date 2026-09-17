'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import CarouselSection from 'Components/CarouselSection';
import { WarehouseContext } from 'Services/WarehouseService';
import AliceCarousel from 'react-alice-carousel';
import { DeviceServiceContext } from 'Services/DeviceService';
import cx from 'classnames';
import Link from 'next/link';

import ProductCard from '../ProductCard';
import Pretitle from '../Pretitle';
import Heading from '../Heading';

import styles from './styles.module.css';

import { ContentProductsListComponent } from '@/api-types/strapi-api';
import api from '@/api';
import { ProductApi } from '@/api-types/product-api';
import { bundleAdapter } from '@/index';

import 'react-alice-carousel/lib/alice-carousel.css';

const PRODUCER_PAGE_URL = '/kategorie/vina/Vyrobce/aaldering/Vyrobce/';

interface ProductListProps {
	data: ContentProductsListComponent;
	slug: string;
}

const ProductListSection = ({ data, slug }: ProductListProps) => {
	const {
		Title,
		Subtitle,
		Products,
		Product_card_style,
		Show_all_products_link,
	} = data;
	const {
		activeCurrency: { currency },
		countryOfSale,
		useFormatMessage,
	} = useContext(LocalizationContext);
	const { fetchQuantity } = useContext(WarehouseContext);
	const { isDesktop } = useContext(DeviceServiceContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const t = useFormatMessage();

	const { data: bundles } = useQuery({
		queryKey: ['products', Products, { currency, countryOfSale, priceLevel }],
		queryFn: async () => {
			const res = await api.get<
				ProductApi.BundlesByIdsList.ResponseBody,
				ProductApi.BundlesByIdsList.RequestQuery
			>('product-api/bundles/by-ids', {
				bundleIds: Products?.map((product) => product.Product_id).filter(
					Boolean
				) as string[],
				isMainImagesOnly: true,
				currency: currency,
				countryOfSale,
			});

			fetchQuantity(res.bundles?.map((bundle) => bundle.id) ?? []);

			// Preserve original order from Strapi Products array
			const originalOrderIds = (Products || [])
				.map((p) => p.Product_id)
				.filter(Boolean) as string[];
			const bundleMap = new Map(
				(res.bundles || []).map((b) => [String(b.id), b])
			);
			// Order according to original list; skip missing; then append any extras not referenced.
			const ordered = originalOrderIds
				.map((id) => bundleMap.get(String(id)))
				.filter(Boolean) as NonNullable<typeof res.bundles>;
			return ordered.map((bundle) =>
				bundleAdapter.fromApi(bundle, {
					currency,
					customerPriceLevel: priceLevel,
				})
			);
		},
	});

	const ListComponent: React.ReactNode = useMemo(() => {
		const shouldShowAllProductsLink = Show_all_products_link !== false;

		if (Product_card_style === 'carousel') {
			return (
				<div className={styles.carouselWrapper}>
					<CarouselSection
						data={bundles}
						title={''}
						analyticsListId="landing_product_list"
					/>
				</div>
			);
		}

		if (!isDesktop) {
			return (
				<div className={styles.mobileWrapper}>
					<AliceCarousel
						responsive={{
							'0': { items: 1 },
						}}
						items={bundles?.map((bundle) => (
							<ProductCard
								key={bundle.id || 'lapcm'}
								bundle={bundle}
								type={Product_card_style}
							/>
						))}
					/>
				</div>
			);
		}

		return (
			<div className={styles.desktopWrapper}>
				<div
					className={
						Product_card_style === 'fill width'
							? styles.fillWidthWrapper
							: styles.halfWidthWrapper
					}
				>
					{bundles?.map((bundle) => (
						<ProductCard
							key={bundle.id || 'lapcd'}
							bundle={bundle}
							type={Product_card_style}
						/>
					))}
				</div>
				{shouldShowAllProductsLink && (
					<div className={styles.allProductsLinkWrapper}>
						<Link
							className={styles.allProductsLink}
							href={`${PRODUCER_PAGE_URL}${slug}`}
						>
							{t({ id: 'producer.allProducts' })}
						</Link>
					</div>
				)}
			</div>
		);
	}, [bundles, Product_card_style, Show_all_products_link, isDesktop, slug, t]);

	return (
		<div
			className={cx(styles.wrapper, {
				container: Product_card_style !== 'carousel',
			})}
		>
			<div
				className={cx({
					container: Product_card_style === 'carousel',
				})}
			>
				{Title && <Pretitle pretitle={Title} />}
				{Subtitle && <Heading heading={Subtitle} />}
			</div>
			{ListComponent}
		</div>
	);
};

export default ProductListSection;

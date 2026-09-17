'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { DeviceServiceContext } from 'Services/DeviceService';
import cx from 'classnames';
import CarouselSection from 'Components/CarouselSection';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import Heading from '../Heading';

import styles from './styles.module.css';

import api from '@/api';
import {
	ProductApi,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';

import 'react-alice-carousel/lib/alice-carousel.css';

interface Props {
	heading: string;
	tagId: string;
}

const ProductsByTag = ({ heading, tagId }: Props) => {
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = useContext(LocalizationContext);
	const { fetchQuantity } = useContext(WarehouseContext);
	const { isDesktop } = useContext(DeviceServiceContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const queryKey = [
		'products-by-tag',
		{ tagId, currency, countryOfSale, priceLevel },
	];

	const { data: bundles } = useQuery({
		queryKey: queryKey,
		queryFn: async () => {
			const res = await api.post<
				ProductApi.BundlesByIdsList.ResponseBody,
				VinistoProductDllModelsApiBundleBundlesGetParameters
			>('product-api/bundles/get-bundles', undefined, {
				tagId,
				isMainImagesOnly: true,
				currency: currency,
				countryOfSale,
				Limit: 20,
				isTemporaryUnavailable: false,
				isInStock: true,
			});

			fetchQuantity(res.bundles?.map((bundle) => bundle.id) ?? []);

			return (res.bundles || []).map((bundle) =>
				bundleAdapter.fromApi(bundle, {
					currency,
					customerPriceLevel: priceLevel,
				})
			);
		},
	});

	const ListComponent: React.ReactNode = useMemo(() => {
		if (!isDesktop) {
			return (
				<div className={styles.carouselWrapper}>
					<CarouselSection
						centered={true}
						data={bundles}
						title={''}
						analyticsListId={`landing_tag_${tagId}`}
					/>
				</div>
			);
		}

		return (
			<div className={styles.carouselWrapper}>
				<CarouselSection
					centered={true}
					data={bundles}
					title={''}
					analyticsListId={`landing_tag_${tagId}`}
				/>
			</div>
		);
	}, [bundles, isDesktop, tagId]);

	return (
		<div className={cx(styles.wrapper, 'container')}>
			{heading && <Heading heading={heading} />}
			{ListComponent}
		</div>
	);
};

export default ProductsByTag;

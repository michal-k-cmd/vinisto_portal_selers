import { Form, Input } from 'Components/Form';
import { useMemo } from 'react';

import { LowestPriceProps } from './interfaces';

import { bundleAdapter } from '@/index';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const LowestPrice = ({ bundle, identicalBundles }: LowestPriceProps) => {
	const bundlePrices = bundle
		? bundleAdapter.fromApi(bundle, {
				currency: VinistoHelperDllEnumsCurrency.CZK,
		  }).bundlePrices
		: null;

	const { basePrice } = bundlePrices ?? {};

	const lowestPriceWithVat = useMemo(() => {
		const bundlesSortedByLowestStandardPrice = [
			bundle,
			...(identicalBundles ?? []),
		]
			.map((bundleItem) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const bundlePrices = bundleAdapter.fromApi(bundleItem!, {
					currency: VinistoHelperDllEnumsCurrency.CZK,
				}).bundlePrices;
				const { discountedPrice, basePrice } = bundlePrices ?? {};
				return bundlePrices.isDiscounted
					? discountedPrice!.valueWithVat
					: basePrice!.valueWithVat;
			})
			.sort((a, b) => a - b);

		return bundlesSortedByLowestStandardPrice[0] ?? basePrice?.valueWithVat;
	}, [basePrice?.valueWithVat, bundle, identicalBundles]);

	return (
		<Form
			initialValues={{
				lowestPrice: lowestPriceWithVat,
				lowestInternetPrice: bundle?.lowestInternetPrice ?? undefined,
			}}
			onSubmit={() => {}}
		>
			{() => (
				<>
					<Input
						type="number"
						identifier="bundleDetail-lowestPrice"
						name="lowestPrice"
						label="bundleDetail.sell.lowestPriceWithVat.label"
						className="flex-grow-1"
						disabled
					/>
					<Input
						type="number"
						identifier="bundleDetail-lowestInternetPrice"
						name="lowestInternetPrice"
						label="bundleDetail.sell.lowestInternetPrice.label"
						className="flex-grow-1"
						disabled
					/>
				</>
			)}
		</Form>
	);
};

export default LowestPrice;

import { useContext } from 'react';
import cx from 'classnames';
import { VinistoProductDllModelsApiBundleBundle as BundleApiModel } from 'vinisto_api_client/src/api-types/product-api/';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	IS_CLEARANCE_SALE,
	IS_DELETED,
	TEMPORARY_UNAVAILABLE,
} from 'Constants/flags';
import BundleFlagsWarning from 'Components/Warning/BundleFlagsWarning';

import styles from './styles.module.css';

import { bundleAdapter } from '@/index';

type BundleOptionProps = {
	bundle: BundleApiModel;
	label: string;
};

const BundleOption = ({ bundle, label }: BundleOptionProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;

	const supplierLabel = `${bundle.supplier?.nameWeb}, ${
		bundle.availableCount
	} ${t({ id: 'unit' })}`;

	const { bundlePrices } = bundleAdapter.fromApi(bundle, { currency });

	return (
		<div
			className={cx(styles.wrapper, {
				[styles.bg_warning]:
					bundle.flags.isTemporaryUnavailable ||
					bundle.flags.isDeleted ||
					bundle.flags.isClearanceSale,
			})}
		>
			{label} ({supplierLabel},{' '}
			{bundlePrices.discountedPrice && (
				<span className={styles.discount}>
					{bundlePrices.discountedPrice.valueWithVat}{' '}
					{bundlePrices.discountedPrice.currency}{' '}
				</span>
			)}
			<span className={bundlePrices.isDiscounted ? styles.crossed : ''}>
				{bundlePrices.basePrice.valueWithVat} {bundlePrices.basePrice.currency}
			</span>
			)
			<BundleFlagsWarning
				flags={{
					[TEMPORARY_UNAVAILABLE]: bundle.flags.isTemporaryUnavailable,
					[IS_DELETED]: bundle.flags.isDeleted,
					[IS_CLEARANCE_SALE]: bundle.flags.isClearanceSale,
				}}
			/>
		</div>
	);
};

export default BundleOption;

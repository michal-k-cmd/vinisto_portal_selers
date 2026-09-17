import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiHomePageItem,
} from 'vinisto_api_client/src/api-types/product-api/';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantity } from 'vinisto_api_client/src/api-types/warehouse-api/';
import DeleteIcon from 'Components/Icons/Delete';
import BundleFlagsWarning from 'Components/Warning/BundleFlagsWarning';
import {
	IS_CLEARANCE_SALE,
	IS_DELETED,
	TEMPORARY_UNAVAILABLE,
} from 'Constants/flags';

import useBundleItem from './useBundleItem';
import styles from './styles.module.css';

import { bundleAdapter } from '@/index';

interface BundleItemProps {
	bundle: VinistoProductDllModelsApiBundleBundle;
	idSequenceMap?: VinistoProductDllModelsApiHomePageItem;
	onRemove?: (id: string) => void;
	availableCount?: number;
}

/**
 * @param bundle - bundle object
 * @param idSequenceMap - object with id and sequence number
 * @param availableCount - available count of bundle
 * @param onRemove - if provided, renders remove button with this callback
 */
const BundleItem = ({
	bundle,
	idSequenceMap,
	availableCount,
	onRemove,
}: BundleItemProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const {
		activeCurrency: { currency },
	} = localizationContext;

	const { id, name, supplier, sequenceNumber, bundleImage } = useBundleItem(
		bundle,
		idSequenceMap
	);

	const { bundlePrices } = bundleAdapter.fromApi(bundle, { currency });

	return (
		<div className={styles.topWrapper}>
			<div className={styles.orderItemWrap}>
				{onRemove && (
					<DeleteIcon
						className={styles.orderItemCloseBtnIcon}
						onClick={() => onRemove(id)}
					/>
				)}
				<Link
					to={`/bundle-detail/${id}`}
					className={styles.orderItem}
				>
					<div className={styles.orderItemPhoto}>
						<img
							src={bundleImage}
							alt={name}
						/>
					</div>
					<div className={styles.orderItemInfo}>
						<h6 className={styles.orderItemInfoName}>{name}</h6>
						<p className={styles.orderItemInfoItem}>
							{t({ id: 'bundle.item.seller' })} {supplier}
						</p>
						{bundlePrices.discountedPrice ? (
							<p className={styles.orderItemInfoItemDiscounted}>
								{t({ id: 'bundle.item.price' })}
								<span
									className={styles.discountPrice}
								>{`${bundlePrices.discountedPrice.valueWithVat} ${bundlePrices.discountedPrice.currency}`}</span>
								<span
									className={styles.crossedOutPrice}
								>{`${bundlePrices.basePrice.valueWithVat} ${bundlePrices.basePrice.currency}`}</span>
							</p>
						) : (
							<p className={styles.orderItemInfoItem}>
								{t({ id: 'bundle.item.price' })}{' '}
								{`${bundlePrices.basePrice.valueWithVat} ${bundlePrices.basePrice.currency}`}
							</p>
						)}
						<p className={styles.orderItemInfoItem}>
							{t({ id: 'bundle.item.warehouseCount' })} {availableCount}
						</p>
						{sequenceNumber && (
							<p className={styles.orderItemInfoItem}>
								{t({ id: 'bundle.item.sequenceNumber' })}: {sequenceNumber}
							</p>
						)}
					</div>
				</Link>
			</div>

			<BundleFlagsWarning
				className={styles.bg_warning}
				flags={{
					[TEMPORARY_UNAVAILABLE]: bundle.flags.isTemporaryUnavailable,
					[IS_DELETED]: bundle.flags.isDeleted,
					[IS_CLEARANCE_SALE]: bundle.flags.isClearanceSale,
				}}
			/>
		</div>
	);
};

interface BundleItemListProps {
	bundles: VinistoProductDllModelsApiBundleBundle[];
	idSequenceMaps?: VinistoProductDllModelsApiHomePageItem[];
	idAvailableCountMaps?: VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantity[];
	onRemove?: (id: string) => void;
}

/**
 * @param bundles - array of bundles
 * @param idSequenceMaps - array of objects with id and sequence number
 * @param idAvailableCountMaps - array of objects with itemId and quantity
 * @param onRemove - if provided, renders remove button with this callback
 */
const BundleItemList = ({
	bundles,
	idSequenceMaps,
	idAvailableCountMaps,
	onRemove,
}: BundleItemListProps) => {
	return (
		<ul className={styles.bundlesWrap}>
			{bundles.map((bundle) => {
				const idSequenceMap = idSequenceMaps?.find(
					(item) => item.bundleId === bundle.id
				);
				return (
					<li key={`bundle-${bundle.id}`}>
						<BundleItem
							bundle={bundle}
							idSequenceMap={idSequenceMap}
							availableCount={
								idAvailableCountMaps?.find((item) => item.itemId === bundle.id)
									?.quantity
							}
							onRemove={onRemove}
						/>
					</li>
				);
			})}
		</ul>
	);
};

export { BundleItemList, BundleItem };

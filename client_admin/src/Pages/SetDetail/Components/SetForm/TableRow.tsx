import { useContext, useMemo, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { FaPlus } from 'react-icons/fa';
import { EditIcon } from 'Components/Icons';
import cx from 'classnames';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import styles from '../../styles.module.css';
import AddBundleModal from '../AddBundleModal/modal';
import AddBundleSearch from '../AddBundleModal/search';

import { getBundleImage, IMAGE_SIZE_THUMB_64x80 } from '@/image-service';
import { Bundle } from '@/domain/bundle';
import { VinistoHelperDllEnumsBundleBundleState } from '@/api-types/product-api';

interface Props {
	bundle?: Bundle | null;
	isFreeSpacer?: boolean;
	onAddProduct?: (bundle: Bundle | null) => void;
	rowNumber?: number;
	stockData?: number;
	state?: `${VinistoHelperDllEnumsBundleBundleState}`;
}

export const TableRow: React.FC<Props> = ({
	bundle,
	isFreeSpacer = false,
	onAddProduct,
	rowNumber,
	stockData,
	state,
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const [isModalOpened, setIsModalOpened] = useState(false);

	const handleAddProduct = (bundle: Bundle) => {
		onAddProduct?.(bundle);
	};

	const getLocalizedValue = useLocalizedValue();

	const price = useMemo(() => {
		if (!bundle) return '';

		return bundle.bundlePrices?.basePrice?.getFormatedValueWithVat();
	}, [bundle]);

	const b2bPrice = useMemo(() => {
		const price = bundle?.prices.find((price) => price.platformId === 1);
		if (!price) return '';
		return price.getFormatedValueWithVat();
	}, [bundle]);

	if (isFreeSpacer) {
		return (
			<tr className={cx(styles.tableRow, styles.freeProduct)}>
				<td colSpan={8}>
					<span className={styles.freeSpacerRow}>
						{t({ id: 'set.form.freeSet' })}
					</span>
				</td>
			</tr>
		);
	}

	if (bundle) {
		return (
			<tr className={styles.tableRow}>
				<td>{rowNumber}.</td>
				<td>
					<img
						src={getBundleImage(bundle.images ?? [], IMAGE_SIZE_THUMB_64x80)}
						// @ts-expect-error incompatible types accross packages
						alt={getLocalizedValue(bundle.name ?? [])}
					/>
				</td>
				<td>{bundle.warehouseId.join(', ')}</td>
				{/* @ts-expect-error incompatible types accross packages */}
				<td>{getLocalizedValue(bundle.name ?? [])}</td>
				<td>{price}</td>
				<td>{b2bPrice}</td>
				<td>{stockData}</td>
				<td>
					{state === VinistoHelperDllEnumsBundleBundleState.Concept && (
						<button
							type="button"
							className="btn"
							onClick={() => onAddProduct?.(null)}
						>
							<EditIcon />
						</button>
					)}
				</td>
			</tr>
		);
	}

	return (
		<>
			<tr
				className={cx(styles.tableRow, styles.clickableRow)}
				onClick={() => setIsModalOpened(true)}
			>
				<td>{rowNumber}.</td>
				<td colSpan={7}>
					<span className={styles.addProductRow}>
						<FaPlus size={14} />
						{t({ id: 'set.form.addSet' })}
					</span>
				</td>
			</tr>
			<AddBundleModal
				isOpen={isModalOpened}
				handleClose={() => setIsModalOpened(false)}
			>
				<AddBundleSearch handleAddProduct={handleAddProduct} />
			</AddBundleModal>
		</>
	);
};

import useTableSchema from 'Hooks/useTableSchema';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { Device } from 'Services/DeviceService/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { IN_STOCK_COLUMN } from 'Pages/BundleList/constants';
import {
	getBundleImage,
	IMAGE_SIZE_THUMB_64x80,
} from 'vinisto_api_client/src/image-service';

import styles from './styles.module.css';
import { SET_LIST_COLUMN, SetListTableRow } from './interfaces';

import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantity } from '@/api-types/warehouse-api';
import { Bundle } from '@/domain/bundle';

export const useBundlesTableSchema = ({
	stockData,
	isStockDataLoading,
	handleAddProduct,
}: {
	stockData?:
		| VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantity[]
		| null;
	isStockDataLoading: boolean;
	handleAddProduct: (bundle: Bundle) => void;
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const getTableSchema = useTableSchema<SetListTableRow>();

	const getLocalizedValue = useLocalizedValue();

	const t = useFormatMessage();

	const tableSchema: TableSchema<SetListTableRow> = [
		{
			header: ``,
			id: SET_LIST_COLUMN.IMAGE,
			cell: ({ row }) => {
				const image = getBundleImage(
					row.original.images ?? [],
					IMAGE_SIZE_THUMB_64x80
				);

				if (!image) return '';

				return (
					<div className={styles.productImage}>
						<img
							src={image}
							alt={`${row.original.name}`}
							className={styles.productImage}
						/>
					</div>
				);
			},
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({
				id: 'bundleList.identifier.warehouse',
				defaultMessage: 'ID ve skladu',
			})}`,
			id: SET_LIST_COLUMN.ID,
			accessorKey: SET_LIST_COLUMN.ID,
			accessorFn: (row) => row.warehouseId.join(', '),
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			enableSorting: false,
			enableColumnFilter: false,
		},
		{
			header: `${t({
				id: 'set.header.name',
				defaultMessage: 'Název setu',
			})}`,
			id: SET_LIST_COLUMN.NAME,
			// @ts-expect-error incompatible types accross packages
			accessorFn: (row) => getLocalizedValue(row.name),
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			enableSorting: false,
			enableColumnFilter: false,
		},

		{
			header: `${t({
				id: 'set.header.price',
				defaultMessage: 'Cena',
			})}`,
			id: SET_LIST_COLUMN.PRICE_B2C,
			accessorFn: (ctx) => {
				const { bundlePrices } = ctx ?? {};

				if (!bundlePrices.basePrice) return '';

				return bundlePrices.basePrice.getFormatedValueWithVat();
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.inStock' })}`,
			id: IN_STOCK_COLUMN,
			cell: ({ row }) => {
				return isStockDataLoading
					? t({ id: 'bundleList.inStock.loading' })
					: stockData?.find((bundle) => bundle.itemId === row.id)?.quantity;
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: '',
			id: 'placeholder',
			cell: ({ row }) => (
				<div className="text-end">
					<button
						className="btn btn-primary"
						onClick={() => handleAddProduct(row.original)}
					>
						{t({ id: 'set.form.addSet' })}
					</button>
				</div>
			),
			devices: [Device.TABLET, Device.DESKTOP, Device.MOBILE],
		},
	];

	return getTableSchema(tableSchema);
};

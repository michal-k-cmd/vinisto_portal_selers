import { Column, Row } from '@tanstack/react-table';
import AdminTable from 'Components/AdminTable';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { EDIT_ALLOWED_VALUE_IN_SPECIFICATION } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import useAdminTable from 'Hooks/useAdminTable';
import MetaColumn from 'Pages/SpecificationDetail/Components/MetaColumn';
import { EditSpecificationValueMutation } from 'Pages/SpecificationDetail/Components/Values';
import {
	VinistoImageDllModelsApiImageImage,
	VinistoImageDllModelsApiImageSvgImage,
} from 'vinisto_api_client/src/api-types/image-api/';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useMemo } from 'react';

import styles from './styles.module.css';

interface SpecificationAllowedValuesTableData {
	id: string;
	key?: string;
	name: string;
	valueName: string;
	metaDescription: string;
	description: string;
	icons: VinistoImageDllModelsApiImageSvgImage[];
	images: VinistoImageDllModelsApiImageImage[];
	score: number;
}

interface SpecificationAllowedValuesListProps {
	data: SpecificationAllowedValuesTableData[];
	editSpecificationValueMutation: EditSpecificationValueMutation;
	handleDeleteSpecificationValue: (valueName: string) => void;
}

const Table = ({
	data,
	editSpecificationValueMutation,
	handleDeleteSpecificationValue,
}: SpecificationAllowedValuesListProps) => {
	const { handlers } = useAdminTable();
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const adminTableSchema = useMemo(
		() => [
			{
				header: `${t({ id: 'nameOf' })}`,
				accessorKey: 'name',
				size: 250,
				enableColumnFilter: true,
			},
			{
				header: `${t({ id: 'url' })}`,
				accessorKey: 'valueName',
				size: 250,
				enableColumnFilter: true,
			},
			{
				header: `${t({ id: 'metaDescription' })}`,
				accessorKey: 'metaDescription',
				size: 300,
				enableColumnFilter: false,
				enableSorting: false,
				cell: ({
					row,
					column,
				}: {
					row: Row<SpecificationAllowedValuesTableData>;
					column: Column<SpecificationAllowedValuesTableData, unknown>;
				}) => {
					return (
						<div
							{...(!row.getIsExpanded() && {
								className: styles.truncated,
								style: { maxWidth: `calc(${column.getSize()}px - 1.5rem)` },
							})}
						>
							{row.original.metaDescription}
						</div>
					);
				},
			},
			{
				header: `${t({ id: 'description' })}`,
				accessorKey: 'description',
				size: 300,
				enableColumnFilter: false,
				enableSorting: false,
				cell: ({
					row,
					column,
				}: {
					row: Row<SpecificationAllowedValuesTableData>;
					column: Column<SpecificationAllowedValuesTableData, unknown>;
				}) => {
					return (
						<div
							{...(!row.getIsExpanded() && {
								className: styles.truncated,
								style: { maxWidth: `calc(${column.getSize()}px - 1.5rem)` },
							})}
						>
							{row.original.description}
						</div>
					);
				},
			},
			{
				header: `${t({ id: 'icon' })}`,
				accessorKey: 'icon',
				size: 48,
				enableColumnFilter: false,
				enableSorting: false,
				cell: ({ row }: { row: Row<SpecificationAllowedValuesTableData> }) => {
					const { icons = [] } = row.original;

					return icons.length > 0 ? (
						<a
							href={`${icons[0].url}`}
							target="_blank"
							rel="noreferrer"
						>
							<img
								src={icons[0].url ?? ''}
								alt=""
							/>
						</a>
					) : null;
				},
			},
			{
				header: `${t({ id: 'image' })}`,
				accessorKey: 'image',
				size: 48,
				enableColumnFilter: false,
				enableSorting: false,
				cell: ({ row }: { row: Row<SpecificationAllowedValuesTableData> }) => {
					const { images = [] } = row.original;
					return images.length > 0 ? (
						<a
							// @ts-expect-error TODO fix
							href={`${images[0].domainUrls?.original_png}`}
							target="_blank"
							rel="noreferrer"
						>
							<img
								// @ts-expect-error TODO fix
								src={images[0].domainUrls?.thumb_64x80 ?? ''}
								alt=""
							/>
						</a>
					) : null;
				},
			},
			{
				header: `${t({ id: 'score' })}`,
				accessorKey: 'score',
				size: 80,
				enableColumnFilter: false,
			},
			{
				accessorKey: '',
				id: 'meta',
				cell: ({ row }: { row: Row<SpecificationAllowedValuesTableData> }) => {
					return (
						<MetaColumn<SpecificationAllowedValuesTableData>
							row={row}
							handleEdit={() => {
								modalContext.handleOpenModal(
									EDIT_ALLOWED_VALUE_IN_SPECIFICATION,
									{
										...row.original,
										editSpecificationValueMutation,
									}
								);
							}}
							handleDelete={() =>
								handleDeleteSpecificationValue(row.original.id)
							}
						/>
					);
				},
				size: 240,
				enableColumnFilter: false,
			},
		],
		[
			editSpecificationValueMutation,
			handleDeleteSpecificationValue,
			modalContext,
			t,
		]
	);

	return (
		<AdminTable<SpecificationAllowedValuesTableData>
			columns={adminTableSchema}
			{...handlers}
			data={data}
			variant={AdminTableVariants.DETAIL_STYLE}
		/>
	);
};

export default Table;

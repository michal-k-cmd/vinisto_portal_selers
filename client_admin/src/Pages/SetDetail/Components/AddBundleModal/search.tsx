import React, { useContext, useState } from 'react';
import AdminListPage from 'Components/AdminListPage';
import { LocalizationContext } from 'Services/LocalizationService';
import useDebounce from 'Hooks/useDebounce';
import Input from 'Components/Input';

import { useBundlesTableData } from './use-table-data';
import { useBundlesTableSchema } from './use-table-schema';
import { SetListTableRow } from './interfaces';
import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';

interface Props {
	handleAddProduct: (bundle: Bundle) => void;
}

const AddBundleSearch = ({ handleAddProduct }: Props) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const [searchName, setSearchName] = useState('');

	const debouncedSearchName = useDebounce(searchName, 250);

	const {
		state,
		handlers,
		pageCount,
		pageNumber,
		stockData,
		isStockDataLoading,
	} = useBundlesTableData({
		searchName: debouncedSearchName,
	});

	const adminTableSchema = useBundlesTableSchema({
		stockData,
		isStockDataLoading,
		handleAddProduct,
	});

	return (
		<div>
			<div className={styles.searchWrapper}>
				<Input
					type="text"
					value={searchName}
					setValue={setSearchName}
					placeholder={`${t({
						id: 'set.detail.modal.addBundle.search',
						defaultMessage: 'Hledat produkty',
					})}`}
				/>
			</div>
			<AdminListPage<SetListTableRow>
				adminTableSchema={adminTableSchema}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
			/>
		</div>
	);
};

export default AddBundleSearch;

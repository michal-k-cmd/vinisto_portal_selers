import { useCallback, useContext, useEffect, useState } from 'react';
import { CFormInput } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import useDebounce from 'Hooks/useDebounce';

import styles from './styles.module.css';

interface TextFilterProps {
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const TextFilter = (props: TextFilterProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const onChange = useCallback((value: string) => props.onChange(value), []);

	const [searchValue, setSearchValue] = useState<string>(props.value || '');

	const debouncedValue = useDebounce(searchValue, 250);

	useEffect(() => {
		onChange(debouncedValue);
	}, [debouncedValue, onChange]);

	useEffect(() => {
		if (props.value !== searchValue) {
			setSearchValue(props.value || '');
		}
	}, [props.value]);

	return (
		<div
			className={styles.wrapper}
			onClick={(event) => event.stopPropagation()}
		>
			<CFormInput
				placeholder={`${t({ id: 'admin.table.search.placeholder' })}`}
				onChange={(event) => setSearchValue(event.target.value)}
				value={searchValue}
				type="search"
			/>
		</div>
	);
};

export default TextFilter;

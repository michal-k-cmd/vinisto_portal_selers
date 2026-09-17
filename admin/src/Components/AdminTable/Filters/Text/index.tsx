import type { FC } from 'react';
import { useContext } from 'react';
import { CFormInput } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import { TextFilterProps } from './interfaces';
import styles from './styles.module.css';

const TextFilter: FC<TextFilterProps> = (props) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div
			className={styles.wrapper}
			onClick={(event) => event.stopPropagation()}
		>
			<CFormInput
				placeholder={`${t({ id: 'admin.table.search.placeholder' })}`}
				onChange={(event) => props.onChange(event.target.value)}
				value={props.value}
			/>
		</div>
	);
};

export default TextFilter;

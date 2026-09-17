import { FC, useContext } from 'react';
import { CFormSelect } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import { YesNoFilterProps } from './interfaces';

const YesNoFilter: FC<YesNoFilterProps> = ({ onChange, value, onClick }) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<CFormSelect
			onClick={onClick ?? (() => {})}
			onChange={(event) => onChange(event.target.value)}
			className="vinisto-admin-table__text-input"
			value={value}
		>
			{[
				['', ''],
				['true', `${t({ id: 'admin.filter.yesno.yes' })}`],
				['false', `${t({ id: 'admin.filter.yesno.no' })}`],
			].map(([key, value], index) => (
				<option
					key={key !== '' ? key : index}
					value={key}
				>
					{value}
				</option>
			))}
		</CFormSelect>
	);
};

export default YesNoFilter;

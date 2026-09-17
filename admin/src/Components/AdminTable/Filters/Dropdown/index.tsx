import { FC } from 'react';
import { CFormSelect } from '@coreui/react';

import { DropdownFilterProps } from './interfaces';

const DropdownFilter: FC<DropdownFilterProps> = (props) => {
	return (
		<CFormSelect
			onClick={props.onClick ?? (() => {})}
			onChange={(event) => props.onChange(event.target.value)}
			className="vinisto-admin-table__text-input"
			value={props.value}
		>
			{[['', ''], ...props.options].map(([key, value], index) => (
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

export default DropdownFilter;

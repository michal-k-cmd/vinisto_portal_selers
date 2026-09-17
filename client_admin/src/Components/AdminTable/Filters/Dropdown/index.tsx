import { ChangeEventHandler, FC, useCallback } from 'react';
import { CFormSelect } from '@coreui/react';

import { DropdownFilterProps } from './interfaces';

const DropdownFilter: FC<DropdownFilterProps> = ({
	options,
	value,
	onChange,
	onClick,
}) => {
	const handleOnChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
		(event) => {
			if (onChange === undefined) return;
			onChange(event.target.value);
		},
		[onChange]
	);

	return (
		<CFormSelect
			onClick={onClick}
			onChange={handleOnChange}
			value={value}
			className="form-control"
		>
			{[['', ''], ...options].map(([key, value]) => (
				<option
					key={key}
					value={key}
				>
					{value}
				</option>
			))}
		</CFormSelect>
	);
};

export default DropdownFilter;

import { HTMLProps } from 'react';

type TSelectProps = HTMLProps<HTMLSelectElement>;

const Select = ({ className, children, ...props }: TSelectProps) => {
	return (
		<select
			className={className}
			{...props}
		>
			{children}
		</select>
	);
};

export default Select;

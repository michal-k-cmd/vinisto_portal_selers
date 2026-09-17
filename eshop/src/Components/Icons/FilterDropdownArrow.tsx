import { IIconProps } from './Interfaces';

const FilterDropdownArrowIcon = ({
	className,
	title = '',
	alt = '',
}: IIconProps) => {
	return (
		<svg
			width={16}
			height={9}
			viewBox="0 0 16 9"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="m14.413 1.412-6.5 5.918-6.5-5.918"
				fill="none"
				stroke="#280044"
				strokeLinecap="round"
				strokeWidth={2}
			/>
		</svg>
	);
};

export default FilterDropdownArrowIcon;

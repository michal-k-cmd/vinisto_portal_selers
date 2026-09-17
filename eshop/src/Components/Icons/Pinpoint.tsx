import { IIconProps } from './Interfaces';

const PinpointIcon = ({ className, title = '', alt = '' }: IIconProps) => {
	return (
		<svg
			width="10.904"
			height="15.344"
			viewBox="0 0 10.904 15.344"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="M142.3,684.99c-.1-.18-.185-.335-.268-.491a36.327,36.327,0,0,0-3.586-5.51A12.381,12.381,0,0,1,137.7,678a5.184,5.184,0,0,1-.8-3.5,5.3,5.3,0,0,1,2.892-4.216,5.071,5.071,0,0,1,3.577-.505,5.447,5.447,0,0,1,3.1,8.834,34.517,34.517,0,0,0-2.926,4.18c-.4.68-.776,1.378-1.162,2.068Zm0-13.057a3.171,3.171,0,1,0,3.172,3.1A3.162,3.162,0,0,0,142.306,671.933Z"
				transform="translate(-136.858 -669.647)"
				fill="#4d4d4e"
			/>
		</svg>
	);
};

export default PinpointIcon;

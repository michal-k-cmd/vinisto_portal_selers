import { IIconProps } from './Interfaces';

const AdvantageIcon = ({ className, title = '', alt = '' }: IIconProps) => {
	return (
		<svg
			width={21.118}
			height={18}
			viewBox="0 0 21.118 18"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<g transform="translate(-1010.5 -609.5)">
				<g
					transform="translate(1010.5 609.5)"
					fill="#fff"
					stroke="#4d4d4e"
					strokeWidth="1"
				>
					<rect
						width="18"
						height="18"
						rx="9"
						stroke="none"
					/>
					<rect
						x="0.5"
						y="0.5"
						width="17"
						height="17"
						rx="8.5"
						fill="none"
					/>
				</g>
				<path
					d="M2.664,9.152l5.091,5.567L17.664,3.664"
					transform="translate(1011.836 608.182)"
					fill="none"
					stroke="#68a910"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="3"
				/>
			</g>
		</svg>
	);
};

export default AdvantageIcon;

import { IIconProps } from './Interfaces';

const ListItemDelete = ({ className }: IIconProps) => {
	return (
		<svg
			width={20}
			height={20}
			viewBox="0 0 20 20"
			className={className}
		>
			<defs>
				<clipPath id="delete-path">
					<rect
						width="16"
						height="16"
						transform="translate(0 0)"
						fill="none"
					/>
				</clipPath>
			</defs>
			<rect
				width="20"
				height="20"
				fill="#fff"
			/>
			<g transform="translate(2 2)">
				<g
					transform="translate(0 0)"
					clipPath="url(#delete-path)"
				>
					<path
						d="M8,16A8,8,0,1,0,0,8a8,8,0,0,0,8,8"
						transform="translate(0 0)"
						fill="#f6f6f6"
					/>
					<path
						className="x-symbol"
						d="M13.192,14.8h0l1.59-1.614,3.034,3.034,3.034-3.034L22.464,14.8l-3.034,3.01,3.034,3.034-1.615,1.615-3.034-3.009-3.034,3.009-1.59-1.615L16.2,17.812Z"
						transform="translate(-9.815 -9.812)"
						fill="#4d4d4e"
					/>
				</g>
			</g>
		</svg>
	);
};

export default ListItemDelete;

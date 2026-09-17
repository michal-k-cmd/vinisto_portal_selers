import { IconProps } from './interfaces';

const GrowArrowIcon = ({ className }: IconProps) => {
	return (
		<svg
			width={20}
			height={10}
			viewBox="0 0 20 10"
			className={className}
		>
			<path
				d="M303.495,141.156a.772.772,0,0,0-.711-.451H284.322a.771.771,0,0,0-.711.451.707.707,0,0,0,.166.8l8.795,8.365a1.413,1.413,0,0,0,.979.386h0a1.415,1.415,0,0,0,.979-.386l8.795-8.365A.707.707,0,0,0,303.495,141.156Z"
				transform="translate(303.553 150.705) rotate(180)"
				fill="#00ac23"
			/>
		</svg>
	);
};

export default GrowArrowIcon;

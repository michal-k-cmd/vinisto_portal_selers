import { IconProps } from './interfaces';

const LeftArrowIcon = ({ className }: IconProps) => {
	return (
		<svg
			width={8}
			height={16}
			viewBox="0 0 8 16"
			className={className}
		>
			<path
				d="M299.506,141.066a.617.617,0,0,0-.569-.361H284.168a.617.617,0,0,0-.569.361.566.566,0,0,0,.133.638l7.036,6.692a1.13,1.13,0,0,0,.784.309h0a1.132,1.132,0,0,0,.784-.309l7.036-6.692A.566.566,0,0,0,299.506,141.066Z"
				transform="translate(148.705 -283.553) rotate(90)"
				fill="#fff"
			/>
		</svg>
	);
};

export default LeftArrowIcon;

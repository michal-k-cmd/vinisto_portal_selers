const CheckIconX = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={20}
			height={18}
			viewBox="0 0 20 18"
			className={props.className}
		>
			<path
				d="m 2.6416 7.1091 l 5.0724 5.5449 l 9.8712 -11.0124"
				fill="none"
				stroke={props.stroke || 'rgb(104, 169, 16)'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={4}
			/>
		</svg>
	);
};

export default CheckIconX;

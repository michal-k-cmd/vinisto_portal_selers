const HexagonIcon = ({ className, fill }: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={9}
			height={26}
			viewBox="0 0 9 26"
			className={className}
		>
			<path
				{...(fill && { fill })}
				d="m9,26c-1.45,0-2.79-.8-3.51-2.09L.55,15.09c-.73-1.29-.73-2.88,0-4.18L5.49,2.09c.73-1.29,2.06-2.09,3.51-2.09v26Z"
			/>
		</svg>
	);
};

export default HexagonIcon;

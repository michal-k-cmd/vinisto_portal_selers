import { useEffect, useState } from 'react';

export interface FlagProps extends React.HTMLProps<HTMLImageElement> {
	code?: string | undefined;
	fallback?: React.ReactNode | null | undefined;
}

const Flag = ({ code = '', fallback = null, alt = '', ...rest }: FlagProps) => {
	const [src, setSrc] = useState<string | undefined>();

	useEffect(() => {
		if (code) {
			import(`../../assets/images/world_flags/${code.toLowerCase()}.svg`)
				.then((module) => {
					setSrc(module.default);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.error(`Failed to load flag: ${code}`, error);
				});
		}
	}, [code]);

	if (!src) return <>{fallback}</>;

	return (
		<img
			{...rest}
			alt={alt}
			src={src}
		/>
	);
};

export default Flag;

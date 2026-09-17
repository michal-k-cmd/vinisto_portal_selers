export interface IconProps extends React.HTMLProps<HTMLImageElement> {
	name?: string | undefined;
	baseUrl: string;
	fallback?: React.ReactNode | null | undefined;
	// Typescript shows error if crossOrigin is not explicitely mentioned
	crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
}

import { availableFaIcons } from './constants';

const Icon = ({
	name = '',
	baseUrl = '',
	prefix = 'fas',
	fallback = null,
	alt = '',
	...rest
}: IconProps) => {
	const availableIconsSet =
		availableFaIcons.find((set) => set.prefix === prefix)?.icons ??
		new Set<string>();

	if (!name || !availableIconsSet.has(name)) return <>{fallback}</>;

	return (
		<img
			{...rest}
			alt={alt}
			src={`${baseUrl}${name}.svg`}
		/>
	);
};

export default Icon;

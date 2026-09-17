export interface FlagProps extends React.HTMLProps<HTMLImageElement> {
	code?: string | undefined;
	fallback?: React.ReactNode | null | undefined;
	// Typescript shows error if crossOrigin is not explicitely mentioned
	crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
	loading?: 'eager' | 'lazy' | undefined;
}

import { AVAILABLE_FLAGS as availableFlags } from './constants';

const Flag = ({ code = '', fallback = null, alt = '', ...rest }: FlagProps) => {
	const codeLC = code.toLowerCase();
	if (!codeLC || !availableFlags.has(codeLC)) return <>{fallback}</>;

	return (
		<img
			{...rest}
			alt={alt}
			src={`/assets/flags/${codeLC}.svg`}
		/>
	);
};

export default Flag;

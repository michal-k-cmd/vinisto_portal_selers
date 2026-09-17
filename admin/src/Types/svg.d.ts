import { AriaAttributes, DOMAttributes } from 'react';

declare module '*.svg' {
	const content: string;
	export default content;
	import { FC, SVGProps } from 'react';
	export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		fetchPriority?: 'high' | 'low' | 'auto';
	}

	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

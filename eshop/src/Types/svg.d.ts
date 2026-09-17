declare module '*.svg' {
	const content: string;
	export default content;
	import { FC, SVGProps } from 'react';
	export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}

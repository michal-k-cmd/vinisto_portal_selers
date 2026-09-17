import { FunctionComponent, SVGProps } from 'react';

interface MotivationAccordionItem {
	id: string;
	title: string;
	content: string;
	icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface MotivationAccordionProps {
	items?: MotivationAccordionItem[];
	sliceLength?: number;
}

export type { MotivationAccordionItem, MotivationAccordionProps };

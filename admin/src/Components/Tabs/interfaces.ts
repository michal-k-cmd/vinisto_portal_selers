import { ReactNode } from 'react';

interface TabConfig {
	id: string | number;
	label: ReactNode | string;
	onClick: () => void;
}

interface TabsProps {
	tabs: TabConfig[];
	initialActiveTab?: string | number;
	buttonClassName?: string;
	activeButtonClassName?: string;
}

export type { TabConfig, TabsProps };

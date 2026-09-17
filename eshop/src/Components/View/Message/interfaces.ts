import { ReactNode } from 'react';

import { MESSAGE_VARIANTS } from './constants';
type MessageVariants = (typeof MESSAGE_VARIANTS)[keyof typeof MESSAGE_VARIANTS];

export interface MessageProps {
	className?: string;
	children?: ReactNode;
	variant: MessageVariants;
}

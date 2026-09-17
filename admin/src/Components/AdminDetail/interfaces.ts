import { FC } from 'react';

/**
 * @deprecated Use Detail from 'Components/Detail' instead of AdminDetail.
 */
export interface AdminDetailProps {
	detailSchema?: Record<any, any>[];
	actionButtonsSchema?: Record<any, any>[];
	customComponentRender?: FC<Record<any, any>>;
	customData?: Record<any, any>;
	customMethods?: Record<any, any>;
	className?: string;
}

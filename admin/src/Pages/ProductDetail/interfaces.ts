import { BaseDataState } from 'types';

export interface ITagDetailProps {
	id: number;
	name: string;
	class: string;
	status: string;
	createdBy: string;
}

export interface ProductState extends BaseDataState {
	product?: Record<string, any>;
	tag?: Record<string, any>;
}

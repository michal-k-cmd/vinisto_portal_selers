export type Param = {
	name: string;
	value: string;
	valueLink?: string;
};

export interface ParametersProps {
	heading?: string;
	params: Param[];
}

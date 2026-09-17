export type IEvaluationProps = {
	minLabel: string;
	maxLabel: string;
	value: number;
	isProfileInfoOpen?: boolean;
	handleToggleProfileInfo?: (event: any) => void;
	isLoading?: boolean;
	order?: number;
};

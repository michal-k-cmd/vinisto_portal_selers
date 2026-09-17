export interface BatchAction {
	title: string;
	ico: JSX.Element;
	onClick: () => void;
}

export interface BatchActionsProps {
	isAllowed: boolean;
	actions: BatchAction[];
}

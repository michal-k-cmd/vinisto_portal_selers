export interface IBatchAction {
	title: string;
	ico: JSX.Element;
	onClick: () => void;
}

export interface IBatchActionsProps {
	isAllowed: boolean;
	actions: IBatchAction[];
}

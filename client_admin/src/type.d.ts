declare global {
	interface Window {
		supportBoxApi: {
			isShow: boolean;
			isRunAsHidden: boolean;
			show: () => void;
			hide: () => void;
			isOnline: boolean;
			open: () => void;
			close: () => void;
		};
		supportBoxChatVariables: Record<string, any>;
	}
}

export {};

import { AriaAttributes, DOMAttributes } from 'react';

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
			getIframe: () => HTMLIFrameElement;
		};
		supportBoxChatVariables: Record<string, any>;
		dataLayer: Record<string, any>[];
		clarity?: (command: 'event', eventName: string) => void;
	}

	interface NavigatorLanguage {
		userLanguage?: string;
	}
}

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		fetchPriority?: 'high' | 'low' | 'auto';
	}

	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
}

export {};

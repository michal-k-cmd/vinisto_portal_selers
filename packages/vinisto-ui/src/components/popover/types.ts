export type PopoverHTMLElement = HTMLElement & {
	showPopover?: () => void;
	hidePopover?: () => void;
	togglePopover?: (force?: boolean) => void;
};

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	/**
	 * 'auto' = closes when clicking outside (light-dismiss) - ideal for most use cases.
	 * 'manual' = does not close when clicking outside, you must close it explicitly.
	 */
	mode?: 'auto' | 'manual';
	variant?: PopoverVariants | string;
	withCloseButton?: boolean;
}

export enum PopoverVariants {
	ERROR = 'error',
	INFO = 'info',
	WARNING = 'warning',
	SUCCESS = 'success',
	DEFAULT = 'default',
}

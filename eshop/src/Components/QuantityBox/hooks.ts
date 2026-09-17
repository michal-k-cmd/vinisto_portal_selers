import { ReactNode, useEffect, useRef, useState } from 'react';
import { PopoverVariants } from 'vinisto_ui/src/components/popover/types';

type PopoverContentConfig = {
	content: ReactNode;
	variant?: PopoverVariants | string;
	withCloseButton?: boolean;
};

export const usePopover = (popovers: Record<string, PopoverContentConfig>) => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedPopoverKey, setSelectedPopoverKey] = useState<string>(
		Object.keys(popovers)[0]
	);

	const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (openTimerRef.current) clearTimeout(openTimerRef.current);
		},
		[]
	);

	const open = (popoverKey: string) => {
		if (openTimerRef.current) clearTimeout(openTimerRef.current);

		setSelectedPopoverKey(popoverKey);

		openTimerRef.current = setTimeout(() => {
			setIsOpen(true);
			openTimerRef.current = null;
		}, 0);
	};

	const close = () => {
		if (openTimerRef.current) {
			clearTimeout(openTimerRef.current);
			openTimerRef.current = null;
		}

		setIsOpen(false);
	};

	const handleNativeClose = () => {
		setIsOpen(false);
	};

	const currentPopover = popovers[selectedPopoverKey];

	return {
		methods: {
			isOpen,
			onClose: handleNativeClose,
			content: currentPopover?.content,
			variant: currentPopover?.variant,
			withCloseButton: currentPopover?.withCloseButton,
		},
		open,
		close,
	};
};

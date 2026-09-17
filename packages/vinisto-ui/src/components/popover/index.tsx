'use client';

import { useEffect, useId, useRef } from 'react';
import cx from 'classnames';

import { PopoverHTMLElement, PopoverProps, PopoverVariants } from './types';
import styles from './styles.module.css';

export const Popover = ({
	id,
	children,
	isOpen,
	onClose,
	mode = 'auto',
	className,
	style,
	variant = PopoverVariants.DEFAULT,
	withCloseButton = false,
	...rest
}: PopoverProps) => {
	const generatedId = useId();
	const popoverId = id || `popover-${generatedId}`;
	const popoverRef = useRef<PopoverHTMLElement>(null);

	useEffect(() => {
		const el = popoverRef.current;
		if (!el || typeof el.togglePopover !== 'function') return;

		if (isOpen !== undefined) {
			try {
				el.togglePopover(isOpen);
			} catch (e) {
				if (isOpen && el.showPopover) el.showPopover();
				else if (!isOpen && el.hidePopover) el.hidePopover();
			}
		}
	}, [isOpen]);

	useEffect(() => {
		const el = popoverRef.current;
		if (!el) return;

		const handleToggle = () => {
			const isNowOpen =
				typeof (el as any).matches === 'function'
					? (el as any).matches(':popover-open')
					: false;

			if (!isNowOpen && onClose) {
				onClose();
			}
		};

		el.addEventListener('toggle', handleToggle);
		return () => el.removeEventListener('toggle', handleToggle);
	}, [onClose]);

	return (
		<div
			id={popoverId}
			ref={popoverRef as any}
			// @ts-expect-error: The 'popover' property is not yet available in @types/react 18.
			popover={mode}
			className={cx(className, styles.popover, styles[variant])}
			style={style}
			{...rest}
		>
			{withCloseButton && (
				<button
					type="button"
					aria-label="Zavřít zprávu"
					onClick={() => onClose && onClose()}
					className={styles.closeButton}
				>
					<svg
						width="10"
						height="10"
						viewBox="0 0 10 10"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m6.559 5 3.118-3.118A1.102 1.102 0 1 0 8.118.323L5 3.441 1.881.322a1.103 1.103 0 1 0-1.559 1.56L3.441 5 .322 8.118a1.102 1.102 0 1 0 1.559 1.559L5 6.559l3.118 3.118a1.102 1.102 0 0 0 1.559-1.559Z"
							fill="#FFFFFF"
						/>
					</svg>
				</button>
			)}

			{children}
		</div>
	);
};

export default Popover;

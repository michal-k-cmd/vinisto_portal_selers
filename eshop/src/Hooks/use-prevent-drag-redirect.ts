import { MouseEvent, useState } from 'react';

interface MousePosition {
	x: number;
	y: number;
}

const DEFAULT_DISTANCE_THRESHOLD = 10;

/**
 * Exposes functions to prevent redirect on drag
 */
const usePreventDragRedirect = (
	distanceThreshold: number = DEFAULT_DISTANCE_THRESHOLD
) => {
	const [mouseDownPosition, setMouseDownPosition] =
		useState<MousePosition | null>(null);

	/**
	 * Sets mouse down position
	 */
	const handleMouseDown = (e: MouseEvent<HTMLAnchorElement>) => {
		setMouseDownPosition({ x: e.clientX, y: e.clientY });
	};

	/**
	 * Prevents redirect if mouse was dragged by more than distanceThreshold (px)
	 */
	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if (mouseDownPosition) {
			const mouseUpPosition = { x: e.clientX, y: e.clientY };
			const distance = Math.sqrt(
				Math.pow(mouseUpPosition.x - mouseDownPosition.x, 2) +
					Math.pow(mouseUpPosition.y - mouseDownPosition.y, 2)
			);
			if (distance > distanceThreshold) {
				e.preventDefault();
				return false;
			}
		}
		return true;
	};

	/**
	 * Prevents default event
	 */
	const preventDefaultEvent = (e: MouseEvent<HTMLAnchorElement>) =>
		e.preventDefault();

	return {
		handleMouseDown,
		handleClick,
		preventDefaultEvent,
	};
};

export default usePreventDragRedirect;

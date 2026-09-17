'use client';

import { useCallback, useLayoutEffect, useState } from 'react';

interface ScrollOptions {
	scrollOffset?: number;
}

const DEFAULT_SCROLL_OFFSET = 100;

/**
 * This hook is used to check if the carousel is scrollable and to scroll it
 * @param scrollOffset - how much to scroll on each scroll in px, defaults to 100.
 * @returns isScrollableLeft - is the carousel scrollable to the left
 * @returns isScrollableRight - is the carousel scrollable to the right
 * @returns handleScrollLeft - function to scroll the carousel to the left
 * @returns handleScrollRight - function to scroll the carousel to the right
 * @returns checkScrollability - function to check if the carousel is scrollable
 * @returns scrollContainerRef - the ref to assign to the scroll container
 */
const useCarouselScroll = <T extends HTMLElement = HTMLUListElement>({
	scrollOffset = DEFAULT_SCROLL_OFFSET,
}: ScrollOptions = {}) => {
	const [isScrollableLeft, setIsScrollableLeft] = useState(false);
	const [isScrollableRight, setIsScrollableRight] = useState(false);

	const [ref, setRef] = useState<T | null>(null);

	const checkScrollability = useCallback(() => {
		if (ref) {
			setIsScrollableLeft(ref.scrollLeft > 0);
			setIsScrollableRight(ref.scrollWidth > ref.clientWidth + ref.scrollLeft);
		}
	}, [ref]);

	useLayoutEffect(() => {
		checkScrollability();
		if (ref) {
			// This checks if there is a scrollbar on mount
			ref.scrollBy({ top: 0, left: 1, behavior: 'auto' });
			ref.scrollBy({ top: 0, left: -1, behavior: 'auto' });
		}

		window.addEventListener('resize', checkScrollability);
		return () => {
			window.removeEventListener('resize', checkScrollability);
		};
	}, [checkScrollability, ref]);

	const handleScrollLeft = () => {
		if (ref) {
			ref.scrollBy({
				top: 0,
				left: -scrollOffset,
				behavior: 'smooth',
			});
		}
	};

	const handleScrollRight = () => {
		if (ref) {
			ref.scrollBy({
				top: 0,
				left: scrollOffset,
				behavior: 'smooth',
			});
		}
	};

	return {
		isScrollableLeft,
		isScrollableRight,
		handleScrollLeft,
		handleScrollRight,
		checkScrollability,
		scrollContainerRef: setRef,
	};
};

export default useCarouselScroll;

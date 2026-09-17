import { useEffect, useState } from 'react';

import useThrottle from './use-throttle';

/**
 * throttleDelay - delay in ms between each scroll event
 * scrollThreshold - how much the user has to scroll to trigger a visibility change - this does not affect atTop and atBottom
 */
const useMobileHeaderVisibility = ({
	throttleDelay = 25,
	scrollThreshold = 30,
	isEnabled = true,
}: {
	throttleDelay?: number;
	scrollThreshold?: number;
	isEnabled?: boolean;
} = {}) => {
	const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true);
	const debouncedVisibility = useThrottle(isMobileHeaderVisible, throttleDelay);

	useEffect(() => {
		if (!isEnabled) return;
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			const atBottom =
				window.innerHeight + window.scrollY >= document.body.offsetHeight;
			const atTop = currentScrollY <= 0;
			const scrolledEnough =
				Math.abs(currentScrollY - lastScrollY) > scrollThreshold;

			if (atBottom) {
				setIsMobileHeaderVisible(false);
			} else if (atTop) {
				setIsMobileHeaderVisible(true);
			} else if (scrolledEnough) {
				setIsMobileHeaderVisible(currentScrollY <= lastScrollY);
				lastScrollY = currentScrollY;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrollThreshold]);

	return [debouncedVisibility, setIsMobileHeaderVisible] as const;
};

export default useMobileHeaderVisibility;

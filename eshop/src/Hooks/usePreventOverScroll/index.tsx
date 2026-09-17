import React from 'react';
import { floor, get, set } from 'lodash-es';

const usePreventOverScroll = (ref: React.RefObject<Element>) => {
	const scrollElement = get(ref, 'current');

	React.useEffect(() => {
		if (!(scrollElement instanceof Element)) return;

		// Move on mount to prevent scroll chaining upwards before scrolling downwards
		set(scrollElement, 'scrollTop', (get(window, 'innerHeight') / 1000) * 1.5);

		const scrollHandler = () => {
			if (get(scrollElement, 'scrollTop') === 0) {
				set(
					scrollElement,
					'scrollTop',
					(get(window, 'innerHeight') / 1000) * 1.5
				);
			}
			if (
				floor(scrollElement.scrollHeight - scrollElement.scrollTop) <=
				scrollElement.clientHeight
			) {
				set(scrollElement, 'scrollTop', get(scrollElement, 'scrollTop') - 0.5);
			}
		};

		// Set CSS for supported browsers
		set(scrollElement, 'style.overscrollBehavior', 'none');
		// Add JavaScript handler for full coverage
		scrollElement.addEventListener('scroll', scrollHandler);

		return () => {
			set(scrollElement, 'style.overscrollBehavior', '');
			scrollElement.removeEventListener('scroll', scrollHandler);
		};
	}, [ref.current]);
};

export default usePreventOverScroll;

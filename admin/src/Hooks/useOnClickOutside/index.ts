import React from 'react';

interface Handler {
	(event: MouseEvent | TouchEvent): void;
}

const useOnClickOutside = <T extends HTMLDivElement = HTMLDivElement>(
	refs: React.RefObject<T>[],
	handler: Handler
) => {
	React.useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (
				refs.some(
					(ref) =>
						!ref.current ||
						(event?.target instanceof Element &&
							ref.current.contains(event?.target))
				)
			)
				return;
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [refs, handler]);
};

export default useOnClickOutside;

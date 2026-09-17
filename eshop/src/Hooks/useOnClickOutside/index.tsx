import React from 'react';
import { some } from 'lodash-es';

type IHandleEvent = {
	(arg0: MouseEvent | TouchEvent): void;
};

/**
 * Hook for handling clicking outside of given refs
 * @param refs Array of refs to ignore on click
 * @param handler Handler function if is clicked outside of given refs
 */
const useOnClickOutside = (
	refs: React.RefObject<Element>[],
	handler: IHandleEvent
) => {
	React.useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (
				some(
					refs,
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

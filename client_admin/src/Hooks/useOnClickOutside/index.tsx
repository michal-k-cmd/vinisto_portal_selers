import { RefObject, useEffect } from 'react';
import { some } from 'lodash-es';

const useOnClickOutside = (
	refs: RefObject<Element>[],
	handler: (event: Event) => void
) => {
	useEffect(() => {
		const listener = (event: Event) => {
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

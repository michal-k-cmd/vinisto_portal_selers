import * as React from 'react';

const usePrevious = <T,>(value: T, predicate?: (value: T) => boolean): T => {
	const ref = React.useRef();
	React.useEffect(() => {
		if (!predicate || (typeof predicate === 'function' && predicate(value))) {
			ref.current = value as any;
		}
	}, [value]);
	return ref.current as T;
};

export default usePrevious;

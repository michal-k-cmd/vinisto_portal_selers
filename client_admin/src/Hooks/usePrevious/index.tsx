import * as React from 'react';

/**
 * @category Component Hook UsePrevious
 */
const usePrevious = (value: any): any => {
	const ref = React.useRef();
	React.useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

export default usePrevious;

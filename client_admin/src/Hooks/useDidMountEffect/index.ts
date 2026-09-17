import { DependencyList, useEffect, useRef } from 'react';

// runs useEffect but not on the first render
const useDidMountEffect = (func: () => void, deps: DependencyList) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, deps);
};

export default useDidMountEffect;

import { useEffect, useState } from 'react';

const useDelay = (delay: number) => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsReady(true);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [delay]);

	return isReady;
};

export default useDelay;

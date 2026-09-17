import { useEffect, useState } from 'react';

const useSearchParams = () => {
	const search = window.location.search;
	const [state, setState] = useState<string>('');

	useEffect(() => {
		setState(search);
	}, [search]);

	const urlSearchParams = new URLSearchParams(state);
	const params = Object.fromEntries(urlSearchParams.entries());

	return params;
};

export default useSearchParams;

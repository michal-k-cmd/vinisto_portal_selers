import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// This is a slightly hacky solution for syncing the pagination state with the URL.
// Should fix the bug that being on, e.g., /kategorie/vina/page/1-2
// and clicking on a link to /kategorie/vina does not reset the pagination state.
const useResetPaginaton = (callback: () => void) => {
	const pathname = usePathname();
	useEffect(() => {
		if (!pathname.includes('page/')) {
			callback();
		}

		// Not sure how to make callback referentialy stable...
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);
};

export default useResetPaginaton;

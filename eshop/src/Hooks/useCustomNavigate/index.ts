import * as React from 'react';
import { useRouter } from 'next/navigation';
import { get } from 'lodash-es';

const useCustomNavigate = () => {
	const router = useRouter();
	return React.useCallback(
		(event: React.MouseEvent<HTMLElement>, path: string) => {
			event && event.preventDefault();
			event && event.stopPropagation();
			if (get(event, 'button') === 1) {
				window.open(path, '_blank', 'noopener,noreferrer');
			} else if (get(event, 'button') === 0) {
				router.push(path);
			}
		},
		[router]
	);
};

export default useCustomNavigate;

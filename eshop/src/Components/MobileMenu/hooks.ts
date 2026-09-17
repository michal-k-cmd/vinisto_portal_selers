import { useContext } from 'react';

import { MobileMenuContext } from '.';

export const useMobileMenu = () => {
	return useContext(MobileMenuContext);
};

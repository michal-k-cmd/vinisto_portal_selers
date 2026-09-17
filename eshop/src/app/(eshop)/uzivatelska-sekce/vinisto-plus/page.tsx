'use client';

import ProtectedRoute from 'pages-spa/UserSection/ProtectedRoute';
import UserSectionVinistoPlus from 'pages-spa/UserSection/VinistoPlus';
import { useIsB2b } from 'Services/PlatformService';

const isVinistoPlusActive =
	process.env.NEXT_PUBLIC_IS_VINISTO_PLUS_ACTIVE === 'true';

const UserSectionVinistoPlusPage = () => {
	const isB2b = useIsB2b();
	if (!isVinistoPlusActive || isB2b) return null;
	return (
		<ProtectedRoute>
			<UserSectionVinistoPlus />
		</ProtectedRoute>
	);
};
export default UserSectionVinistoPlusPage;

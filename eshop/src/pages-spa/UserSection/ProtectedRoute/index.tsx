'use client';

import { useContext } from 'react';
import { useProtectedRoute } from 'Hooks/use-protected-route';
import { usePathname } from 'next/navigation';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import Skeleton from 'react-loading-skeleton';
import { useIsClient } from '@uidotdev/usehooks';

const ProtectedRoute = ({
	children,
	redirectTo,
}: {
	children: React.ReactNode;
	redirectTo?: string;
}) => {
	const { isLoggedIn, isLoggining } = useContext(AuthenticationContext);
	const pathname = usePathname();
	const isClient = useIsClient();
	useProtectedRoute({ redirectTo: redirectTo ?? pathname });

	if (!isClient || isLoggining || !isLoggedIn)
		return (
			<Skeleton
				count={2}
				height={150}
				className="mt-3"
			/>
		);

	return children;
};

export default ProtectedRoute;

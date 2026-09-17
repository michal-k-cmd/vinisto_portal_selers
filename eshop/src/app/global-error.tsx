'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export const GlobalError = ({
	error,
}: {
	error: Error & { digest?: string };
}) => {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="cz">
			<body>
				<NextError statusCode={0} />
			</body>
		</html>
	);
};

export default GlobalError;

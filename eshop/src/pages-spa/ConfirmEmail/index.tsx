'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';

// In Next.js, this would be a page component that receives params
// For client component compatibility during migration
const ConfirmEmail = ({ hash }: { hash: string }) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const authenticationContext = useContext(AuthenticationContext);
	const router = useRouter();

	useEffect(() => {
		if (hash) {
			authenticationContext.handleOnConfirmEmail(hash);
			router.push('/');
		}
	}, [hash, authenticationContext, router]);

	return (
		<section id="content-wrapper">
			<div className="container text-center">
				<p>{t({ id: 'confirmEmail.ongoing' })}</p>
			</div>
		</section>
	);
};

export default ConfirmEmail;

// For Next.js App Router, this component would be used in app/confirm-email/[hash]/page.tsx
// export default function Page({ params }: { params: Promise<{ hash: string }> }) {
//   return <ConfirmEmail params={await params} />;
// }

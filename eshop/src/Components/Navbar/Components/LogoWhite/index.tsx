import { FC, lazy, Suspense } from 'react';
import { uniqueId } from 'lodash-es';
import Link from 'next/link';
import Loader from 'Components/View/Loader';
const VinistoLogoWhiteIcon = lazy(
	() => import('Components/Icons/VinistoLogoWhite')
);

const Logo: FC = (): JSX.Element => {
	return (
		<Link
			href="/"
			className="logo"
		>
			<Suspense fallback={<Loader blank />}>
				<VinistoLogoWhiteIcon
					id={uniqueId()}
					alt="Vinisto"
					title="Vinisto"
					className="VinistoLogo"
				/>
			</Suspense>
		</Link>
	);
};

export default Logo;

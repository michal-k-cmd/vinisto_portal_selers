import { useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import ImageLocal from 'Components/View/ImageLocal';
import usePlatformStaticPagePath from 'Hooks/usePlatformStaticPagePath';

const BannerAboutUs = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const aboutUsPath = usePlatformStaticPagePath(
		'aboutUs',
		`${t({ id: 'routes.aboutUs.route' })}`
	);

	return (
		<Link
			href={aboutUsPath}
			className="vinisto-card vinisto-big-banner p-1"
		>
			<div className="row flex-nowrap justify-content-center align-items-center">
				<div className="vinisto-big-banner__img-wrap">
					<ImageLocal
						fileName="emblem-purple.svg"
						alt="Vinisto emblém"
						className="vinisto-big-banner__img"
					/>
				</div>
				<div className="vinisto-big-banner__text-wrap">
					<p className="vinisto-big-banner__text">
						První české{' '}
						<span className="fw-bolder">
							online tržiště s vínem a destiláty
						</span>
					</p>
					<span className="vinisto-btn vinisto-bg-green vinisto-big-banner__btn">
						Náš příběh
					</span>
				</div>
				<div className="vinisto-big-banner__img-wrap">
					<ImageLocal
						fileName="emblem-purple.svg"
						alt="Vinisto emblém"
						className="vinisto-big-banner__img"
					/>
				</div>
			</div>
		</Link>
	);
};

export default BannerAboutUs;

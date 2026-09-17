import cx from 'classnames';
import Flag from 'Components/Flag';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import VinistoPlusHeader from '../VinistoPlusHeader';

import { LandingHeaderProps } from './interfaces';
import styles from './styles.module.css';
import ScrollButton from './ScrollButton';
import LocationInfo from './LocationInfo';

const LandingHeader = ({
	bgImgUrl,
	logoUrl,
	title,
	text,
	countryCode,
	countryName,
	region,
	region_slug,
	ctas,
	type,
}: LandingHeaderProps) => {
	return (
		<div
			className={cx(
				styles.landingHeaderContainer,
				type && styles[type],
				!bgImgUrl && styles.noBgImage,
				ctas && ctas.length > 0 && styles.withCtas
			)}
		>
			<ContainerFullWidth
				containerClassName={styles.container}
				rowClassName={styles.row}
			>
				<div
					className={styles.landingHeader}
					id="landing-header"
				>
					{bgImgUrl && (
						<div className={styles.bgImgWrap}>
							<img
								src={bgImgUrl}
								alt={title}
								className={styles.bgImg}
							/>
						</div>
					)}

					<div
						className={cx(
							styles.content,
							ctas && ctas.length > 0 && styles.ctasVisible
						)}
					>
						<div>
							{logoUrl && (
								<div className={styles.logoContainer}>
									<img
										src={logoUrl}
										alt={`Logo ${title}`}
										className={styles.logo}
										height={78}
									/>
								</div>
							)}
							{type === 'VinistoPlus_header' && (
								<div className={styles.logoContainer}>
									<img
										src="/assets/images/vinisto_plus.svg"
										alt="Vinisto Plus+"
										className={styles.vinistoPlusLogo}
									/>
								</div>
							)}
							<h1 className={styles.producer}>{title}</h1>
							{text && (
								<div
									className={styles.text}
									dangerouslySetInnerHTML={{ __html: text }}
								></div>
							)}
							<div className={styles.location}>
								{countryCode && (
									<Flag
										code={countryCode}
										width={23}
										height={15}
										className="vinisto-flag"
									/>
								)}
								<LocationInfo
									countryName={countryName}
									region={region}
									region_slug={region_slug}
								/>
							</div>
							{type !== 'VinistoPlus_header' && <ScrollButton />}
						</div>
					</div>
					{type === 'VinistoPlus_header' && (
						<div className={styles.vinistoPlusInfo}>
							<VinistoPlusHeader />
						</div>
					)}
					{ctas && ctas.length > 0 && (
						<ul className={styles.ctas}>
							{ctas.map((cta, index) => (
								<li
									key={'lacta' + index}
									className={styles.cta}
								>
									<div className={styles.ctaIconContainer}>
										<img
											src={cta.icon}
											alt={cta.mainText}
											className={styles.ctaIcon}
										/>
									</div>
									<div className={styles.ctaText}>
										<div className={styles.ctaMainText}>{cta.mainText}</div>
										<div className={styles.ctaSubText}>{cta.subText}</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</ContainerFullWidth>
		</div>
	);
};

export default LandingHeader;

'use client';

import Skeleton from 'react-loading-skeleton';
import { useContext, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { DeviceServiceContext } from 'Services/DeviceService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import styles from '../BundleDetail/styles.module.css';

interface BundleDetailSkeletonProps {
	deviceType?: string;
}

const BundleDetailSkeleton = ({ deviceType }: BundleDetailSkeletonProps) => {
	const {
		footerHeight,
		isMobile: isMobileClient,
		isTablet: isTabletClient,
		isDesktop: isDesktopClient,
	} = useContext(DeviceServiceContext);
	const isMobile =
		typeof window === 'undefined' ? deviceType === 'mobile' : isMobileClient;
	const isTablet =
		typeof window === 'undefined' ? deviceType === 'mobile' : isTabletClient;
	const isDesktop =
		typeof window === 'undefined' ? deviceType === 'desktop' : isDesktopClient;

	const parentRef = useRef<HTMLDivElement>(null);
	const [topDistance, setTopDistance] = useState(0);

	useEffect(() => {
		if (parentRef.current) {
			setTopDistance(
				window.pageYOffset + parentRef.current?.getBoundingClientRect()?.top
			);
		}
	}, [parentRef.current]);

	return (
		<section
			id="content-wrapper"
			className={styles.section}
		>
			<ContainerFullWidth>
				<Skeleton width="40%" />
			</ContainerFullWidth>

			<ContainerFullWidth>
				<div className={styles.bundle}>
					<div
						className={styles.bundleInfo}
						ref={parentRef}
					>
						<div
							style={{
								position: 'sticky',
								top: topDistance,
							}}
						>
							<div className="tablet-mobile-only">
								<p className="vinisto-wine__variety underline-effect underline-effect--vinisto">
									<Skeleton width="100px" />
								</p>
								<p className={styles.bundleName}>
									<Skeleton width="33%" />
								</p>
								<div className={styles.bundleLabels}></div>
							</div>

							<div className={styles.bundleImageWrap}>
								<Skeleton
									className={styles.bundleImage}
									width="370px"
									height="490px"
								/>
							</div>

							{(isMobile || isTablet) && (
								<Skeleton
									width="250px"
									height="66px"
								/>
							)}

							{!isDesktop && (
								<Skeleton
									width="100%"
									style={{ aspectRatio: '9/2', marginTop: '1rem' }}
								/>
							)}

							{isDesktop && (
								<>
									<div className={styles.bundleAbout}>
										<h2 className={styles.bundleHeading}>
											<Skeleton width="250px" />
										</h2>
										<div className={styles.bundleAboutText}>
											<Skeleton count={4.4} />
										</div>
									</div>

									<div className={styles.bundleAbout}>
										<h2 className={styles.bundleHeading}>
											<Skeleton width="250px" />
										</h2>
										<div className={styles.bundleParams}>
											<Skeleton count={4} />
										</div>
									</div>

									<Skeleton count={5} />
								</>
							)}

							<div className="vinisto-right-info-tablet-mobile">
								{(isMobile || isTablet) && (
									<>
										<p className={styles.paymentWrapperHeading}>
											<Skeleton width="150px" />
										</p>

										<div className="bundle-detail-payment">
											<div className={styles.paymentMethods}>
												<Skeleton width="250px" />
											</div>
										</div>

										<p className={styles.paymentWrapperHeading}>
											<Skeleton width="150px" />
										</p>
										<Skeleton count={5} />

										<Skeleton
											count={2}
											height="1.5rem"
										/>

										<div className={styles.motivationAccordionWrapMobile}>
											<Skeleton
												count={4}
												height="2rem"
											/>
										</div>

										<div className="vinisto-product-detail-other-sellers mt-3 mb-1">
											<Skeleton width="250px" />
										</div>
										<div className="vinisto-product-detail-other-sellers-offers">
											<Skeleton count={3} />
										</div>

										<div className="vinisto-product-detail-beseller-info">
											<Skeleton
												width="320px"
												height="75px"
											/>
										</div>

										<Skeleton width="150px" />

										<div className={styles.bundleAboutText}>
											<Skeleton count={4} />
										</div>

										<div className={styles.bundleParams}>
											<Skeleton count={4} />
										</div>

										<Skeleton count={4} />
									</>
								)}
							</div>
						</div>
					</div>

					{isDesktop && (
						<div className={styles.bundleShopCol}>
							<p className={styles.bundleVariety}>
								<Skeleton width="120px" />
							</p>
							<p className={cx(styles.bundleName, 'desktop-only')}>
								<Skeleton width="100%" />
							</p>
							<div className={cx(styles.bundleLabels, 'desktop-only')}>
								<Skeleton width="100px" />
							</div>
							<div className="shop-controls">
								<div className={styles.mainShopControls}>
									<Skeleton height="250px" />
								</div>

								<div className="shop-controls-free-delivery-bar">
									<Skeleton />
								</div>

								<Skeleton
									width="100%"
									height="88px"
									style={{ margin: '1rem 0' }}
								/>

								<div
									className={cx(styles.paymentWrapper, 'bundle-detail-payment')}
								>
									<p className={styles.paymentWrapperHeading}>
										<Skeleton width="120px" />
									</p>
									<div className={styles.paymentMethods}>
										<Skeleton width="250px" />
									</div>

									<p className={styles.paymentWrapperHeading}>
										<Skeleton width="200px" />
									</p>
									<Skeleton count={5} />

									<Skeleton count={2} />
								</div>

								<div className={styles.motivationWrap}>
									<Skeleton
										height="80px"
										count={4}
									/>
								</div>

								<div className={styles.otherSellersHeading}>
									<Skeleton width="200px" />
								</div>
								<div className="vinisto-product-detail-other-sellers-offers">
									<Skeleton count={6} />
								</div>

								<div className="vinisto-product-detail-beseller-info">
									<Skeleton
										width="100%"
										height="60px"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</ContainerFullWidth>

			<ContainerFullWidth>
				<Skeleton height="500px" />
			</ContainerFullWidth>

			<ContainerFullWidth>
				<Skeleton height="500px" />
			</ContainerFullWidth>

			<ContainerFullWidth>
				<Skeleton height="210px" />
			</ContainerFullWidth>

			<ContainerFullWidth>
				<Skeleton height="400px" />
			</ContainerFullWidth>

			<ContainerFullWidth>
				<Skeleton height="500px" />
			</ContainerFullWidth>

			<div
				className={styles.mobileShopBoxFloating}
				style={{ bottom: `${footerHeight}px` }}
			>
				<nav className="navbar navbar-dark p-0">
					{(isMobile || isTablet) && (
						<div className={cx(styles.sellers, styles.isOnlySeller)}>
							<Skeleton height="87px" />
						</div>
					)}
				</nav>
			</div>
		</section>
	);
};

export default BundleDetailSkeleton;

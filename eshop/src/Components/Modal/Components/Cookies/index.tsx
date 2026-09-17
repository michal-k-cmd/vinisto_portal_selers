/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CookieServiceContext } from 'Services/CookieService';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import usePlatformStaticPagePath from 'Hooks/usePlatformStaticPagePath';

import styles from './styles.module.css';

const CookiesModal = () => {
	const cookieServiceContext = useContext(CookieServiceContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const privacyProtectionPath = usePlatformStaticPagePath(
		'privacyProtection',
		`/${t({ id: 'routes.privacyProtection.route' })}`
	);

	const [isMounted, setMounted] = useState(false);

	const isVisible = cookieServiceContext.isCookieBannerVisible;

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted || !isVisible) {
			return;
		}

		document.body.style.overflow = 'hidden';
		document.body.classList.add('modal-open');
		document.body.setAttribute('data-rr-ui-modal-open', '');

		return () => {
			const isAnotherModalOpen = document.querySelector(
				'.modal.show, [role="dialog"]'
			);

			if (!isAnotherModalOpen) {
				document.body.style.overflow = '';
				document.body.classList.remove('modal-open');
				document.body.removeAttribute('data-rr-ui-modal-open');
			}
		};
	}, [isMounted, isVisible]);

	const [isSettingsOpen, setSettingsOpen] = useState(false);
	const [isFunctionalOpen, setFunctionalOpen] = useState(false);
	const handleOnToggleFunctional = useCallback(() => {
		setFunctionalOpen((old) => !old);
		setAnalyticOpen(false);
		setMarketingOpen(false);
	}, []);
	const [isAnalyticOpen, setAnalyticOpen] = useState(false);
	const handleOnToggleAnalytic = useCallback(() => {
		setFunctionalOpen(false);
		setAnalyticOpen((old) => !old);
		setMarketingOpen(false);
	}, []);
	const [isMarketingOpen, setMarketingOpen] = useState(false);
	const handleOnToggleMarketing = useCallback(() => {
		setFunctionalOpen(false);
		setAnalyticOpen(false);
		setMarketingOpen((old) => !old);
	}, []);

	useEffect(() => {
		setSettingsOpen(false);
		setFunctionalOpen(false);
		setAnalyticOpen(false);
		setMarketingOpen(false);
	}, []);

	const handleOnAllowAllCookies = useCallback(() => {
		cookieServiceContext.saveCookie();
	}, [cookieServiceContext]);

	const handleOnRejectOptionalCookies = useCallback(() => {
		cookieServiceContext.invalidateCookie();
	}, [cookieServiceContext]);

	if (!isMounted || !isVisible) return null;

	return createPortal(
		<div className={styles.cookiesOverlay}>
			<div className={styles.cookies}>
				<div className="vinisto-popup__heading-wrap">
					<h2 className="vinisto-popup__heading">
						{t({ id: 'modal.cookies.modalTitle' })}
					</h2>
				</div>
				<br />
				<div>
					<p>{t({ id: 'modal.cookie.text1' })}</p>
					<p>{t({ id: 'modal.cookie.text2' })}</p>
					<div className="mb-3">
						{`${t({ id: 'modal.cookie.text3' })} `}
						<button
							className={styles.link}
							onClick={handleOnRejectOptionalCookies}
						>
							{t({ id: 'modal.cookie.text4' })}
						</button>
						.
					</div>
					<div className="mb-3">
						{t({ id: 'modal.cookie.text5' })}{' '}
						<Link
							className={styles.link}
							href={privacyProtectionPath}
						>
							{t({ id: 'modal.cookie.text4' })}
						</Link>
						.
					</div>
				</div>

				{isSettingsOpen && (
					<div className={styles.settings}>
						<div className={styles.setting}>
							<div className={styles.cookiesHead}>
								<div
									className={styles.settingName}
									onClick={handleOnToggleFunctional}
								>
									{t({ id: 'modal.cookies.functionalHeading' })}
									<FilterDropdownArrowIcon
										alt=""
										title=""
										className="FilterDropdownArrowIcon"
									/>
								</div>
								<div className={styles.settingCheck}>
									<label className="vinisto-popup__checkbox">
										<input
											onChange={() => {}}
											type="checkbox"
											checked
										/>
										<span className="vinisto-popup__checkmark" />
									</label>
								</div>
							</div>
							{isFunctionalOpen && (
								<div className={styles.cookiesText}>
									{t({ id: 'modal.cookie.text8' })}
								</div>
							)}
						</div>

						<div className={styles.setting}>
							<div className={styles.cookiesHead}>
								<div
									className={styles.settingName}
									onClick={handleOnToggleAnalytic}
								>
									{t({ id: 'modal.cookies.analyticHeading' })}
									<FilterDropdownArrowIcon
										alt=""
										title=""
										className="FilterDropdownArrowIcon"
									/>
								</div>
								<div className={styles.settingCheck}>
									<label className="vinisto-popup__checkbox">
										<input
											onChange={() => {}}
											type="checkbox"
											checked
										/>
										<span className="vinisto-popup__checkmark" />
									</label>
								</div>
							</div>
							{isAnalyticOpen && (
								<div className={styles.cookiesText}>
									{t({ id: 'modal.cookie.text8' })}
								</div>
							)}
						</div>

						<div className={styles.setting}>
							<div className={styles.cookiesHead}>
								<div
									className={styles.settingName}
									onClick={handleOnToggleMarketing}
								>
									{t({ id: 'modal.cookies.marketingHeading' })}
									<FilterDropdownArrowIcon
										alt=""
										title=""
										className="FilterDropdownArrowIcon"
									/>
								</div>
								<div className={styles.settingCheck}>
									<label className="vinisto-popup__checkbox">
										<input
											onChange={() => {}}
											type="checkbox"
											checked
										/>
										<span className="vinisto-popup__checkmark" />
									</label>
								</div>
							</div>
							{isMarketingOpen && (
								<div className={styles.cookiesText}>
									{t({ id: 'modal.cookie.text8' })}
								</div>
							)}
						</div>
					</div>
				)}

				<div className={styles.cookiesButtons}>
					<button
						className="vinisto-btn vinisto-popup__btn vinisto-popup__btn--green"
						onClick={handleOnAllowAllCookies}
						type="button"
					>
						{t({ id: 'modal.cookies.allowAll' })}
					</button>
					{isSettingsOpen && (
						<button
							className="vinisto-btn vinisto-popup__btn mt-3"
							onClick={handleOnAllowAllCookies}
							type="button"
						>
							{t({ id: 'modal.cookies.allowSelected' })}
						</button>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
};

export default CookiesModal;

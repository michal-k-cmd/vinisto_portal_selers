'use client';

import { useContext } from 'react';
import cx from 'classnames';
import { formatPhoneNumber } from 'Components/Navbar/helpers';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import useChat from 'Hooks/useChat';
import HeaderPhoneIcon from 'Components/Icons/HeaderPhone';
import ChatIcon from 'Components/Icons/Chat';
import { useIsFooterInViewPort } from 'Hooks/useScrollFixedFilters';
import useIsInBasket from 'Hooks/useIsInBasket';
import { useIsB2b } from 'Services/PlatformService';

import InfoColumns from './Components/InfoColumns';
import Newsletter from './Components/Newsletter';
import SocialLinks from './Components/SocialLinks';
import { useFooterConfig } from './hooks';
import styles from './styles.module.css';

import './styles.css';

const AppFooter = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { activeLanguage } = localizationContext;
	const { isMobile } = useContext(DeviceServiceContext);
	const isB2b = useIsB2b();
	const footerConfig = useFooterConfig({ activeLanguage, isB2b });

	const { openChat } = useChat();

	const isInBasket = useIsInBasket(true);

	const footerRef = useIsFooterInViewPort();

	if (isInBasket) {
		return;
	}

	return (
		<footer ref={footerRef}>
			<div className="container">
				<div className="row">
					<div className="col-md-3 col-12 vinisto-footer-18-wrap">
						<span className="vinisto-footer-18">18+</span>
						<span className="vinisto-footer-18-text">
							{t({ id: 'footer.ban' })}
						</span>
					</div>
					<div className="col-md-6 col-12">
						<Newsletter title={footerConfig.newsletterTitle} />
					</div>
					{isMobile && (
						<div
							className={cx(
								styles.mobileContacts,
								'fw-bolder vinisto-font-14',
								{
									[styles.twoColumns]: footerConfig.mobileSecondaryContact,
								}
							)}
						>
							<div className="d-flex flex-column">
								{t({ id: 'navbar.customerCare.label' })}
								<a
									href={`tel:${footerConfig.customerCarePhone}`}
									className={cx(
										'vinisto-color-darker-gray fw-bolder mt-2',
										styles.phoneLink
									)}
								>
									<div className="vinisto-footer__phone-wrap">
										<HeaderPhoneIcon className="me-2 mb-1" />
										{formatPhoneNumber(footerConfig.customerCarePhone)}
									</div>
								</a>
								<button
									className={styles.chatButton}
									onClick={() => {
										openChat();
									}}
								>
									<div className="vinisto-footer__phone-wrap">
										<ChatIcon className={styles.chatIcon} />
										{t({ id: 'navbar.customerCare.onlineChat' })}
									</div>
								</button>
							</div>
							{footerConfig.mobileSecondaryContact && (
								<div className="d-flex flex-column">
									{footerConfig.mobileSecondaryContact.label}
									<a
										href={`tel:${footerConfig.mobileSecondaryContact.phone}`}
										className={cx(
											'vinisto-color-darker-gray fw-bolder mt-2',
											styles.phoneLink
										)}
									>
										<div className="vinisto-footer__phone-wrap">
											<HeaderPhoneIcon className="me-2 mb-1" />
											{formatPhoneNumber(
												footerConfig.mobileSecondaryContact.phone
											)}
										</div>
									</a>
								</div>
							)}
						</div>
					)}
					<div className="col-3 d-flex align-items-end mb-4 social-media-icons mobile-hide">
						{!isMobile && <SocialLinks />}
					</div>
				</div>
				<InfoColumns columns={footerConfig.infoColumns} />
				{isMobile && <SocialLinks />}
			</div>
		</footer>
	);
};

export default AppFooter;

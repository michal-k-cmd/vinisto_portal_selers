import { FC, useContext } from 'react';
import cx from 'classnames';
import Config from 'Config';
import { get } from 'lodash-es';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { HiChatAlt, HiPhone } from 'react-icons/hi';
import { IoIosMail } from 'react-icons/io';
import useChat from 'Hooks/useChat';

import { getDaysRange, getHoursRange } from './helpers';
import './styles.css';
import styles from './styles.module.css';

const Footer: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const deviceServiceContext = useContext(DeviceServiceContext);
	const isMobileNavBar = get(deviceServiceContext, 'isMobile', false);
	const { openChat } = useChat();

	return (
		<div
			className={cx('vca-footer', {
				mobile: isMobileNavBar,
				desktop: !isMobileNavBar,
			})}
		>
			<div className="vca-footer__back">
				<a href="https://www.vinisto.cz">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						className="me-2"
					>
						<g transform="translate(-325.946 -5.076)">
							<circle
								cx="10"
								cy="10"
								r="10"
								transform="translate(325.946 5.076)"
								fill="#280044"
							/>
							<path
								d="M343.612,13.826h-8.854V11.335l-6.479,3.742,6.479,3.741V16.327h8.854Z"
								fill="#fff"
							/>
						</g>
					</svg>

					{t({ id: 'sidebar.returnToVinisto.label' })}
				</a>
			</div>
			<div className="vca-footer__contact-us">
				{t(
					{ id: 'footer.needHelp' },
					{
						value: (
							<div className="vca-footer__contact-us--info">
								<div className="vca-footer__contact-us--info__item">
									<HiPhone />
									<a
										href={`tel:${Config.contact.phone.replace(/ /g, '')}`}
										className="fw-bold color-primary"
									>
										{t(
											{ id: 'footer.phoneDaysHours' },
											{
												phone: (
													<span className={styles.phone}>
														{Config.contact.phone}
													</span>
												),
												days: getDaysRange(Config.contact.daysRange, t),
												hours: getHoursRange(Config.contact.hoursRange, t),
											}
										)}
									</a>
								</div>
								<div className="vca-footer__contact-us--info__item">
									<IoIosMail />
									<a
										href={`mailto:${Config.contact.email}`}
										className="fw-bold color-primary"
									>
										{Config.contact.email}
									</a>
								</div>
								<div className="vca-footer__contact-us--info__item">
									<HiChatAlt />
									<button
										onClick={() => openChat()}
										className="fw-bold color-primary"
									>
										{t({ id: 'chat.start' })}
									</button>
								</div>
							</div>
						),
					}
				)}
			</div>
		</div>
	);
};

export default Footer;

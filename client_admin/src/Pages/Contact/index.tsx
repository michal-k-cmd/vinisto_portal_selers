import { FC, useContext } from 'react';
import Config from 'Config';
import { getDaysRange, getHoursRange } from 'Components/Footer/helpers';
import { LocalizationContext } from 'Services/LocalizationService';

import './styles.css';

const Contact: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<section id="content-wrapper">
			<div className="container container-center">
				<div className="col-12 col-xxl-8">
					<div className="vinisto-card vinisto-terms__card">
						<div className="vinisto-terms__card__wrap">
							<div>
								<img
									src="/assets/images/contact-big-ico-2.svg"
									alt=""
								/>
							</div>
							<div className="vinisto-terms__text vinisto-font-18">
								<h2 className="color-primary h3">
									Jsme velice rádi, že máte zájem o prodej na platformě!
								</h2>
								<p>
									Administraci s automatickou registrací a zalistováním produktů
									pro Vás právě{' '}
									<span className="vinisto-color-success">připravujeme</span>.
									Než ji budeme mít hotovu, obraťte se prosím na naší podporu
									pro prodejce, a my s Vámi vyřešíme vše potřebné pro začátek
									prodeje.
								</p>
								<div className="vinisto-terms__cta-wrap">
									<div className="vinisto-terms__cta underline-effect underline-effect--vinisto">
										<img
											src="/assets/images/contact-small-phone.svg"
											alt=""
										/>
										<div className="d-flex flex-column">
											<span className="color-primary">
												{Config.contact.phone}
											</span>
											<span className="color-primary">
												{getDaysRange(Config.contact.daysRange, t)};{' '}
												{getHoursRange(Config.contact.hoursRange, t)}
											</span>
										</div>
									</div>
									<div className="vinisto-terms__cta underline-effect underline-effect--vinisto">
										<img
											src="/assets/images/contact-small-mail.svg"
											alt=""
										/>
										<a
											href="mailto:podpora@vinisto.cz"
											className="underline-item"
										>
											prodejce@vinisto.cz
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;

import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { TEST_IDS } from 'Constants/test-ids';
import Link from 'next/link';
import { useIsB2b } from 'Services/PlatformService';

const RegisterCta = ({
	handleOpenRegistrationModal,
}: {
	handleOpenRegistrationModal: () => void;
}) => {
	const isB2b = useIsB2b();
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="vinisto-popup__split__cta">
			{!isB2b && (
				<ul className="vinisto-popup__usp">
					<li key="reg-usp1">
						{t(
							{
								id: 'modal.registration.usp1.label',
							},
							{
								specialProducts: (
									<span
										className="fw-bold"
										key="modal.registration.usp1.label.specialProducts"
									>
										{t({
											id: 'modal.registration.usp1.label.specialProducts',
										})}
									</span>
								),
								prices: (
									<span
										className="fw-bold"
										key="modal.registration.usp1.label.prices"
									>
										{t({
											id: 'modal.registration.usp1.label.prices',
										})}
									</span>
								),
								club: (
									<Link
										href="/vinistoplus"
										className="fw-bold vinisto-color-success"
										key="modal.registration.usp1.label.club"
									>
										{t({
											id: 'modal.registration.usp1.label.club',
										})}
									</Link>
								),
							}
						)}
					</li>
					<li key="reg-usp2">
						{t(
							{
								id: 'modal.registration.usp2.label',
							},
							{
								status: (
									<span
										className="fw-bold"
										key="modal.registration.usp2.label.status"
									>
										{t({
											id: 'modal.registration.usp2.label.status',
										})}
									</span>
								),
							}
						)}
					</li>
					<li key="reg-usp3">
						{t(
							{
								id: 'modal.registration.usp3.label',
							},
							{
								contests: (
									<span
										className="fw-bold"
										key="modal.registration.usp3.label.contests"
									>
										{t({
											id: 'modal.registration.usp3.label.contests',
										})}
									</span>
								),
								first: (
									<span
										className="fw-bold"
										key="modal.registration.usp3.label.first"
									>
										{t({
											id: 'modal.registration.usp3.label.first',
										})}
									</span>
								),
							}
						)}
					</li>
				</ul>
			)}
			<div className="text-end desktop-only">
				<button
					onClick={handleOpenRegistrationModal}
					className="vinisto-btn vinisto-bg-outline-green"
					data-testid={TEST_IDS.REGISTRATION_BUTTON_MODAL}
				>
					{t({ id: 'modal.registration.submitButtonText' })}
				</button>
			</div>
		</div>
	);
};

export default RegisterCta;

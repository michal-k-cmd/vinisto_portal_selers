import { useMutation, useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import ModalCloseIcon from 'Components/Modal/Components/ModalCloseIcon';
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { Accordion, Modal } from 'react-bootstrap';
import { Button } from 'vinisto_ui';
import { subscriptionWriteApi } from 'vinisto_api_client/src/subscription-service';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import ImageLocal from 'Components/View/ImageLocal';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { ServicesService } from 'vinisto_api_client';
import { getCustomerSupportContact } from 'Hooks/useCustomerSupportContact';
import { formatPhoneNumber } from 'Components/Navbar/helpers';

import styles from './styles.module.css';
import CancelForm from './CancelForm';

import { SubscriptionResponse } from '@/api-types/subscription-api';
import api from '@/api';
import { VinistoOrderDllModelsApiReturnDataOrderSubscriberDiscountsReturn } from '@/api-types/order-api';

export interface CancelSubscriptionModalRef {
	open: () => void;
}

interface CancelSubscriptionModalProps {
	subscriptionToCancel: SubscriptionResponse;
	refetchSubscriptions: () => void;
}

const CancelSubscriptionModal = forwardRef<
	CancelSubscriptionModalRef,
	CancelSubscriptionModalProps
>(({ subscriptionToCancel, refetchSubscriptions }, ref) => {
	const customerSupport = getCustomerSupportContact('b2c');
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const { vinistoUser } = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = vinistoUser;

	const [isOpened, setIsOpened] = useState(false);
	const [activeKey, setActiveKey] = useState<string>('1');
	const [emailBody, setEmailBody] = useState<string>('<h1>Petrův test</h1>');
	const emailMessage = `<h1>Dotazník - zrušení vinisto PLUS+</h1><p>Uživatel ${vinistoUser.email} s id ${vinistoUser.id} zrušil předplatné vinisto PLUS+.</p><p>${emailBody}</p>`;

	useImperativeHandle(ref, () => ({
		open: () => {
			setIsOpened(true);
			setActiveKey('1');
		},
	}));

	const goTo = (key: string) => setActiveKey(key);

	const handleCancelSubscription = useMutation({
		mutationFn: async () =>
			await subscriptionWriteApi.subscriptionsDeactivatePartialUpdate(
				subscriptionToCancel.id ?? '',
				userLoginHash
			),
		onSuccess: () => {
			refetchSubscriptions();
			emailBody !== '' &&
				ServicesService.sendEmail({
					recipient: customerSupport.email,
					subject: 'Dotazník - zrušení vinisto PLUS+',
					body: emailMessage,
				});
			setActiveKey('4');
		},
		// TODO - delete after testing
		onError: () => {
			setActiveKey('4');
		},
	});

	const subscriptionStatisticsQuery = useQuery({
		queryKey: [
			'subscriptionStatistics',
			{ subscriptionId: subscriptionToCancel.id, currency, userLoginHash },
		],
		queryFn: () =>
			api.get<VinistoOrderDllModelsApiReturnDataOrderSubscriberDiscountsReturn>(
				`order-api/statistics/subscriber-total-discounts`,
				{
					subscriptionId: subscriptionToCancel.id,
					Currency: currency,
					UserLoginHash: userLoginHash,
				}
			),
	});

	const closeModal = () => {
		setIsOpened(false);
		setActiveKey('1');
	};

	return (
		<Modal
			show={isOpened}
			className={styles.modal}
			dialogClassName={styles.dialog}
			contentClassName={styles.modalContent}
			onHide={closeModal}
		>
			<Modal.Header className={styles.header}>
				<div className={styles.modalHeading}>
					{t({ id: 'modal.cancelVinistoPlus.heading' })}{' '}
					<ImageLocal
						fileName={'vinisto_plus_wide.svg'}
						className={styles.headingPlus}
					/>{' '}
					/{' '}
					{activeKey === '1'
						? t({ id: 'modal.cancelVinistoPlus.overview' })
						: t({ id: 'modal.cancelVinistoPlus.end' })}
				</div>
				<button
					type="button"
					className="vinisto-popup__close"
					onClick={closeModal}
				>
					<ModalCloseIcon />
				</button>
			</Modal.Header>

			<Modal.Body className={styles.body}>
				<Accordion activeKey={activeKey}>
					<Accordion.Item
						className={styles.accordionItem}
						eventKey="1"
					>
						<Accordion.Header className="d-none" />
						<Accordion.Body className={styles.accordionBody}>
							<p className={styles.till}>
								{t(
									{ id: 'modal.cancelVinistoPlus.till' },
									{
										vinistoplus: (
											<span
												className={styles.strong}
												key="vinistoplus"
											>
												{t({ id: 'modal.cancelVinistoPlus.main.vinistoplus' })}
											</span>
										),
										date: dayjs(subscriptionToCancel.endDate).format(
											'D. M. YYYY'
										),
									}
								)}
							</p>

							<div className={styles.summary}>
								<div>
									<strong>
										{t({ id: 'modal.cancelVinistoPlus.memberSince' })}:
									</strong>{' '}
									{dayjs(subscriptionToCancel.startDate).format('D. M. YYYY')}
								</div>
								{(subscriptionStatisticsQuery.data
									?.totalSubscriberGoodsDiscount ?? 0) > 0 && (
									<div>
										<strong>
											{t({ id: 'modal.cancelVinistoPlus.saved' })}:
										</strong>{' '}
										{getLocalizedPrice({
											price:
												subscriptionStatisticsQuery.data
													?.totalSubscriberGoodsDiscount ?? 0,
											currency,
										})}
									</div>
								)}
								{(subscriptionStatisticsQuery.data
									?.totalSubscriberDeliveriesDiscount ?? 0) > 0 && (
									<div>
										<strong>
											{t({ id: 'modal.cancelVinistoPlus.savedDelivery' })}:
										</strong>{' '}
										{getLocalizedPrice({
											price:
												subscriptionStatisticsQuery.data
													?.totalSubscriberDeliveriesDiscount ?? 0,
											currency,
										})}
									</div>
								)}
							</div>

							<h2 className={styles.subheading}>
								{t(
									{ id: 'modal.cancelVinistoPlus.main' },
									{
										vinistoplus: (
											<span
												className={styles.plus}
												key="vinistoplus"
											>
												{t({ id: 'modal.cancelVinistoPlus.main.vinistoplus' })}
											</span>
										),
									}
								)}
							</h2>

							<p className={styles.subheadingInfo}>
								{t({ id: 'modal.cancelVinistoPlus.subheadingInfo' })}
							</p>

							<div className={styles.features}>
								<div>
									<div className={styles.feature}>
										<div className={styles.bulletWrap}>
											<ImageLocal
												fileName={'bullet.svg'}
												className={styles.bulletIcon}
											/>
										</div>
										<div className={styles.bulletHeading}>
											{t({ id: 'modal.cancelVinistoPlus.feature1' })}
										</div>
										<div className={styles.bulletInfo}>
											{t(
												{ id: 'modal.cancelVinistoPlus.feature1.info' },
												{
													freeshipping: (
														<span
															className={styles.strong}
															key="freeshipping"
														>
															{t({
																id: 'modal.cancelVinistoPlus.feature1.info.freeshipping',
															})}
														</span>
													),
												}
											)}
										</div>
									</div>

									<div className={styles.feature}>
										<div className={styles.bulletWrap}>
											<ImageLocal
												fileName={'bullet.svg'}
												className={styles.bulletIcon}
											/>
										</div>
										<div className={styles.bulletHeading}>
											{t({ id: 'modal.cancelVinistoPlus.feature2' })}
										</div>
										<div className={styles.bulletInfo}>
											{t({ id: 'modal.cancelVinistoPlus.feature2.info' })}
										</div>
									</div>

									<div className={styles.feature}>
										<div className={styles.bulletWrap}>
											<ImageLocal
												fileName={'bullet.svg'}
												className={styles.bulletIcon}
											/>
										</div>
										<div className={styles.bulletHeading}>
											{t({ id: 'modal.cancelVinistoPlus.feature3' })}
										</div>
										<div className={styles.bulletInfo}>
											{t({ id: 'modal.cancelVinistoPlus.feature3.info' })}
										</div>
									</div>

									<div className={styles.feature}>
										<div className={styles.bulletWrap}>
											<ImageLocal
												fileName={'bullet.svg'}
												className={styles.bulletIcon}
											/>
										</div>
										<div className={styles.bulletHeading}>
											{t({ id: 'modal.cancelVinistoPlus.feature4' })}
										</div>
										<div className={styles.bulletInfo}>
											{t({ id: 'modal.cancelVinistoPlus.feature4.info' })}
										</div>
									</div>

									<div className={styles.feature}>
										<div className={styles.bulletWrap}>
											<ImageLocal
												fileName={'bullet.svg'}
												className={styles.bulletIcon}
											/>
										</div>
										<div className={styles.bulletHeading}>
											{t({ id: 'modal.cancelVinistoPlus.feature5' })}
										</div>
										<div className={styles.bulletInfo}>
											{t({ id: 'modal.cancelVinistoPlus.feature5.info' })}
										</div>
									</div>
								</div>
							</div>
						</Accordion.Body>
					</Accordion.Item>

					<Accordion.Item
						className={styles.accordionItem}
						eventKey="2"
					>
						<Accordion.Header className="d-none" />
						<Accordion.Body className={styles.accordionBody}>
							<h2 className={styles.heading2}>
								{t(
									{ id: 'modal.cancelVinistoPlus.heading2' },
									{
										newline: <br key="newline" />,
									}
								)}
							</h2>
							<div className={styles.warnings}>
								<div className={styles.warning}>
									<div className={styles.warningHeading}>
										{t(
											{ id: 'modal.cancelVinistoPlus.warning1' },
											{
												days: (
													<span key="days">
														{dayjs(subscriptionToCancel.endDate).diff(
															dayjs(),
															'day'
														)}
													</span>
												),
											}
										)}
									</div>
									<div className={styles.warningIconWrap}>
										<ImageLocal
											fileName={'calendar.svg'}
											className={styles.warningIcon}
										/>
									</div>
									<div className={styles.warningText}>
										{t(
											{ id: 'modal.cancelVinistoPlus.warning1.text' },
											{
												date: dayjs(subscriptionToCancel.endDate).format(
													'D. M. YYYY'
												),
											}
										)}
									</div>
								</div>
								<div className={styles.warning}>
									<div className={styles.warningHeading}>
										{t({ id: 'modal.cancelVinistoPlus.warning2' })}
									</div>
									<div className={styles.warningIconWrap}>
										<ImageLocal
											fileName={'cancel.svg'}
											className={styles.warningIcon}
										/>
									</div>
									<div className={styles.warningText}>
										{t({ id: 'modal.cancelVinistoPlus.warning2.text' })}
									</div>
								</div>
								<div className={styles.warning}>
									<div className={styles.warningHeading}>
										{t({ id: 'modal.cancelVinistoPlus.warning3' })}
									</div>
									<div className={styles.warningIconWrap}>
										<ImageLocal
											fileName={'cancel.svg'}
											className={styles.warningIcon}
										/>
									</div>
									<div className={styles.warningText}>
										{t({ id: 'modal.cancelVinistoPlus.warning3.text' })}
									</div>
								</div>
								<div className={styles.warning}>
									<div className={styles.warningHeading}>
										{t({ id: 'modal.cancelVinistoPlus.warning4' })}
									</div>
									<div className={styles.warningIconWrap}>
										<ImageLocal
											fileName={'cancel.svg'}
											className={styles.warningIcon}
										/>
									</div>
									<div className={styles.warningText}>
										{t({ id: 'modal.cancelVinistoPlus.warning4.text' })}
									</div>
								</div>
								<div className={styles.warning}>
									<div className={styles.warningHeading}>
										{t({ id: 'modal.cancelVinistoPlus.warning5' })}
									</div>
									<div className={styles.warningIconWrap}>
										<ImageLocal
											fileName={'cancel.svg'}
											className={styles.warningIcon}
										/>
									</div>
									<div className={styles.warningText}>
										{t({ id: 'modal.cancelVinistoPlus.warning5.text' })}
									</div>
								</div>
								<div className={styles.warning}>
									<div className={styles.warningHeading}>
										{t({ id: 'modal.cancelVinistoPlus.warning6' })}
									</div>
									<div className={styles.warningIconWrap}>
										<ImageLocal
											fileName={'cancel.svg'}
											className={styles.warningIcon}
										/>
									</div>
									<div className={styles.warningText}>
										{t({ id: 'modal.cancelVinistoPlus.warning6.text' })}
									</div>
								</div>
							</div>
						</Accordion.Body>
					</Accordion.Item>

					<Accordion.Item
						className={styles.accordionItem}
						eventKey="3"
					>
						<Accordion.Header className="d-none" />
						<Accordion.Body className={styles.accordionBody}>
							<h2 className={cx(styles.heading2, 'mb-0')}>
								{t({ id: 'modal.cancelVinistoPlus.heading3' })}
							</h2>
							<p className={styles.stepSubheading}>
								{t({ id: 'modal.cancelVinistoPlus.step3.subheading' })}
							</p>
							<CancelForm setEmailBody={setEmailBody} />
							{handleCancelSubscription.isError && (
								<p className={styles.error}>
									{t({ id: 'modal.cancelVinistoPlus.step3.error' })}
								</p>
							)}
						</Accordion.Body>
					</Accordion.Item>

					<Accordion.Item
						className={styles.accordionItem}
						eventKey="4"
					>
						<Accordion.Header className="d-none" />
						<Accordion.Body className={styles.accordionBody}>
							<h2 className={styles.heading2}>
								{t(
									{ id: 'modal.cancelVinistoPlus.heading4' },
									{
										date: dayjs(subscriptionToCancel.endDate).format(
											'D. M. YYYY'
										),
									}
								)}
							</h2>
							<p className={styles.step4info}>
								{t(
									{ id: 'modal.cancelVinistoPlus.step4.info' },
									{
										salutation: (
											<strong key="salutation">
												{t({
													id: 'modal.cancelVinistoPlus.step4.info.salutation',
												})}
											</strong>
										),
										newline: <br key="newline" />,
										ended: (
											<span
												key="ended"
												className={styles.endedText}
											>
												{t({ id: 'modal.cancelVinistoPlus.step4.info.ended' })}
											</span>
										),
									}
								)}
							</p>
							<p className={cx(styles.step4info, 'mb-0')}>
								{t(
									{ id: 'modal.cancelVinistoPlus.step4.info2' },
									{
										newline: <br key="newline" />,
										phone: (
											<a
												key="ended"
												href={`tel:${customerSupport.phone}`}
												className={styles.endedLink}
											>
												{formatPhoneNumber(customerSupport.phone)}
											</a>
										),
										email: (
											<a
												href={`mailto:${customerSupport.email}`}
												key="email"
												className={styles.endedLink}
											>
												{customerSupport.email}
											</a>
										),
									}
								)}
							</p>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Modal.Body>

			<Modal.Footer className={styles.footer}>
				<div>
					<Button
						className={styles.closeButton}
						onClick={closeModal}
					>
						{t({ id: 'modal.cancelVinistoPlus.close' })}
					</Button>
				</div>

				<div className={styles.actions}>
					{activeKey === '1' && (
						<Button
							className={styles.navigateButton}
							onClick={() => goTo('2')}
						>
							{t({ id: 'modal.cancelVinistoPlus.cancel' })}
						</Button>
					)}

					{activeKey === '2' && (
						<>
							<Button
								className={styles.navigateButton}
								onClick={() => goTo('1')}
							>
								{t({ id: 'modal.cancelVinistoPlus.previous' })}
							</Button>
							<Button
								className={styles.navigateButton}
								onClick={() => goTo('3')}
							>
								{t({ id: 'modal.cancelVinistoPlus.cancelAnyway' })}
							</Button>
						</>
					)}

					{activeKey === '3' && (
						<>
							<Button
								className={styles.navigateButton}
								onClick={() => goTo('2')}
							>
								{t({ id: 'modal.cancelVinistoPlus.previous' })}
							</Button>
							<Button
								className={styles.confirmButton}
								onClick={() => handleCancelSubscription.mutate()}
								disabled={handleCancelSubscription.isLoading}
							>
								{t({ id: 'modal.cancelVinistoPlus.done' })}
							</Button>
						</>
					)}
				</div>
			</Modal.Footer>
		</Modal>
	);
});

CancelSubscriptionModal.displayName = 'CancelSubscriptionModal';

export default CancelSubscriptionModal;

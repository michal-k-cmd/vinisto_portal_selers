import cx from 'classnames';
import { ModalContext } from 'Components/Modal/context';
import { FormEvent, useContext, useState } from 'react';
import { Button, buttonVariants } from 'vinisto_ui';
import Checkbox from 'Components/Forms/Components/Checkbox';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import api from '@/api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const STEP = 100;

export interface RequestCreditIncreaseModalData {
	currentCredit: number;
	customerId: string | null;
	customerName: string;
}

const RequestCreditIncrease = () => {
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { basketId, vinistoUser } = useContext(AuthenticationContext);
	const { modalData, handleCloseModal } = useContext(ModalContext);
	const { currentCredit, customerId } =
		(modalData as RequestCreditIncreaseModalData) ?? {};
	const [requestedCredit, setRequestedCredit] = useState<string>(
		`${currentCredit + STEP}`
	);
	const [attachBasketLink, setattachBasketLink] = useState(false);
	const [note, setNote] = useState('');

	const [showRequired, setShowRequired] = useState(false);

	const currentCreditFormatted = getLocalizedPrice({
		price: currentCredit,
		currency: VinistoHelperDllEnumsCurrency.CZK,
		displayCurrency: false,
	});

	const handleRequestCreditIncrease = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		api
			.post(`basket-api/basket/credit-increase-request`, undefined, {
				customerId,
				userLoginHash: vinistoUser.loginHash,
				requestedCredit: +requestedCredit,
				reason: note,
				basketId: attachBasketLink ? basketId : undefined,
			})
			.then(() => {
				handleShowSuccessNotification('modal.requestCreditIncrease.success');
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('modal.requestCreditIncrease.error');
			});
	};

	return (
		<form onSubmit={handleRequestCreditIncrease}>
			<div className={styles.form}>
				<div className={styles.creditForm}>
					<label>
						Navýšení kreditu z: <strong>{currentCreditFormatted}</strong>
					</label>
					<label className="d-flex align-items-center gap-2 mb-3">
						<span className="text-nowrap">
							na:&thinsp;<sup>*</sup>
						</span>
						<input
							value={requestedCredit}
							className={cx('form-control vinisto-input')}
							min={`${currentCredit + STEP}`}
							type="number"
							onChange={(e) => setRequestedCredit(e.target.value)}
							required={showRequired}
						/>
					</label>
					<Checkbox
						type="checkbox"
						id={`attach-basket-link`}
						checked={attachBasketLink}
						onChange={() => setattachBasketLink(!attachBasketLink)}
					>
						Připojit koncept objednávky
					</Checkbox>
				</div>
				<div className={styles.noteForm}>
					<label
						htmlFor="creditIncreaseReason"
						className="text-nowrap"
					>
						Odůvodnění:&thinsp;<sup>*</sup>
					</label>
					<textarea
						id="creditIncreaseReason"
						className={cx(styles.textArea, 'form-control vinisto-input')}
						placeholder="Spolehlivý odběratel, dobrá platební historie, čekající velkou akci…"
						rows={4}
						onChange={(e) => setNote(e.target.value)}
						required={showRequired}
					></textarea>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					variant={buttonVariants.CTA}
					onClick={() => setShowRequired(true)}
				>
					Odeslat ke schválení CSO
				</Button>
			</div>
		</form>
	);
};

export default RequestCreditIncrease;

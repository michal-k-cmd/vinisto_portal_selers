import { useCallback, useContext } from 'react';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';

import './styles.css';

const AddToBasketModal = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const bundleData = modalContext.modalData?.bundleData || {};
	const flagSpecification = getFlagSpecification(
		bundleData.specificationDetails || []
	);
	const handleOnBtnClick = useCallback(() => {
		modalContext.handleCloseModal();
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, [modalContext]);

	return (
		<div className="vinisto-modal-add-to-basket">
			<div className="vinisto-modal-add-to-basket__body">
				<div>
					<p className="vinisto-font-18">
						{t({ id: 'modal.addToBasket.text' })}
					</p>
				</div>
			</div>
			<div className="vinisto-modal-add-to-basket__image">
				<img
					src={bundleData.bundleImageSmall ?? '/assets/images/default.webp'}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
			</div>
			<div className="text-center">
				<p className="vinisto-wine__name">
					{getLocalizedValue(bundleData.name) ?? '-'}
				</p>
			</div>
			<div className="text-center">
				<div className="vinisto-wine__variety underline-effect underline-effect--vinisto">
					{flagSpecification.component && flagSpecification.component}
					<span className="vinisto-wine__variety__text">
						{flagSpecification.shortVariety && flagSpecification.shortVariety}
					</span>
				</div>
			</div>
			<div className="text-center">
				<button
					className="vinisto-btn vinisto-bg-green"
					onClick={handleOnBtnClick}
					type="button"
				>
					{t({ id: 'modal.addToBasket.button' })}
				</button>
			</div>
		</div>
	);
};

export default AddToBasketModal;

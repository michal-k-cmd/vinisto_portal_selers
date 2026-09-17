import { FC, useCallback, useContext, useEffect } from 'react';
import { ExtendedPoint } from 'Vendor/Zasilkovna/interfaces';

import { ModalContext } from '../../context';

import { useZasilkovnaWidget } from './hooks';

/**
 * @category Component Zasilkovna Modal Content
 */
const ZasilkovnaModal: FC = () => {
	const { handleCloseModal, modalData } = useContext(ModalContext);
	const { widget } = useZasilkovnaWidget();

	const onPick = useCallback(
		(response: null | ExtendedPoint) => {
			if (typeof modalData?.onPick === 'function') {
				modalData.onPick(response);
			}
			handleCloseModal();
		},
		[modalData?.onPick]
	);

	useEffect(() => {
		if (widget?.open) {
			widget.open(onPick);
		}
	}, [widget?.open]);

	return <></>;
};

export default ZasilkovnaModal;

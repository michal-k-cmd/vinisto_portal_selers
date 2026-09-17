import { Fragment, useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import Detail from 'Components/Detail';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';
import ProvisionsTable from './ProvisionsTable';

import { VinistoOrderDllModelsApiOrderOrderItem } from '@/api-types/order-api';

type BundleProvisionsModalData = {
	bundle: VinistoOrderDllModelsApiOrderOrderItem;
	discountVolumePrice: number | null;
	discountVolumePriceWithVat: number | null;
};

const BundleProvisionsModal = () => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const modalData = modalContext.data as BundleProvisionsModalData;

	const item = modalData?.bundle ?? null;
	const discountVolumePrice = modalData?.discountVolumePrice ?? null;
	const discountVolumePriceWithVat =
		modalData?.discountVolumePriceWithVat ?? null;

	const navigate = useNavigate();

	return (
		<div>
			{item?.bundle?.isSet ? (
				item.bundle.bundleItems.map((setItem, index) => (
					<Fragment key={index}>
						<div className={styles.label}>
							{t({ id: 'admin.modal.bundleProvisions.bundle' })}
						</div>
						<div>
							<Detail.Link
								onClick={() =>
									// @ts-expect-error TS problem
									navigate(`/bundle-detail/${setItem?.bundle?.id}`)
								}
							>
								{
									// @ts-expect-error TS problem
									setItem?.bundle?.name
								}
							</Detail.Link>
						</div>
						<ProvisionsTable
							key={index}
							setItem={setItem}
							setQuantity={item.quantity}
						/>
					</Fragment>
				))
			) : (
				<>
					<div className={styles.label}>
						{t({ id: 'admin.modal.bundleProvisions.bundle' })}
					</div>
					<div>
						<Detail.Link
							onClick={() => navigate(`/bundle-detail/${item?.bundle?.id}`)}
						>
							{item?.bundle?.name}
						</Detail.Link>
					</div>
					<ProvisionsTable
						item={item}
						discountVolumePrice={discountVolumePrice}
						discountVolumePriceWithVat={discountVolumePriceWithVat}
					/>
				</>
			)}
		</div>
	);
};

export default BundleProvisionsModal;

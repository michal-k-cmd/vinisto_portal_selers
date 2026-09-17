'use client';

import { useContext, useEffect, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import ModalCloseIcon from 'Components/Modal/Components/ModalCloseIcon';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Link from 'next/link';
import WarningIcon from 'Components/Icons/Warning';
import { WarehouseContext } from 'Services/WarehouseService';
import {
	SignalRErrorType,
	UniqueSignalRError,
} from 'Services/BasketService/interfaces';
import useGetBundlesByIds from 'Hooks/Queries/useGetBundlesByIds';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';

const AvailabilityUpdateModal = () => {
	const { getQuantity, requestQuantityUpdate } = useContext(WarehouseContext);
	const { basketErrorMessages, clearBasketErrorCategory } = useContext(
		AuthenticationContext
	);

	const { countryOfSale } = useContext(LocalizationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const bundleMessages = basketErrorMessages.Bundle;

	const bundleIds = useMemo(
		() => [...new Set(bundleMessages.map((message) => message.itemId))],
		[bundleMessages]
	);

	const { data: bundles } = useGetBundlesByIds({
		bundleIds,
		requestParams: {
			countryOfSale,
		},
	});

	useEffect(() => {
		if (!bundleIds.length) return;

		requestQuantityUpdate(bundleIds);
	}, [bundleIds, requestQuantityUpdate]);

	const handleClose = () => {
		clearBasketErrorCategory(SignalRErrorType.Bundle);
	};

	const messagesWithBundles = bundleMessages.map((message) => {
		const bundle = bundles?.get(message.itemId);
		return {
			...message,
			bundle: bundle || null,
		};
	});

	const getErrorMessage = (
		message: UniqueSignalRError & { bundle: Bundle | null }
	) => {
		switch (message.specificError) {
			case 'NOT_SINGLE_ITEM_AVAILABLE_IN_WAREHOUSE':
				return t({
					id: 'cart.outOfStockItem.outOfStock',
				});
			case 'BUNDLE_WAS_SET_TO_MAXIMUM_QUANTITY_AVAILABLE_IN_WAREHOUSE':
				return t(
					{ id: 'cart.outOfStockItem.missingItems' },
					{ count: getQuantity(message.itemId) }
				);
			case 'QUANTITY_WAS_SET_BY_ORDER_LIMITATION_FOR_BUNDLE_PER_ONE_ORDER':
				return t(
					{ id: 'cart.outOfStockItem.quantityHigherThanOrderLimit' },
					{ count: message.bundle?.orderLimitation?.limit ?? 1 }
				);

			case 'BUNDLE_NOT_ENABLED':
			case 'BUNDLE_DELETED':
			case 'BUNDLE_NOT_AVAILABLE_ON_PLATFORM':
				return t({ id: 'cart.isNotEnabled' });

			case 'BUNDLE_SALE_OVER':
				return t({ id: 'bundle.isSaleOver.productDetail.title' });

			case 'BUNDLE_TEMPORARY_UNAVAILABLE':
				return t({ id: 'bundle.temporaryUnavailable.productDetail.title' });

			case 'BUNDLE_NOT_ALLOWED_IN_COUNTRY':
				return t({ id: 'cart.isNotAllowedInCountry' });

			case 'BUNDLE_IS_ONLY_FOR_LOGGED_USERS':
				return t({ id: 'cart.isForLoggedInUsersOnly' });

			default:
				return t({ id: 'cart.isNotEnabled' });
		}
	};

	if (!bundleMessages.length || !bundles) return null;

	return (
		<Modal
			show
			onHide={handleClose}
			backdrop="static"
		>
			<Modal.Body className={styles.body}>
				<div className={styles.modalHeader}>
					<div className={styles.iconWrapper}>
						<WarningIcon />
					</div>

					<h2 className={styles.modalTitle}>
						{t({ id: 'cart.outOfStockItems.avalabilityChanged.heading' })}
					</h2>

					<button
						type="button"
						className="vinisto-popup__close"
						onClick={handleClose}
					>
						<ModalCloseIcon />
					</button>
				</div>
				<br />

				{messagesWithBundles.map((item) => {
					const bundleImageSrc = getBundleImage(
						item.bundle?.images ?? [],
						IMAGE_SIZE_THUMB_64x80
					);

					const bundlleDetailLink = `/${t({
						id: 'routes.product.route',
					})}/${getLocalizedValue(item.bundle?.url)}`;

					const bundleName = getLocalizedValue(item.bundle?.name);

					return (
						<div
							className={styles.itemWrap}
							key={item.id}
						>
							<div className={styles.item}>
								<Link
									className={styles.imageWrap}
									href={bundlleDetailLink}
								>
									<img
										src={bundleImageSrc}
										className={styles.image}
										alt={bundleName}
										title={bundleName}
										width={64}
										height={80}
									/>
								</Link>
								<div className={styles.infoWrap}>
									<Link
										className={styles.name}
										href={bundlleDetailLink}
									>
										{bundleName}
									</Link>
									<div className={styles.issue}>{getErrorMessage(item)}</div>
								</div>
							</div>
						</div>
					);
				})}
			</Modal.Body>
		</Modal>
	);
};

export default AvailabilityUpdateModal;

'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import useChat from 'Hooks/useChat';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import Config from 'Config';
import { LocalizationContext } from 'Services/LocalizationService';

import ModalCloseIcon from '../Modal/Components/ModalCloseIcon';

import styles from './style.module.css';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

const { advisorUrl: ADVISOR_URL } = Config;

const Advisor = () => {
	const { basketId } = useContext(AuthenticationContext);
	const { isLoggedIn, vinistoUser, anonymousUID } = useContext(
		AuthenticationContext
	);
	const { activeCurrency, countryOfSale } = useContext(LocalizationContext);
	const { handleOnChangeItemQuantity } = useContext(BasketContext);
	const { showWidget, hideWidget } = useChat();

	const router = useRouter();
	const [show, setShow] = useState(true);
	const [key, setKey] = useState<string>(uuidv4());

	useEffect(() => {
		if (basketId) {
			const iframe = document.querySelector(
				`iframe[title="advisor"]`
			) as HTMLIFrameElement | null;
			if (iframe && iframe.contentWindow) {
				iframe.contentWindow.postMessage({ basketId }, '*');
			}
		}
	}, [basketId]);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | undefined;

		const hideWidgetOrTryLater = () => {
			if (document.getElementById('supportBoxWebChat')?.children) {
				hideWidget();
				clearTimeout(timer);
			} else {
				timer = setTimeout(hideWidgetOrTryLater, 500);
			}
		};

		hideWidgetOrTryLater();

		return () => {
			clearTimeout(timer);
			showWidget();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClose = () => {
		setShow(false);
		setKey(uuidv4());
		showWidget();
		router.back();
	};

	const onWatchEventHandler = useCallback(
		(e: MessageEvent) => {
			const bundleId = e.data?.bundleId;
			const quantity = e.data?.quantity;
			if (!bundleId || !quantity) {
				// eslint-disable-next-line no-console
				console.warn('Invalid data received from advisor:', e.data);
				return;
			}
			handleOnChangeItemQuantity({
				bundleId,
				quantity: Number(quantity),
				bundleMetaForAnalytics: {
					item_brand: '',
					item_name: '',
					price: 0,
				},
			});
		},
		[handleOnChangeItemQuantity]
	);

	useEffect(() => {
		window.addEventListener('message', onWatchEventHandler);
		return () => window.removeEventListener('message', onWatchEventHandler);
	}, [onWatchEventHandler]);

	const url = new URL(ADVISOR_URL);
	url.searchParams.append('currency', activeCurrency.currency);
	url.searchParams.append('countryOfSale', countryOfSale);
	url.searchParams.append(
		'priceLevel',
		vinistoUser.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1
	);

	if (isLoggedIn && vinistoUser.loginHash) {
		url.searchParams.append('userLoginHash', vinistoUser.loginHash);
	} else if (anonymousUID.anonymousUserId) {
		url.searchParams.append('anonymousUserId', anonymousUID.anonymousUserId);
	}

	return (
		<Modal
			show={show}
			onHide={handleClose}
			dialogClassName={styles.dialog}
			contentClassName={styles.content}
			backdrop="static"
		>
			<Modal.Body className={styles.body}>
				<button
					className={styles.closeButton}
					onClick={handleClose}
				>
					<ModalCloseIcon />
				</button>
				<iframe
					className={styles.iframe}
					title="advisor"
					src={url.href}
					frameBorder={0}
					key={key}
				></iframe>
			</Modal.Body>
		</Modal>
	);
};

export default Advisor;

'use client';

import { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import useChatbox from 'Hooks/useChat';
import useIsInBasket from 'Hooks/useIsInBasket';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useDelay from 'Hooks/use-delay';
import { usePathname } from 'next/navigation';
import { useIsB2b } from 'Services/PlatformService';

const CHATBOX_SECRET_B2C = 'e1e5a8ca0f46b7c3faf7cc68e1892d3f';
const CHATBOX_ID_B2C = 2141;

const CHATBOX_SECRET_B2B = 'ecdef53473a8c1643c02e10bd09349d9';
const CHATBOX_ID_B2B = 2913;

const CHATBOX_INIT_DELAY = 1000;

const ChatBoxLoaderReady = () => {
	const isB2b = useIsB2b();
	const { isMobile, isTablet, footerHeight, sellerSelectionFooterHeight } =
		useContext(DeviceServiceContext);
	const { vinistoUser } = useContext(AuthenticationContext);

	const [chatButton, setChatButton] = useState<HTMLElement | null>(null);
	const [chatIframe, setChatIframe] = useState<HTMLElement | null>(null);
	const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

	const { hideWidget, showWidget } = useChatbox();
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const pathname = usePathname();
	const isOnHomePage = pathname === '/';
	const isOnCheckout = useIsInBasket();
	const isOnProductDetail = pathname.startsWith(
		`/${t({ id: 'routes.product.route' })}/`
	);

	// This ensures we have the chatbox button element available. It stops checking when it is loaded.
	useEffect(() => {
		if (chatButton) return;

		let timeoutId: ReturnType<typeof setTimeout>;

		const tick = () => {
			const iframe = document.getElementById('supportBox-iframe');
			if (iframe) setChatIframe(iframe);

			if (iframe == null) {
				timeoutId = setTimeout(tick, 200);
				return;
			}

			//@ts-expect-error contentdocument
			const button = iframe?.contentDocument.querySelector(
				'supportBoxWebChatInit'
			);

			if (button) setChatButton(button);

			if (parseInt(iframe.style.height.replace('px', '')) > 100) {
				setIsChatOpen(true);
			} else {
				setIsChatOpen(false);
			}

			timeoutId = setTimeout(tick, 200);
		};

		timeoutId = setTimeout(tick, 200);

		return () => clearTimeout(timeoutId);
	}, [chatButton]);

	useEffect(() => {
		if (!chatIframe) return;

		if (!isMobile && !isTablet) {
			chatIframe.style.bottom = '0px';
			return;
		}

		if (isChatOpen) {
			chatIframe.style.bottom = '0px';
		} else {
			if (isOnProductDetail) {
				chatIframe.style.bottom = `${Math.max(
					sellerSelectionFooterHeight,
					170
				)}px`;
			} else {
				chatIframe.style.bottom = `${Math.max(footerHeight, 70)}px`;
			}
		}
	}, [
		chatIframe,
		footerHeight,
		isChatOpen,
		isMobile,
		isOnProductDetail,
		isTablet,
		sellerSelectionFooterHeight,
	]);

	useEffect(() => {
		const supportboxScript = document.createElement('script');
		supportboxScript.type = 'text/javascript';
		supportboxScript.async = true;
		supportboxScript.innerHTML = `
		var supportBoxChatRunAsHidden = true
		var supportBoxChatId = ${isB2b ? CHATBOX_ID_B2B : CHATBOX_ID_B2C};
		var supportBoxChatSecret = '${isB2b ? CHATBOX_SECRET_B2B : CHATBOX_SECRET_B2C}';
		var supportBoxChatVariables = {};
		`;

		const supportboxScriptSrc = document.createElement('script');
		supportboxScriptSrc.src = 'https://chat.supportbox.cz/web-chat/entry-point';
		supportboxScriptSrc.async = true;
		supportboxScriptSrc.defer = true;

		document.body.appendChild(supportboxScript);
		document.body.appendChild(supportboxScriptSrc);

		return () => {
			document.body.removeChild(supportboxScript);
			document.body.removeChild(supportboxScriptSrc);
		};
	}, [isB2b]);

	useEffect(() => {
		const { supportBoxChatVariables } = window;
		if (!supportBoxChatVariables) return;
		if (vinistoUser.email && vinistoUser.id) {
			supportBoxChatVariables.fullName = 'Přihlášený uživatel';
			supportBoxChatVariables.email = vinistoUser.email;
			supportBoxChatVariables.customerId = vinistoUser.id;
		} else {
			delete window.supportBoxChatVariables.fullName;
			delete window.supportBoxChatVariables.email;
			delete window.supportBoxChatVariables.customerId;
		}
	}, [vinistoUser.email, vinistoUser.id]);

	const [scrolled, setScrolled] = useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrolled(position > 51);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	/**
	 * Zobrazuje a skrývá Chat widget pravidel definovaných v tomto ticketu:
	 * https://vinisto.atlassian.net/browse/VWA-681
	 */
	useEffect(() => {
		if (isOnCheckout) {
			hideWidget();
			return;
		}

		if (!isMobile && !isTablet) {
			showWidget();
			return;
		}

		chatIframe?.classList.add('isOnProductDetail');

		if (isOnHomePage || isOnProductDetail) {
			scrolled ? showWidget() : hideWidget();
		} else {
			hideWidget();
		}

		if (!isOnProductDetail) chatIframe?.classList.remove('isOnProductDetail');
	}, [
		chatIframe?.classList,
		hideWidget,
		isMobile,
		isOnCheckout,
		isOnHomePage,
		isOnProductDetail,
		isTablet,
		scrolled,
		showWidget,
	]);

	return null;
};

const ChatboxLoader = () => {
	const isReady = useDelay(CHATBOX_INIT_DELAY);
	const { hasAdminToolbarAccess } = useContext(
		AuthenticationContext
	).vinistoUser;

	if (!isReady || hasAdminToolbarAccess) return null;

	return <ChatBoxLoaderReady />;
};

export default ChatboxLoader;

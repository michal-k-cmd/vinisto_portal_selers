import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext, useEffect, useMemo, useState } from 'react';

const ChatboxLoader = () => {
	const [chatButton, setChatButton] = useState<HTMLElement | null>(null);

	// This ensures we have the chatbox button element available. It stops checking when it is loaded.
	useEffect(() => {
		if (chatButton) return;

		let timeoutId: ReturnType<typeof setTimeout>;
		const tick = () => {
			if (chatButton) return;
			const chat = document.getElementById('supportBox-iframe');
			if (!chat) {
				timeoutId = setTimeout(tick, 100);
				return;
			}
			const btn = (
				chat as HTMLIFrameElement
			).contentWindow?.document.getElementById('supportBoxWebChatInit');

			if (btn) {
				const styling = document.createElement('style');
				const styles = document.createTextNode(
					'#supportBoxWebChatInit { display: none !important } .supportBoxWebChat-window, #supportBoxWebChatOpened { bottom: 16px !important } .menu-box {top: 135px} #supportBoxWebChatOpened.hidden~.menu-box {top: 122px;}'
				);
				styling.appendChild(styles);
				btn.appendChild(styling);
				setChatButton(btn);
			} else {
				timeoutId = setTimeout(tick, 100);
			}
		};

		timeoutId = setTimeout(tick, 100);

		return () => clearTimeout(timeoutId);
	}, [chatButton]);

	useEffect(() => {
		const supportboxScript = document.createElement('script');
		supportboxScript.type = 'text/javascript';
		supportboxScript.async = true;
		supportboxScript.innerHTML = `
		var supportBoxChatRunAsHidden = true
		var supportBoxChatId = 2141;
		var supportBoxChatSecret = 'e1e5a8ca0f46b7c3faf7cc68e1892d3f';
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
		// ignoring deps here, because auth context should always be loaded at this point. Rerendering renders duplicate iframes instead.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { vinistoUser, activeSupplierId } = useContext(AuthenticationContext);

	const supplier = useMemo(
		() =>
			vinistoUser?.suppliers?.find(
				(supplier) => supplier.id === activeSupplierId
			),
		[vinistoUser, activeSupplierId]
	);

	const email = vinistoUser?.email || '';
	const supplierWebName = supplier?.nameWeb || '';
	const phone = supplier?.address.phone || '';
	const customerId = supplier?.id || '';

	useEffect(() => {
		const { supportBoxChatVariables } = window;
		if (!supportBoxChatVariables) return;
		if (email) {
			supportBoxChatVariables.fullName = supplierWebName;
			supportBoxChatVariables.email = email;
			supportBoxChatVariables.phone = phone;
			supportBoxChatVariables.customerId = customerId;
		} else {
			delete window.supportBoxChatVariables.fullName;
			delete window.supportBoxChatVariables.email;
			delete window.supportBoxChatVariables.phone;
			delete window.supportBoxChatVariables.customerId;
		}
	}, [email, supplierWebName, phone, customerId]);

	return null;
};

export default ChatboxLoader;

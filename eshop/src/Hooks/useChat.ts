// API Reference: https://podpora.supportbox.cz/help/live-chat-api-pro-ovladani-live-chatu-pro-programatory
// It seems that window.supportBoxApi.show() and window.supportBoxApi.hide() do not hide the chat bubble. I don't know what they actually do.
// Therefore, we hide the iframe using css display property.

const useChat = () => {
	const showWidget = () => {
		if (!window.supportBoxApi) return;

		const iframe = window.supportBoxApi.getIframe();

		if (!iframe) return;

		iframe.style.display = 'block';
		iframe.classList.add('visible');

		window.supportBoxApi.show();
	};

	const hideWidget = () => {
		if (!window.supportBoxApi) return;

		const iframe = window.supportBoxApi.getIframe();

		if (!iframe) return;

		iframe.style.display = 'none';
		iframe.classList.remove('visible');

		window.supportBoxApi.hide();
	};

	const openChat = () => {
		if (!window.supportBoxApi) return;

		showWidget();
		window.supportBoxApi.open();
	};

	const closeChat = () => {
		if (!window.supportBoxApi) return;

		window.supportBoxApi.close();
		hideWidget();
	};

	return {
		showWidget,
		hideWidget,
		openChat,
		closeChat,
	};
};

export default useChat;

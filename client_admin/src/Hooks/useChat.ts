const useChat = () => {
	const showWidget = () => {
		if (!window.supportBoxApi) return;

		window.supportBoxApi.show();
	};

	const hideWidget = () => {
		if (!window.supportBoxApi) return;

		window.supportBoxApi.hide();
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const openChat = (id?: string) => {
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

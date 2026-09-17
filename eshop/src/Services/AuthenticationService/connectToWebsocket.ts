import WebSocketClient from 'WebSocketClient';

import { NOT_CONNECTED } from './constants';

const connectToWebsocket = ({
	websocketId,
	wsClient,
	setWsClient,
	setWsConnectionId,
	updateContent,
	webSocketClient,
	webSocketURI,
}: {
	websocketId: string | null;
	wsClient: ReturnType<typeof WebSocketClient.initialize> | null;
	setWsClient: (client: any) => void;
	setWsConnectionId: (connectionId: string) => void;
	updateContent: (data: any) => void;
	webSocketClient: typeof WebSocketClient;
	webSocketURI: string;
}) => {
	if (wsClient) {
		wsClient.reset();
	}
	const client = webSocketClient.initialize(websocketId ?? '', webSocketURI);
	client.setUpdateCallback(updateContent);
	client
		.connect()
		.then(() => {
			setWsClient(client);
			setWsConnectionId(client.getConnectionInfo().wsId || '');
		})
		.catch(() => {
			setWsConnectionId(NOT_CONNECTED);
			/* eslint-disable-next-line no-console */
			console.error('Failed to establish WebSocket connection');
		});
};

export default connectToWebsocket;

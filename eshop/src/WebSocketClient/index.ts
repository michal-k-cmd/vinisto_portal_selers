import {
	HubConnection,
	HubConnectionBuilder,
	HubConnectionState,
	LogLevel,
} from '@microsoft/signalr';

export interface WebSocketMessage {
	id: string;
	type: string;
	payload: any;
}

export interface WebSocketResponse {
	id: string;
	success: boolean;
	data?: any;
	error?: string;
}

type MessageHandler = (message: string) => void;

class WebSocketClient {
	private connection: HubConnection | null = null;
	private messageHandlers: MessageHandler[] = [];
	private updateCallback: ((message: string) => void) | null = null;
	private baseUrl: string;
	private wsId: string | null = null;
	private isEstablished: boolean = false;
	private isInitialized: boolean = false;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	// Initialise the client with wsId - must be called before connect
	public initialize(wsId: string): void {
		this.wsId = wsId;
		this.isInitialized = true;
	}

	public async connect(): Promise<void> {
		if (!this.isInitialized || !this.wsId) {
			throw new Error(
				'Client must be initialized with wsId before connecting. Call initialize(wsId) first.'
			);
		}

		if (
			this.connection?.state === HubConnectionState.Connected &&
			this.isEstablished
		) {
			return Promise.resolve();
		}

		// If we're in the process of connecting, wait for it
		if (this.connection?.state === HubConnectionState.Connecting) {
			return new Promise((resolve, reject) => {
				const checkConnection = () => {
					if (
						this.connection?.state === HubConnectionState.Connected &&
						this.isEstablished
					) {
						resolve();
					} else if (
						this.connection?.state === HubConnectionState.Disconnected
					) {
						reject(new Error('Connection failed'));
					} else {
						setTimeout(checkConnection, 100);
					}
				};
				checkConnection();
			});
		}

		try {
			// disconnect old connections
			this.disconnect();

			// Create hub connection object
			this.connection = new HubConnectionBuilder()
				.withUrl(this.baseUrl)
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Debug)
				.build();

			// Set up message listener - SINGLE handler
			this.connection.on('ReceiveMessage', (message: string) => {
				// Call update callback if set
				if (this.updateCallback) {
					try {
						this.updateCallback(message);
					} catch (error) {
						/* eslint-disable-next-line no-console */
						console.error('Error in update callback:', error);
					}
				}

				// Call all other message handlers
				this.messageHandlers.forEach((handler) => {
					try {
						handler(message);
					} catch (error) {
						/* eslint-disable-next-line no-console */
						console.error('Error in message handler:', error);
					}
				});
			});

			// add event handlers
			this.connection.onreconnecting(() => {
				this.isEstablished = false;
			});

			this.connection.onreconnected(async () => {
				try {
					await this.establishConnection();
				} catch (error) {
					/* eslint-disable-next-line no-console */
					console.error(
						'Failed to re-establish connection after reconnect:',
						error
					);
				}
			});

			// Connect to the SignalR using connection hub object
			try {
				const startPromise = this.connection.start();
				const timeoutPromise = new Promise<never>((_, reject) => {
					setTimeout(
						() => reject(new Error('Connection timeout after 30 seconds')),
						30000
					);
				});

				await Promise.race([startPromise, timeoutPromise]);
			} catch (startError) {
				/* eslint-disable-next-line no-console */
				console.error('Failed to start SignalR connection:', startError);

				throw startError; // Re-throw to be caught by outer try-catch
			}

			try {
				// Establish connection with hub
				await this.establishConnection();
			} catch (establishError) {
				if (establishError instanceof Error) {
					/* eslint-disable-next-line no-console */
					console.error('Establish Error message:', establishError.message);
				}

				throw establishError;
			}
		} catch (error) {
			/* eslint-disable-next-line no-console */
			console.error('Failed to connect to SignalR Hub:', error);

			// Clean up on failure
			this.disconnect();
			throw error;
		}
	}

	private async establishConnection(): Promise<void> {
		if (
			!this.connection ||
			this.connection.state !== HubConnectionState.Connected
		) {
			await this.connect();
		}

		if (!this.wsId) {
			throw new Error('wsId not set - client must be initialized first');
		}

		try {
			// Call EstablishConnectionAsync with the effective connection ID
			await this.connection?.invoke(
				'EstablishConnectionAsync',
				this.connection.connectionId,
				this.wsId
			);

			this.isEstablished = true;
		} catch (error) {
			/* eslint-disable-next-line no-console */
			console.error('Failed to establish connection:', error);
			throw error;
		}
	}

	public disconnect(): void {
		if (this.connection) {
			this.connection
				.stop()
				.catch((error) => {
					/* eslint-disable-next-line no-console */
					console.error('Error stopping SignalR connection:', error);
				})
				.finally(() => {
					this.connection = null;
					this.isEstablished = false;
				});
		}
	}

	// Reset for user logout
	public reset(): void {
		this.disconnect();
		this.wsId = null;
		this.isInitialized = false;
		this.messageHandlers = [];
		this.updateCallback = null;
	}

	// Check if client is initialized
	public isClientInitialized(): boolean {
		return this.isInitialized && !!this.wsId;
	}

	// Add message handler
	public addMessageHandler(handler: MessageHandler): void {
		this.messageHandlers.push(handler);
	}

	// Remove message handler
	public removeMessageHandler(handler: MessageHandler): void {
		const index = this.messageHandlers.indexOf(handler);
		if (index > -1) {
			this.messageHandlers.splice(index, 1);
		}
	}

	// Get connection info
	public getConnectionInfo(): {
		connectionId: string | null;
		wsId: string | null;
		isEstablished: boolean;
		isInitialized: boolean;
		connectionState: string;
		baseUrl: string;
	} {
		return {
			connectionId: this.connection?.connectionId || null,
			wsId: this.wsId,
			isEstablished: this.isEstablished,
			isInitialized: this.isInitialized,
			connectionState: this.connection?.state || 'Not Created',
			baseUrl: this.baseUrl,
		};
	}

	// Update the setUpdateCallback method to not add duplicate handlers
	public setUpdateCallback(callback: (message: string) => void): void {
		this.updateCallback = callback;
	}

	// Clear the update callback
	public clearUpdateCallback(): void {
		this.updateCallback = null;
	}

	// Get the base URL for this client
	public getBaseUrl(): string {
		return this.baseUrl;
	}
}

// Store multiple instances based on baseUrl
const webSocketClients: Map<string, WebSocketClient> = new Map();

// Initialize client for specific baseUrl (multiple instances supported)
export function initializeWebSocketClient(
	wsId: string,
	baseUrl: string
): WebSocketClient {
	// Use baseUrl as the key to store multiple instances
	let client = webSocketClients.get(baseUrl);

	if (!client) {
		client = new WebSocketClient(baseUrl);
		webSocketClients.set(baseUrl, client);
	}

	client.initialize(wsId);
	return client;
}

// Get client instance for specific baseUrl
export function getWebSocketClient(baseUrl?: string): WebSocketClient | null {
	if (!baseUrl) {
		// If no baseUrl provided, return the first available client (backward compatibility)
		const clients = Array.from(webSocketClients.values());
		return clients.length > 0 ? clients[0] : null;
	}

	return webSocketClients.get(baseUrl) || null;
}

// Get all active clients
export function getAllWebSocketClients(): Map<string, WebSocketClient> {
	return new Map(webSocketClients);
}

// Reset specific client by baseUrl
export function resetWebSocketClient(baseUrl?: string): void {
	if (!baseUrl) {
		webSocketClients.forEach((client) => {
			client.reset();
		});
		webSocketClients.clear();
		return;
	}

	const client = webSocketClients.get(baseUrl);
	if (client) {
		client.reset();
		webSocketClients.delete(baseUrl);
	}
}

// Reset all clients
export function resetAllWebSocketClients(): void {
	webSocketClients.forEach((client) => {
		client.reset();
	});
	webSocketClients.clear();
}

// Check if client exists for baseUrl
export function hasWebSocketClient(baseUrl: string): boolean {
	return webSocketClients.has(baseUrl);
}

// Get connection info for all clients
export function getAllConnectionInfo(): Array<{
	baseUrl: string;
	connectionInfo: ReturnType<WebSocketClient['getConnectionInfo']>;
}> {
	return Array.from(webSocketClients.entries()).map(([baseUrl, client]) => ({
		baseUrl,
		connectionInfo: client.getConnectionInfo(),
	}));
}

// Default export for backward compatibility (uses first available client)
const webSocketClient = {
	initialize: (wsId: string, baseUrl: string) =>
		initializeWebSocketClient(wsId, baseUrl),
	get: (baseUrl?: string) => getWebSocketClient(baseUrl),
	reset: (baseUrl?: string) => resetWebSocketClient(baseUrl),
	getAll: getAllWebSocketClients,
	resetAll: resetAllWebSocketClients,
	has: hasWebSocketClient,
	getAllConnectionInfo,
};

export { WebSocketClient };
export default webSocketClient;

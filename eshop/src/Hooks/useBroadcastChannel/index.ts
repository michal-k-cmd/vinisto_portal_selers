import { useCallback, useEffect, useMemo, useRef } from 'react';

import { StrictBroadcastChannel } from './interfaces';
import { BroadcastChannelName } from './constants';

const useBroadcastChannel = <MessageType>({
	channelName,
	onMessage = () => null,
	onMessageError = () => null,
}: {
	channelName: BroadcastChannelName;
	onMessage?: (event: MessageEvent<MessageType>) => void;
	onMessageError?: (error: MessageEvent) => void;
}) => {
	const channel: StrictBroadcastChannel<MessageType> = useMemo(
		() => new BroadcastChannel(channelName),
		[channelName]
	);

	const onMessageRef = useRef(onMessage);
	const onMessageErrorRef = useRef(onMessageError);

	useEffect(() => {
		onMessageRef.current = onMessage;
	}, [onMessage]);

	useEffect(() => {
		onMessageErrorRef.current = onMessageError;
	}, [onMessageError]);

	useEffect(() => {
		channel.onmessage = (event) => onMessageRef.current?.(event);
		channel.onmessageerror = (event) => onMessageErrorRef.current?.(event);

		return () => {
			channel.close();
		};
	}, [channel]);

	const broadcastMessage = useCallback(
		(msg: MessageType) => {
			channel.postMessage(msg);
		},
		[channel]
	);

	return { broadcastMessage };
};

export default useBroadcastChannel;

export enum RefetchEvent {
	CATEGORY = 'category',
	BLOG_TAG_LIST = 'blogTagList',
}

export class RefetchEventEmitter {
	private listeners = new Map<RefetchEvent, Set<() => void>>();

	emitEvent(event: RefetchEvent): boolean {
		const listeners = this.listeners.get(event);
		listeners?.forEach((listener) => listener());
		return Boolean(listeners?.size);
	}

	onEvent(event: RefetchEvent, listener: () => void): () => void {
		const listeners = this.listeners.get(event) ?? new Set<() => void>();
		listeners.add(listener);
		this.listeners.set(event, listeners);
		return () => listeners.delete(listener);
	}
}

const refetchEventEmitter = new RefetchEventEmitter();

export { refetchEventEmitter };

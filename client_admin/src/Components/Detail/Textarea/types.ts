interface DetailTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	/**
	 * Optional. Label to be displayed above the value.
	 */
	label?: string;
	/**
	 * Callback function to be called when the value changes. It is debounced by default. If you want to disable the debounce, set `debounceDelay` to `0`.
	 * It expects a promise to be returned. If the promise is rejected, the value will not be updated.
	 */
	onValueChange?: (value: string) => Promise<void>;
	/**
	 * Debounce delay in milliseconds. Defaults to `1000`.
	 */
	debounceDelay?: number;
}

export type { DetailTextareaProps };

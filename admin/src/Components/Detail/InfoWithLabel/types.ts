interface InfoWithLabelProps {
	/**
	 * Label to be displayed above the value.
	 */
	label?: React.ReactNode;

	/**
	 * Value to be displayed below the label.
	 */
	value?: React.ReactNode | null | undefined;

	/**
	 * Specifies the fallback behavior when `value` is not provided or is an empty string.
	 * - If a string is provided, it will be used as the fallback value.
	 * - If `true`, a default fallback value of `'-'` will be used.
	 * - If `false`, the component will not render anything.
	 *
	 * Defaults to `true`, meaning the default fallback value of `'-'` will be used.
	 */
	fallbackOrHide?: string | boolean;

	/**
	 * Specifies the layout of the component.
	 * - `'horizontal'` will display the label and value side-by-side.
	 * - `'vertical'` will display the label above the value.
	 * Defaults to `'horizontal'`.
	 */
	layout?: 'horizontal' | 'vertical';

	/**
	 * Specifies the gap between the label and value.
	 * Only applicable when `layout` is set to `'horizontal'`.
	 * Defaults to `'0px'`.
	 */
	gap?: string;

	/**
	 * Specifies custom className.
	 * optional
	 */
	className?: string;
	/**
	 * Specifies custom className for value container div.
	 * optional
	 */
	valueClassName?: string;
}

export type { InfoWithLabelProps };

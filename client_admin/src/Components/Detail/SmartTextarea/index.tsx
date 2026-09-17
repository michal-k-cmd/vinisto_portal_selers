import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from 'Hooks/useDebounce';

import styles from './styles.module.css';
import { DetailTextareaProps } from './types';

const DetailTextarea = ({
	label,
	onValueChange,
	value: propValue,
	debounceDelay = 1000,
	...rest
}: DetailTextareaProps) => {
	const [value, setValue] = useState<string>(
		propValue ? String(propValue) : ''
	);
	const debouncedValue = useDebounce(value, debounceDelay);
	const previousDebouncedValueRef = useRef(debouncedValue);

	useEffect(() => {
		if (propValue !== undefined && propValue !== value) {
			setValue(String(propValue));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [propValue]);

	useEffect(() => {
		if (debouncedValue !== previousDebouncedValueRef.current) {
			onValueChange?.(debouncedValue);
			previousDebouncedValueRef.current = debouncedValue;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	return (
		<div>
			<div className={styles.label}>{label}</div>
			<textarea
				className={styles.textarea}
				rows={5}
				cols={50}
				value={value}
				{...rest}
				onChange={handleChange}
			/>
			{/* <div className={styles.indicatorContainer}>
        {saveStatus === 'saving' && (
          <div className={styles.savingIndicator}>{t({ id: 'saving' })}</div>
        )}
        {saveStatus === 'saved' && (
          <div className={styles.savedIndicator}>{t({ id: 'saved' })}</div>
        )}
      </div> */}
		</div>
	);
};

export default DetailTextarea;

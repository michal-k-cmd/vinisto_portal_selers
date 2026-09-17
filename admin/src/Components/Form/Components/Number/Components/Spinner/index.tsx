import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

interface SpinnerProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	value: number;
	onChange: (value: string | number) => void;
	min?: number;
	max?: number;
	step?: number;
}

const Spinner = (props: SpinnerProps) => {
	const {
		value,
		onChange,
		min = -Infinity,
		max = Infinity,
		step = 1,
		...rest
	} = props;

	const [displayValue, setDisplayValue] = useState<string>(String(value));

	// Sync displayValue when value prop changes (e.g. via form mutators)
	useEffect(() => {
		setDisplayValue(String(value));
	}, [value]);

	type Timeout = ReturnType<typeof setTimeout>;

	const timeoutRef = useRef<Timeout | null>(null);
	const intervalRef = useRef<Timeout | null>(null);
	const incrementCounterRef = useRef<number>(0);
	const valueRef = useRef(value);
	valueRef.current = value;

	const getIncrementMultiplier = (counter = 1) => {
		if (counter < 10) return step * 1;
		if (counter < 20) return step * 5;
		if (counter < 30) return step * 10;
		if (counter < 40) return step * 20;
		if (counter < 50) return step * 50;
		return step * 100;
	};

	const handleIncrement = () => {
		const incrementMultiplier = getIncrementMultiplier(
			incrementCounterRef.current
		);

		const incrementedValue =
			Math.ceil(
				(Math.floor(valueRef.current) + incrementMultiplier) /
					incrementMultiplier
			) * incrementMultiplier;

		incrementCounterRef.current += 1;
		setDisplayValue(String(incrementedValue > max ? max : incrementedValue));
		onChange(incrementedValue > max ? max : incrementedValue);
	};

	const handleDecrement = () => {
		const decrementMultiplier = getIncrementMultiplier(
			incrementCounterRef.current
		);

		const decrementedValue =
			Math.ceil(
				(Math.ceil(valueRef.current) - decrementMultiplier) /
					decrementMultiplier
			) * decrementMultiplier;

		incrementCounterRef.current += 1;
		setDisplayValue(String(decrementedValue < min ? min : decrementedValue));
		onChange(decrementedValue < min ? min : decrementedValue);
	};

	const handleMouseDown = (event: MouseEvent, callback: () => void) => {
		if (event.button !== 0) return;
		callback();

		timeoutRef.current = setTimeout(() => {
			const repeat = () => {
				intervalRef.current = setTimeout(() => {
					callback();
					repeat();
				}, 75);
			};
			repeat();
		}, 300);
	};

	return (
		<div className="input-group">
			<Button
				onMouseDown={(e) => handleMouseDown(e, () => handleDecrement())}
				onMouseUp={() => {
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					if (intervalRef.current) clearTimeout(intervalRef.current);
					incrementCounterRef.current = 0;
				}}
				onMouseLeave={() => {
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					if (intervalRef.current) clearTimeout(intervalRef.current);
					incrementCounterRef.current = 0;
				}}
				disabled={value <= min}
			>
				-
			</Button>
			<input
				className="form-control"
				type="text"
				inputMode="numeric"
				value={displayValue}
				onInput={(e) => {
					e.currentTarget.value = e.currentTarget.value
						.replace(/[^0-9.-]/g, '')
						.replace(/(\..*)\./g, '$1')
						.replace(/(-.*)-/g, '$1');
				}}
				onChange={(e) => {
					setDisplayValue(e.target.value);
					onChange(e.target.value);
				}}
				{...rest}
			/>
			<Button
				onMouseDown={(e) => handleMouseDown(e, () => handleIncrement())}
				onMouseUp={() => {
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					if (intervalRef.current) clearTimeout(intervalRef.current);
					incrementCounterRef.current = 0;
				}}
				onMouseLeave={() => {
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					if (intervalRef.current) clearTimeout(intervalRef.current);
					incrementCounterRef.current = 0;
				}}
				disabled={value >= max}
			>
				+
			</Button>
		</div>
	);
};

export default Spinner;

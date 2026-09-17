'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type SliderProps } from 'rc-slider';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import 'rc-slider/assets/index.css';
import { clamp } from 'vinisto_shared';

import Range from '../range';
import InputBare, { Alignment } from '../../tokens/input-bare';

import styles from './styles.module.css';

export interface RangeInputWithExternalControlProps
	extends Omit<SliderProps, 'onChange'> {
	fromName?: string;
	toName?: string;
	prefix?: string;
	suffix?: string;
	defaultValue?: [number, number];
	value?: [number, number];
	isLoading?: boolean;
	onChange?: (newValue: [number, number]) => void;
	onChangeDebounceDelay?: number;
	key?: number;
}

const RangeInputWithExternalControls = ({
	fromName = 'from',
	toName = 'to',
	value,
	prefix = '',
	suffix = '',
	min = 0,
	max = 1,
	isLoading = false,
	onChange = () => undefined,
	step = 0.1,
	key,
	className,
	...props
}: RangeInputWithExternalControlProps) => {
	const isDisabled =
		min === max || [min, max]?.some((val) => Number.isNaN(Number(val)));

	const [sliderValue, setSliderValue] = useState([
		value?.[0] ?? min,
		value?.[1] ?? max,
	]);

	const minInputRef = useRef<HTMLInputElement | null>(null);
	const maxInputRef = useRef<HTMLInputElement | null>(null);
	const sliderRef = useRef<HTMLElement | null>(null);

	const parseValueToInteger = (value: string, fallback: number) => {
		const numericValue = Math.round(Number.parseFloat(value));
		return isNaN(numericValue) ? fallback : numericValue;
	};

	const handleOnAfterChange = useCallback(
		(val: number | number[]) => {
			// @ts-expect-error our value is stricter (just [number, number]) then the library one
			return onChange(val);
		},
		[onChange]
	);

	const handleOnSliderValueChange = useCallback((val: number | number[]) => {
		// @ts-expect-error our value is stricter (just [number, number]) then the library one
		setSliderValue(val);
	}, []);

	// This is neccessary to sync the uncontrolled input values when route changes
	useEffect(() => {
		if (minInputRef.current && maxInputRef.current) {
			minInputRef.current.value = `${prefix}${Math.round(
				sliderValue[0]
			)}${suffix}`;
			maxInputRef.current.value = `${prefix}${Math.round(
				sliderValue[1]
			)}${suffix}`;
		}
	}, [prefix, suffix, sliderValue]);

	const [
		minValueThatRerendersOnlyWithSliderValue,
		maxValueThatRerendersOnlyWithSliderValue,
		// This is intentional, it needs to skip render new min and max until sliderValue updates via effect
		// eslint-disable-next-line react-hooks/exhaustive-deps
	] = useMemo(() => [min, max], [sliderValue]);

	/// This is neccessary to reset the controlled input values when route changes
	useEffect(() => {
		if (!value) {
			setSliderValue([min, max]);
		}
	}, [max, min, value]);

	return (
		<div className={cx(styles.component, className)}>
			<div className={styles.input_group}>
				{isLoading ? (
					<Skeleton
						containerClassName={styles.label_placeholder}
						count={2}
					/>
				) : (
					<>
						<label className={styles.label}>
							<div className="visually-hidden">{fromName}</div>
							<InputBare
								ref={minInputRef}
								align={Alignment.CENTER}
								name={fromName}
								defaultValue={`${prefix}${Math.round(sliderValue[0])}${suffix}`}
								inputMode="numeric"
								type="text"
								disabled={isDisabled}
								onKeyDown={async (e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										await minInputRef.current?.blur();
										maxInputRef.current?.focus();
									}
								}}
								onFocus={(e) => {
									(e.target.value = String(
										parseValueToInteger(e.target.value, sliderValue[0])
									)),
										e.target.select();
								}}
								onBlur={(e) => {
									const parsedUpdatedValue = [
										Math.round(
											clamp(
												parseValueToInteger(e.target.value, sliderValue[0]),
												minValueThatRerendersOnlyWithSliderValue,
												maxValueThatRerendersOnlyWithSliderValue
											)
										),
										sliderValue[1],
									];
									e.target.value = `${prefix}${parsedUpdatedValue[0]}${suffix}`;
									// Prevent setting query params if the value is 'unchanged'
									if (parsedUpdatedValue[0] === Math.round(sliderValue[0])) {
										return;
									}
									setSliderValue(parsedUpdatedValue);
									handleOnAfterChange(parsedUpdatedValue);
								}}
							/>
						</label>

						<label className={styles.label}>
							<div className="visually-hidden">{toName}</div>
							<InputBare
								ref={maxInputRef}
								align={Alignment.CENTER}
								name={toName}
								defaultValue={`${prefix}${Math.round(sliderValue[1])}${suffix}`}
								inputMode="numeric"
								type="text"
								disabled={isDisabled}
								onKeyDown={async (e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										await maxInputRef.current?.blur();
										sliderRef.current?.focus();
									}
								}}
								onFocus={(e) => {
									(e.target.value = String(
										parseValueToInteger(e.target.value, sliderValue[1])
									)),
										e.target.select();
								}}
								onBlur={(e) => {
									const parsedUpdatedValue = [
										sliderValue[0],
										Math.round(
											clamp(
												parseValueToInteger(e.target.value, sliderValue[1]),
												minValueThatRerendersOnlyWithSliderValue,
												maxValueThatRerendersOnlyWithSliderValue
											)
										),
									];
									e.target.value = `${prefix}${parsedUpdatedValue[1]}${suffix}`;
									// Prevent setting query params if the value is 'unchanged'
									if (parsedUpdatedValue[1] === Math.round(sliderValue[1])) {
										return;
									}
									setSliderValue(parsedUpdatedValue);
									handleOnAfterChange(parsedUpdatedValue);
								}}
							/>
						</label>
					</>
				)}
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<Range
					{...props}
					range
					min={minValueThatRerendersOnlyWithSliderValue}
					max={maxValueThatRerendersOnlyWithSliderValue}
					value={sliderValue}
					onChange={handleOnSliderValueChange}
					onAfterChange={handleOnAfterChange}
					step={step}
					disabled={isDisabled}
					allowCross={false}
					pushable
					key={key}
					ref={sliderRef}
				/>
			)}
		</div>
	);
};

export default RangeInputWithExternalControls;

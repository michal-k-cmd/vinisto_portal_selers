import { type CSSProperties, type ReactNode } from 'react';
import { useWatch } from 'react-hook-form';
import classNames from 'classnames';

import { useStepContext } from '../../App/StepContext';
import { BundleContextStates, useBundleContext } from '../../App/bundleContext';
import { dataKeys, formSteps, mapStepsToFormFields } from '../Form/constants';
import { type TReadonlyOptions } from '../Form';
import blank_transparent from '../../assets/images/blank_transparent.webp';

import styles from './style.module.css';

const { FOR_MYSELF_OR_PRESENT_TOGGLE } = dataKeys;

type TStepProps = {
	step: number;
	title: string;
	index: number;
	children: ReactNode;
	onClick: () => void;
	bgImage: string | null;
	hasPreviousStepValue: boolean;
	currentState: keyof typeof BundleContextStates;
} & React.HTMLAttributes<HTMLButtonElement>;

type TMyCustomCSS = CSSProperties & {
	'--bg-image': string;
};

const stepTitles = [
	{ title: 'Hledám …' },
	{ title: 'Charakter' },
	{ title: 'Druh' },
	{ title: 'Typ' },
	{ title: 'Původ' },
] as const;

export const Steps = () => {
	const { step, setStep } = useStepContext();
	const { state } = useBundleContext();
	const { currentState } = state;
	const allFields = useWatch();

	const findImage = (field: keyof typeof formSteps, index: number) => {
		if (!Array.isArray(allFields[field])) {
			const needle = (formSteps[field].options as TReadonlyOptions).find(
				(option) => option.value === allFields[field]
			);
			if (needle) return needle.image;
			return null;
		}

		if (
			allFields[field].length > 1 ||
			(allFields[field].length === 0 && step > index)
		)
			return formSteps[field].multiValueImage;

		const needle = (formSteps[field].options as TReadonlyOptions).find(
			(option) => option.value === allFields[field][0]
		);

		if (needle) return needle.image;
		return null;
	};

	const findImageForStep = (index: number) =>
		mapStepsToFormFields[index]
			.map((field) => findImage(field as keyof typeof formSteps, index))
			.filter(Boolean)[0];

	const hasStepValue = mapStepsToFormFields
		.map((fields) => fields.map((field) => allFields[field]))
		.map((fields) =>
			fields.some((field) => {
				if (field === 0) return true;
				if (Array.isArray(field) && !field.length) return false;
				return Boolean(field);
			})
		);

	const getTitle = (index: number) => {
		if (index === 1) {
			return allFields[FOR_MYSELF_OR_PRESENT_TOGGLE] === 'present'
				? 'Pro koho'
				: 'Charakter';
		}
		return stepTitles[index].title;
	};

	return (
		<div className={styles.container}>
			{stepTitles.map((_, i) => {
				const bgImage = findImageForStep(i);
				return (
					<Step
						step={step}
						title={getTitle(i)}
						key={i}
						index={i}
						onClick={() => setStep(i)}
						bgImage={bgImage}
						hasPreviousStepValue={hasStepValue[Math.max(i - 1, 0)]}
						currentState={currentState}
					>
						<span className={styles.step_number}>{String(i + 1)}</span>
					</Step>
				);
			})}
		</div>
	);
};

export const Step = ({
	step,
	title,
	index,
	onClick,
	children,
	bgImage,
	hasPreviousStepValue,
	currentState,
	...rest
}: TStepProps) => {
	return (
		<button
			{...rest}
			disabled={(() => {
				if (currentState === BundleContextStates.LOADED) return false;
				return step >= index ? false : !hasPreviousStepValue;
			})()}
			onClick={onClick}
			className={classNames(styles.button, {
				[styles.active]: step === index,
				[styles.visited]: step >= index,
				[styles.passed]: step > index,
				[styles.has_image]: bgImage,
			})}
		>
			<div
				className={styles.main}
				style={
					{
						'--bg-image': `url("${bgImage || blank_transparent}")`,
					} as TMyCustomCSS
				}
			>
				{children}
			</div>
			<div className={styles.title}>{title}</div>
		</button>
	);
};

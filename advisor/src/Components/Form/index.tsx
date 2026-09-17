import {
	type CSSProperties,
	forwardRef,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import useRefs from 'react-use-refs';

import ProductSlider from '../ProductSlider';
import { useStepContext } from '../../App/StepContext';
import { useLayoutContext } from '../../App/LayoutContext';
import {
	BundleContextActions,
	useBundleContext,
} from '../../App/bundleContext';
import { PRODUCT_LISTING_STEP } from '../../App/constants';
import type { TFormValues } from '../../App';
import blank_white from '../../assets/images/blank_white.webp';
import useSearchParams from '../../Hooks/useSearchParams';

import styles from './style.module.css';
import { handleSendRequest } from './handler';
import { dataKeys, formSteps, mapStepsToFormFields } from './constants';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const {
	FOR_MYSELF_OR_PRESENT_TOGGLE,
	CHARACTER,
	PRESENT_RECIEVER,
	KIND,
	TYPE,
	COUNTRY_OF_ORIGIN,
	IS_FOR_LOGGED_USERS,
} = dataKeys;

export type TRadioOption = (typeof formSteps)[
	| typeof FOR_MYSELF_OR_PRESENT_TOGGLE
	| typeof CHARACTER
	| typeof PRESENT_RECIEVER]['options'][number];

export type TCheckboxOption = (typeof formSteps)[
	| typeof KIND
	| typeof TYPE
	| typeof COUNTRY_OF_ORIGIN]['options'][number];

export type TOption = TRadioOption | TCheckboxOption;
export type TReadonlyOptions = readonly TOption[];

type TRadioGroupProps = {
	name: string;
	columns?: number;
	options: readonly TRadioOption[];
} & React.HTMLAttributes<HTMLDivElement>;

type TCheckboxGroupProps = {
	name: string;
	columns: number;
	options: readonly TCheckboxOption[];
} & React.HTMLAttributes<HTMLDivElement>;

type TMyCustomCSS = CSSProperties & {
	'--step-width': string;
};

const CheckboxGroup = forwardRef<HTMLInputElement, TCheckboxGroupProps>(
	({ name, options, columns = 1, className, ...props }, ref) => {
		return (
			<div
				className={classNames(
					styles.checkbox_group_wrapper,
					{
						[styles.col_1]: columns === 1,
						[styles.col_2]: columns === 2,
					},
					className
				)}
				{...props}
			>
				{options.map((option, index) => (
					<div
						key={`${name}-${index}`}
						className={classNames(styles.checkbox_group, {})}
						style={{ transitionDelay: `${index * Math.pow(0.25, 2)}s` }}
					>
						<input
							type="checkbox"
							name={name}
							value={option.value}
							id={`${name}-${index}`}
							className={styles.checkbox_input}
							ref={ref}
						/>
						<label
							htmlFor={`${name}-${index}`}
							className={styles.checkbox_label}
						>
							<img
								src={option.image}
								width="162"
								height="162"
								alt=""
							/>
							<div>
								<span className={styles.label_heading}>{option.title}</span>
								{option.description && (
									<span className={styles.label_description}>
										{option.description}
									</span>
								)}
							</div>
						</label>
					</div>
				))}
			</div>
		);
	}
);

CheckboxGroup.displayName = 'CheckboxGroup';

const RadioGroup = forwardRef<HTMLInputElement, TRadioGroupProps>(
	({ name, options, columns = 1, className, ...props }, ref) => {
		const renderRadioButtons = (
			{ value, title, description, image }: TRadioOption,
			index: number
		) => {
			return (
				<div
					key={value}
					className={classNames(
						styles.radio_group,
						{
							[styles.col_2]: columns === 2,
						},
						className
					)}
					style={{ transitionDelay: `${index * Math.pow(0.25, 2)}s` }}
				>
					<input
						type="radio"
						id={`${name}-${index}`}
						className={styles.radio_input}
						name={name}
						value={value}
						ref={ref}
					/>
					<label
						className={styles.radio_label}
						htmlFor={`${name}-${index}`}
					>
						<img
							src={image}
							width="162"
							height="162"
							alt=""
						/>
						<div>
							<h3 className={styles.label_heading}>{title}</h3>
							<p className={styles.label_description}>{description}</p>
						</div>
					</label>
				</div>
			);
		};

		if (name && options) {
			return (
				<div
					className={classNames(styles.radio_group_wrapper, {
						[styles.col_1]: columns === 1,
						[styles.col_2]: columns === 2,
					})}
					{...props}
				>
					{options && options.map(renderRadioButtons)}
				</div>
			);
		}
		return null;
	}
);

RadioGroup.displayName = 'RadioGroup';

const Form = () => {
	const { headerRef, footerRef, onResized } = useLayoutContext();
	const { step, incrementStep, decrementStep } = useStepContext();
	const { state, dispatch } = useBundleContext();
	const [step_0_clientHeight, setStep_0_clientHeight] = useState<number>();
	const [formMaxHeight, setFormMaxHeight] = useState<number | string>();

	const [
		step_0_ref,
		step_1_ref,
		step_2_ref,
		step_3_ref,
		step_4_ref,
		step_5_ref,
	] = useRefs<HTMLFieldSetElement | HTMLDivElement | null>(null);

	const refs = [
		step_0_ref,
		step_1_ref,
		step_2_ref,
		step_3_ref,
		step_4_ref,
		step_5_ref,
	];

	const { register, handleSubmit, resetField, setValue } =
		useFormContext<TFormValues>();

	const allFields = useWatch();

	const { currency } = useSearchParams();

	const onSubmit = handleSubmit((data) =>
		handleSendRequest(dispatch, currency as VinistoHelperDllEnumsCurrency)(data)
	);

	// Just for giving skipped steps a 'multi' image (and mark as skipped)
	useEffect(() => {
		if (step === 3 && !allFields['kind']) {
			setValue('kind', []);
		}

		if (step === 4 && !allFields['type']) {
			setValue('type', []);
		}
	}, [step, allFields, setValue]);

	useLayoutEffect(() => {
		if (step_0_ref.current) {
			setStep_0_clientHeight(step_0_ref.current.clientHeight);
		}
	}, [step_0_ref]);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			// Hotfix to prevent swipe 'react-swipeable' swipe events on product carousels
			if (step === PRODUCT_LISTING_STEP) {
				return;
			}
			if (step === 4 && hasCurrentStepValue) {
				incrementStep();
				return onSubmit();
			}
			if (hasCurrentStepValue) {
				return incrementStep();
			}
		},
		onSwipedRight: () => {
			// Hotfix to prevent 'react-swipeable' swipe events on product carousels
			if (step === PRODUCT_LISTING_STEP) {
				return;
			}
			return decrementStep();
		},
	});

	/**
	 * This is checking if the current field is filled. The empty array check is dealing
	 * with the fact that in react-hook-form, checkbox group is initially 'false',
	 * but [] if checked and unchecked
	 */
	const hasCurrentStepValue = mapStepsToFormFields
		.slice(step, step + 1)
		.flatMap((fields) => fields.map((field) => allFields[field]))
		.some((field) => {
			if (field === 0) return true;
			if (Array.isArray(field) && field.length === 0) return false;
			return Boolean(field);
		});

	const getBackgroundImage = (field: keyof typeof formSteps) => {
		const maybeValue = (formSteps[field].options as TReadonlyOptions).find(
			(option) => option.value === allFields[field]
		);
		if (maybeValue) return maybeValue.image;
		return undefined;
	};

	const calculateMaxHeight = useCallback(() => {
		let cachedValue = 0;

		if (headerRef?.current && footerRef) {
			cachedValue =
				window.innerHeight -
				(headerRef.current.clientHeight + footerRef.clientHeight);
		}
		return cachedValue || 'initial';
	}, [headerRef, footerRef]);

	useEffect(() => {
		setFormMaxHeight(calculateMaxHeight());
	}, [calculateMaxHeight, headerRef, footerRef, step, onResized]);

	const [fieldsetHeight, setFieldsetHeight] = useState(0);

	useEffect(() => {
		const updatedFieldseHeight = refs[step].current?.clientHeight || 0;
		setFieldsetHeight(updatedFieldseHeight);
		if (!footerRef || !headerRef.current) return;
		/* Calculate if footer is 'sticky' and update styles accordingly.
		 * I failed trying to perform this in Footer component; I was always getting the element
		 * position from the previous render. The layout is probably being updated AFTER the footer is rendered.
		 * I, however, decided to keep the related toggled classes in Footer stylesheet (that's why they're :global).
		 */
		if (
			updatedFieldseHeight +
				footerRef.clientHeight +
				headerRef.current.clientHeight >=
			window.innerHeight
		) {
			footerRef.classList.add('is_sticky');
		} else {
			footerRef.classList.remove('is_sticky');
		}
	}, [step, footerRef, headerRef, onResized]);

	const { userLoginHash } = useSearchParams();

	useEffect(() => {
		setValue(IS_FOR_LOGGED_USERS, userLoginHash ? null : false);
	}, [userLoginHash, setValue]);

	return (
		<>
			<div
				className={styles.background_container}
				style={{
					height: `calc(100vh - ${headerRef?.current?.clientHeight || 0}px)`,
					backgroundImage: `url("${
						getBackgroundImage(CHARACTER) ||
						getBackgroundImage(PRESENT_RECIEVER) ||
						blank_white
					}")`,
				}}
			></div>

			<form
				id="advisor_main_form"
				onSubmit={onSubmit}
				className={styles.form}
				style={{
					overflowX: 'hidden',
					maxHeight: formMaxHeight,
				}}
			>
				<input
					type="hidden"
					{...register(IS_FOR_LOGGED_USERS)}
				/>
				<div
					className={styles.fieldset_group_wrapper}
					style={
						{
							overflowX: 'hidden',
							willChange: 'transform, max-height',
							maxHeight:
								step === 0
									? /* Step 0 has to be rendered invisible first for the measurement */
									  step_0_clientHeight
									: step < PRODUCT_LISTING_STEP
									? fieldsetHeight
									: undefined,
							overflowY: 'hidden',
							transform: `translateX(calc(${-step} * min(100vw, 420px)))`,
							'--step-width': `min(100vw, 420px)`,
						} as TMyCustomCSS
					}
					{...handlers}
				>
					<div
						className={styles.fieldset_wrapper}
						style={{ visibility: step_0_clientHeight ? undefined : 'hidden' }}
					>
						<fieldset
							className={classNames(styles.fieldset, {
								[styles.active]: step === 0,
								[styles.passed]: step > 0,
							})}
							ref={(elm) => {
								step_0_ref.current = elm;
							}}
						>
							<legend className={styles.legend}>
								<span className={styles.legend_title}>1/5 Hledám …</span>
								<span className={styles.legend_description}>
									Vyberte prosím, zda se chystáte obdarovat sami sebe nebo je
									produkt určen pro někoho, kdo si to zaslouží.
								</span>
							</legend>
							<RadioGroup
								options={formSteps[FOR_MYSELF_OR_PRESENT_TOGGLE].options}
								columns={2}
								{...register(FOR_MYSELF_OR_PRESENT_TOGGLE, {
									onChange: () => {
										[
											CHARACTER,
											PRESENT_RECIEVER,
											KIND,
											TYPE,
											COUNTRY_OF_ORIGIN,
										].forEach((field) => {
											resetField(field);
										});
										dispatch({
											type: BundleContextActions.SET_INITIAL_STATE,
										});
									},
								})}
							/>
						</fieldset>
					</div>
					<div className={styles.fieldset_wrapper}>
						<fieldset
							className={classNames(styles.fieldset, {
								[styles.active]: step === 1,
								[styles.passed]: step > 1,
							})}
							ref={(elm) => {
								step_1_ref.current = elm;
							}}
						>
							{allFields[FOR_MYSELF_OR_PRESENT_TOGGLE] === 'forMyself' && (
								<>
									<legend className={styles.legend}>
										<span className={styles.legend_title}>
											2/5: Jaký charakter pití hledáte?
										</span>
										<span className={styles.legend_description}>
											Která z voleb nejlépe odpovídá Vaší náladě a příležitosti,
											ke které hledáte lahev?
										</span>
									</legend>

									<RadioGroup
										options={formSteps[CHARACTER].options}
										{...register(CHARACTER)}
									/>
								</>
							)}
							{allFields[FOR_MYSELF_OR_PRESENT_TOGGLE] === 'present' && (
								<>
									<legend className={styles.legend}>
										<span className={styles.legend_title}>
											2/5: Pro koho je dárek určen?
										</span>
										<span className={styles.legend_description}>
											Kdo je tou šťastnou osobou? Chystáte se obdarovat svou
											drahou polovičku, nebo potěšit někoho z rodiny?
										</span>
									</legend>

									<RadioGroup
										options={formSteps[PRESENT_RECIEVER].options}
										{...register(PRESENT_RECIEVER)}
									/>
								</>
							)}
						</fieldset>
					</div>
					<div className={styles.fieldset_wrapper}>
						<fieldset
							className={classNames(styles.fieldset, {
								[styles.active]: step === 2,
								[styles.passed]: step > 2,
							})}
							ref={(elm) => {
								step_2_ref.current = elm;
							}}
						>
							<legend className={styles.legend}>
								<span className={styles.legend_title}>
									3/5: Jaký druh vína máte nejraději?
								</span>
								<span className={styles.legend_description}>
									Zvolte si, které druhy vína přesně odpovídají Vaší chuti.
									Vybrat můžete libovolný počet.
								</span>
							</legend>
							<CheckboxGroup
								options={formSteps[KIND].options}
								className={styles.bg_gradient}
								columns={2}
								{...register(KIND)}
							/>
						</fieldset>
					</div>
					<div className={styles.fieldset_wrapper}>
						<fieldset
							className={classNames(styles.fieldset, {
								[styles.active]: step === 3,
								[styles.passed]: step > 3,
							})}
							ref={(elm) => {
								step_3_ref.current = elm;
							}}
						>
							<legend className={styles.legend}>
								<span className={styles.legend_title}>
									4/5: Dáváte přednost sušší, nebo sladší chuti?
								</span>
								<span className={styles.legend_description}>
									Jaký typ vína preferujete? Vybrat můžete libovolný počet.
								</span>
							</legend>
							<CheckboxGroup
								options={formSteps[TYPE].options}
								columns={1}
								className={classNames(styles.img_invert, styles.extra_paddings)}
								{...register(TYPE)}
							/>
						</fieldset>
					</div>
					<div className={styles.fieldset_wrapper}>
						<fieldset
							className={classNames(styles.fieldset, {
								[styles.active]: step === 4,
							})}
							ref={(elm) => {
								step_4_ref.current = elm;
							}}
						>
							<legend className={styles.legend}>
								<span className={styles.legend_title}>
									5/5: Preferujete česká, nebo zahraniční?
								</span>
								<span className={styles.legend_description}>
									Necháte své chutě cestovat, nebo zůstanete na domácí půdě?
									Vyberte prosím alespoň jednu možnost.
								</span>
							</legend>
							<CheckboxGroup
								options={formSteps[COUNTRY_OF_ORIGIN].options}
								columns={2}
								className={styles.bg_gradient}
								{...register(COUNTRY_OF_ORIGIN)}
							/>
						</fieldset>
					</div>
					<div
						className={styles.fieldset_wrapper}
						ref={(elm) => {
							step_5_ref.current = elm;
						}}
					>
						<ProductSlider
							economicBundles={state.priceRangeOne}
							standardBundles={state.priceRangeTwo}
							premiumBundles={state.priceRangeThree}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default Form;

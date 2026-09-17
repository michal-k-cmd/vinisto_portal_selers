import { type SVGAttributes, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import cx from 'classnames';

import { mapStepsToFormFields } from '../Form/constants';
import { handleSendRequest } from '../Form/handler';
import { type TFormValues } from '../../App';
import { useStepContext } from '../../App/StepContext';
import { BundleContextStates, useBundleContext } from '../../App/bundleContext';
import { useLayoutContext } from '../../App/LayoutContext';
import { useBasketContext } from '../../App/BasketContext';
import useSearchParams from '../../Hooks/useSearchParams';
import { ESHOP_URL } from '../../Services/constants';
import { PRODUCT_LISTING_STEP, SKIPPABLE_STEPS } from '../../App/constants';

import styles from './style.module.css';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
} from '@/api-types/product-api';

type TChevronIconProps = {
	width: string;
	height: string;
} & SVGAttributes<SVGAElement>;

const ChevronIcon = ({ height, width }: TChevronIconProps) => {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 24 24"
			height={height}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="m15.146 12.354-5.792 5.792a.5.5 0 0 1-.854-.353V6.207a.5.5 0 0 1 .854-.353l5.792 5.792a.5.5 0 0 1 0 .708Z"></path>
		</svg>
	);
};

const Footer = () => {
	const { handleSubmit } = useFormContext<TFormValues>();
	const allFields = useWatch();
	const { step, setStep, incrementStep, decrementStep } = useStepContext();
	const { setFooterRef } = useLayoutContext();
	const { basketId, hasAddedToBasket } = useBasketContext();
	const { userLoginHash, anonymousUserId, priceLevel } = useSearchParams();
	const { dispatch, state } = useBundleContext();

	const { currentState } = state;
	const hasHash = Boolean(userLoginHash || anonymousUserId);

	const { currency } = useSearchParams();

	const submitForm = handleSubmit(
		handleSendRequest(
			dispatch,
			currency as VinistoHelperDllEnumsCurrency,
			priceLevel as VinistoHelperDllEnumsPriceLevel
		)
	);

	// Duplicity with <Form>
	const hasCurrentStepValue = mapStepsToFormFields
		.slice(step, step + 1)
		.flatMap((fields) => fields.map((field) => allFields[field]))
		.some((field) => {
			if (field === 0) return true;
			if (Array.isArray(field) && field.length === 0) return false;
			return Boolean(field);
		});

	const currentFooter = useCallback(
		(node: HTMLElement | null) => {
			if (node instanceof HTMLElement) {
				setFooterRef(node);
			}
		},
		[setFooterRef]
	);

	return (
		<>
			{(
				[
					BundleContextStates.IDLE,
					BundleContextStates.LOADING,
				] as ReadonlyArray<keyof typeof BundleContextStates>
			).includes(currentState) && (
				<footer
					className={styles.wrapper}
					ref={currentFooter}
				>
					{step > 0 && (
						<button
							type="button"
							aria-label="back"
							className={styles.back_button}
							onClick={decrementStep}
						>
							<ChevronIcon
								height="1.5rem"
								width="1.5rem"
							/>
						</button>
					)}
					{SKIPPABLE_STEPS.includes(step) && !hasCurrentStepValue && (
						<button
							type="button"
							className={styles.skip_button}
							onClick={incrementStep}
						>
							Přeskočit
						</button>
					)}
					<button
						form="advisor_main_form"
						disabled={!hasCurrentStepValue}
						className={styles.cta_button}
						onClick={(event) => {
							if (step < 4) {
								event?.preventDefault();
								incrementStep();
							} else {
								incrementStep();
								submitForm();
							}
						}}
					>
						<span>{step < 4 ? 'Pokračovat' : 'Zobrazit doporučení'}</span>
						<ChevronIcon
							height="1.5rem"
							width="1.5rem"
						/>
					</button>
				</footer>
			)}
			{currentState === BundleContextStates.LOADED &&
				step < PRODUCT_LISTING_STEP && (
					<footer
						className={styles.wrapper}
						ref={currentFooter}
					>
						{step > 0 && (
							<button
								type="button"
								aria-label="back"
								className={styles.back_button}
								onClick={decrementStep}
							>
								<ChevronIcon
									height="1.5rem"
									width="1.5rem"
								/>
							</button>
						)}

						<button
							form="advisor_main_form"
							className={styles.cta_button}
							onClick={() => {
								setStep(PRODUCT_LISTING_STEP);
								submitForm();
							}}
						>
							<span>Zobrazit doporučení</span>
						</button>
						{step < 4 && (
							<button
								type="button"
								aria-label="forward"
								className={styles.forward_button}
								onClick={incrementStep}
							>
								<ChevronIcon
									height="1.5rem"
									width="1.5rem"
								/>
							</button>
						)}
					</footer>
				)}
			{currentState === BundleContextStates.LOADED &&
				step === PRODUCT_LISTING_STEP &&
				(hasHash ? (
					<footer
						className={styles.wrapper}
						ref={currentFooter}
					>
						<a
							className={cx(styles.cta_button, {
								[styles.disabled_link]: !(basketId || hasAddedToBasket),
							})}
							href={
								basketId || hasAddedToBasket ? `${ESHOP_URL}/kosik` : undefined
							}
							target="_child"
						>
							<span>Pokračovat do košíku</span>
						</a>
					</footer>
				) : (
					<footer
						ref={currentFooter}
						style={{ height: 0 }}
					></footer>
				))}
			)
		</>
	);
};

export default Footer;

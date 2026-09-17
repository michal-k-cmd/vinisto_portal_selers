import {
	ChangeEventHandler,
	Children,
	cloneElement,
	isValidElement,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from 'react';
import cx from 'classnames';
import { FormApi, MutableState, SubmissionErrors, Tools } from 'final-form';
import { unset } from 'lodash-es';
import { Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { LocalizationContext } from 'Services/LocalizationService';
import ContentPreloader from 'Components/ContentPreloader';
import { EditIcon } from 'Components/Icons';

import {
	SingleEditFormProps,
	SingleEditWrapperComponentProps,
} from './interfaces';
import { SingleEditFormAction } from './constants';
import { SingleEditFormContext } from './context';

import './styles.css';

const hasSubmitErrors = (result: SubmissionErrors | void) => {
	if (result === undefined) {
		return true;
	}
	return Object.values(result).filter((v) => v).length > 0;
};

const SingleEditForm = <IFormValues extends Record<string, any>>({
	formKey,
	onSubmit,
	initialValues,
	wrapperClassName = 'd-flex',
	btnsClassName,
	children,
	id,
	platformId,
	priceControls = false,
}: SingleEditFormProps<IFormValues>) => {
	const { dispatch, editEnabledField, isLoading } = useContext(
		SingleEditFormContext
	);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const isEditEnabled = editEnabledField === formKey;

	const formReference = useRef<FormApi<IFormValues>>();

	const handleToggleEdit = useCallback(
		(isEnabled: boolean) => () => {
			dispatch([
				SingleEditFormAction.setEditEnabledField,
				isEnabled ? formKey : null,
			]);
			dispatch([SingleEditFormAction.setIsDirty, false]);
		},
		[dispatch, formKey]
	);

	const handleOnCancel = useCallback(() => {
		// TODO: when previously focused input is not valid, error message appears for a second
		handleToggleEdit(false)();
		formReference.current?.restart();
	}, [handleToggleEdit]);

	const handleOnSubmit = useCallback(
		async (values: IFormValues, form: FormApi<IFormValues>) => {
			handleToggleEdit(false)();
			dispatch([SingleEditFormAction.setIsLoading, true]);
			const result = await onSubmit(values, form);
			dispatch([SingleEditFormAction.setIsLoading, false]);
			if (!hasSubmitErrors(result)) {
				dispatch([SingleEditFormAction.setEditEnabledField, null]);
			}
			return result;
		},
		[onSubmit, dispatch, handleToggleEdit]
	);

	const handleOnChange = useCallback<
		(form: FormApi<IFormValues>, fieldId: string) => ChangeEventHandler<Element>
	>(
		(form, fieldId) => () => {
			dispatch([SingleEditFormAction.setIsDirty, form.getState().dirty]);
			formReference.current?.mutators.clearSubmitError(fieldId);
		},
		[dispatch]
	);

	const formMutators = {
		clearSubmitError: (
			[fieldId]: [string],
			state: MutableState<IFormValues>
		) => {
			unset(state, `formState.submitErrors[${fieldId}]`);
		},
		setB2BPrice: (
			discount: number,
			state: MutableState<IFormValues>,
			tools: Tools<IFormValues>
		) => {
			tools.changeValue(state, 'price', () => {
				const basePrice = initialValues?.basePrice || 0;
				if (basePrice) {
					return parseFloat((basePrice * (1 - discount / 100)).toFixed(2));
				} else return 0;
			});
		},
	};

	const SetB2BPriceButton = ({ discount }: { discount: number }) => {
		const handleSetB2BPrice = useCallback(() => {
			formReference.current?.mutators.setB2BPrice(discount);
		}, [discount]);

		return (
			<button
				onClick={handleSetB2BPrice}
				className="b2b-button btn-primary btn mr-5"
			>
				{discount}%
			</button>
		);
	};

	const childrenWithProps = useMemo(
		() =>
			Children.map(children, (child) => {
				if (!isValidElement<SingleEditWrapperComponentProps>(child)) {
					return null;
				}

				const inputSuffix = isEditEnabled ? (
					<div className="single-edit-form-input-wrapper align-self-stretch text-nowrap">
						<div className={btnsClassName}>
							<div className="d-flex gap-1 h-100">
								<button
									type="submit"
									className="btn btn-ok"
								>
									{t({ id: 'settings.form.submit.label' })}
								</button>
								<button
									type="button"
									className="btn btn-cancel"
									onClick={handleOnCancel}
								>
									{t({ id: 'settings.form.cancel.label' })}
								</button>
							</div>
						</div>
					</div>
				) : (
					editEnabledField === null && (
						<button
							className="btn btn-ok d-flex align-items-center text-nowrap gap-2 align-self-stretch"
							onClick={handleToggleEdit(true)}
						>
							<EditIcon
								alt={`${t({ id: 'settings.form.toggle.label' })}`}
								title={`${t({ id: 'settings.form.toggle.label' })}`}
								className="single-edit-form__btn-toggle price-controls"
							/>
							{t(
								{ id: 'settings.form.setPrice' },
								{ platform: platformId === 0 ? 'B2C' : 'B2B' }
							)}
						</button>
					)
				);

				return cloneElement<SingleEditWrapperComponentProps>(
					child,
					{
						disabled: !isEditEnabled,
						label: (labelText) => (
							<span className="single-edit-form__label">
								{labelText}
								{!priceControls && editEnabledField === null && (
									<button
										className="d-flex align-items-center single-edit-form__btn-icon"
										onClick={handleToggleEdit(true)}
									>
										<EditIcon
											alt={`${t({ id: 'settings.form.toggle.label' })}`}
											title={`${t({ id: 'settings.form.toggle.label' })}`}
											className="single-edit-form__btn-toggle"
										/>
									</button>
								)}
							</span>
						),
						inputSuffix: priceControls ? inputSuffix : undefined,
						id,
					},
					child.props.children
				);
			}),
		[
			children,
			isEditEnabled,
			btnsClassName,
			t,
			handleOnCancel,
			editEnabledField,
			handleToggleEdit,
			platformId,
			priceControls,
			id,
		]
	);

	return (
		<Form<IFormValues>
			initialValues={initialValues}
			onSubmit={handleOnSubmit}
			mutators={formMutators}
		>
			{({ handleSubmit, form }) => {
				formReference.current = form;
				return (
					<>
						<form
							onSubmit={handleSubmit}
							className={cx(
								'position-relative',
								{
									'single-edit-form--disabled': !isEditEnabled,
								},
								wrapperClassName
							)}
						>
							{isEditEnabled && isLoading ? (
								<ContentPreloader wrapperClass="single-edit-form__loading-spinner" />
							) : null}

							{childrenWithProps}

							{form.getRegisteredFields().map((field) => (
								<OnChange
									name={field}
									key={field}
								>
									{handleOnChange(form, field)}
								</OnChange>
							))}

							{!priceControls && isEditEnabled && (
								<div className="single-edit-form-input-wrapper">
									<div className={btnsClassName}>
										<span className="form-label"> &nbsp; </span>
										<div>
											<button
												type="submit"
												className="btn btn-ok"
												onClick={handleSubmit}
											>
												{t({ id: 'settings.form.submit.label' })}
											</button>
											<button
												type="button"
												className="btn btn-cancel ms-1"
												onClick={handleOnCancel}
											>
												{t({ id: 'settings.form.cancel.label' })}
											</button>
										</div>
									</div>
								</div>
							)}
						</form>
						{isEditEnabled && platformId === 1 && (
							<div className="d-flex flex-column b2b-buttons-wrapper">
								<span className="">
									{t({ id: 'settings.form.B2Bprice.label' })}:
								</span>
								<div className="d-flex">
									<SetB2BPriceButton discount={5} />
									<SetB2BPriceButton discount={10} />
									<SetB2BPriceButton discount={15} />
									<SetB2BPriceButton discount={20} />
									<SetB2BPriceButton discount={25} />
									<SetB2BPriceButton discount={30} />
									<SetB2BPriceButton discount={35} />
									<SetB2BPriceButton discount={40} />
									<SetB2BPriceButton discount={45} />
									<SetB2BPriceButton discount={50} />
								</div>
								<span className="b2b-buttons-note">
									{t({ id: 'settings.form.B2Bprice.note' })}
								</span>
							</div>
						)}
					</>
				);
			}}
		</Form>
	);
};

export default SingleEditForm;

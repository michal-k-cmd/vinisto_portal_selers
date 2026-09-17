import { Form } from 'react-final-form';
import {
	Input,
	InputDatePicker,
	InputNumber,
	InputTextArea,
	Validators,
} from 'Components/Form';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import ProductTypeSelect from 'Components/Form/Components/ProductTypeSelect';
import KindSelect from 'Components/Form/Components/KindSelect';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { dayjsInstance as dayjs } from 'Services/Date';

import {
	CreateSellingRuleFromProps,
	SaleFeeRuleFormValues,
} from './interfaces';
import styles from './styles.module.css';

const SaleFeeRuleForm = ({
	initialValues,
	handleSubmit,
}: CreateSellingRuleFromProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
	const currentDatePlusOneDayFormatted = dayjs(tommorow).format('DD.MM.YYYY');

	return (
		<Form<SaleFeeRuleFormValues>
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validate={(values) => {
				const errors: Partial<SaleFeeRuleFormValues> = {};
				if (
					!(
						(values.originB2CAmount != undefined ||
							values.originB2CPercent != undefined) &&
						(values.originB2BAmount != undefined ||
							values.originB2BPercent != undefined) &&
						(values.destinationB2CAmount != undefined ||
							values.destinationB2CPercent != undefined) &&
						(values.destinationB2BAmount != undefined ||
							values.destinationB2BPercent != undefined)
					)
				) {
					errors.originOrDestinationFees = `${t({
						id: 'admin.feeRule.error.noFees',
					})}`;
				}

				if (
					values.validTo &&
					values.validFrom &&
					values.validTo < values.validFrom
				) {
					// @ts-expect-error ???
					errors.validTo = `${t({
						id: 'validation.error.toEarlierThanFrom',
					})}`;
				}

				return errors;
			}}
		>
			{({ handleSubmit, form }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<p className="fw-bold d-flex align-items-center gap-2">
						<BsFillInfoCircleFill color="#280044" />
						Směr prodeje: {initialValues.originCountry} →{' '}
						{initialValues.destinationCountry}
					</p>
					<div className="d-flex gap-3">
						<InputDatePicker
							name="validFrom"
							identifier="validFrom"
							label="admin.modal.form.validFrom"
							validate={[Validators.required, Validators.isNotPastDate]}
							minDate={tommorow}
							placeholder={currentDatePlusOneDayFormatted}
						/>
						<InputDatePicker
							name="validTo"
							identifier="validTo"
							label="admin.modal.form.validTo"
							minDate={tommorow}
						/>
					</div>
					<p className="fw-bold">Specifikace</p>
					<ProductTypeSelect
						name="productType"
						identifier="productType"
						label="admin.modal.sellinRule.productType"
						validate={Validators.required}
					/>
					<KindSelect
						name="kind"
						identifier="kind"
						label="admin.modal.sellinRule.kind"
						validate={Validators.required}
					/>

					<div className="d-flex gap-3">
						<InputNumber
							name="priceFrom"
							identifier="priceFrom"
							label="admin.modal.form.priceFrom"
						/>
						<InputNumber
							name="priceTo"
							identifier="priceTo"
							label="admin.modal.form.priceTo"
						/>
					</div>

					<div className="d-flex gap-5">
						<div className="d-flex gap-1 flex-column ">
							<div className="fw-bold mb-3">Produkce</div>
							<div className="mb-4">z prodeje B2C</div>
							<div>do prodeje B2B</div>
						</div>
						<div>
							<div className="fw-bold text-center mb-2">Domácí</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="originB2CAmount"
										identifier="originB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="originB2CPercent"
										identifier="originB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="originB2BAmount"
										identifier="originB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="originB2BPercent"
										identifier="originB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
						</div>
						<div>
							<div className="fw-bold text-center mb-2">Zahraniční</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="destinationB2CAmount"
										identifier="destinationB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="destinationB2CPercent"
										identifier="destinationB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="destinationB2BAmount"
										identifier="destinationB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="destinationB2BPercent"
										identifier="destinationB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
						</div>
					</div>

					{form.getState().submitFailed &&
						form.getState().errors?.originOrDestinationFees && (
							<div style={{ color: 'rgb(212, 0, 0)' }}>
								{form.getState().errors?.originOrDestinationFees}
							</div>
						)}

					<InputTextArea
						name="note"
						identifier="note"
						label="admin.modal.userDetail.note"
						placeholder="admin.modal.userDetail.note"
					/>
					<div className="d-flex gap-3 align-items-center">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={() => {
								form.change('flags', { save: false });
								handleSubmit();
							}}
						>
							{t({ id: 'admin.modal.sellinRule.activate' })}
						</button>

						<button
							type="submit"
							className="btn btn-secondary"
							onClick={() => {
								form.change('flags', { save: true });
								handleSubmit();
							}}
						>
							{t({ id: 'admin.modal.sellinRule.saveConcept' })}
						</button>
						<span>{t({ id: 'admin.modal.sellinRule.activateNote' })}</span>
					</div>
				</form>
			)}
		</Form>
	);
};

export default SaleFeeRuleForm;

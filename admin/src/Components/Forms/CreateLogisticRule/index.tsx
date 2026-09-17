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
	CreateLogisticRuleFromProps,
	LogisticFeeRuleFormValues,
} from './interfaces';
import styles from './styles.module.css';

const CreateLogisticRuleForm = ({
	initialValues,
	handleSubmit,
}: CreateLogisticRuleFromProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
	const currentDatePlusOneDayFormatted = dayjs(tommorow).format('DD.MM.YYYY');

	return (
		<Form<LogisticFeeRuleFormValues>
			onSubmit={handleSubmit}
			initialValues={initialValues}
			validate={(values) => {
				const errors: Partial<LogisticFeeRuleFormValues> = {};

				if (
					!(
						(values.supplierTransportB2CAmount != undefined ||
							values.supplierTransportB2CPercent != undefined) &&
						(values.vinistoTransportB2CAmount != undefined ||
							values.vinistoTransportB2CPercent != undefined) &&
						(values.supplierTransportB2BAmount != undefined ||
							values.supplierTransportB2BPercent != undefined) &&
						(values.vinistoTransportB2BAmount != undefined ||
							values.vinistoTransportB2BPercent != undefined)
					)
				) {
					errors.vinistoOrSupplierTransportFees = `${t({
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
					<Input
						type="text"
						name="name"
						identifier="name"
						label="admin.modal.sellingRule.ruleName"
						placeholder="admin.modal.sellingRule.ruleName"
						validate={Validators.required}
					/>
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

					<div className="d-flex gap-5 justify-content-between">
						<div className="d-flex gap-1 flex-column ">
							<div className="fw-bold mb-3">
								{t({ id: 'admin.modal.sellingRule.sale' })}
							</div>
							<div className="mb-4">
								{t({ id: 'admin.modal.sellingRule.theyDeliver' })}
							</div>
							<div>{t({ id: 'admin.modal.sellingRule.weDeliver' })}</div>
						</div>
						<div>
							<div className="fw-bold text-center mb-2 invisible">A</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2C
									<Input
										type="number"
										name="supplierTransportB2CAmount"
										identifier="supplierTransportB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="supplierTransportB2CPercent"
										identifier="supplierTransportB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2C
									<Input
										type="number"
										name="vinistoTransportB2CAmount"
										identifier="vinistoTransportB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="vinistoTransportB2CPercent"
										identifier="vinistoTransportB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
						</div>
						<div>
							<div className="fw-bold text-center invisible mb-2">A</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2B
									<Input
										type="number"
										name="supplierTransportB2BAmount"
										identifier="supplierTransportB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="supplierTransportB2BPercent"
										identifier="supplierTransportB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2B
									<Input
										type="number"
										name="vinistoTransportB2BAmount"
										identifier="vinistoTransportB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="vinistoTransportB2BPercent"
										identifier="vinistoTransportB2BPercent"
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
						form.getState().errors?.vinistoOrSupplierTransportFees && (
							<div style={{ color: 'rgb(212, 0, 0)' }}>
								{form.getState().errors?.vinistoOrSupplierTransportFees}
							</div>
						)}

					<div className="d-flex gap-5 justify-content-between">
						<div className="d-flex gap-1 flex-column ">
							<div className="fw-bold mb-3">
								{t({ id: 'admin.modal.sellingRule.fulfillment' })}
							</div>
							<div className="mb-4">
								{t({ id: 'admin.modal.sellingRule.dispatching' })}
							</div>
							<div className="mb-4 pt-2">
								{t({ id: 'admin.modal.sellingRule.packaging' })}
							</div>
							<div className="mb-4 pt-2 pb-2">
								{t({ id: 'admin.modal.sellingRule.completion' })}
							</div>
							<div>{t({ id: 'admin.modal.sellingRule.storage' })}</div>
						</div>
						<div>
							<div className="fw-bold text-center mb-2 invisible">A</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2C
									<Input
										type="number"
										name="dispatchingB2CAmount"
										identifier="dispatchingB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="dispatchingB2CPercent"
										identifier="dispatchingB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2C
									<Input
										type="number"
										name="packagingB2CAmount"
										identifier="packagingB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="packagingB2CPercent"
										identifier="packagingB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2C
									<Input
										type="number"
										name="completionB2CAmount"
										identifier="completionB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="completionB2CPercent"
										identifier="completionB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2C
									<Input
										type="number"
										name="storageB2CAmount"
										identifier="storageB2CAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="storageB2CPercent"
										identifier="storageB2CPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
						</div>
						<div>
							<div className="fw-bold text-center invisible mb-2">A</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2B
									<Input
										type="number"
										name="dispatchingB2BAmount"
										identifier="dispatchingB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="dispatchingB2BPercent"
										identifier="dispatchingB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2B
									<Input
										type="number"
										name="packagingB2BAmount"
										identifier="packagingB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="packagingB2BPercent"
										identifier="packagingB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2B
									<Input
										type="number"
										name="completionB2BAmount"
										identifier="completionB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="completionB2BPercent"
										identifier="completionB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="d-flex gap-3">
								<div className="d-flex gap-2 align-items-baseline">
									B2B
									<Input
										type="number"
										name="storageB2BAmount"
										identifier="storageB2BAmount"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="d-flex gap-2 align-items-baseline">
									<Input
										type="number"
										name="storageB2BPercent"
										identifier="storageB2BPercent"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
						</div>
					</div>

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

export default CreateLogisticRuleForm;

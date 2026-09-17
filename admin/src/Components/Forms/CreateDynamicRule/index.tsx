import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {
	Input,
	InputDatePicker,
	InputNumber,
	InputTextArea,
	InputTimePicker,
	Validators,
} from 'Components/Form';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import SuppliersSelect from 'Components/Forms/CreateDynamicRule/Components/SuppliersSelect';
import TagsSelect from 'Components/Forms/CreateDynamicRule/Components/TagsSelect';
import BundlesSelect from 'Components/Forms/CreateDynamicRule/Components/BundlesSelect';
import CategoriesSelect from 'Components/Forms/CreateDynamicRule/Components/CategoriesSelect';
import SpecificationsSelect from 'Components/Forms/CreateDynamicRule/Components/SpecificationsSelect';
import { useQuery } from '@tanstack/react-query';
import { dayjsInstance as dayjs } from 'Services/Date';

import {
	CreateDynamicRuleFromProps,
	DynamicFeeRuleFormValues,
} from './interfaces';
import styles from './styles.module.css';

import api from '@/api';
import { VinistoHelperDllEnumsFeeRuleFeeRuleState } from '@/api-types/supplier-api';
import { VinistoProductDllModelsApiTagTagReturn } from '@/api-types/product-api';

const CreateDynamicRuleForm = ({
	initialValues,
	handleSubmit,
}: CreateDynamicRuleFromProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const tommorow = new Date(new Date().setDate(new Date().getDate() + 1));
	const currentDatePlusOneDayFormatted = dayjs(tommorow).format('DD.MM.YYYY');

	const tagIds = initialValues.tags?.map((tag) => tag.tagId);

	const tagsByIdsQuery = useQuery({
		queryKey: ['tagsByIds', tagIds],
		queryFn: () => {
			if (!tagIds?.length) return Promise.resolve([]);
			return Promise.all(
				tagIds.map(async (tagId) =>
					api.get<VinistoProductDllModelsApiTagTagReturn>(
						`product-api/tags/${tagId}`
					)
				)
			).then((response) => response.map((r) => r.tag));
		},
		enabled: !!tagIds?.length,
	});

	if (tagsByIdsQuery.isFetching) {
		return <div>Loading...</div>;
	}

	return (
		<Form<DynamicFeeRuleFormValues>
			onSubmit={handleSubmit}
			initialValues={{
				...initialValues,
				...(initialValues.specifications?.length && {
					specifications: [
						{
							productType: initialValues.specifications[0]?.allowedValues?.[0],
							kind: initialValues.specifications[1]?.allowedValues?.[0],
						},
					],
				}),
			}}
			mutators={{
				...arrayMutators,
			}}
			validate={(values) => {
				const errors: Record<string, string> = {};
				if (
					!(
						((values.originFees as any)?.vinistoB2bLevel1?.percentage !=
							undefined ||
							(values.originFees as any)?.vinistoB2bLevel1?.fixedPrice !=
								undefined) &&
						((values.originFees as any)?.vinistoB2cLevel1?.percentage !=
							undefined ||
							(values.originFees as any)?.vinistoB2cLevel1?.fixedPrice !=
								undefined) &&
						((values.destinationFees as any)?.vinistoB2bLevel1?.percentage !=
							undefined ||
							(values.destinationFees as any)?.vinistoB2bLevel1?.fixedPrice !=
								undefined) &&
						((values.destinationFees as any)?.vinistoB2cLevel1?.percentage !=
							undefined ||
							(values.destinationFees as any)?.vinistoB2cLevel1?.fixedPrice !=
								undefined)
					)
				) {
					errors.originalAndDestinationFees = `${t({
						id: 'admin.feeRule.error.noFees',
					})}`;
				}

				if (
					!(
						[
							values.bundleIds,
							values.supplierIds,
							values.categoryIds,
							values.tags,
						].some(
							(value) =>
								Array.isArray(value) && value.filter((v) => v).length > 0
						) ||
						values.productType ||
						values.kind
					)
				) {
					errors.conditions = `${t({
						id: 'admin.feeRule.error.noConditions',
					})}`;
				}

				if (
					values.validTo &&
					values.validFrom &&
					values.validTo < values.validFrom
				) {
					errors.validTo = `${t({
						id: 'validation.error.toEarlierThanFrom',
					})}`;
				}

				return errors;
			}}
		>
			{({ handleSubmit, values, form }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<p className="gap-2 fw-bold d-flex align-items-center">
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
					<div className="gap-3 d-flex">
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
					<div className="mb-3">
						<BundlesSelect<DynamicFeeRuleFormValues>
							name="bundleIds"
							identifier="bundleIds"
							label="modal.createDynamicRules.bundle"
							formValues={values}
							displayValues={initialValues.bundleNames}
						/>

						<SuppliersSelect<DynamicFeeRuleFormValues>
							name="supplierIds"
							identifier="supplierIds"
							label="admin.modal.form.seller"
							formValues={values}
							displayValues={initialValues.supplierNames}
						/>

						<SpecificationsSelect<DynamicFeeRuleFormValues>
							name="specifications"
							identifier="specifications"
							label="modal.createDynamicRules.specification"
							formValues={values}
							form={form}
						/>

						<TagsSelect<DynamicFeeRuleFormValues>
							name="tags"
							identifier="tags"
							label="modal.createDynamicRules.tag"
							formValues={values}
							displayValues={tagsByIdsQuery.data}
						/>

						<CategoriesSelect<DynamicFeeRuleFormValues>
							name="categoryIds"
							identifier="categoryIds"
							label="modal.createDynamicRules.category"
							formValues={values}
							displayValues={initialValues.categoryNames}
						/>

						{form.getState().submitFailed &&
							form.getState().errors?.conditions && (
								<div style={{ color: 'rgb(212, 0, 0)' }}>
									{form.getState().errors?.conditions}
								</div>
							)}
					</div>
					<div className="gap-3 d-flex">
						<InputNumber
							name="bundlePriceFrom"
							identifier="bundlePriceFrom"
							label="admin.modal.form.priceFrom"
						/>
						<InputNumber
							name="bundlePriceTo"
							identifier="bundlePriceTo"
							label="admin.modal.form.priceTo"
						/>
					</div>

					<div className="gap-3 d-flex">
						<InputNumber
							name="bundleAmountFrom"
							identifier="bundleAmountFrom"
							label="admin.modal.form.pcsFrom"
						/>
						<InputNumber
							name="bundleAmountTo"
							identifier="bundleAmountTo"
							label="admin.modal.form.pcsTo"
						/>
					</div>
					<div className="align-items-baseline">
						<span className="fw-bold">Pokud obrat:</span>
						<div className="gap-3 d-flex">
							<InputTimePicker
								name="turnover.validFrom"
								identifier="turnover.validFrom"
								label="admin.from"
							/>
							<InputTimePicker
								name="turnover.validTo"
								identifier="turnover.validTo"
								label="admin.to"
							/>
						</div>
					</div>
					<div className="gap-2 d-flex align-items-baseline">
						<Input
							type="number"
							name="turnover.valueFrom"
							identifier="turnover.valueFrom"
							min={0}
						/>
						<span>Kč</span>

						<Input
							type="number"
							name="turnover.valueTo"
							identifier="turnover.valueTo"
							min={0}
						/>
						<span>Kč</span>
					</div>

					<div className="gap-5 d-flex justify-content-between">
						<div className="gap-1 d-flex flex-column ">
							<div className="mb-3 fw-bold">Produkce</div>
							<div className="mb-4">Procento z prodeje b2c</div>
							<div>Procento z prodeje b2b</div>
						</div>
						<div>
							<div className="mb-2 text-center fw-bold">Domácí</div>
							<div className="gap-3 d-flex">
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="originFees.vinistoB2cLevel1.fixedPrice"
										identifier="originFees.vinistoB2cLevel1.fixedPrice"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="originFees.vinistoB2cLevel1.percentage"
										identifier="originFees.vinistoB2cLevel1.percentage"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="gap-3 d-flex">
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="originFees.vinistoB2bLevel1.fixedPrice"
										identifier="originFees.vinistoB2bLevel1.fixedPrice"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="originFees.vinistoB2bLevel1.percentage"
										identifier="originFees.vinistoB2bLevel1.percentage"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2 text-center fw-bold">Zahraniční</div>
							<div className="gap-3 d-flex">
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="destinationFees.vinistoB2cLevel1.fixedPrice"
										identifier="destinationFees.vinistoB2cLevel1.fixedPrice"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="destinationFees.vinistoB2cLevel1.percentage"
										identifier="destinationFees.vinistoB2cLevel1.percentage"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>%</span>
								</div>
							</div>
							<div className="gap-3 d-flex">
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="destinationFees.vinistoB2bLevel1.fixedPrice"
										identifier="destinationFees.vinistoB2bLevel1.fixedPrice"
										min={0}
										step="any"
										className={styles.smallInput}
									/>
									<span>Kč</span>
								</div>
								<div className="gap-2 d-flex align-items-baseline">
									<Input
										type="number"
										name="destinationFees.vinistoB2bLevel1.percentage"
										identifier="destinationFees.vinistoB2bLevel1.percentage"
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
						form.getState().errors?.originalAndDestinationFees && (
							<div style={{ color: 'rgb(212, 0, 0)' }}>
								{form.getState().errors?.originalAndDestinationFees}
							</div>
						)}

					<InputTextArea
						name="note"
						identifier="note"
						label="admin.modal.userDetail.note"
						placeholder="admin.modal.userDetail.note"
					/>
					<div className="gap-3 d-flex align-items-center">
						{initialValues.state !==
							VinistoHelperDllEnumsFeeRuleFeeRuleState.Scheduled && (
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
						)}
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

export default CreateDynamicRuleForm;

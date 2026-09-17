import { FormControlProps } from 'Components/Form/interfaces';
import { FieldArray } from 'react-final-form-arrays';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import ProductTypeSelect from 'Components/Form/Components/ProductTypeSelect';
import KindSelect from 'Components/Form/Components/KindSelect';
import { FormApi } from 'final-form';

const SpecificationsSelect = <FormValues,>({
	name,
	form,
}: FormControlProps & {
	form: FormApi<FormValues, Partial<FormValues>>;
	formValues: FormValues;
	name: keyof FormValues;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<FieldArray name={name}>
			{({ fields }) => (
				<div className="mb-3">
					{fields.map((name, index) => (
						<div
							key={name}
							className="d-flex items-center gap-3"
						>
							<div className="w-100">
								<ProductTypeSelect
									name="productType"
									identifier="productType"
									label="admin.modal.sellinRule.productType"
								/>
								<KindSelect
									name="kind"
									identifier="kind"
									label="admin.modal.sellinRule.kind"
								/>
							</div>
							<button
								type="button"
								style={{
									all: 'unset',
								}}
								onClick={() => {
									fields.remove(index);
									// Note this component is problematic - the "nested" values are not working as expected (probably skill issue)
									// so it is actually needed to remove these values from the form manually
									form.change('productType' as keyof FormValues, undefined);
									form.change('kind' as keyof FormValues, undefined);
								}}
							>
								<DeleteIcon
									style={{
										width: '1rem',
										height: '1rem',
									}}
								/>
							</button>
						</div>
					))}
					{fields.length === 0 && (
						<button
							type="button"
							style={{
								padding: 0,
								backgroundColor: 'transparent',
								border: 'none',
								textDecoration: 'underline',
							}}
							onClick={() => fields.push('')}
							// disabled={fields.length > 0}
						>
							{t({ id: 'dynamicSellingRule.selectSpecification' })}
						</button>
					)}
				</div>
			)}
		</FieldArray>
	);
};

export default SpecificationsSelect;

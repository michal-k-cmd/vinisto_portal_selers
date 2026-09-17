import { UseMutationResult } from '@tanstack/react-query';
import Detail from 'Components/Detail';
import { EDIT_SPECIFICATION } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import { isNumericType } from 'Services/Specification/constants';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { useContext } from 'react';

interface SpecificationSettingsProps {
	data: SpecificationDetail;
	editSpecificationMutation: UseMutationResult<any, unknown, void, unknown>;
}

const SpecificationSettings = ({
	data,
	editSpecificationMutation,
}: SpecificationSettingsProps) => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const tabsLabel = (data.specification?.productAttributeTabs ?? [])
		.map(
			(tab) => t({ id: `admin.productAttribute.tab.${tab}` })?.toString() ?? ''
		)
		.join(', ');

	// @ts-expect-error only numeric specifications have unit. TODO: imperial may have different property
	const unit = getLocalizedValue(data.specification?.unit) ?? '';
	const shouldRenderUnit =
		isNumericType(data.specification?.specificationType) && Boolean(unit);

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({ id: 'admin.specificationDetail.heading' })}`}
			/>
			<Detail.Subheading
				value={t({ id: 'admin.specificationDetail.subheading' })}
			/>
			{shouldRenderUnit && (
				<Detail.InfoWithLabel
					label={t({ id: 'admin.specificationDetail.unit' })}
					value={unit}
					fallbackOrHide={false}
				/>
			)}
			<Detail.InfoWithLabel
				label={t({ id: 'admin.specificationDetail.filterOrder' })}
				value={data.specification?.order}
				fallbackOrHide={false}
			/>
			<Detail.InfoWithLabel
				label={t({ id: 'admin.specificationDetail.productDetailOrder' })}
				value={data.specification?.orderDetail}
				fallbackOrHide={false}
			/>
			<Detail.InfoWithLabel
				label={t({ id: 'admin.specificationDetail.isHidden.label' })}
				value={
					data.specification?.isHidden
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })
				}
			/>
			<Detail.InfoWithLabel
				label={t({ id: 'admin.specificationDetail.isDetail.label' })}
				value={
					data.specification?.isDetail
						? t({ id: 'admin.yes' })
						: t({ id: 'admin.no' })
				}
			/>
			<Detail.InfoWithLabel
				label={t({
					id: 'admin.specificationDetail.productAttributeTabs.label',
				})}
				value={tabsLabel}
			/>
			<Detail.Button
				className="mt-3 mb-2"
				onClick={() => {
					modalContext.handleOpenModal(EDIT_SPECIFICATION, {
						data,
						editSpecificationMutation,
					});
				}}
			>
				{t({ id: 'admin.btn.editSpecificationDetails' })}
			</Detail.Button>
		</Detail.Container>
	);
};

export default SpecificationSettings;

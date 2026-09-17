import { UseMutationResult } from '@tanstack/react-query';
import Detail from 'Components/Detail';
import { ADD_ALLOWED_VALUE_TO_SPECIFICATION } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import Table from './Table';

export type EditSpecificationValueMutation = UseMutationResult<
	any,
	unknown,
	void,
	unknown
>;

interface SpecificationValuesProps {
	data: SpecificationDetail;
	createSpecificationValueMutation: UseMutationResult<
		Promise<any>,
		unknown,
		void,
		unknown
	>;
	editSpecificationValueMutation: EditSpecificationValueMutation;
	deleteSpecificationValueMutation: UseMutationResult<
		Promise<any>,
		unknown,
		void,
		unknown
	>;
}

const SpecificationValues = ({
	data,
	createSpecificationValueMutation,
	editSpecificationValueMutation,
	deleteSpecificationValueMutation,
}: SpecificationValuesProps) => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleDeleteSpecificationValue = (valueName: string) => {
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			valueName: valueName,
		};

		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteSpecificationAllowedValue.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteSpecificationAllowedValue.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						deleteSpecificationValueMutation.mutate(requestData as any);
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.no',
					})}`,
					onClick: () => {},
				},
			],
		});
	};

	const getLocalizedValue = useLocalizedValue();

	const specificationValuesTableData = Object.entries(
		data.specification?.allowedValues ?? {}
	).map(([key, values]) => {
		const specificationType = data.specification?.specificationType;
		const name = getLocalizedValue(values.name);
		const description = getLocalizedValue(values.description);
		const metaDescription = getLocalizedValue(values.metaDescription);
		const score = values.score;
		const images = values.images;
		const icons = values.icons;

		return {
			id: key,
			valueName: key,
			specificationType,
			name,
			description,
			metaDescription,
			score,
			images,
			icons,
		};
	});

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({ id: 'admin.modal.category.specification.value.label' })}`}
			/>
			<Detail.Button
				className="mt-3 mb-3"
				onClick={() => {
					modalContext.handleOpenModal(ADD_ALLOWED_VALUE_TO_SPECIFICATION, {
						data,
						createSpecificationValueMutation,
					});
				}}
			>
				{t({ id: 'admin.btn.addSpecificationAllowedValues' })}
			</Detail.Button>

			<Table
				data={specificationValuesTableData}
				editSpecificationValueMutation={editSpecificationValueMutation}
				handleDeleteSpecificationValue={handleDeleteSpecificationValue}
			/>
		</Detail.Container>
	);
};

export default SpecificationValues;

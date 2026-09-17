import { Modal } from 'Components/Modal';
import { Form } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useState } from 'react';
import {
	useAttachTagToSupplier,
	useCreateSupplierTag,
	useDetachTagFromSupplier,
} from 'Services/SupplierTags';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Option } from 'Components/Multiselect/interfaces';
import { InputMultiselect } from 'Components/Form';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { useQuery } from '@tanstack/react-query';

import { VinistoSupplierDllModelsApiSupplierSupplier } from '@/api-types/product-api';
import supplierTagService from '@/supplier-service/tag';

interface AttachTagModalProps {
	supplier: VinistoSupplierDllModelsApiSupplierSupplier;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refetch: () => void;
}

interface FormValues {
	tags: Option[];
}

const AttachTagModal = ({
	supplier,
	isOpen,
	setIsOpen,
	refetch: refetchSupplier,
}: AttachTagModalProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const activeLanguageKey = useContext(LocalizationContext).activeLanguageKey;
	const getLocalizedValue = useLocalizedValue();

	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const attachTagToSupplierMutation = useAttachTagToSupplier();
	const detachTagFromSupplierMutation = useDetachTagFromSupplier();

	const SelectOrCreateTagsInput = () => {
		const params = { userLoginHash, limit: 99 };
		const { data, refetch: refetchTags } = useQuery(
			['supplier-tags', params],
			() => supplierTagService.getAll(params)
		);

		const createSupplierTagMutation = useCreateSupplierTag({
			onSuccessCallback: (response) => {
				setNewTag({ id: String(response.id), name: response.name });
				refetchTags();
			},
		});

		const [newTag, setNewTag] = useState<{ id: string; name: string }>();

		return (
			<InputMultiselect
				options={
					data?.supplierTags?.map((tag) => ({
						value: `${tag.id}`,
						label: getLocalizedValue(tag.name ?? []),
					})) ?? []
				}
				initialSelected={supplier?.supplierTags?.map((tag) => {
					return {
						value: `${tag.id}`,
						label: getLocalizedValue(tag.name ?? []),
					};
				})}
				name="tags"
				identifier="tags"
				label="tags"
				onSelectItem={async (item) => {
					await attachTagToSupplierMutation.mutateAsync({
						tagIds: [item.value],
						supplierId: `${supplier?.id}`,
						userLoginHash,
					});
					refetchSupplier();
				}}
				onDeselectItem={async (item) => {
					await detachTagFromSupplierMutation.mutateAsync({
						tagIds: [item.value],
						supplierId: `${supplier?.id}`,
						userLoginHash,
					});
					refetchSupplier();
				}}
				onAddNewItem={(item) =>
					createSupplierTagMutation.mutateAsync({
						name: item.label,
						activeLanguageKey,
						userLoginHash,
					})
				}
				newItem={{
					label: newTag?.name ?? '',
					value: newTag?.id ?? '',
				}}
			/>
		);
	};

	return (
		<Modal
			show={isOpen}
			handleClose={() => setIsOpen(false)}
			title={`${t({ id: 'tags.manage' })}`}
		>
			<Form<FormValues>
				initialValues={{
					tags: supplier?.supplierTags?.map((tag) => ({
						value: `${tag.id}`,
						label: getLocalizedValue(tag.name ?? []),
					})),
				}}
				onSubmit={() => undefined}
				render={() => (
					<form>
						<SelectOrCreateTagsInput />
					</form>
				)}
			/>
		</Modal>
	);
};

export default AttachTagModal;

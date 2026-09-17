import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { FaTags } from 'react-icons/fa';
import DeleteIcon from 'Components/Icons/Delete';
import { useDetachTagFromSupplier } from 'Services/SupplierTags';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { confirmAlert } from 'react-confirm-alert';

import { VinistoSupplierDllModelsApiSupplierTagGetSupplierTag } from '@/api-types/product-api';

interface TagListProps {
	tags?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[] | null;
	supplierId?: string;
	refetch: () => void;
}

const TagList = ({
	tags,
	supplierId = '',
	refetch: refetchSupplier,
}: TagListProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const getLocalizedValue = useLocalizedValue();
	const detachTagFromSupplier = useDetachTagFromSupplier();

	const handleOnDetachTag = (tagId: string) => {
		confirmAlert({
			title: `${t({ id: 'admin.confirm.detachTagFromSupplier' })}`,
			message: `${t({ id: 'admin.confirm.detachTagFromSupplier.message' })}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: async () => {
						await detachTagFromSupplier.mutateAsync({
							tagIds: [tagId],
							supplierId,
							userLoginHash,
						});
						refetchSupplier();
					},
				},
				{
					label: `${t({ id: 'admin.confirm.no' })}`,
					onClick: () => undefined,
				},
			],
		});
	};

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">{t({ id: 'tags' })}</div>
			{tags?.map((tag) => (
				<div
					key={tag.id}
					className="detail-category-list-item"
				>
					<div className="product-category">
						<FaTags className="product-category-icon" />
						<div className="product-category-label">
							{getLocalizedValue(tag.name ?? [])}
						</div>
						<DeleteIcon
							onClick={() => handleOnDetachTag(`${tag.id}`)}
							className="bundle-detail__btn product-category-icon"
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default TagList;

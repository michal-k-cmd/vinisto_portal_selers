import { ProductTagListProps } from './interfaces';

const ProductTagList = ({ tags }: ProductTagListProps) => {
	return (
		<>
			{tags.map((productTag) => (
				<div key={`product-tag-name-${productTag.id}`}>{productTag.name}</div>
			))}
		</>
	);
};

export default ProductTagList;

import Price from '@/domain/price';

interface BundleItem {
	id?: string;
	productId: string;
	amount: number;
	price?: Price;
	isSupplierDiscount?: boolean;
}

export default BundleItem;

import {
	ActionType,
	ConditionType,
	CountryCode,
	Currency,
	Operator,
	UxActionType,
} from '@/api-types/addons-api';

interface AddonGift {
	id: string;
	name: string;
	description?: string;
	allowedCountry: CountryCode;
	validFrom: Date;
	validTo?: Date | null;
	applicableLimit?: number;
	applicableLimitCounter?: number;
	bundleIds?: string[];
	isActive?: boolean;
	isVisibleOnDetail: boolean;
	isSelectedByDefault: boolean;
	availableOnPlatform: number;
	currency?: Currency;
	orderPriceLimitFrom?: number;
	leftToSpent?: number;
	categoryId?: string;
	supplierId?: string;
}

function isAddonGift(gift: AddonGift | null): gift is AddonGift {
	return gift !== null;
}

interface AddonUx {
	id: string;
	name: string;
	description?: string;
	allowedCountry: CountryCode;
	validFrom?: Date | null;
	validTo?: Date | null;
	isActive?: boolean;
	currency?: Currency;
	conditions?: {
		conditionType: ConditionType;
		operator?: Operator;
		itemSpecificationDecimalNumberConditionRequest?: {
			itemSpecificationId: string;
			minValue?: number;
			maxValue?: number;
		}[];
	};
	actions?: {
		actionType: ActionType;
		uxAction?: UxActionType;
	}[];
}

function isAddonUx(ux: AddonUx | null): ux is AddonUx {
	return ux !== null;
}

export type { AddonGift, AddonUx };
export { isAddonGift, isAddonUx };

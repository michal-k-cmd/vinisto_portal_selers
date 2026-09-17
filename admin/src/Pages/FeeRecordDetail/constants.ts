import { VinistoHelperDllEnumsFeeRecordFeeRecordType } from '@/api-types/supplier-api';

export const feeRecordTypeTranslationMap = {
	[VinistoHelperDllEnumsFeeRecordFeeRecordType.GIFT]:
		'admin.feeRecord.type.GIFT',
	[VinistoHelperDllEnumsFeeRecordFeeRecordType.RETURNED]:
		'admin.feeRecord.type.RETURNED',
	[VinistoHelperDllEnumsFeeRecordFeeRecordType.SELL]:
		'admin.feeRecord.type.SELL',
};

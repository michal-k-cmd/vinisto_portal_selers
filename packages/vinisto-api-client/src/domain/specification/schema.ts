import { PRODUCT_ATTRIBUTE_TABS } from '@/product-service/specification/constants';
import { z } from 'zod';

const specificationTypeAvailableValuesSchema = z.union([
	z.literal('NUMBER'),
	z.literal('NUMBER_IMPERIAL'),
	z.literal('DECIMAL_NUMBER'),
	z.literal('DECIMAL_NUMBER_IMPERIAL'),
	z.literal('TEXT'),
]);

const specificationTypeAllowedValuesSchema = z.union([
	z.literal('MULTI_COMBO_BOX'),
	z.literal('COMBO_BOX'),
]);

const specificationTypePriceSchema = z.literal('PRICE');
const specificationTypeSchema = z.union([
	specificationTypeAvailableValuesSchema,
	specificationTypeAllowedValuesSchema,
	specificationTypePriceSchema,
]);

const langValuePairSchema = z.object({
	language: z.string(),
	value: z.string(),
});

const imagesSchema = z.object({
	id: z.string(),
	isMain: z.boolean(),
	domainUrls: z.object({
		thumb_64x80: z.string(),
		thumb_80x80: z.string(),
		thumb_88x138: z.string(),
		thumb_208x240: z.string(),
		thumb_330x260: z.string(),
		thumb_368x490: z.string(),
		thumb_818x290: z.string(),
		original_png: z.string(),
	}),
});

const allowedValueSchema = z.object({
	name: z.array(langValuePairSchema),
	description: z.array(langValuePairSchema),
	metaDescription: z.array(langValuePairSchema),
	score: z.number(),
	images: z.array(imagesSchema),
});

const allowedValuesSchema = z.record(allowedValueSchema);
const productAttributeTabSchema = z.enum(PRODUCT_ATTRIBUTE_TABS)

const specificationSchema = z
	.object({
		id: z.string(),
		orderDetail: z.number(),
		order: z.number(),
		name: z.array(langValuePairSchema),
		isHidden: z.boolean(),
		isDetail: z.boolean(),
		description: z.array(langValuePairSchema),
		metaDescription: z.array(langValuePairSchema),
		unit: z.array(langValuePairSchema),
		productAttributeTabs: z.array(productAttributeTabSchema),
	})
	.and(
		z.union([
			z.object({
				specificationType: specificationTypeAvailableValuesSchema,
				availableValues: z.union([z.array(z.string()), z.array(z.number())]),
				imperialUnit: z.array(z.any()),
			}),
			z.object({
				specificationType: specificationTypeAllowedValuesSchema,
				allowedValues: allowedValuesSchema,
			}),
			z.object({
				specificationType: specificationTypePriceSchema,
				min: z.number(),
				max: z.number(),
			}),
		]),
	);

type SpecificationTypeAvailableValues = z.infer<
	typeof specificationTypeAvailableValuesSchema
>;

type SpecificationTypeAllowedValues = z.infer<
	typeof specificationTypeAllowedValuesSchema
>;

type SpecificationTypePrice = z.infer<typeof specificationTypePriceSchema>;

type SpecificationType =
	| SpecificationTypeAvailableValues
	| SpecificationTypeAllowedValues
	| SpecificationTypePrice;

type Specification = z.infer<typeof specificationSchema>;

export type {
	Specification,
	SpecificationTypeAvailableValues,
	SpecificationTypeAllowedValues,
	SpecificationTypePrice,
	SpecificationType,
};

export {
	specificationSchema,
	specificationTypeSchema,
	specificationTypeAvailableValuesSchema,
	specificationTypeAllowedValuesSchema,
	specificationTypePriceSchema,
};


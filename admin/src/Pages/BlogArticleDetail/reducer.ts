import { BlogArticleDetailAction } from './constants';
import {
	BlogArticleDetailReducerAction,
	BlogArticleDetailState,
} from './interfaces';

export const blogArticleDetailReducer = (
	state: BlogArticleDetailState,
	[action, payload]: BlogArticleDetailReducerAction
): BlogArticleDetailState => {
	switch (action) {
		case BlogArticleDetailAction.setArticleData: {
			return {
				...state,
				article: payload,
			};
		}
		case BlogArticleDetailAction.addSpecification: {
			return {
				...state,
				specifications: [...(state.specifications ?? []), payload],
			};
		}
		case BlogArticleDetailAction.updateSpecification: {
			if (!state.specifications) return state;

			const specificationIndex = state.specifications?.findIndex(
				(specificaton) => specificaton.definition.id === payload.definition.id
			);

			if (specificationIndex === -1) return state;

			const updatedSpecifications = [...state.specifications];
			updatedSpecifications.splice(specificationIndex, 1, payload);

			return {
				...state,
				specifications: updatedSpecifications,
			};
		}
		case BlogArticleDetailAction.removeSpecification: {
			if (!state.specifications) return state;

			return {
				...state,
				specifications: state.specifications.filter(
					(specification) => specification.definition.id !== payload
				),
			};
		}
		case BlogArticleDetailAction.setImage: {
			return {
				...state,
				selectedImageId: payload.id,
				selectedImageUrl: payload.url,
			};
		}
		case BlogArticleDetailAction.addBundle: {
			if (
				state.bundles?.some(
					(bundle) => bundle.bundleId === payload.bundle.bundleId
				)
			)
				return state;

			return {
				...state,
				bundles: [...(state.bundles ?? []), payload.bundle],
				bundleDetails: [...(state.bundleDetails ?? []), payload.bundleDetail],
			};
		}
		case BlogArticleDetailAction.removeBundle: {
			return {
				...state,
				bundles:
					state.bundles?.filter((bundle) => bundle.bundleId !== payload) ?? [],
				bundleDetails: state.bundleDetails
					? state.bundleDetails.filter(
							(bundleDetail) => bundleDetail.id !== payload
					  )
					: null,
			};
		}
		case BlogArticleDetailAction.setInitialBundles: {
			return {
				...state,
				bundles: payload,
			};
		}
		case BlogArticleDetailAction.setInitialBundleDetails: {
			return {
				...state,
				bundleDetails: payload,
			};
		}
		case BlogArticleDetailAction.setInitialSpecifications: {
			return {
				...state,
				specifications: payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

import { ReactNode } from 'react';

type SpecificationExplanationProps = {
	/**
	 * The position of the component.
	 * - 'left': The component has image on left side
	 * - 'right': The component has image on right side
	 * - 'full': The component has image on full width on top
	 * - Jira issue: https://vinisto.atlassian.net/browse/VWA-1439
	 */
	imageUrl: string;
	heading: string;
	text: string | ReactNode;
	anchorLink?: string;
	anchorText?: string;
};

export type { SpecificationExplanationProps };

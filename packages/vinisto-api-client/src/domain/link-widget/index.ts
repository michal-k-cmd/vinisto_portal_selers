export interface LinkWidget {
	id: string;
	name: string;
	pathId: string;
	url: string;
	type: number; // i think this can be a string sometimes...
	order: number;
	imageLocator: string;
	flags?: string[];
	availableOnPlatforms: number[];
}

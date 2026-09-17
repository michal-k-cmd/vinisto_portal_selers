export interface ImageError {
	message: string;
	variables?: Record<string, string>;
}

export interface Dimensions {
	width: {
		max?: number;
		min?: number;
	};
	height: {
		max?: number;
		min?: number;
	};
}

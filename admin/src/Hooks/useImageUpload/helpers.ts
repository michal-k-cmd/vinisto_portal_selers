import useFormatMessage from 'Hooks/useFormatMessage';

import { Dimensions, ImageError } from './interfaces';

const isIssueWithDimensions = (
	file: File,
	dimensions: Dimensions
): Promise<boolean> => {
	return new Promise((resolve) => {
		const { width: allowedWidth, height: allowedHeight } = dimensions;
		const { max: maxWidth = Infinity, min: minWidth = 0 } = allowedWidth;
		const { max: maxHeight = Infinity, min: minHeight = 0 } = allowedHeight;

		const img = new Image();
		img.src = URL.createObjectURL(file);

		img.onload = () => {
			const { width, height } = img;

			if (
				width < minWidth ||
				height < minHeight ||
				width > maxWidth ||
				height > maxHeight
			) {
				resolve(true);
			}
			resolve(false);
		};
	});
};

const formatErrorMessage = (
	dimensions: Dimensions,
	t: ReturnType<typeof useFormatMessage>
): ImageError => {
	const isMinWidth = !!dimensions.width.min;
	const isMaxWidth = Number.isFinite(dimensions.width.max);
	const isMinHeight = !!dimensions.height.min;
	const isMaxHeight = Number.isFinite(dimensions.height.max);

	const andTranslation = t({ id: 'and' });
	const atLeastTranslation = t({ id: 'atLeast' });
	const atMostTranslation = t({ id: 'atMost' });

	const widthString = `${
		isMinWidth ? `${atLeastTranslation} ${dimensions.width.min}px` : ''
	}${
		isMaxWidth
			? `${isMinWidth ? `${andTranslation} ` : ''}${atMostTranslation} ${
					dimensions.width.max
			  }px`
			: ''
	}`;

	const heightString = `${
		isMinHeight ? `${atLeastTranslation} ${dimensions.height.min}px` : ''
	}${
		isMaxHeight
			? `${isMinWidth ? `${andTranslation} ` : ''}${atMostTranslation} ${
					dimensions.height.max
			  }px`
			: ''
	}`;

	return {
		message: 'admin.modal.uploadImage.dimensions.error',
		variables: { width: widthString, height: heightString },
	};
};

export { isIssueWithDimensions, formatErrorMessage };

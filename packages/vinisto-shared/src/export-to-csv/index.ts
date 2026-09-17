import { download, generateCsv, mkConfig } from 'export-to-csv';
import { createRoot } from 'react-dom/client';
import * as ReactDOMServer from 'react-dom/server';
import { isValidElement } from 'react';

const csvConfig = mkConfig({
	filename: 'exported-data',
	fieldSeparator: ',',
	decimalSeparator: '.',
	fileExtension: 'csv',
	useKeysAsHeaders: true,
});

type ExportColumn = string | number | null;

type ExportData = Record<string, ExportColumn>;

type CsvExportError = {
	message: string;
	rowIndex?: number; // Optional: Row index for errors related to specific data
	field?: string; // Optional: Field name for specific field errors
	value?: unknown; // Optional: Value that caused the error
	severity: 'warning' | 'critical'; // Severity of the error
	error?: any; // Optional: Error object for critical errors
};

type ExportResult = {
	errors: CsvExportError[];
	success: boolean;
};

/**
 * Renders a JSX element to a container and returns its rendered HTML.
 * @param jsx The JSX element to render.
 * @returns The rendered HTML as a string.
 */
const renderJsxToHtml = (jsx: JSX.Element): string => {
	if (!isValidElement(jsx)) return '';

	const container = document.createElement('div');
	const root = createRoot(container);

	// const renderedHtml = ReactDOMServer.renderToString(jsx);
	const renderedHtml = ReactDOMServer.renderToStaticMarkup(jsx);

	root.unmount();
	container.remove();

	return renderedHtml;
};

/**
 * Recursively extracts meaningful text content from rendered HTML.
 * Handles nested elements and removes unnecessary whitespace or empty lines.
 * @param html The rendered HTML string.
 * @returns An array of meaningful text extracted from the HTML.
 */
const convertHtmlToStringArray = (html: string): string[] => {
	const div = document.createElement('div');
	div.innerHTML = html;

	const extractTextRecursively = (node: HTMLElement): string[] => {
		const texts: string[] = [];
		node.childNodes.forEach((child) => {
			if (child.nodeType === Node.TEXT_NODE) {
				const text = child.textContent?.trim();
				if (text) texts.push(text);
			} else if (child.nodeType === Node.ELEMENT_NODE) {
				// @ts-expect-error: child is ChildNode, but I don't know how to import it to annote the type of node parameter
				texts.push(...extractTextRecursively(child));
			}
		});
		return texts;
	};

	return extractTextRecursively(div).filter((text) => text.length > 0);
};

/**
 * Converts a JSX element to an array of meaningful text content.
 * Handles rendering and processing of nested elements.
 * @param jsx The JSX element to process.
 * @returns An array of meaningful text extracted from the rendered component.
 */
const convertJsxToText = (jsx: JSX.Element): string[] => {
	const renderedHtml = renderJsxToHtml(jsx);

	return convertHtmlToStringArray(renderedHtml);
};

/**
 * Validates and converts data for CSV export.
 * Handles JSX.Element by rendering it and extracting plain text.
 */
const validateDataForCsv = (
	data: unknown,
	errors: CsvExportError[],
	rowIndex: number,
	field: string,
	arraySeparator: string = ', '
): ExportColumn => {
	if (typeof data === 'string' || typeof data === 'number') {
		return data;
	} else if (typeof data === 'boolean') {
		return data.toString();
	} else if (Array.isArray(data)) {
		if (data.every((item) => typeof item === 'string' || typeof item === 'number')) {
			// If the array contains only strings/numbers, join them
			return data.join(arraySeparator);
		} else if (data.every((item) => isValidElement(item))) {
			// If array contains only JSX elements, process each one
			try {
				const extractedTextArray = data.map((jsx) => convertJsxToText(jsx).join(arraySeparator));
				return extractedTextArray.join(arraySeparator);
			} catch (error) {
				errors.push({
					message: 'Failed to process array of JSX components',
					rowIndex,
					field,
					value: data,
					severity: 'warning',
					error,
				});
				return 'Invalid JSX Array';
			}
		} else {
			errors.push({
				message: 'Unsupported array element type',
				rowIndex,
				field,
				value: data,
				severity: 'warning',
			});
			console.warn('Unsupported array element type:', errors.slice(-1)[0]);
			return 'Invalid Array';
		}
	} else if (isValidElement(data)) {
		try {
			const extractedText = convertJsxToText(data);
			return extractedText.join(arraySeparator);
		} catch (error) {
			errors.push({
				message: 'Failed to process JSX component',
				rowIndex,
				field,
				value: data,
				severity: 'warning',
				error,
			});
			return 'Invalid JSX';
		}
	} else if (data === null || data === undefined) {
		return null;
	} else {
		errors.push({
			message: 'Unsupported data type detected',
			rowIndex,
			field,
			value: data,
			severity: 'warning',
		});
		return 'Invalid Type';
	}
};


/**
 * Transforms an array of objects into validated ExportData rows.
 * Collects validation errors in the process.
 */
const transformDataForExport = (
	data: Record<string, unknown>[],
	errors: CsvExportError[],
	options?: { arraySeparator?: string }
): ExportData[] => {
	return data.map((row, rowIndex) => {
		const transformedRow: ExportData = {};
		for (const [key, value] of Object.entries(row)) {
			transformedRow[key] = validateDataForCsv(
				value,
				errors,
				rowIndex,
				key,
				options?.arraySeparator
			);
		}
		return transformedRow;
	});
};

/**
 * Exports the data to CSV.
 * Returns a success flag and a list of errors.
 * Asynchronously downloads the CSV file.
 */
const exportToExcelCsv = (data: Record<string, unknown>[]): ExportResult => {
	const errors: CsvExportError[] = [];

	const transformedData = transformDataForExport(data, errors);

	try {
		const csv = generateCsv(csvConfig)(transformedData);

		download(csvConfig)(csv);

		return { success: true, errors };
	} catch (error) {
		errors.push({
			message:
				error instanceof Error
					? error.message
					: 'Unknown error during CSV generation or download',
			severity: 'critical',
		});
		return { success: false, errors };
	}
};

export default exportToExcelCsv;
export type { ExportResult, CsvExportError, ExportData, ExportColumn };

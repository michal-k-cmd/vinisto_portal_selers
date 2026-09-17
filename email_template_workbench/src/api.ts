export type TemplateListResponse = {
	files: string[];
};

export type RenderResponse = {
	html: string;
};

export async function fetchTemplates(): Promise<string[]> {
	const res = await fetch('/api/templates');
	if (!res.ok) {
		throw new Error('Failed to fetch templates');
	}
	const data = (await res.json()) as TemplateListResponse;
	return data.files;
}

export async function fetchRenderedTemplate(file: string): Promise<string> {
	const params = new URLSearchParams({ file });
	const res = await fetch(`/api/templates/render?${params.toString()}`);
	if (!res.ok) {
		throw new Error('Failed to render template');
	}
	const data = (await res.json()) as RenderResponse;
	return data.html;
}

const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const chokidar = require('chokidar');

const app = express();
const PORT = 3004;

const templatesDir = path.resolve(
	__dirname,
	'../../../dll/vinisto-email-dll/vinisto-email-dll/Templates'
);

const tagsConfigPath = path.resolve(__dirname, '../email-tags.config.json');

const sseClients = new Set();

app.use(express.json());

async function loadTagsConfig() {
	const raw = await fs.readFile(tagsConfigPath, 'utf-8');
	return JSON.parse(raw);
}

async function listTemplateFiles() {
	const entries = await fs.readdir(templatesDir, { withFileTypes: true });
	return entries
		.filter((e) => e.isFile() && e.name.endsWith('.template'))
		.map((e) => e.name);
}

async function readTemplateFile(fileName) {
	const fullPath = path.join(templatesDir, fileName);
	return fs.readFile(fullPath, 'utf-8');
}

async function replaceTags(html, tagsConfig, depth = 0) {
	const MAX_DEPTH = 10;
	if (depth > MAX_DEPTH) {
		return html;
	}

	const tagRegex = /\{([A-Z0-9_]+)\}/g;

	async function replaceOne(match, tagName) {
		const value = tagsConfig[tagName];

		if (!value) {
			return `<span style="color: red; font-weight: bold;">{${tagName}}</span>`;
		}

		if (typeof value === 'string' && value.endsWith('.template')) {
			const fileContent = await readTemplateFile(value);
			return replaceTags(fileContent, tagsConfig, depth + 1);
		}

		return value;
	}

	const parts = [];
	let lastIndex = 0;
	let match;

	while ((match = tagRegex.exec(html)) !== null) {
		const [fullMatch, tagName] = match;
		parts.push(html.slice(lastIndex, match.index));
		parts.push(await replaceOne(fullMatch, tagName));
		lastIndex = match.index + fullMatch.length;
	}

	parts.push(html.slice(lastIndex));

	return parts.join('');
}

app.get('/api/templates/render', async (req, res) => {
	try {
		const file = req.query.file;
		if (!file) {
			return res.status(400).json({ error: 'Missing ?file=...' });
		}

		const tagsConfig = await loadTagsConfig();

		const baseHtml = await readTemplateFile(file);

		const result = await replaceTags(baseHtml, tagsConfig);

		res.json({ html: result });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to render template.' });
	}
});

app.get('/api/templates', async (req, res) => {
	try {
		const files = await listTemplateFiles();
		res.json({ files });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to list templates.' });
	}
});

app.get('/api/events', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');
	res.flushHeaders();

	sseClients.add(res);

	req.on('close', () => {
		sseClients.delete(res);
	});
});

function broadcastChange() {
	for (const client of sseClients) {
		client.write(`event: change\ndata: {}\n\n`);
	}
}

const watcher = chokidar.watch([templatesDir, tagsConfigPath], {
	ignoreInitial: true,
	persistent: true,
});

watcher.on('change', (filePath) => {
	console.log('File changed:', filePath);
	broadcastChange();
});

app.listen(PORT, () => {
	console.log(`Template server listening on http://localhost:${PORT}`);
});

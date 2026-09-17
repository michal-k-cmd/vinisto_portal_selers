import { useEffect, useState, useCallback } from 'react';
import AdminBar from './components/Adminbar';
import { fetchRenderedTemplate, fetchTemplates } from './api';
import styles from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import './main.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [templates, setTemplates] = useState<string[]>([]);
	const [selected, setSelected] = useState<string | null>(null);
	const [html, setHtml] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadTemplates = useCallback(async () => {
		try {
			setError(null);
			const files = await fetchTemplates();
			setTemplates(files);
			if (files.length > 0 && !selected) {
				setSelected(files[0]);
			}
		} catch (e) {
			console.error(e);
			setError('Nepodařilo se načíst seznam šablon.');
		}
	}, [selected]);

	const loadRendered = useCallback(async (file: string | null) => {
		if (!file) return;
		try {
			setLoading(true);
			setError(null);
			const rendered = await fetchRenderedTemplate(file);
			setHtml(rendered);
		} catch (e) {
			console.error(e);
			setError('Nepodařilo se vygenerovat HTML.');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadTemplates();
	}, [loadTemplates]);

	useEffect(() => {
		if (selected) {
			void loadRendered(selected);
		}
	}, [selected, loadRendered]);

	useEffect(() => {
		const eventSource = new EventSource('/api/events');

		eventSource.addEventListener('change', () => {
			if (selected) {
				void loadRendered(selected);
			}
		});

		eventSource.onerror = (err) => {
			console.error('SSE error', err);
		};

		return () => {
			eventSource.close();
		};
	}, [selected, loadRendered]);

	const handleCopyHtml = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(html);
			toast.success('HTML šablony bylo zkopírováno do schránky.');
		} catch (e) {
			console.error('Clipboard error', e);
			toast.error('Nepodařilo se zkopírovat HTML do schránky.');
		}
	}, [html]);

	return (
		<div className={styles.appRoot}>
			<AdminBar
				templates={templates}
				selected={selected}
				onChange={(file) => setSelected(file)}
				onCopyHtml={handleCopyHtml}
			/>

			{error && <div className={styles.error}>{error}</div>}

			{loading && <div className={styles.loading}>Načítám šablonu…</div>}

			<div className={styles.content}>
				<iframe
					title="Email preview"
					className={styles.previewFrame}
					srcDoc={html}
				/>
			</div>

			<ToastContainer
				position="top-right"
				autoClose={2500}
			/>
		</div>
	);
}

export default App;

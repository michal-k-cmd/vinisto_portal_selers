import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import VinistoAdvisorApp from './App';

import 'react-loading-skeleton/dist/skeleton.css';

document.body.style.margin = '0px';

const rootElement = document.getElementById('root');

if (rootElement) rootElement.style.height = '100vh';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<VinistoAdvisorApp />
	</StrictMode>
);

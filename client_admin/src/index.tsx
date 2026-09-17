import ReactDOM from 'react-dom/client';

import VinistoClientAdminApp from './App';

import 'react-confirm-alert/src/react-confirm-alert.css';

import './assets/styles/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/typehead.css';
import './assets/styles/template.css';
import './index.css';
import './assets/styles/variables.css';

const root = document.getElementById('vinisto_admin_root');

if (!root) throw new Error('Root element not found');

const VinistoAppRoot = ReactDOM.createRoot(root);

VinistoAppRoot.render(<VinistoClientAdminApp />);

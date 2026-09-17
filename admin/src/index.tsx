import ReactDOM from 'react-dom/client';

import VinistoAdminApp from './App';

import 'react-confirm-alert/src/react-confirm-alert.css';

import './assets/styles/bootstrap.css';
import './assets/styles/notifications.css';
import './assets/styles/typehead.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './assets/styles/fonts.css';
import './index.css';

import './assets/styles/variables.css';

const root = document.getElementById('vinisto_admin_root');

if (!root) throw new Error('Root element not found.');

const VinistoAppRoot = ReactDOM.createRoot(root);

VinistoAppRoot.render(<VinistoAdminApp />);

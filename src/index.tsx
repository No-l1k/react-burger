import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';
import store from './services/store';
import { HashRouter as Router } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</StrictMode>
);

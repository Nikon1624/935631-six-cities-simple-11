import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { store } from './store/index';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { HistoryRouter } from './components/history-router/history-router';
import { browserHistory } from './utils/browser-history';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);

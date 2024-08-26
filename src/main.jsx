import React from 'react'
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
import App from './App.jsx'
import './styles/index.css'
const queryClient = new QueryClient();
import AuthProvider from './services/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderProvider } from './services/LoaderContext.jsx';
import GlobalLoader from './components/shared/GlobalLoader.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <LoaderProvider>
    <GlobalLoader />
      <App />
    </LoaderProvider>
    </AuthProvider>
    </QueryClientProvider>
  </Provider>,
);

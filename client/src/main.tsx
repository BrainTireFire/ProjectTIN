import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { store, StoreContext } from './app/stores/store';
import { router } from './app/router/Routes';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from './libs/react-query';

import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider>
      <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
)


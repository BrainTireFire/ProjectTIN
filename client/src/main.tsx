import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { router } from './app/router/Routes';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from './libs/react-query';

import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider } from './hooks/auth';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)


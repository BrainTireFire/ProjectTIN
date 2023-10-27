import * as React from "react";
import { createRoot } from "react-dom/client";

import { router } from "./app/router/Routes";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "./libs/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "./features/lang/i18n";

import "./app/layout/styles.css";
import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "./hooks/auth";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>
);

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Suspense } from "react";

import "./styles/global.css";
import { App } from "./app";
import { store } from "./store/store";
import "./18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>
);

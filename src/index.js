import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 20 second
      // staleTime: 1000 * 20,
      // cacheTime: 1000 * 40,
      // staleTime: Infinity,
      // cacheTime: Infinity,
      // 너무많은 요청을 막기위해 cahce
      // 리액트가 백그라운드에서 요청을 안해도
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

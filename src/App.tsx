import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Routes from "./routes";
import React from "react";
import { ToastContainer } from "react-toastify";
import queryClient from "./query-client";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;

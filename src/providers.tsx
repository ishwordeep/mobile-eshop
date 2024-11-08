import { Button, ChakraProvider, HStack, Text } from "@chakra-ui/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authTokenKey } from "./services/service-auth";
import TokenService from "./services/service-token";
import { theme } from "./theme";
const ErrorFallback = () => {
  return (
    <HStack justify={"center"}>
      <Text>Something went wrong:</Text>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </HStack>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      const isAuthenticated = TokenService.isAuthenticated();
      const err = error as AxiosError;
      if (
        (err.request?.status === 401 || err.request?.status === 500) &&
        !isAuthenticated
      ) {
        queryClient.setQueryData([authTokenKey], () => false);
        setTimeout(() => {
          TokenService.clearToken();
          queryClient.clear();
          toast.error("Session Expired! Please login again!");
        }, 500);
      }
    },
  }),
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="bottom-right"
              newestOnTop
              autoClose={3000}
              pauseOnFocusLoss={false}
              transition={Slide}
            />
            <HelmetProvider>{children}</HelmetProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Providers;

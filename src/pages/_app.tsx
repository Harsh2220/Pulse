import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/providers/theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import client from "@/lib/graphqlClient";

export default function App({ Component, pageProps }: AppProps) {
  return (

    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

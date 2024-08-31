import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/providers/theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

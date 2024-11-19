import "@/styles/global.css";
import type { AppProps } from "next/app";
import ChatbotIcon from "@/components/ChatbotIcon";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ChatbotIcon />
    </>
  );
}

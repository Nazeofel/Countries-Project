import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/UI/Navbar";
import { useAtomValue } from "jotai";
import { darkModeAtom } from "../utils/states";
import { use, useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const darkMode = useAtomValue(darkModeAtom);
  useEffect(() => {
    document.body.setAttribute("data-theme", `${darkMode ? "light" : "dark"}`);
  }, [darkMode]);
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Component {...pageProps} />
      </main>
    </>
  );
}

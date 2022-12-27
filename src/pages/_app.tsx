import { type AppType } from "next/dist/shared/lib/utils";
import { Expletus_Sans } from "@next/font/google";
import "../styles/globals.css";

const expletusSans = Expletus_Sans({
  subsets: ["latin"],
  variable: "--font-expletus",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${expletusSans.variable} font-sans h-full`}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;

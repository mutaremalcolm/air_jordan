import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
};

export default App;

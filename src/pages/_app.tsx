import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { interFontClass } from "@/lib/fonts";


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <main className={`${interFontClass}`} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
};

export default App;

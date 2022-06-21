import { Web3ContextProvider } from "../src/utils/Web3Context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
    </Web3ContextProvider>
  );
}

export default MyApp;

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Fire Games &copy;</title>
			</Head>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</>
	);
}
export default MyApp;

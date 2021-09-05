import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { Slide, ToastContainer } from "react-toastify";
import { createWrapper } from "next-redux-wrapper";
import { FC } from "react";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Fire Games &copy;</title>
			</Head>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Component {...pageProps} />
					<ToastContainer
						transition={Slide}
						autoClose={3000}
						newestOnTop
						closeOnClick
					/>
				</PersistGate>
			</Provider>
		</>
	);
};
const makeStore = () => store;

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper.withRedux(WrappedApp);

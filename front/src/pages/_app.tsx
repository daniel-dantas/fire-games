import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { Slide, ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Fire Games &copy;</title>
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";
							analytics.load("ehUmAKbD8Ps5LNpRHk3OnaVEseNs7fEY");
							analytics.page();
							}}();`
					}}
				/>
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`
					}}
				/>
				<script
					async
					src="https://r.wdfl.co/rw.js"
					data-rewardful="f75ffb"
				></script>
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
}
export default MyApp;

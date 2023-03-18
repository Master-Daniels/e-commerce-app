import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import { StateContext } from "../context/stateContext";

export default function App({ Component, pageProps }) {
    return (
        <>
            <StateContext>
                <Toaster />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StateContext>
        </>
    );
}

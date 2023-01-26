import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import PageWrapper from '../components/pageWrapper';
import Head from 'next/head';
import React from "react";
import {TripGroupProvider} from '../context/tripGroup';
import {SWRConfig} from "swr";
import {customFetcherSWR} from "../lib/fetcher";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>TripApp</title>
                <meta name="description" content="TripApp - Take a trip!"/>
                {/*<link rel="icon" href="/palm.png "/>*/}
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <TripGroupProvider>
                    <PageWrapper>
                        <SWRConfig value={{
                            refreshInterval: 1000,
                            fetcher: customFetcherSWR,
                        }}>
                            <Component {...pageProps} />
                        </SWRConfig>
                    </PageWrapper>
                </TripGroupProvider>
            </SessionProvider>
        </>
    );
}
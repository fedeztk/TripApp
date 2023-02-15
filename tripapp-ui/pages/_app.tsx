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
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Next.js PWA Example</title>

                <link rel="manifest" href="/manifest.json" />
                <link
                    href="/icons/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icons/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#317EFB" />
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
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import PageWrapper from '../components/pageWrapper';
import {montserrat} from '../lib/theme';
import Head from 'next/head';
import React from "react";
import {TripGroupProvider} from '../context/tripGroup';

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>TripApp</title>
                <meta name="description" content="TripApp - Take a trip!"/>
                <link rel="icon" href="/palm.png "/>
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <TripGroupProvider>
                    <PageWrapper>
                        <main className={montserrat.className}>
                            <Component {...pageProps} />
                        </main>
                    </PageWrapper>
                </TripGroupProvider>
            </SessionProvider>
        </>

    );
}
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import PageWrapper from '../components/pageWrapper';
import Head from "next/head";
import React, { FC } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import {NextPageContext} from "next";
import SessionChecker from "../components/auth/SessionChecker";

export default function App({Component, pageProps}: AppProps) {


    return (
        <>
            <Head>
                <title>TripApp</title>
                <meta name="description" content="TripApp - Take a trip!"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <SessionChecker>
                    <Component {...pageProps} culo={"culo"}/>
                </SessionChecker>
            </SessionProvider>
        </>
    );
}





import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import PageWrapper from '../components/pageWrapper';
import Head from "next/head";
import React, {createContext, FC, useContext, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import {NextPageContext} from "next";
import MySession from "../components/auth/MySession";



export default function App({Component, pageProps}: AppProps) {

    return (
        <>
            <Head>
                <title>TripApp</title>
                <meta name="description" content="TripApp - Take a trip!"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <MySession>
                    <Component {...pageProps} culo={"culo"}/>
                </MySession>
            </SessionProvider>
        </>
    );
}






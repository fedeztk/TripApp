"use client";
import React from "react";
import LoadingPage from "./loadingPage";
import Navbar from "./navbar";
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme
} from '@mui/material/styles';
import Container from "@mui/material/Container";
import '../styles/globals.css'
import {Montserrat} from '@next/font/google';
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {unstable_getServerSession} from "next-auth";

const montserrat = Montserrat({subsets: ['latin']})
export default function App({children}: { children: React.ReactNode }) {
    return (
        <>
            {/** @ts-expect-error */}
            <PageWrapper>
                <main className={montserrat.className}>
                    {children}
                </main>
            </PageWrapper>
        </>
    );
}

// safety wrapper
async function PageWrapper({children}: { children: React.ReactNode }) {
    // const {status} = useSession({
    //     required: true,
    // });

    // const {status} = unstable_getServerSession({
    //     required: true,
    // });

    const session = await unstable_getServerSession(authOptions)

    if (session.status === 'loading') { // loading or unauthenticated
        return <LoadingPage/>;
    }
    return <Layout>{children}</Layout>;
};

// actual style layout
async function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <CssVarsProvider theme={tripAppTheme}>
                <Navbar/>
                <Container maxWidth="md">
                    {children}
                </Container>
            </CssVarsProvider>
        </>
    );
}

const tripAppTheme = extendTheme({
    colorSchemes: {
        light: { // palette for light mode
            palette: {
                primary: {
                    main: "#f85f6a"
                }
            }
        },
        dark: { // palette for dark mode
            palette: {
                primary: {
                    main: "#f85f6a"
                }
            }
        }
    }
})

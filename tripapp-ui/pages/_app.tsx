import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import PageWrapper from '../components/pageWrapper';
import {montserrat} from '../lib/theme';

export default function App({Component, pageProps}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <PageWrapper>
                <main className={montserrat.className}>
                    <Component {...pageProps} />
                </main>
            </PageWrapper>
        </SessionProvider>
    );
}
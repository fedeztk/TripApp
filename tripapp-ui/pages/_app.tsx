import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import PageWrapper from '../components/pageWrapper';

export default function App({Component, pageProps}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <PageWrapper>
                <Component {...pageProps} />
            </PageWrapper>
        </SessionProvider>
    );
}

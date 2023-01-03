import {useSession} from "next-auth/react";
import React from "react";
import Layout from "./layout";
import LoadingPage from "./loadingPage";

export default function PageWrapper({children}: { children: React.ReactNode }) {
    const {status} = useSession({
        required: true,
    });

    if (status === 'loading') { // loading or unauthenticated
        return <LoadingPage/>;
    }
    return <Layout>{children}</Layout>;
};
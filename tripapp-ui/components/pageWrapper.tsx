import {useSession} from "next-auth/react";
import React from "react";
import Layout from "./layout";
import LoadingPage from "./loadingPage";

export default function PageWrapper({children}: { children: React.ReactNode }) {
    // const router = useRouter()
    const {status} = useSession({
        required: true,
    });

    if (status === 'loading') { // loading or unauthenticated
        return <LoadingPage/>;
    }
    return <Layout>{children}</Layout>;


    // const {data: session} = useSession()
    // const routes = Object.values(unprotectedRoutes)
    // useEffect(() => {
    //     const isBrowser = () => typeof window !== "undefined"
    //     const isProtected = routes.indexOf(router.pathname) === -1
    //     const isSession = session && session?.user
    //
    //     // redirect if there is no session unless the path is unprotected
    //     if (isProtected && isBrowser() && !isSession) {
    //         router.push(unprotectedRoutes.LOGIN)
    //     }
    // });

    // return <Layout>{children}</Layout>;
};
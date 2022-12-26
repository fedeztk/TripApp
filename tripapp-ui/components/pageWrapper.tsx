import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {unprotectedRoutes} from "../lib/constants";

export default function PageWrapper({children}: { children: React.ReactNode }) {
    const router = useRouter()
    const {data: session} = useSession()
    const routes = Object.values(unprotectedRoutes)
    useEffect(() => {
        const isBrowser = () => typeof window !== "undefined"
        const isProtected = routes.indexOf(router.pathname) === -1
        const isSession = session && session?.user

        // redirect if there is no session unless the path is unprotected
        if (isProtected && isBrowser() && !isSession) {
            router.push(unprotectedRoutes.LOGIN)
        }
    });

    return <>{children}</>;
};
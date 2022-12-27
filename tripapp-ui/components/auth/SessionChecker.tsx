import React from "react";
import {signIn, useSession} from "next-auth/react";
import SingInMain from "./SingIn";

export default function SessionChecker({children}:{children: React.ReactNode}){
    const {data : session} = useSession();
    return session? <>{children}</> : <SingInMain/>
}
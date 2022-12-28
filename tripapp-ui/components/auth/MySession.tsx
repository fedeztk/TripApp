import React, {createContext, useContext, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import SingInMain from "./SingIn";

const UserContext:any = createContext<any>();

export default function MySession({children}:{children: React.ReactNode}){

    const {data : session} = useSession();

    const [actTravel, setActTravel] = useState<string>("culo");
    let state = {
        actTravel: actTravel,
        setActTravel:setActTravel
    }



    return session? <>
        <UserContext.Provider value={state}>

            {children}
        </UserContext.Provider>
        </> :
        <SingInMain/>
}

export function useAppContext() {
    return useContext(UserContext);
}
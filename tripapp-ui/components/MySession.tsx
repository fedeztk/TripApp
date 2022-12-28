import React, {createContext, useContext, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import SingInMain from "./SingIn";

const UserContext:any = createContext<any>();

export default function MySession({children}:{children: React.ReactNode}){

    //check sessione, se si child, se no sigin
    const {data : session} = useSession();


    let initValue = "initValue (MySession:13)";
    //variabilicontext
    const [actTravel, setActTravel] = useState<string>(initValue);

    function setInit(){
        setActTravel(initValue)
    }

    //actual context
    let state = {
        actTravel: actTravel,
        setActTravel:setActTravel,
        setInit: setInit
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
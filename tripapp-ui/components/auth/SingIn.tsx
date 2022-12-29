import React from "react";
import {signIn, useSession} from "next-auth/react";


export default function SingInMain(){

    return(<>
        <div>
            <div>Non sei loggato</div>
            <button onClick={()=>signIn()}>Sign in</button>
        </div>
    </>)
}
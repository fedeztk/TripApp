import {useRouter} from "next/navigation";
import {AppProps} from "next/app";
import React, { useState, useEffect,createContext, useContext } from 'react';
import {useAppContext} from "./auth/MySession";


type Travel = {
    id: string;
    name: string;
    info: string;
}

export default function TravelList(){
    const router = useRouter();
    const [travelList, setTravellist] = useState<Travel[]>();

    const mycontext:any = useAppContext();


    useEffect(()=>{
        let tl: Travel[];
        tl = [
            {id: "0", name: "Roma", info: "3gg Rome"},
            {id: "1", name: "Parigi", info: "Con l'amata"},
            {id: "2", name: "Barcellona", info: "Ballo"}
        ];

        setTravellist(tl)
    },[])

    function changeContext(){
        mycontext.setActTravel("ciao xiao")

    }

    return <>
        {mycontext.actTravel}
        <button onClick={changeContext}>ciao</button>

        {/* eslint-disable-next-line react/jsx-key */}
        {travelList?.map((t:Travel)=> <TravelButton travel={t}/>)}
    </>;


    function TravelButton({travel}:{travel:Travel}){

        function changeContext(){

            mycontext.setActTravel("fanculo")
        }

        return <div>
            <button onClick={changeContext}>{travel.name}</button>
        </div>
    }

}





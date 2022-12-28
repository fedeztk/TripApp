import {useRouter} from "next/navigation";
import {AppProps} from "next/app";
import React, { useState, useEffect,createContext, useContext } from 'react';
import {useAppContext} from "./auth/MySession";
import Menu from "./Menu";


export type Travel = {
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

    function setActTravel(t?:Travel){
        if(t!=null){
            mycontext.setActTravel(t)
        }else{
            mycontext.setActTravel(null)
        }
    }


    function back(){
        setActTravel();
    }

    console.log("ActTravel:")
    console.log(mycontext.actTravel)

    return <>

        { mycontext.actTravel?
            <Menu backFunc={back} travel={mycontext.actTravel}/>
            :
            /* eslint-disable-next-line react/jsx-key */
            travelList?.map((t:Travel, key:number)=> <div key={key}><TravelButton travel={t}/></div>)
        }
        </>;


    function TravelButton({travel}:{travel:Travel}){
        function changeContext(){
            setActTravel(travel);
        }

        return <div>
            <button onClick={changeContext}>{travel.name}</button>
        </div>
    }

}





import {useRouter} from "next/navigation";
import {AppProps} from "next/app";
import {Travel} from "./TravelList";

export default function Menu({backFunc, travel}:{backFunc:any, travel?:Travel}){
    const router = useRouter();


    console.log(travel)
    return <>
        <button onClick={backFunc}>Back</button>
        <div>
            <div>
                {travel?.name}
            </div>
            <div>
                {travel?.info}
            </div>
        </div>
        <div>
            <button type="button" onClick={() => router.push('/survey')}>
                Survey
            </button>
            <button type="button" onClick={() => router.push('/wallet')}>
                Wallet
            </button>
            <button type="button" onClick={() => router.push('/map')}>
                Map
            </button>
            <button type="button" onClick={() => router.push('/info')}>
                Info
            </button>

        </div>
    </>
}
import {useRouter} from "next/navigation";
import {useAppContext} from "../components/auth/MySession";

export default function Map(){
    const router = useRouter();
    const mycontext = useAppContext();


    return <>
        <div>Ciao sei nella mappa!</div>
        <div>
            <button onClick={router.back}>Back!</button>

        </div>
    </>
}
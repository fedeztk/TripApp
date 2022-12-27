import {useRouter} from "next/navigation";

export default function Map(){
    const router = useRouter();


    return <>
        <div>Ciao sei nella mappa!</div>
        <div>
            <button onClick={router.back}>Back!</button>

        </div>
    </>
}
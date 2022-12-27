import {useRouter} from "next/navigation";

export default function Survey(){
    const router = useRouter();


    return <>
        <div>Ciao sei nel sondaggio!</div>
        <div>
            <button onClick={router.back}>Back!</button>

        </div>
    </>
}
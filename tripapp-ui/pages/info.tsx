import {useRouter} from "next/navigation";

export default function Info(){
    const router = useRouter();


    return <>
        <div>Ciao sei nelle info!</div>
        <div>
            <button onClick={router.back}>Back!</button>

        </div>
    </>
}
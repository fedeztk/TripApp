import {useRouter} from "next/navigation";

export default function Info({culo}:{culo?:String}){
    const router = useRouter();
    console.log("Index: "+culo)

    return <>
        <div>Ciao sei nelle info!</div>
        <div>
            <button onClick={router.back}>Back!</button>

        </div>
    </>
}
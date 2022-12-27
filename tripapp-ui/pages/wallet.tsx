import {useRouter} from "next/navigation";

export default function Wallet(){
    const router = useRouter();
    return <>
        <div>Ciao sei nel portafoglio!</div>
        <div>
            <button onClick={router.back}>Back!</button>
        </div>
    </>
}
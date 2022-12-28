import {useRouter} from "next/navigation";
import {AppProps} from "next/app";

export default function Menu(){
    const router = useRouter();

    return <>
        <div>Ciao sei nel menu!</div>
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
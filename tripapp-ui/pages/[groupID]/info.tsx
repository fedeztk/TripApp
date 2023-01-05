import {useRouter} from "next/router";

export default function Info() {
    // display the groupID in the URL
    const router = useRouter();
    const {groupID} = router.query;
    return (
        <h1>Info: {groupID}</h1>
    );
}
import {useRouter} from "next/router";

export default function Finance() {
    // display the groupID in the URL
    const router = useRouter();
    const {groupID} = router.query;
    return (
        <h1>Finance: {groupID}</h1>
    );
}
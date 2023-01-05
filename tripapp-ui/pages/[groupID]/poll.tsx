import {useRouter} from "next/router";

export default function Poll() {
    const router = useRouter();
    const {groupID} = router.query;
    return (
        <h1>Poll: {groupID}</h1>
    );
}
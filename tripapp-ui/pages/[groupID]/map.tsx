import {useRouter} from 'next/router';

export default function Map() {
    // display the groupID in the URL
    const router = useRouter();
    const {groupID} = router.query;
    return (
        <>
            <h1>Map: {groupID}</h1>
        </>
    );
}
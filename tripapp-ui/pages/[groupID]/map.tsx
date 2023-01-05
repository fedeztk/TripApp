import IconButton from '@mui/material/IconButton';
import {useRouter} from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function Map() {
    // display the groupID in the URL
    const router = useRouter();
    const {groupID} = router.query;
    return (
        <>
            <Link href="/">
                <IconButton>
                    <ArrowBackIcon/>
                </IconButton>
            </Link>

            <h1>Map: {groupID}</h1>
        </>
    );
}
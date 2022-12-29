import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import {useSession} from 'next-auth/react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import {useEffect, useState} from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function TripGroupView() {
    // const groups = await fetchTripGroups();
    // console.log(groups)
    const {data: session} = useSession()
    return (
        <>
            <Box sx={{width: "100%", height: "100%"}} justifyContent="center">
                <Typography variant="h3"> Welcome back {session?.user?.name} </Typography>
                <Typography variant="h4">Please select a trip group or create one!</Typography>
                <AddButton/>
                <SelectedListItem/>
            </Box>
        </>
    );
}

function AddButton() {
    return (
        // wrapping all around box for centering the + icon on small screens
        <Box
            m={1}
            display="flex"
            justifyContent="center"
        >
            {/*on medium/big devices*/}
            <Fab variant="extended" color="primary" aria-label="add" sx={{
                display: {md: 'block', xs: 'none'},
                position: 'absolute',
                bottom: (theme) => theme.spacing(2),
                right: (theme) => theme.spacing(2),
            }}>
                Create new trip group
                <AddIcon sx={{mb: -0.6}}/> {/* random... */}
            </Fab>

            {/*on small devices*/}
            <Fab color="primary" aria-label="add" sx={{
                display: {md: 'none', xs: 'auto'},
                position: 'absolute',
                bottom: (theme) => theme.spacing(2),
            }}>
                <AddIcon/>
            </Fab>
        </Box>
    );
}

function SelectedListItem() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{width: '100%', maxWidth: 460, bgcolor: 'background.paper'}}>
            <List component="nav" aria-label="secondary mailbox folder" sx={{
                   bgcolor: 'background.paper'
            }}>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary="Trash"/>
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary="Spam"/>
                </ListItemButton>
            </List>
        </Box>
    );
}

async function fetchTripGroups() {
    // Username should be used to retrieve info
    // const {data: session} = useSession()
    // const user = session.user.name

    const res = await fetch(
        `http://localhost:3001/groups`
    )

    const data = await res.json()
    return data;
}
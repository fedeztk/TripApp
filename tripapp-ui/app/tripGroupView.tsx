"use client"
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import {useSession} from 'next-auth/react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

interface Group {
    id: number
    name: string
}

export default function TripGroupView() {
    return (
        <>
            <Box sx={{width: "100%", height: "100%"}} justifyContent="center">
                <Typography variant="h3"> Welcome back session?.user?.name </Typography>
                <Typography variant="h4">Please select a trip group or create one!</Typography>
                <AddButton/>
                {/* @ts-expect-error Server Component */}
                <ListItems/>
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

async function ListItems() {
    const groups: Group[] = await fetchTripGroups();

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
                {groups.map((group) => (
                    <ListItemButton
                        selected={selectedIndex === group.id}
                        onClick={(event) => handleListItemClick(event, group.id)}>
                        <ListItemText primary={group.name}/>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

// fetches trip groups of logged user
// TODO: implement real function
export async function fetchTripGroups() {
    // Username should be used to retrieve info
    // const {data: session} = useSession()
    // const user = session.user.name

    const res = await fetch(`http://localhost:3001/groups`)

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
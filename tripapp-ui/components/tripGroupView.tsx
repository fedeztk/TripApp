import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import {useSession} from 'next-auth/react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LoadingPage from './loadingPage';
import useSWR from 'swr';
import Alert from '@mui/material/Alert';
import {Collapse, IconButton, ListSubheader} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Group {
    id: number
    name: string
}

export default function TripGroupView() {
    const {data: session} = useSession()
    return (
        <>
            <Box sx={{width: "100%", height: "100%"}} justifyContent="center">
                <Typography variant="h4"> Welcome back {session?.user?.name} </Typography>
                <Typography variant="h5">Please select a trip group or create one!</Typography>
                <AddButton/>
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

function ListItems() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    // TODO: Username should be used to retrieve info
    // const {data: session} = useSession()
    // const user = session.user.name
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const address = `http://localhost:3001/groups`
    const {data, error, isLoading} = useSWR(address, fetcher)
    const [open, setOpen] = useState(true);

    return (
        error ? (
                <Collapse in={open}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        Unable to fetch groups info!
                    </Alert>
                </Collapse>
            )
            :
            (
                isLoading ? (
                    <LoadingPage/>
                ) : (
                    <Box sx={{width: '100%', maxWidth: 460, bgcolor: 'background.paper'}}>
                        <List component="nav"
                              subheader={
                                  <ListSubheader component="div" id="nested-list-subheader">
                                      Your trip groups
                                  </ListSubheader>
                              }
                              aria-label="secondary mailbox folder" sx={{
                            bgcolor: 'background.paper'
                        }}>
                            {data.map((group: Group) => (
                                <ListItemButton
                                    selected={selectedIndex === group.id}
                                    onClick={(event) => handleListItemClick(event, group.id)}>
                                    <ListItemText primary={group.name}/>
                                    {/*<Badge badgeContent={4} color="secondary">*/}
                                    {/*    <PersonIcon color="action"/>*/}
                                    {/*</Badge>*/}
                                    {/*<AvatarGroup max={4}>*/}
                                    {/*    <Avatar alt="Remy Sharp" src="/palm.svg"/>*/}
                                    {/*    <Avatar alt="Travis Howard" src="/palm.svg"/>*/}
                                    {/*    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>*/}
                                    {/*    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>*/}
                                    {/*    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>*/}
                                    {/*</AvatarGroup>*/}
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                )
            )
    );
}
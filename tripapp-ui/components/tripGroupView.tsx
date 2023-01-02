import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import {useSession} from 'next-auth/react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LoadingPage from './loadingPage';
import useSWR from 'swr';
import Alert from '@mui/material/Alert';
import {Badge, Collapse, IconButton, ListItem, ListSubheader, Stack, useTheme} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';
import {blue} from '@mui/material/colors';

interface Group {
    id: number
    name: string
    members: string[]
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
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))
    return (
        // wrapping all around box for centering the + icon on small screens
        <Box
            m={1}
            display="flex"
            justifyContent="center"
        >
            {/*@ts-ignore*/}
            <Fab variant={isMediumScreen ? "extended" : "default"} color="primary" aria-label="add" sx={{
                position: 'absolute',
                bottom: (theme) => theme.spacing(2),
                right: isMediumScreen ? theme.spacing(2) : 'default'
            }}>
                {isMediumScreen && <>Create new trip group</>}
                <AddIcon sx={{mb: isMediumScreen ? 0.6 : "default"}}/>
            </Fab>
        </Box>
    );
}

function ListItems() {
    // TODO: Username should be used to retrieve info
    // const {data: session} = useSession()
    // const user = session.user.name
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const backend = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT as string
    const path = "/groups"
    const {data, error, isLoading} = useSWR(backend.concat(path), fetcher)

    // groups list
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    // alert notification
    const [alertOpen, setAlertOpen] = useState(true);

    // holds state for current selected group for dialogs
    const [focusedGroup, setFocusedGroup] = useState<null | number>(null)

    // leave dialog
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const handleLeaveDialogOpen = (group_id: number) => {
        setFocusedGroup(group_id);
        setLeaveDialogOpen(true);
    };
    const handleLeaveDialogClose = () => {
        setFocusedGroup(null);
        setLeaveDialogOpen(false);
    };
    const handleLeaveDialogConfirm = (group_id: number) => {
        //TODO: call the api to remove the user grom group_id
        setFocusedGroup(null);
        setLeaveDialogOpen(false)
    };

    // members dialog
    const [membersDialogOpen, setMembersDialogOpen] = useState(false);
    const handleMembersDialogOpen = (group_id: number) => {
        setFocusedGroup(group_id);
        setMembersDialogOpen(true);
    };
    const handleMembersDialogClose = () => {
        setFocusedGroup(null);
        setMembersDialogOpen(false);
    };

    return (
        error ? (
                <Collapse in={alertOpen}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlertOpen(false)
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
                                <ListItem
                                    key={group.id}
                                    secondaryAction={
                                        <Stack spacing={2} direction="row">
                                            <IconButton edge="end" aria-label="add"
                                                        onClick={() => handleMembersDialogOpen(group.id)}>
                                                <Badge badgeContent={group.members.length} color="primary">
                                                    <PersonAddIcon/>
                                                </Badge>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="leave"
                                                        onClick={() => handleLeaveDialogOpen(group.id)}>
                                                <ExitToAppIcon/>
                                            </IconButton>
                                            {/*dialog for leave group button*/}
                                            <Dialog
                                                open={leaveDialogOpen && group.id === focusedGroup}
                                                onClose={() => handleLeaveDialogClose()}
                                            >
                                                <DialogTitle>
                                                    Are you sure you want to exit from the group: {group.name}?
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        If you exit now, in order to be re-admitted,
                                                        another member of the group must invite you.
                                                        Please, be cautious!
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => handleLeaveDialogConfirm(group.id)}
                                                            autoFocus>
                                                        Yes
                                                    </Button>
                                                    <Button onClick={() => handleLeaveDialogClose()}>No</Button>
                                                </DialogActions>
                                            </Dialog>
                                            {/*members dialog*/}
                                            <Dialog
                                                open={membersDialogOpen && group.id === focusedGroup}
                                                onClose={() => handleMembersDialogClose()}>
                                                <DialogTitle>View and add members for {group.name}</DialogTitle>
                                                <List sx={{pt: 0}}>
                                                    {group.members.map((user) => (
                                                        <ListItem disableGutters>
                                                            <ListItemButton
                                                                onClick={() => handleMembersDialogClose()}
                                                                key={user}>
                                                                <ListItemAvatar>
                                                                    <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                                                        <PersonIcon/>
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={user}/>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))}
                                                    <ListItem disableGutters>
                                                        <ListItemButton
                                                            autoFocus
                                                            onClick={() => handleMembersDialogClose()}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <AddIcon/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText primary="Add member"/>
                                                        </ListItemButton>
                                                    </ListItem>
                                                </List>
                                            </Dialog>

                                        </Stack>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton
                                        selected={selectedIndex === group.id}
                                        onClick={(event) => handleListItemClick(event, group.id)}>
                                        <ListItemText primary={group.name}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )
            )
    );
}
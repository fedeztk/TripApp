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
import {Alert, Badge, Collapse, IconButton, ListItem, ListSubheader, Stack, TextField, useTheme} from '@mui/material';
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
import {useTripGroupContext} from '../context/tripGroup';
import TripGroup from '../types/tripGroup';
import router from 'next/router';

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

    // dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        // wrapping all around box for centering the + icon on small screens
        <Box
            m={1}
            display="flex"
            justifyContent="center"
        >
            {/*@ts-ignore*/}
            <Fab variant={isMediumScreen ? "extended" : "default"} color="secondary" aria-label="add"
                 onClick={() => handleClickOpen()}
                 sx={{
                     position: 'fixed',
                     bottom: (theme) => theme.spacing(2),
                     right: isMediumScreen ? theme.spacing(2) : 'default'
                 }}>
                {isMediumScreen && <>Create new trip group</>}
                <AddIcon sx={{mb: isMediumScreen ? 0.6 : "default"}}/>
            </Fab>
            <Dialog
                fullScreen={!isMediumScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Add details for your next trip
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, enter a valid city name below.
                        This information will be used to create your next trip group!
                        You can add members to the newly created group later.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="City"
                        type="search"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Create
                    </Button>
                    <Button onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

function ListItems() {
    // TODO: Username should be used to retrieve info
    // const {data: session} = useSession()
    // const user = session.user.name
    const fetcher = (url: string) => fetch(url).then((res) => res.json()).catch((err) => console.log(err))
    const backend = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT as string
    const path = "/groups"
    const {data, error, isLoading} = useSWR(backend.concat(path), fetcher)

    // use trip group context
    const [group, setGroup] = useTripGroupContext()

    // groups list
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        group: TripGroup,
    ) => {
        setGroup(group)
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
                                <CloseIcon/>
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
                            {data.map((gr: TripGroup) => (
                                <ListItem
                                    key={gr.id}
                                    secondaryAction={
                                        <Stack spacing={2} direction="row">
                                            <IconButton edge="end" aria-label="add"
                                                        onClick={() => handleMembersDialogOpen(gr.id)}>
                                                <Badge badgeContent={gr.members.length} color="primary">
                                                    <PersonAddIcon/>
                                                </Badge>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="leave"
                                                        onClick={() => handleLeaveDialogOpen(gr.id)}>
                                                <ExitToAppIcon/>
                                            </IconButton>
                                            {/*dialog for leave group button*/}
                                            <Dialog
                                                open={leaveDialogOpen && gr.id === focusedGroup}
                                                onClose={() => handleLeaveDialogClose()}
                                            >
                                                <DialogTitle>
                                                    Are you sure you want to exit from the group: {gr.name}?
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        If you exit now, in order to be re-admitted,
                                                        another member of the group must invite you.
                                                        Please, be cautious!
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => handleLeaveDialogConfirm(gr.id)}
                                                            autoFocus>
                                                        Yes
                                                    </Button>
                                                    <Button onClick={() => handleLeaveDialogClose()}>No</Button>
                                                </DialogActions>
                                            </Dialog>
                                            {/*members dialog*/}
                                            <Dialog
                                                open={membersDialogOpen && gr.id === focusedGroup}
                                                onClose={() => handleMembersDialogClose()}>
                                                <DialogTitle>View and add members to {gr.name}</DialogTitle>
                                                <List sx={{pt: 0}}>
                                                    {gr.members.map((user) => (
                                                        <ListItem disableGutters
                                                                    key={user}
                                                        >
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
                                        selected={group?.id === gr.id}
                                        onClick={(event) => handleListItemClick(event, gr)}>
                                        <ListItemText primary={gr.name}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )
            )
    );
}
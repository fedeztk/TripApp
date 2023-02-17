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
import {
    Alert,
    Autocomplete,
    Badge,
    CircularProgress,
    Collapse,
    IconButton,
    ListItem,
    ListSubheader,
    Stack,
    TextField,
    useTheme
} from '@mui/material'
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
import useSWRMutation from 'swr/mutation';
import {customFetcher} from '../lib/fetcher';
import {City, Country, ICity, ICountry} from "country-state-city";

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
        setCity(null);
        setCountry(null);
    };

    const {data: session} = useSession()
    const path = "/v1/group/groups/".concat(session?.user.name as string)
    const {trigger, isMutating} = useSWRMutation([path, 'POST', session], customFetcher)

    // const countries: ICountry[] = Country.getAllCountries();
    const [countries, setCountries] = useState<ICountry[]>(Country.getAllCountries() as ICountry[]);
    const [country, setCountry] = useState<ICountry | null>(null);

    const [cities, setCities] = useState<ICity[]>([]);
    const [city, setCity] = useState<string | null>(null);


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
                    <Autocomplete
                        id="country-select-demo"
                        sx={{
                            py: 2
                        }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                {option.flag} {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a country"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(event, newValue) => {
                            if (newValue != null) {
                                setCountry(newValue);
                                setCities((City.getCitiesOfCountry(newValue.isoCode) as ICity[])
                                    .filter((city, index, self) =>
                                            index === self.findIndex((t) => (
                                                t.name === city.name
                                            ))
                                    ))
                            } else {
                                setCountry(null);
                            }
                        }}
                    />
                    <Autocomplete
                        disabled={country === null}
                        id="city-select-demo"
                        options={cities}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a city"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                        onChange={(event, newValue) => {
                            if (newValue != null) {
                                setCity(newValue?.name);
                            } else {
                                setCity(null);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    {isMutating ?
                        <Button disabled>
                            Loading <CircularProgress size={20}/>
                        </Button>
                        :
                        <Button
                            disabled={city === null}
                            onClick={async () => await trigger({name: city, iso: country?.isoCode}).then(() => handleClose() )}>
                            Create
                        </Button>
                    }
                    <Button onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

function ListItems() {
    const {data: session} = useSession()
    const path = "/v1/group/groups/"
    const {data, error, isLoading} = useSWR([path, 'GET', session])

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

    const deletePath = "/v1/group/members/".concat(focusedGroup as unknown as string)
    const {trigger, isMutating} = useSWRMutation([deletePath, 'DELETE', session], customFetcher)
    const handleLeaveDialogConfirm = () => {
        trigger().then(() => {
                setFocusedGroup(null);
                setLeaveDialogOpen(false);
            }
        ).catch((e) => {
            console.log(e)
        })
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

    const [newMemberEmail, setNewMemberEmail] = useState("")
    const addPath = "/v1/group/members/".concat(focusedGroup as unknown as string).concat(newMemberEmail)
    const {
        trigger: triggerAddMember,
        isMutating: isMutatingAddMember
    } = useSWRMutation([addPath, 'POST', session], customFetcher)
    const handleAddMember = () => {
        triggerAddMember().then(() => {
                setMembersDialogOpen(false);
            }
        ).catch((e) => {
            console.log(e)
        })
    }

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
                                            {isMutating ?
                                                <Button disabled>
                                                    Loading <CircularProgress size={20}/>
                                                </Button>
                                                :
                                                <IconButton edge="end" aria-label="leave"
                                                            onClick={() => handleLeaveDialogOpen(gr.id)}>
                                                    <ExitToAppIcon/>
                                                </IconButton>
                                            }
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
                                                    <Button onClick={() => handleLeaveDialogConfirm()}
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
                                                                  key={user.userId}
                                                        >
                                                            <ListItemButton
                                                                onClick={() => handleMembersDialogClose()}
                                                                key={user.userId}>
                                                                <ListItemAvatar>
                                                                    <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                                                        <PersonIcon/>
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={user.name}/>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))}
                                                    <ListItem disableGutters>
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <IconButton
                                                                        sx={{
                                                                            bgcolor: 'secondary.main',
                                                                            color: 'primary.contrastText'
                                                                        }}
                                                                        onClick={() => handleAddMember()}>
                                                                        <AddIcon/>
                                                                    </IconButton>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <TextField id="outlined-basic" label="New user email"
                                                                       variant="outlined"
                                                                       sx={{width: '80%'}}
                                                                       onChange={(e) => setNewMemberEmail("?email=".concat(e.target.value))}/>
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
import * as React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import {useColorScheme,} from '@mui/material/styles';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BedtimeOffIcon from '@mui/icons-material/BedtimeOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import {useTripGroupContext} from '../context/tripGroup';
import router from 'next/router';

const settings = ['Logout'];

const navbarID = "navbar-id"

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const {data: session} = useSession()

    // maybe replace this with a check on context.tripgroup
    // const isHome = useRouter().pathname === "/";

    const [tripGroup, setTripGroup] = useTripGroupContext();


    return (
        <>
            <AppBar position="sticky" id={navbarID} enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {tripGroup && <BackButton/>}
                        <Link href="/">
                            <Avatar alt="app icon" src="/palm.png"/>
                        </Link>
                        {/*on medium screens*/}
                        <Typography
                            // variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                ml: 2,
                                display: {xs: 'none', md: 'flex'},
                                // fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1
                            }}
                        >
                            TripApp{tripGroup && <> - {tripGroup.name}</>}
                        </Typography>
                        {/*on small screens*/}
                        <Typography
                            // variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                ml: 2,
                                display: {xs: 'flex', md: 'none'},
                                // fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1
                            }}
                        >
                            {tripGroup && <>{tripGroup.name}</>}
                        </Typography>


                        <Typography
                            // variant="h6"
                            noWrap
                            // component="a"
                            // href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 600,
                                // letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Signed in as {session?.user?.name}
                        </Typography>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    {session && session.user && session.user.image ? (
                                        <Avatar alt="avatar img" src={session.user.image}/>
                                    ) : (
                                        <Avatar {...stringAvatar(session?.user?.name)} />
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => signOut()}>
                                        <LogoutIcon fontSize="small" sx={{mr: 1}}/>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <ModeSwitcher/>
                    </Toolbar>
                </Container>
            </AppBar>
            <BackToTop/>
        </>
    );
}

function BackButton() {
    const [tripGroup, setTripGroup] = useTripGroupContext();
    return router.pathname === "/" ? (
        <IconButton color="secondary" onClick={() => setTripGroup(null)}>
            <ArrowBackIcon/>
        </IconButton>
    ) : (
        <Link href="/">
            <IconButton color="secondary">
                <ArrowBackIcon/>
            </IconButton>
        </Link>
    );
}

function BackToTop({window}: any) {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#" + navbarID);

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16, zIndex: 'tooltip'}}
            >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </Box>
        </Fade>
    );
}

// ModeSwitcher is an example interface for toggling between modes.
const ModeSwitcher = () => {
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // for server-side rendering
        // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
        return null;
    }

    return (
        <IconButton
            // variant="contained"
            color="inherit"
            onClick={() => {
                mode === 'light' ? setMode('dark') : setMode('light')
            }}
        >
            {mode === 'light' ? <BedtimeIcon/> : <BedtimeOffIcon/>}
        </IconButton>
    );
};

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name: string | null | undefined) {
    if (name == null) { // null or undefined, should not happen anyways...
        return "";
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

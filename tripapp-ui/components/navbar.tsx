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
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';

const pages = ['Poll', 'Finance', 'Info', 'Map'];
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

    return (
        <>
            <AppBar position="static" id={navbarID} enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link href="/">
                            <Avatar alt="app icon" src="/palm.svg"/>
                        </Link>
                        <Typography
                            // variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                ml: 2,
                                // display: {xs: 'none', md: 'flex'},
                                // fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1
                            }}
                        >
                            TripApp
                        </Typography>


                        {/*old navbar, new navigation is WIP*/}
                        {/*{!isHome ?*/}
                        {/*    <>*/}
                        {/*        /!*responsive menu on small screens*!/*/}
                        {/*        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>*/}
                        {/*            <IconButton*/}
                        {/*                size="large"*/}
                        {/*                aria-label="account of current user"*/}
                        {/*                aria-controls="menu-appbar"*/}
                        {/*                aria-haspopup="true"*/}
                        {/*                onClick={handleOpenNavMenu}*/}
                        {/*                color="inherit"*/}
                        {/*            >*/}
                        {/*                <MenuIcon/>*/}
                        {/*            </IconButton>*/}
                        {/*            <Menu*/}
                        {/*                id="menu-appbar"*/}
                        {/*                anchorEl={anchorElNav}*/}
                        {/*                anchorOrigin={{*/}
                        {/*                    vertical: 'bottom',*/}
                        {/*                    horizontal: 'left',*/}
                        {/*                }}*/}
                        {/*                keepMounted*/}
                        {/*                transformOrigin={{*/}
                        {/*                    vertical: 'top',*/}
                        {/*                    horizontal: 'left',*/}
                        {/*                }}*/}
                        {/*                open={Boolean(anchorElNav)}*/}
                        {/*                onClose={handleCloseNavMenu}*/}
                        {/*                sx={{*/}
                        {/*                    display: {xs: 'block', md: 'none'},*/}
                        {/*                }}*/}
                        {/*            >*/}
                        {/*                {pages.map((page) => (*/}
                        {/*                    <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                        {/*                        <Typography textAlign="center">{page}</Typography>*/}
                        {/*                    </MenuItem>*/}
                        {/*                ))}*/}
                        {/*            </Menu>*/}
                        {/*        </Box>*/}

                        {/*        /!*normal menu on other screen*!/*/}
                        {/*        <Box sx={{flexGrow: 1, display: {md: 'flex', xs: 'none'}}}>*/}
                        {/*            {pages.map((page) => (*/}
                        {/*                <Button*/}
                        {/*                    key={page}*/}
                        {/*                    onClick={handleCloseNavMenu}*/}
                        {/*                    sx={{color: 'white', display: 'block'}}*/}
                        {/*                >*/}
                        {/*                    {page}*/}
                        {/*                </Button>*/}
                        {/*            ))}*/}
                        {/*        </Box>*/}

                        {/*    </>*/}
                        {/*    : (*/}
                        {/*        <></>*/}
                        {/*    )*/}
                        {/*}*/}

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

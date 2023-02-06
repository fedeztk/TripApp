import Navbar from "./navbar";
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import Container from "@mui/material/Container";
import TripAppTheme from "../lib/theme";
import Notifications from "./notifications";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <CssVarsProvider theme={TripAppTheme}>
                <Navbar/>
                <Notifications/>
                <Container maxWidth="sm" sx={{p: 3}}>
                    {children}
                </Container>
            </CssVarsProvider>
        </>
    );
}
import Navbar from "./navbar";
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme
} from '@mui/material/styles';
import {ReactNode} from "react";

const tripAppTheme = extendTheme({
    colorSchemes: {
        light: { // palette for light mode
            palette: {
                primary: {
                    main: "#f85f6a"
                }
            }
        },
        dark: { // palette for dark mode
            palette: {
                primary: {
                    main: "#f85f6a"
                }
            }
        }
    }
})

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <CssVarsProvider theme={tripAppTheme}>
                <Navbar/>
                {children}
                {/*<Footer/>*/}
            </CssVarsProvider>
        </>
    );
}
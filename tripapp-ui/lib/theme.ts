import {experimental_extendTheme as extendTheme} from '@mui/material/styles';
import {Montserrat} from '@next/font/google';

export const montserrat = Montserrat({subsets: ['latin']})

const TripAppTheme = extendTheme({
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
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
    },
})

export default TripAppTheme;
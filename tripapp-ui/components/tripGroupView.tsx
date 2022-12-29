import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function TripGroupView() {
    return (
        <>

            <AddButton/>
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
                <AddIcon sx={{mr: 1}}/>
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
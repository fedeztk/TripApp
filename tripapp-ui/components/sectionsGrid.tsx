import {IconButton, Typography} from "@mui/material";
import {useTripGroupContext} from "../context/tripGroup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function SectionsGrid() {
    const [group, setGroup] = useTripGroupContext();
    return (
        <>
            <IconButton onClick={() => setGroup(null)}>
                <ArrowBackIcon/>
            </IconButton>
            <Typography variant="h5">
                Please select a section
            </Typography>
        </>
    );
}
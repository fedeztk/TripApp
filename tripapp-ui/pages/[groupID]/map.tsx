import Typography from '@mui/material/Typography';
import {useTripGroupContext} from "../../context/tripGroup";
import {
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    useTheme
} from "@mui/material";
import {useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import Container from "@mui/material/Container";
import {useSession} from "next-auth/react";

export default function Map() {
    const [tripGroup] = useTripGroupContext()

    const initialQuery = encodeURI(tripGroup?.name as string)
    const [query, setQuery] = useState<string>(initialQuery)
    const updateQuery = (e: string) => {
        setQuery(encodeURI(e))
    }

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const {data: session} = useSession()

    return (
        <>
            <Typography variant="h4">
                Map
            </Typography>
            <Card sx={{
                height: isSmallScreen ? "50vh" : "40vh",
                mt: 2,
            }}>
                <CardMedia
                    component="iframe"
                    height="100%"
                    width="100%"
                    src={"https://maps.google.com/maps?q=" + query + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}
                    style={{border: 0}}
                />
            </Card>

            <Container>
                <ButtonGroup variant="outlined" sx={{mt: 2, mx: 2}}>
                    <Button disabled startIcon={<WhereToVoteIcon/>} onClick={
                        () => {
                            // get current user location
                            // and set query to that location
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    const lat = position.coords.latitude
                                    const long = position.coords.longitude
                                    // TODO: send location to backend
                                    updateQuery(`${lat},${long}`)
                                }
                            )
                        }
                    }>
                        update my location
                    </Button>
                    <Button disabled startIcon={<AddLocationIcon/>}>
                        pin a location
                    </Button>
                </ButtonGroup>

                <FormControl sx={{
                    mt: 2,
                    display: "block"
                }}>
                    <RadioGroup
                        value={tripGroup?.name}
                        onChange={(e) => {
                            updateQuery(e.target.value)
                        }}
                    >
                        <FormLabel>Members live location</FormLabel>
                        {tripGroup?.members
                            .map((member) => {
                                return (
                                    <FormControlLabel disabled value={member.name} key={member.userId}
                                                      control={<Radio/>}
                                                      label={member.name.concat(member.userId === session?.user?.id ? " (you)" : "")}
                                    />
                                )
                            })}
                        <FormLabel>Pinned locations</FormLabel>
                        <FormControlLabel control={<Radio/>} label={tripGroup?.name.concat(" (destination)")}
                                          value={tripGroup?.name}/>
                        <FormControlLabel disabled label={"Pin 1"} value={"Pin 1"} control={<Radio/>}/>
                        <FormControlLabel disabled label={"Pin 2"} value={"Pin 2"} control={<Radio/>}/>
                        <FormControlLabel disabled label={"..."} value={"..."} control={<Radio/>}/>
                    </RadioGroup>
                </FormControl>
            </Container>
        </>
    );
}
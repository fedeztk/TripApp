import {Box, CardActionArea, Grid, IconButton, Typography} from "@mui/material";
import {useTripGroupContext} from "../context/tripGroup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Section} from "../types/section";
import Link from "next/link";
import router from "next/router";

export default function SectionsGrid() {
    const [group, setGroup] = useTripGroupContext();

    // clean query params when page is loaded. The group, if present,
    // will be loaded to the context from the query params inside TripGroupView
    if (router.query.groupID) {
        router.replace('/', '/', {shallow: true});
    }

    return (
        <>
            <IconButton onClick={() => setGroup(null)}>
                <ArrowBackIcon/>
            </IconButton>
            <Typography variant="h5">
                Please select a section
            </Typography>
            <GridContainer groupID={group?.id}/>
        </>
    );
}

function GridContainer(groupID: any) {
    const [group, setGroup] = useTripGroupContext();
    groupID = group?.id;
    type CardProps = {
        section: Section
        sectionDescription: string
        sectionImage: string
    }

    const sectionDescriptions = {
        "Map": "View the map of the trip",
        "Info": "View the trip information",
        "Poll": "Vote on the next destination",
        "Finance": "View the trip finances",
    }

    const cards: CardProps[] = Object.values(Section).map((section) => ({
        section: section,
        sectionDescription: sectionDescriptions[section],
        sectionImage: `/cards/${section.toLowerCase()}`.concat(".jpg"),
    }));


    return (
        <Box sx={{flexGrow: 1, mt: 3}}>
            <Grid container spacing={{xs: 2, md: 4}}>
                {cards.map((card) => (
                    <Grid item xs={12} md={6} key={card.section}>
                        <Card sx={{maxWidth: 345}}>
                            <Link href={`/${groupID}/`.concat(card.section.toLowerCase())}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={card.sectionImage}
                                        alt="section image"
                                        sx={{display: {xs: 'none', sm: 'block'}}}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" color="text.primary">
                                            {card.section}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.sectionDescription}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
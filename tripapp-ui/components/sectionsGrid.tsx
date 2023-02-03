import {Box, CardActionArea, Grid, Typography} from "@mui/material";
import {useTripGroupContext} from "../context/tripGroup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Section} from "../types/section";
import Link from "next/link";

export default function SectionsGrid() {
    const [group, setGroup] = useTripGroupContext();

    return (
        <>
            <Typography variant="h5">
                Please select a section
            </Typography>
            <GridContainer groupID={group?.id}/>
        </>
    );
}

function GridContainer({groupID}: { groupID: number | undefined }) {
    type CardProps = {
        section: Section
        sectionDescription: string
        sectionImage: string
    }

    const sectionDescriptions = {
        "Map": "View the map of the trip",
        "Info": "View the trip information",
        "Poll": "Vote on the next destination",
        "Wallet": "View the trip finances",
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
import {useTripGroupContext} from "../../context/tripGroup";
import {Grid, useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useSession} from "next-auth/react";
import LoadingPage from "../../components/loadingPage";
import Stack from "@mui/material/Stack";
import * as React from "react";
import useSWR from "swr";
import Member from "../../types/member";
import {Informations} from "../../types/informations";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FlagIcon from '@mui/icons-material/Flag';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";

export default function Info() {
    const [tripGroup] = useTripGroupContext()
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const {data: session} = useSession()
    const groupId: string|undefined = tripGroup?.id.toString()
    const userIdList : (string[] | undefined) = tripGroup?.members.map((m:Member)=> m.userId).filter((m:string)=> m !== session?.user?.id)

    const path = "/v1/infos/"
    const req = path + tripGroup?.iso
    const {data, error, isLoading} = useSWR([req, "GET", session])
    const [informations, setInformations] = useState<Informations|undefined>()
    //const informations = data as Informations;

    function dataAnalizer() {
        if (data !== undefined) {
            setInformations(data)
        }
    }

    const divStyle = {
        width: '200px',
        height: '100px'
    };

    useEffect(dataAnalizer, [data])
    console.log(informations)
    return showInfoCountry()

    function showInfoCountry(){
        return isLoading ? <LoadingPage/>
        : (
            <>
            <Stack
                //direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}>

                <Typography variant="h4" gutterBottom>
                    {informations?.info.names.common.toString().toUpperCase()}
                </Typography>
                <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                    <div style={divStyle}>
                        <img src={informations?.info.flags.svg} width="100%" height="100%" />
                    </div>
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 55, height: 55}}>
                                        <MedicalInformationIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                                        &nbsp;&nbsp;Ambulance
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        &nbsp;&nbsp;&nbsp;{informations?.numbers.datas.ambulance.all?.toString() === "" ? "-" : informations?.numbers.datas.ambulance.all?.toString()}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 55, height: 55}}>
                                        <LocalPoliceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                                        &nbsp;&nbsp;Police
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        &nbsp;&nbsp;&nbsp;{informations?.numbers.datas.police.all?.toString() === "" ? "-" : informations?.numbers.datas.police.all?.toString()}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 55, height: 55}}>
                                        <FireTruckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                                        &nbsp;&nbsp;Fire Dept
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        &nbsp;&nbsp;&nbsp;{informations?.numbers.datas.fire.all?.toString() === "" ? "-" : informations?.numbers.datas.fire.all?.toString()}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    {/*----------------------------------------------------------------*/}
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 55, height: 55}}>
                                        <ApartmentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                                        &nbsp;&nbsp;Capital
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        &nbsp;&nbsp;&nbsp;{informations?.info.capital}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 55, height: 55}}>
                                        <FlagIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                                        &nbsp;&nbsp;TEMP
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        &nbsp;&nbsp;&nbsp;temp
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 55, height: 55}}>
                                        <MonetizationOnIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="button" sx={{fontSize: '1.5em'}} gutterBottom>
                                        &nbsp;&nbsp;Currency
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        &nbsp;&nbsp;&nbsp;currency
                                        {/*
                                        &nbsp;&nbsp;&nbsp;{informations?.info.currencies.symbol.toString().concat(" "+informations?.info.currencies.name.toString())}
                                        */}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Stack>
            </>
        )
    }
}
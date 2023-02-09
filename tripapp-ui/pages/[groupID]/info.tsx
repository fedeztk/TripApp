import {useTripGroupContext} from "../../context/tripGroup";
import {ImageList, ImageListItem, useTheme} from "@mui/material";
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
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {useEffect, useState} from "react";

export default function Info() {
    const [tripGroup] = useTripGroupContext()
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const {data: session} = useSession()
    const groupId: string|undefined = tripGroup?.id.toString()
    const userIdList : (string[] | undefined) = tripGroup?.members.map((m:Member)=> m.userId).filter((m:string)=> m !== session?.user?.id)

    const path = "/v1/infos/"
    const req = path + "it" //tripGroup?.iso
    const {data, error, isLoading} = useSWR([req, "GET", session])
    const [informations, setInformations] = useState<Informations|undefined>()
    //const informations = data as Informations;
    //const number = informations ? informations.informations.numbers.datas.ambulance.all?.at(1) : "Undefined"

    //console.log("ambu: "+number)
    function dataAnalizer() {
        if (data !== undefined) {

            setInformations(data)
            //console.log(informations?.info.numbers.datas.ambulance.all?.toString())

            //const ambulance = informations.info.numbers.datas.ambulance.all?.at(0)
            //const police = informations.info.numbers.datas.police.all?.at(0)
            //const fireDept = informations.info.numbers.datas.fire.all?.at(0)
        }
    }

    useEffect(dataAnalizer, [data])

    //console.log("wwww "+tripGroup?.id)
    console.log(informations)

    return showInfoCountry()
    function showInfoCountry(){
        return isLoading ? <LoadingPage/>
            : (
                <>
                    <img
                        src={informations?.info.flags.svg}
                        srcSet={`${informations?.info.flags.svg}?w=124&h=124&fit=crop&auto=format&dpr=2 2x`}
                        //loading="lazy"
                    />

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}>

                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocalHospitalIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Ambulance" secondary={informations?.numbers.datas.ambulance.all?.toString()} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocalPoliceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Police" secondary={informations?.numbers.datas.police.all?.toString()} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FireTruckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Fire Dept" secondary={informations?.numbers.datas.fire.all?.toString()} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MonetizationOnIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Currency" secondary={informations?.info.currencies.EUR.symbol.toString().concat(" "+informations?.info.currencies.EUR.name.toString())} />
                            </ListItem>
                        </List>
                    </Stack>
                </>

            )

    }
}
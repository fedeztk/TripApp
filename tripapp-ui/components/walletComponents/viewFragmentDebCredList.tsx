import * as React from "react";
import {walletUser} from "../../types/wallet";
import Stack from "@mui/material/Stack";
import {useState} from "react";
import List from "@mui/material/List";
import {ListItem, ListSubheader} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export  default function DebCredList({userList}:{userList:any | undefined}){

    return(<Box sx={{ width: '100%'}}>
        <Stack
            direction="row"
            sx={{width:"100%"}}>
            <Stack
                direction="column"
                alignItems="center"
                sx={{width:'50%'}}>
                <Typography variant={"h5"}>Debitori</Typography>
                {userList?.debits.map((c:walletUser, key:number)=><Entry key={key} name={c.user} value={c.amount}/>)}

            </Stack>

            <Stack
                direction="column"
                alignItems="center"
                sx={{width:'50%', }}>
                <Typography variant={"h5"}>Creditori</Typography>
                {userList?.credits.map((c:walletUser, key:number)=><Entry key={key} name={c.user} value={c.amount}/>)}

            </Stack>
        </Stack>
    </Box>);

    function Entry({name, value}:{name:string, value:number }){
        return(
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Typography variant={"h6"}>{name}</Typography>
                <Typography variant={"body1"}>{value} €</Typography>
            </Stack>
        )
    }
}



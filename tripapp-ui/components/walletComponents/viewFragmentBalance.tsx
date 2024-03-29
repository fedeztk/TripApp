import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import { round } from "../../pages/[groupID]/wallet";

export default function Balance({balance}:{balance:any | undefined}){


    return(<>
        <Box sx={{ width: '100%'}}>
            <Stack
                direction="column"
                justifyContent=""
                alignItems="center"
                spacing={5}>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>


                    <Typography variant="h3" >Balance:</Typography>

                    <Typography variant="h4" >{round(balance?.total).toString()} €</Typography>

                </Stack>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={10}>
                    <Column title={"Debit"} value={round(balance?.debit).toString()}/>
                    <Column title={"Credit"} value={round(balance?.credit).toString()}/>
                </Stack>
            </Stack>
        </Box>
    </>)

    function Column({title, value}:{title:string, value:string}){
        return(<Stack
            direction="column"
            alignItems="center"
        sx={{width:"50%", minHeight:'15vh'}}>
            <Typography variant={"h4"}>{title}</Typography>
            <Typography variant={"h5"}>{value} €</Typography>
        </Stack>)
    }
}
import useSWR from "swr";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';


import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import LoadingPage from "../../components/loadingPage";
import Balance from "../../components/walletComponents/viewFragmentBalance";
import DebCredList from "../../components/walletComponents/viewFragmentDebCredList";
import {CreditUser, custumUser, DebitUser} from "../../types/wallet";
import {width} from "@mui/system";
import {TextField, useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TransactionList from "../../components/walletComponents/TransactionList";
import NewSalePopup from "../../components/walletComponents/NewTransactionPopup";
import NewTransactionPopup from "../../components/walletComponents/NewTransactionPopup";

export function round(number:any | undefined){
    if(number===undefined){
        return 0
    }
    return Math.round(number * 100)/100
}

export default function Wallet() {

    const [triggerHistoryView, setTriggerHistoryView] = useState(false);
    const [triggerNewSale, setTriggerNewSale] = useState(false);


    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))


    const backend = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT as string
    const path = "/api/balance"
    const fetcher = (url: string) => fetch(url)
            .then((res) => res.json())
            .then((json) => {

                const debits: DebitUser[] = []
                const credits: CreditUser[] = []
                let d = 0;
                let c = 0;

                json.map((u:any) => {
                    if ((u as DebitUser).debit !== undefined) {
                        let tmp: DebitUser = u as DebitUser
                        debits.push(tmp)
                        d = d + tmp.debit

                    } else if ((u as CreditUser).credit !== undefined) {
                        let tmp: CreditUser = u as CreditUser
                        credits.push(tmp)
                        c = c + tmp.credit

                    }
                })

                let debCred = {
                    debits: debits,
                    credits: credits
                }

                let balance = {
                    total: c - d,
                    debit: d,
                    credit: c
                }

                return {
                    debCred: debCred,
                    balance: balance
                }
            })

    const {data, error, isLoading} = useSWR(backend.concat(path), fetcher)


    function backFunc(){
        console.log("BACK!")
    }


    return isLoading ? <LoadingPage/>
            : error ? <>ERRORE</>
            : triggerHistoryView ? <TransactionList backTrigger={setTriggerHistoryView}/> : <ActualWallet/>


    function ActualWallet(){
        return(<Box sx={{width:'100%', height:'100%'}}>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center">
                <TopControlView/>

                <NewTransactionButton/>

                <Balance balance={data?.balance }/>

                <DebCredList userList={data?.debCred}/>
                {triggerNewSale? <NewTransactionPopup triggerDialog={triggerNewSale} setTriggerDialog={setTriggerNewSale}/> :<></>}

            </Stack>

        </Box>)
    }

    function TopControlView(){
        /*
        <IconButton onClick={backFunc}>
                        <ArrowBackIcon />
                    </IconButton>
         */

        return(
            <Box sx={{width:'100%', textAlign:"right", padding:"1vw"}}>
                    <Button variant="outlined"
                            endIcon={<HistoryOutlinedIcon/>}
                            onClick={()=>setTriggerHistoryView(true)}
                            size="small">Storico</Button>
            </Box>)
    }

    function NewTransactionButton(){

        return(<>
            <Fab
                sx={{marginBottom:"2vh"}}
                variant={"extended"}
                onClick={()=>setTriggerNewSale(true)}>
                <AddIcon  />
                <>New Transaction</>

            </Fab>
        </>)
                }
}


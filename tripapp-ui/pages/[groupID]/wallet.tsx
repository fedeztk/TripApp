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
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import LoadingPage from "../../components/loadingPage";
import Balance from "../../components/walletComponents/viewFragmentBalance";
import DebCredList from "../../components/walletComponents/viewFragmentDebCredList";
import {walletUser} from "../../types/wallet";

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
import {useSession} from "next-auth/react";
import useSWRMutation from "swr/mutation";
import {customFetcher} from "../../lib/fetcher";


export function round(number:any | undefined){
    if(number===undefined){
        return 0
    }
    return Math.round(number * 100)/100
}

export default function Wallet() {

    const [triggerHistoryView, setTriggerHistoryView] = useState(false);
    const [triggerNewSale, setTriggerNewSale] = useState(false);

    const {data: session} = useSession()


    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))

    const path = "/transactions/detailedPosition"
    


    const [balance, setBalance] = useState<any>();
    const [listDebitCredit, setListDebitCredit] = useState<any>();

    function dataAnalizer() {
        if(data !==undefined){
            const debits: walletUser[] = []
            const credits: walletUser[] = []
            let d = 0;
            let c = 0;

            data.debtorAmountList.map((u: walletUser) => {
                debits.push(u)
                d = d + u.amount
            })
            data.creditorAmountList.map((u: walletUser) => {
                credits.push(u)
                c = c + u.amount
            })

            setListDebitCredit({
                debits: debits,
                credits: credits
            })

            setBalance({
                total: c - d,
                debit: d,
                credit: c
            })
        }
    }

   //const {data, error, isLoading} = useSWRMutation([path, "POST", session], customFetcher)
    let data = undefined // testing
    let isLoading = false // testing

    useEffect(dataAnalizer, [data])
//    useEffect(dataAnalizer)//testing




    console.log(data)
    function backFunc(){
        console.log("BACK!")
    }


    return isLoading ? <LoadingPage/>
            : triggerHistoryView ? <TransactionList backTrigger={setTriggerHistoryView}/> : <ActualWallet/>


    function ActualWallet(){
        return(<Box sx={{width:'100%', height:'100%'}}>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center">
                <TopControlView/>

                <NewTransactionButton/>

                <Balance balance={balance }/>

                <DebCredList userList={listDebitCredit}/>
                {triggerNewSale? <NewTransactionPopup triggerDialog={triggerNewSale} setTriggerDialog={setTriggerNewSale}/> :<></>}

            </Stack>

        </Box>)
    }

    function TopControlView(){

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


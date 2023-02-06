import Button from '@mui/material/Button';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import LoadingPage from "../../components/loadingPage";
import Balance from "../../components/walletComponents/viewFragmentBalance";
import DebCredList from "../../components/walletComponents/viewFragmentDebCredList";
import {walletUser} from "../../types/wallet";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TransactionList from "../../components/walletComponents/TransactionList";
import NewTransactionPopup from "../../components/walletComponents/NewTransactionPopup";
import {useSession} from "next-auth/react";
import useSWRMutation from "swr/mutation";
import {customFetcher} from "../../lib/fetcher";
import {useTripGroupContext} from "../../context/tripGroup";
import Member from "../../types/member";
import useSWR from "swr";


export function round(number:any | undefined){
    if(number===undefined){
        return 0
    }
    return Math.round(number * 100)/100
}

export default function Wallet() {

    const [triggerHistoryView, setTriggerHistoryView] = useState(false);
    const [triggerNewSale, setTriggerNewSale] = useState(false);

    const [tripGroup, setTripGroup]= useTripGroupContext()
    const {data: session} = useSession()

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


    const groupId: string|undefined = tripGroup?.id.toString()
    const userIdList : (string[] | undefined) = tripGroup?.members.map((m:Member)=> m.userId).filter((m:string)=> m !== session?.user?.id)

    const path = "/v1/wallet/transactions/detailedPosition"
    const req = path + "?groupid="+(groupId)+"&useridlist="+userIdList?.toString()
    const {data, error, isLoading} = useSWR([req, "GET", session])


    useEffect(dataAnalizer, [data])


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


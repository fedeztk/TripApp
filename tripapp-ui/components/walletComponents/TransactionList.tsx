import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as React from "react";
import {useState} from "react";
import {Transaction} from "../../types/wallet";
import {useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from '@mui/icons-material/Delete';
import useSWR from "swr";
import {useTripGroupContext} from "../../context/tripGroup";
import {useSession} from "next-auth/react";
export default function TransactionList({backTrigger}:{backTrigger:any}){

    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))

    const [tripGroup, setTripGroup]= useTripGroupContext()
    const {data: session} = useSession()


    const [transactionList, setTransactionList] = useState<Transaction[]>()


    const path = "/v1/finance/transactionsByGroupId"
    const groupId: string|undefined = tripGroup?.id.toString()
    const req = path + "?groupid="+groupId
    const {data, error, isLoading} = useSWR([req, "GET", session])

    console.log(data)


    return(<div>
        <IconButton  onClick={()=>backTrigger(false)}>
            <ArrowBackIcon/>
        </IconButton>
        <>
            {transactionList?.map((t:Transaction, key:number)=><TransactionEntry key={key} transaction={t}/>)}
        </>
    </div>)


    function TransactionEntry({transaction}:{transaction:Transaction}){
        return (<>
            dati transazione
            {<IconButton>
                <DeleteIcon/>
                {isMediumScreen? <>delete</> : <></>}
            </IconButton>

            }
        </>)
    }
}
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as React from "react";
import {useEffect, useState} from "react";
import {AggregateTransaction, Transaction} from "../../types/wallet";
import {ListItem, ListSubheader, Stack, useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from '@mui/icons-material/Delete';
import useSWR, {useSWRConfig} from "swr";
import {useTripGroupContext} from "../../context/tripGroup";
import {useSession} from "next-auth/react";
import LoadingPage from "../loadingPage";
import Member from "../../types/member";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import useSWRMutation from "swr/mutation";
import {customFetcher} from "../../lib/fetcher";
export default function TransactionList({backTrigger}:{backTrigger:any}){

    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))

    const [tripGroup, setTripGroup]= useTripGroupContext()
    const {data: session} = useSession()


    const [transactionList, setTransactionList] = useState<AggregateTransaction[]>()


    const pathGetList = "/v1/wallet/transactions/"
    const groupId: string|undefined = tripGroup?.id.toString()
    const reqGetList = pathGetList + "?groupid="+groupId
    const {data, mutate, error, isLoading} = useSWR([reqGetList, "GET", session])

    function buildAggregateTransaction(){
        if(data!==undefined){
            let dList: AggregateTransaction[] = []
            let tmp: Map<String, Transaction[]> = new Map<String, Transaction[]>();

            for(let i in data){
                let t:Transaction = (data[i] as unknown as Transaction)
                if(tmp.has(t.uuid)){
                    let transArray:Transaction[]|undefined = tmp.get(t.uuid)
                    transArray?.push(t)
                    if(transArray)
                        tmp.set(t.uuid, transArray)
                }else{
                    tmp.set(t.uuid,[t])
                }
            }


            let keys = Array.from(tmp.keys())

            for (let i in keys) {
                let key = keys[i]
                let transactionArray: Transaction[] | undefined = tmp.get(key)
                let tmpAmount = 0;
                let tmpCreditor: string = "";
                let tmpDebitorList: string[] = [];

                if (transactionArray !== undefined) {
                    for (let j in transactionArray) {
                        let t = transactionArray[j as unknown as number]
                        tmpAmount = tmpAmount + t.amount;
                        tmpCreditor = t.creditor
                        tmpDebitorList.push((tripGroup?.members.find((m: Member) => m.userId === t.debtor) as Member).name)
                    }
                    tmpCreditor = (tripGroup?.members.find((m: Member) => m.userId === tmpCreditor) as Member).name
                }
                let aggTransaction: AggregateTransaction = {
                    uuid: key.toString(),
                    transactionList: transactionArray,
                    amount: tmpAmount,
                    creditor: tmpCreditor,
                    debtor: tmpDebitorList
                }
                dList.push(aggTransaction)
            }
            setTransactionList(dList)
        }else{
            setTransactionList([])
        }
    }

    useEffect(buildAggregateTransaction, [data,tripGroup?.members])




    return(<div>
            <IconButton  onClick={()=>backTrigger(false)}>
                <ArrowBackIcon/>
            </IconButton>
            <List component="nav"
                  subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                          List of transaction of your group
                      </ListSubheader>
                  }
                  aria-label="secondary mailbox folder" sx={{
                bgcolor: 'background.paper'
            }}>
                {isLoading? <LoadingPage/> : transactionList?.map((t:AggregateTransaction, key:number)=><TransactionEntry key={key} transaction={t}/>)}
            </List>
        </div>)


    function TransactionEntry({transaction}:{transaction:AggregateTransaction}){
        const pathDelete = "/v1/wallet/transactions/"
        const req = pathDelete + "?uuid="+transaction.uuid

        const {trigger, isMutating} = useSWRMutation([req, "DELETE", session], customFetcher);

        function deleteTransaction(){
            trigger()
                .then(()=>{ mutate() })
                .catch(e=>console.log(e))
        }

        return (<ListItem>
                <ListItemText>
                    <Typography variant={"body1"}>Amount: {transaction.amount}</Typography>
                    <Typography variant={"body1"}>Creditor: {transaction.creditor}</Typography>
                    <Typography variant={"body1"}>Debtor: {transaction.debtor.toString()}</Typography>
                </ListItemText>
                <IconButton
                    disabled={isMutating}
                    onClick={deleteTransaction}>
                    <DeleteIcon/>
                    {isMediumScreen? <>delete</> : <></>}
                </IconButton>

        </ListItem>)
    }
}
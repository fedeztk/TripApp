import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import useSWRMutation from 'swr/mutation';
import {useTripGroupContext} from "../../context/tripGroup";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {customFetcher} from "../../lib/fetcher";
import Member from "../../types/member";


export default function NewTransactionPopup({triggerDialog, setTriggerDialog}:{triggerDialog:any, setTriggerDialog:any}){

    const [tripGroup, setTripGroup]= useTripGroupContext()
    const {data: session} = useSession()


    const [userList, setUserList] = useState<Member[]>();
    const [amount, setAmount] = useState<number | undefined>(undefined);


    function sendNewTransaction(){
        if(amount !== undefined && userList!==undefined && userList.length>0) {
            //la suddivisione viene fatta in parti uguali => feature da aggiungere : suddivisione in parti diverse
            let singleAmount:number = amount / userList.length

            let userIdAmountList:any = []
            let userIds:string[] = []

            userList.map((u:Member)=>{
                let tmp = {
                    "userId": u.userId,
                    "amount": singleAmount
                }
                userIdAmountList.push(tmp)
                userIds.push(u.userId)
            })


            let postArg = {
                "creditor": "4",
                "userIdAmountList": userIdAmountList,
                "groupId": tripGroup?.id,
                "userIdList": userIds
            }

            trigger(postArg)
                .then((r) => {
                    if (r?.ok) {
                        setTriggerDialog(false)
                    }
                })
        }
    }

    const path = "/v1/wallet/transactions/"
    const {trigger, isMutating} = useSWRMutation([path, "POST", session], customFetcher);


    return(<>
        <Dialog
            onClose={() => setTriggerDialog(false)}
            aria-labelledby="responsive-dialog-title"
            open={triggerDialog}
            sx={{height:"80vh"}}>
            <DialogTitle
                id="responsive-dialog-title">
                Add new operation
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    With who you want to split?
                </DialogContentText>
                <Autocomplete
                    sx={{ m: 1, width: '35ch' }}
                    onChange={(event: any, newValue:Member[]) => {

                        setUserList(newValue) //??
                    }}
                    disablePortal
                    multiple
                    limitTags={2}
                    autoComplete
                    getOptionLabel={(option) => option.name}

                    id="combo-box-demo"
                    options={tripGroup?.members ? tripGroup?.members : []}
                    renderInput={(params) => <TextField {...params} label="Users" />}
                />
                <DialogContentText>
                    How much do you spend?
                </DialogContentText>
                <TextField
                    label=""
                    fullWidth
                    id=""
                    type="text"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let tmp:number = event.target.value as unknown as number
                        setAmount(tmp);
                    }}
                    sx={{ m: 1, width: '35ch'}}

                    InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                />


            </DialogContent>

            <DialogActions>
                {isMutating ?
                    <Button disabled>
                        Loading...
                    </Button>
                    :
                    <Button onClick={sendNewTransaction}>
                        Create
                    </Button>
                }

                <Button onClick={()=>setTriggerDialog(false)}>
                    Exit
                </Button>
            </DialogActions>

        </Dialog>
    </>)
}

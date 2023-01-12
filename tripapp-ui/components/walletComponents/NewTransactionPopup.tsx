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

export default function NewTransactionPopup({triggerDialog, setTriggerDialog}:{triggerDialog:any, setTriggerDialog:any}){

    const [tripGroup, setTripGroup]= useTripGroupContext()




    const [userList, setUserList] = useState();
    const [payment, setPayment] = useState<number | undefined>(undefined);

    let postArg = {
        user:"",
        group:tripGroup?.id,
        payment:payment,
        userlist:userList
    }

    function sendNewTransaction(url:string, body:any){
        fetch(url,{
            method: "POST",
            headers:{

            },
            body: JSON.stringify(body)
        }).then((r)=>{
            if(r.ok){
                setTriggerDialog(false)
            }
        })

    }
    const backend = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT as string
    const path = "/api/addtransaction"
    const {trigger, isMutating} = useSWRMutation(backend.concat(path), sendNewTransaction);





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
                    onChange={(event: any, newValue: any | null) => {
                        setUserList(newValue)
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
                        setPayment(tmp);
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
                    <Button onClick={()=>trigger(postArg)}>
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


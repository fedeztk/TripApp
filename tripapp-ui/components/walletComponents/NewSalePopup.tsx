import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {InputAdornment, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export default function NewSalePopup({triggerDialog, setTriggerDialog}:{triggerDialog:any, setTriggerDialog:any}){

    return(<>
        <Dialog
            onClose={() => setTriggerDialog(false)}
            aria-labelledby="responsive-dialog-title"
            open={triggerDialog}>
            <DialogTitle id="responsive-dialog-title">
                Add new operation
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    How much do you spend?
                </DialogContentText>
                <TextField
                    label=""
                    id=""
                    type="number"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                />
                <DialogContentText>
                    With who you want to split?
                </DialogContentText>
                <TextField
                    label=""
                    id=""
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    }}
                />

            </DialogContent>

            <DialogActions>
                <Button onClick={()=>{}}>
                    Create
                </Button>
                <Button onClick={()=>setTriggerDialog(false)}>
                    Exit
                </Button>
            </DialogActions>

        </Dialog>
    </>)
}
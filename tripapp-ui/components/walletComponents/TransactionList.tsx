import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as React from "react";

export default function TransactionList({backTrigger}:{backTrigger:any}){
    return(<div>
        <IconButton  onClick={()=>backTrigger(false)}>
            <ArrowBackIcon/>
        </IconButton>
        LISTA DELLE TRANSAZIONI
    </div>)
}
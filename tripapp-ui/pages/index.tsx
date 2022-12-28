import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useSession, signIn, signOut} from "next-auth/react"
import {useAppContext} from "../components/MySession";

export default function Home(){
    const mycontext:any = useAppContext();



    return <>
        {mycontext.actTravel}
        <button onClick={()=>mycontext.setActTravel("A")}>Setta A</button>
        <button onClick={()=>mycontext.setActTravel("B")}>Setta B</button>
        <button onClick={()=>mycontext.setInit()}>Set Init MSG</button>
    </>
}



import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useSession, signIn, signOut} from "next-auth/react"
import {useContext, useEffect, useState} from "react";
import {func} from "prop-types";
import {json} from "stream/consumers";
import {useAppContext} from "../components/auth/MySession";
import {type} from "os";


type Travel={

}

export type TravelList = Travel[]


export default function Home(){
    const {data: session} = useSession()
    const context:any = useAppContext();
    const [data, setData] = useState<TravelList>();


    useEffect(getData, [])
    function getData(){
        console.log("getData")
        const postReqOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : session?.user,
                id : context.data
            })
        }

        fetch("http://localhost:3000/api/hello", postReqOpt)
            .then(res => res.json())
            .catch(error => console.error('Errore nella risposta del API:', error))
            .then((result)=> {
                //console.log(result);
                context.setData(result);
                setData(result);
            })
    }


    console.log("Data: "+data)

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <nav className={styles.navbar}>
                <div className={styles.signup}>
                    {session?.user ? (
                        <button onClick={() => signOut()}>Sign out {session.user.name}</button>
                    ) : (
                        <button onClick={() => signIn()}>Sign in</button>
                    )}
                </div>
            </nav>
            <main className={styles.main}>
                    <button onClick={()=>getData()}>Send Request</button>
            </main>
        </div>
    )
}


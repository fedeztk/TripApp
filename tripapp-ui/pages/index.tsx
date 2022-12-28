import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useSession, signIn, signOut} from "next-auth/react"
import Menu from "../components/Menu";
import {AppProps} from "next/app";
import {useRouter} from "next/navigation";
import TravelList from "../components/TravelList";

export default function Home({props, context, culo}:{props:AppProps, context:any, culo:any}){
    const {data: session} = useSession()
    const router = useRouter();

    return <>
        <div>
            <button onClick={()=>signOut()}>LogOut</button>
        </div>
        <div>
            <TravelList/>
        </div>
    </>
}


/*
return (
        <div className={styles.container}>

            <nav className={styles.navbar}>
                <div className={styles.navbarLinks}>
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
                <div className={styles.signup}>
                    {session && session.user ? (
                        <button onClick={() => signOut()}>Sign out {session.user.name}</button>
                    ) : (
                        <button onClick={() => signIn()}>Sign in</button>
                    )}
                </div>
            </nav>
            <main className={styles.main}>
                <div>
                    {session && session.user ? (
                        <div className={styles.card}>
                            <div className={styles.cardImage}>
                                <Image src="/architecture.png" alt="book" width={500} height={300}/>
                            </div>
                            <div className={styles.cardContent}>
                                <h2>Computer Programming Cookbook</h2>
                                <p>
                                    This is a simple hero unit, a simple jumbotron-style component for calling
                                    extra attention to featured content or information.
                                </p>
                                <p>
                                    <a className={styles.btn} href="https://nextjs.org/docs" target="_blank"
                                       rel="noreferrer">
                                        Learn More
                                    </a>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>You need to sign in to access the books</p>
                    )}
                </div>
            </main>
        </div>
    )
 */
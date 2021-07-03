import axios from "axios"
import Head from "next/head"

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import type { ReactElement } from "react"

import styles from "../styles/home/Home.module.css"

import NewVideo from "../components/home/NewVideo"
import Thumbnail from "../components/home/Thumbnail"
import origin from "../components/origin"

import type { ThumbnailData } from "../server/session/SessionManager"

interface Props
{

    thumbnails: ThumbnailData[]

}

export default function Home(props: Props): ReactElement
{
    // Convert thumbnail data to elements
    let thumbnails: ReactElement[] = []
    for (let data of props.thumbnails)
    {
        thumbnails.push(<Thumbnail id={data.id} title={data.title} image={data.image} key={data.id}/>)
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>Youtube Synchronized</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.home}>
                <NewVideo />
                {thumbnails}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>>
{
    let response = await axios.get(origin(context.req, "/sessions"))
    let thumbnails = response.data

    return { props: { thumbnails } }
}

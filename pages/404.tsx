import Head from "next/head"

import type { ReactElement } from "react"

import styles from "../styles/404.module.scss"

export default function NotFound(): ReactElement
{
    return (
        <div className={styles.page}>
            <Head>
                <title>Page Not Found - Youtube Synchronized</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.notfound}>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <span>The URL you have tried to visit does not exit. Try going somewhere else.</span>
            </div>
        </div>
    )
}

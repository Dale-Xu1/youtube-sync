import Link from "next/link"

import type { AppProps } from "next/app"
import type { ReactElement } from "react"

import "../styles/globals.css"
import styles from "../styles/App.module.css"

export default function App({ Component, pageProps }: AppProps): ReactElement
{
    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </div>
            <Component {...pageProps} />
        </div>
    )
}

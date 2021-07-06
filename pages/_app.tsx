import Link from "next/link"

import type { AppProps } from "next/app"
import type { ReactElement } from "react"

import "../styles/globals.scss"
import styles from "../styles/App.module.scss"

export default function App(props: AppProps): ReactElement
{
    let Component = props.Component

    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </div>
            <Component {...props.pageProps} />
        </div>
    )
}

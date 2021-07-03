import Link from "next/link"

import type { ReactElement } from "react"

import styles from "../../styles/home/Home.module.css"

interface Props
{

    id: string

    title: string
    image: string

}

export default function Thumbnail(props: Props): ReactElement
{
    return (
        <div className={styles.thumbnail}>
            <Link href={`/video?id=${props.id}`}>
                <div className={styles["thumbnail-content"]}>
                    <img src={props.image} alt="" />
                    <span>{props.title}</span>
                </div>
            </Link>
        </div>
    )
}
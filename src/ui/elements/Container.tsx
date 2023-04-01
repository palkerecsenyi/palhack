import React, { ReactNode } from "react"
import styles from "../styles/container.module.scss"

interface props {
    children: ReactNode
}
export default function Container(
    {children}: props
) {
    return <div className={styles.parentContainer}>
        {children}
    </div>
}

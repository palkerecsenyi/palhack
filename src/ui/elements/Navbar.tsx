import React from "react"
import styles from "../styles/navbar.module.scss"
import Logo from "../assets/carbonara.svg"

export default function Carbonabar() {
    return <div className={styles.navbar}>
        <img
            src={Logo}
            alt="Carbonara"
        />
    </div>
}

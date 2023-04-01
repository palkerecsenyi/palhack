import React, { useMemo } from "react"
import styles from "../styles/cartTotal.module.scss"

export default function CartTotal() {
    const co2Total = useMemo(() => {
        return 15
    }, [])
    return <div className={styles.cartTotal}>
        <p className={styles.totalString}>
            <span className={styles.bigNumber}>{co2Total}</span>
            kg of CO<sub>2</sub>e
        </p>
    </div>
}

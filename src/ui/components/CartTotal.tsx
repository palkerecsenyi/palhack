import React, { useEffect, useMemo, useState } from "react"
import styles from "../styles/cartTotal.module.scss"
import { getCartEmissions, useCartEmissions } from "../data/cart"

export default function CartTotal() {
    const co2Total = useCartEmissions()

    return <div className={styles.cartTotal}>
        <p className={styles.totalString}>
            <span className={styles.bigNumber}>{co2Total}</span>
            kg of CO<sub>2</sub>e
        </p>
    </div>
}

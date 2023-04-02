import React, { useMemo, useState } from "react"
import styles from "../styles/duck.module.scss"
import DuckDead from "../assets/dead.gif"
import DuckDying from "../assets/dying.gif"
import DuckSad from "../assets/sad.gif"
import DuckHappy from "../assets/happy.gif"
import DuckShop from "./DuckShop"
import { useSelectedProduct } from "../data/shop"
import DuckCroissant from "../assets/duck_products/croissant.gif"
import DuckBlueShirt from "../assets/duck_products/blueshirt.gif"

export enum DuckLevel {
    Dead,
    Dying,
    Sad,
    Happy,
}
interface props {
    level: DuckLevel
}

export default function Duck(
    {level}: props
) {
    const selectedProduct = useSelectedProduct()
    const duckUrl = useMemo(() => {
        switch (level) {
            case DuckLevel.Dead:
                return DuckDead
            case DuckLevel.Dying:
                return DuckDying
            case DuckLevel.Sad:
                return DuckSad
            case DuckLevel.Happy:
                if (!selectedProduct) return DuckHappy
                switch (selectedProduct) {
                    case "Croissant":
                        return DuckCroissant
                    case "Blue shirt":
                        return DuckBlueShirt
                }
        }
    }, [level, selectedProduct])

    const ImageComponent = useMemo(() => <img
        src={duckUrl}
        alt="Dancing duck"
    />, [duckUrl])

    const [showShop, setShowShop] = useState(false)

    return <div className={styles.container}>
        {level === DuckLevel.Happy ? <button
            className={styles.duckButton}
            onClick={() => setShowShop(true)}
        >
            {ImageComponent}
        </button> : ImageComponent}

        {showShop && <DuckShop onClose={() => setShowShop(false)} />}
    </div>
}

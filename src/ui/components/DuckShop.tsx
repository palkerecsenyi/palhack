import React, { useCallback } from "react"
import styles from "../styles/duck.module.scss"
import DuckShopItem from "./DuckShopItem"
import { buyProduct, useCredits } from "../data/shop"
import { DuckProduct } from "../stores/shop"
import { useAppDispatch } from "../stores/app"

import Croissant from "../assets/duck_products/croissant.png"

export const availableDuckProducts: DuckProduct[] = [
    {
        name: "Croissant",
        description: "Carbonara ducks are French, so they always appreciate a high-quality pastry.",
        imageUrl: Croissant,
        price: 5,
    }
]

interface props {
    onClose(): void
}
export default function DuckShop(
    {onClose}: props
) {
    const [credits, creditsLoading] = useCredits()
    const dispatch = useAppDispatch()
    const buy = useCallback((product: DuckProduct) => {
        if (creditsLoading) return
        if (credits < product.price) return

        buyProduct(product, dispatch)
    }, [credits, creditsLoading, dispatch])

    return <div
        className={styles.duckModal}
    >
        <div className={styles.modalBody}>
            <div className={styles.headRow}>
                <h1>
                    Duck Shop
                </h1>

                <button
                    className={styles.close}
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>

            <p className={styles.creditsRow}>
                You have <strong>{credits}</strong> coins.
            </p>

            {availableDuckProducts.map(product => <DuckShopItem
                item={product}
                key={product.name}
                onBuy={() => buy(product)}
            />)}
        </div>
    </div>
}

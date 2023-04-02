import React from "react"
import { DuckProduct } from "../stores/shop"
import styles from "../styles/duck.module.scss"
import Coin from "../assets/duck_products/coin.png"
import { useIsOwned, useSelectedProduct } from "../data/shop"

interface props {
    item: DuckProduct
    onBuy(): void
    onSelect(): void
}
export default function DuckShopItem(
    {item, onBuy, onSelect}: props
) {
    const isOwned = useIsOwned(item.name)
    const isUsed = useSelectedProduct() === item.name

    return <div className={styles.duckProduct}>
        <img
            src={item.imageUrl}
            alt="Duck product"
            className={styles.duckProductImage}
        />
        <div>
            <p className={styles.duckProductName}>
                {item.name}
            </p>
            <p>
                {item.description}
            </p>

            <p className={styles.duckProductPriceList}>
                <img src={Coin} alt="Coins" />
                {item.price}
            </p>
            {!isOwned ? <button
                onClick={onBuy}
                className={styles.duckProductBuy}
            >
                Buy!
            </button> : <button
                onClick={onSelect}
                className={styles.duckProductBuy}
                disabled={isUsed}
            >
                Use!
            </button>}
        </div>
    </div>
}

import React from "react"
import styles from "../styles/duck.module.scss"
import DuckShopItem from "./DuckShopItem"

export interface DuckProduct {
    name: string
    description: string
    imageUrl: string
    price: number
}
export const availableDuckProducts: DuckProduct[] = [
    {
        name: "Croissant",
        description: "Carbonara ducks are French, so they always appreciate a high-quality pastry.",
        imageUrl: "",
        price: 5,
    }
]

interface props {
    onClose(): void
}
export default function DuckShop(
    {onClose}: props
) {
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

            {availableDuckProducts.map(product => <DuckShopItem
                item={product}
                key={product.name}
            />)}
        </div>
    </div>
}

import { getCart, getInfo, getProductDetail } from "../../utils"
import { useEffect, useMemo, useState } from "react"
import { DuckLevel } from "../components/Duck"

interface CartItem {
    title: string
    url: URL
    node: Node
}
export const getCartEmissions = async (): Promise<number> => {
    const cart = await getCart() as CartItem[]
    let total = 0;
    for (const item of cart) {
        const emission = await getInfo(await getProductDetail(item))
        total += emission ?? 0;
    }

    return total;
}

export const useCartEmissions = () => {
    const [total, setTotal] = useState<number>(0)
    useEffect(() => {
        (async () => {
            const emissions = await getCartEmissions()
            setTotal(emissions)
        })()
    }, [])
    return total
}

export const useDuckHappiness = () => {
    const co2Total = useCartEmissions()
    return useMemo(() => {
        if (co2Total < 10) {
            return DuckLevel.Happy
        } else if (co2Total < 50) {
            return DuckLevel.Sad
        } else if (co2Total < 150) {
            return DuckLevel.Dying
        } else {
            return DuckLevel.Dead
        }
    }, [co2Total])
}

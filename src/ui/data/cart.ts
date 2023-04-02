import { getCart, getInfo, getProductDetail } from "../../utils"

interface CartItem {
    title: string
    url: string
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

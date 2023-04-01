import { getCart } from "../../utils"

export const getCartEmissions = async () => {
    const cartItems = await getCart()
    console.log(cartItems)
}

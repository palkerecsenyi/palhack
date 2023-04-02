import { useEffect, useMemo} from "react"
import { useAuth } from "./auth"
import { serverAddress } from "./vars"
import { AppDispatch, useAppDispatch, useAppSelector } from "../stores/app"
import { addOwnedProduct, applyCredits, DuckProduct, invalidateCredits, pay, setOwnedProducts } from "../stores/shop"

export const useCredits = () => {
    const [authState] = useAuth()
    const dispatch = useAppDispatch()
    const credits = useAppSelector(state => state.shopsReducer.credits)
    const creditsLoading = useAppSelector(state => state.shopsReducer.creditsLoading)
    useEffect(() => {
        if (!authState) {
            dispatch(invalidateCredits())
            return
        }

        (async () => {
            const response = await fetch(`${serverAddress}/api/v1/getDuckCredits?token=${authState}`)
            const data = await response.json() as {
                userCredits: number
            }

            dispatch(applyCredits(data.userCredits))
        })()
    }, [authState])

    return [credits, creditsLoading] as const
}

export const useOwnedProducts = () => {
    const ownedProducts = useAppSelector(state => state.shopsReducer.ownedProducts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const stringData = localStorage.getItem("owned-products")
        if(!stringData) {
            dispatch(invalidateCredits())
            return
        }

        const parsed = JSON.parse(stringData) as DuckProduct[]
        dispatch(setOwnedProducts(parsed))
    }, [])

    return ownedProducts
}

export const useIsOwned = (productName: string) => {
    const ownedProducts = useOwnedProducts()
    return useMemo(() => {
        return ownedProducts.map(e => e.name).includes(productName)
    }, [productName, ownedProducts])
}

export const buyProduct = async (token: string, product: DuckProduct, dispatch: AppDispatch) => {
    await fetch(
        `${serverAddress}/api/v1/subtractDuckCredits?token=${token}&amountSpent=${product.price}`
    )

    const currentData = localStorage.getItem("owned-products")
    let newData: DuckProduct[]
    if (!currentData) {
        newData = [product]
    } else {
        const parsed = JSON.parse(currentData)
        newData = [
            ...parsed,
            product,
        ]
    }

    dispatch(pay(product.price))
    dispatch(addOwnedProduct(product))
    localStorage.setItem("owned-products", JSON.stringify(newData))
}

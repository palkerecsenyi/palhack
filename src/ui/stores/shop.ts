import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DuckProduct {
    name: string
    description: string
    imageUrl: string
    price: number
}

interface ShopState {
    credits: number
    creditsLoading: boolean
    ownedProducts: DuckProduct[]
    selectedProductName?: string
}
const initialState: ShopState = {
    credits: 0,
    creditsLoading: true,
    ownedProducts: [],
    selectedProductName: undefined
}
const shopSlice = createSlice({
    name: "shop",
    initialState: initialState,
    reducers: {
        selectProduct: (state, action: PayloadAction<string>) => {
            state.selectedProductName = action.payload
        },
        deselectProduct: state => {
            state.selectedProductName = undefined
        },
        startLoading: state => {
            state.creditsLoading = true
        },
        invalidateCredits: state => {
            state.credits = 0
            state.ownedProducts = []
        },
        applyCredits: (state, action: PayloadAction<number>) => {
            state.credits = action.payload
            state.creditsLoading = false
        },
        pay: (state, action: PayloadAction<number>) => {
            state.credits -= action.payload
        },
        invalidateOwnedProducts: state => {
            state.ownedProducts = []
        },
        setOwnedProducts: (state, action: PayloadAction<DuckProduct[]>) => {
            state.ownedProducts = action.payload
        },
        addOwnedProduct: (state, action: PayloadAction<DuckProduct>) => {
            state.ownedProducts.push(action.payload)
        }
    }
})

export const {deselectProduct, selectProduct, startLoading, applyCredits, invalidateCredits, pay, invalidateOwnedProducts, setOwnedProducts, addOwnedProduct} = shopSlice.actions
export default shopSlice.reducer

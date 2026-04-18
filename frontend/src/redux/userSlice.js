import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        currentCity: "Akola",
        currentState: null,
        currentAddress: null,
        shopsInMyCity: null,
        itemsInCity: null,
        cartItems: [],
        totalAmount: 0,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setCurrentCity: (state, action) => {
            state.currentCity = action.payload
        },
        setCurrentState: (state, action) => {
            state.currentState = action.payload
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload
        },
        setShopsInMyCity: (state, action) => {
            state.shopsInMyCity = action.payload
        },
        setItemsInCity: (state, action) => {
            state.itemsInCity = action.payload
        },
        addToCart: (state, action) => {
            const cartItem = action.payload

            const existingItem = state.cartItems.find(
                item => item.id === cartItem.id
            )

            if (existingItem) {
                existingItem.quantity = cartItem.quantity
            } else {
                state.cartItems.push(cartItem)
            }
            state.totalAmount = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        },
        saveToCart: (state, action) => {
            state.cartItems = action.payload
        },
        updateQuantity: (state, action) => {
            const {id, quantity} = action.payload
            const item = state.cartItems.find(i=> i.id == id)
            if(item)
                item.quantity = quantity

            state.totalAmount = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        },
        removeCartItem: (state, action) =>{
            const {id} = action.payload
            state.cartItems = state.cartItems.filter(item=> item.id != id)
            state.totalAmount = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload
        }
    }
})

export const {
    setUserData,
    setCurrentCity,
    setCurrentState,
    setCurrentAddress,
    setShopsInMyCity,
    setItemsInCity,
    addToCart,
    saveToCart,
    updateQuantity,
    removeCartItem,
    setTotalAmount } = userSlice.actions
export default userSlice.reducer
import { createContext, useReducer } from "react";

// define context
export const CartContext = createContext()

const updateLocalStorage = cart => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
}


// useReducer
const initialState = JSON.parse(window.localStorage.getItem('cart')) || [] 
const reducer = (state, action) => {

    const { type: actionType, payload: actionPayload } = action
    switch (actionType) {

        case 'ADD_TO_CART': {
            const productInCartIndex = state.findIndex(item => item.id === action.payload.id)

            if (productInCartIndex >= 0) {
                const newCart = state.map(product => {
                    if (product.id === action.payload.id) {
                        return { ...product, quantity: state.quantity + 1 }
                    }
                })
                return newCart
            }

            const newCart = [
                ...state, {
                    ...actionPayload,
                    quantity: 1
                }
            ]

            updateLocalStorage(newCart)
            return newCart

        }
        case 'REMOVE_FROM_CART': {
            const { id } =  actionPayload
            const newCart = state.filter(product => product.id !== id)
            updateLocalStorage(newCart)
            return newCart
        }

        case 'CLEAR_CART': {
            updateLocalStorage([])
            return []
        }
    }
    return state
}

// provider
export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({type: 'CLEAR_CART'})

    return (
        <CartContext.Provider
            value={{ cart: state, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
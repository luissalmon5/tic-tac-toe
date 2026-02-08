import { useId } from "react"
import { CartIcon, ClearCartIcon } from "./Icons"
import sample from "/sample.png"
import './Cart.css'
import { useCart } from "../hooks/useCart.js"


const CartItem = ( { thumbnail = sample, price, title, quantity, addToCart } ) => {
        return (
            <li className="flex gap-3 justify-center items-center border-b-gray-800 min-w-44 min-h-44">
                <img className="w-25 h-25" src={thumbnail} alt="" />
                <div>
                    <strong> ${title} - ${price}  </strong>
                </div>
                <footer className="flex justify-center items-center gap-2">
                    <small>
                        Qty: {quantity}
                    </small>
                    <button onClick={addToCart} className=" bg-gray-400 rounded-xl text-center p-2">+</button>
                </footer>

            </li>
        )
    }

export const Cart = () => {
    const cartCheckBoxId = useId()
    const { cart, clearCart, addToCart } = useCart()

    return (
        <>
            <div className="cart">

                <label className="absolute right-10 bg-blue-600 rounded-full top-2.5 p-4 z-50 peer ..." htmlFor={cartCheckBoxId}>
                    <p className="relative z-50 text-white"><CartIcon /></p>
                    <input type="checkbox" id={cartCheckBoxId} hidden />
                    <span className="absolute flex justify-center items-center top-0 right-2 z-10 bg-blue-600 h-5 w-5 rounded-full shadow-xs border-2 border-white text-white">{cart.length}</span>
                </label>
                

                <aside className="cart-content pt-30 p-8 absolute top-0 right-0 w-0 z-20 bg-emerald-50 h-dvh hidden transition-all transition-discrete peer-has-checked:w-1/3 peer-has-checked:block duration-300 ease-in-out ...">
                    <ul>
                        {
                            cart.length > 0 ? cart.map(product => 
                                <CartItem 
                                    key={product.id}
                                    addToCart={() => addToCart(product)}
                                    {...product}
                                />
                            ) : <div className="flex justify-center"><p>No items in Cart</p></div>
                        }
                    </ul>
                    <button onClick={clearCart}>
                        <ClearCartIcon />
                    </button>
                </aside>

            </div>
        </>
    )
}
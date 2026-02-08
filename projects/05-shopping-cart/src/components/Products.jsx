import { AddToCartIcon, RemoveFromCartIcon } from "./Icons"
import sample from "/sample.png"
import { useCart } from "../hooks/useCart"


export const Products = ({ products = null }) => {
    const mainClass = `products ${products !== null ? 'grid md:grid-cols-3 lg:grid-cols-4  gap-4' : 'flex justify-center'}`
    const { addToCart, removeFromCart, cart } = useCart()

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }

    return (
        <main className={mainClass}>
            {
                products !== null
                    ?
                    products.map(product => {
                        const isProductInCart = checkProductInCart(product)

                        return (
                            <div className="relative flex flex-col group justify-between  gap-3 shadow-sm hover:shadow-md transition-shadow rounded-xl border border-slate-100" key={product.id}>
                                <div className="p-6 aspect-square bg-slate-50 overflow-hidden">
                                    <img className="product-img w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" src={sample} alt={product.title} />
                                </div>

                                <div className="product-content p-6">
                                    <div className="product-title">
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{product.title}</h3>
                                        <p className="font-bold text-slate-900 text-xl">${product.price}</p>
                                    </div>
                                    <div className="product-category absolute top-2 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="mt-auto pt-2">
                                        <button onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)} className={`flex justify-center gap-4 text-xl text-white font-bold w-full p-2 rounded-md cursor-pointer ${isProductInCart ? 'bg-red-600' : 'bg-blue-600'}`}>
                                            <span className="text-sm"> { isProductInCart ? 'Remove it' : 'Quick Add' } </span>
                                            { isProductInCart ?  <RemoveFromCartIcon /> : <AddToCartIcon /> }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )

                    }

                    )
                    :
                    <div className="not-found">
                        <h1 className="text-xl font-bold">No products found</h1>
                    </div>
            }
        </main>
    )
}
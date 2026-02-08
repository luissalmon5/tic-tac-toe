import { Products } from "./components/Products"
import { products as initialProducts } from "./mocks/products.json"
import { Header } from "./components/Header"
import { useState } from "react"
import { useFilters } from "./hooks/useFilters"
import { Cart } from "./components/Cart"
import { Footer } from "./components/Footer"
import { CartProvider } from './context/cart.jsx'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <div className="w-full p-6 lg:p-12 mx-auto mt-12.5">
        <Cart/>
        <Header />
        <Products products={filteredProducts}  />
        <Footer/>
      </div>
    </CartProvider>
  )
}

export default App

import React, {useEffect, useState} from 'react'
import {Cart, Checkout, Navigation, Products} from './components/index'
import {Route, Routes} from 'react-router-dom'
import {commerce} from './services/commerce'

function App() {
    const [products, setProducts] = useState<any[]>([])
    const [cart, setCart] = useState<any>({})

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }

    const handleAddToCart = async (productId: string, quantity: number) => {
        const {cart: updatedCart} = await commerce.cart.add(productId, quantity)
        setCart(updatedCart)
    }

    const handleUpdateCart = async (productId: string, quantity: number) => {
        const {cart: updatedCart} = await commerce.cart.update(productId, {quantity: quantity})
        setCart(updatedCart)
    }

    const handleRemoveFromCart = async (productId: string) => {
        const {cart: updatedCart} = await commerce.cart.remove(productId)
        setCart(updatedCart)
    }

    const handleEmptyCart = async () => {
        const {cart: updatedCart} = await commerce.cart.empty()
        setCart(updatedCart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (
        <>
            <Navigation totalItems={cart.total_items}/>
            <Routes>
                <Route path="/" element={<Products products={products} handleAddToCart={handleAddToCart}/>}/>
                <Route path="/cart" element={
                    <Cart
                        cart={cart}
                        handleUpdateCart={handleUpdateCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                    />
                }/>
                <Route path="/checkout" element={<Checkout cart={cart}/>}/>
            </Routes>

        </>
    )
}

export default App

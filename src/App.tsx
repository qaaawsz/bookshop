import React, {useEffect, useState} from 'react'
import {Cart, Checkout, Navigation, Products} from './components/index'
import {Route, Routes} from 'react-router-dom'
import {commerce} from './services/commerce'

function App() {
    const [products, setProducts] = useState<any[]>([])
    const [cart, setCart] = useState<any>({})
    const [order, setOrder] = useState<any>({})
    const [errorMessage, setErrorMessage] = useState<string>('')

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

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId: string, newOrder: any) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (e: any) {
            setErrorMessage(e.data.error.message)
        }
    }

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
                <Route path="/checkout" element={
                    <Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                    />
                }/>
            </Routes>

        </>
    )
}

export default App

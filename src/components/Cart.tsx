import React from 'react'
import {Button, Container, Grid, Typography} from '@mui/material'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'

interface ICart {
    cart: any
    handleUpdateCart: Function
    handleRemoveFromCart: Function
    handleEmptyCart: Function
}

const Cart: React.FC<ICart> = ({cart, handleUpdateCart, handleRemoveFromCart, handleEmptyCart}) => {
    const isEmpty = !cart?.line_items?.length

    if (!cart) return <></>
    return (
        <Container style={{marginTop: 50}}>
            <Typography variant="h3">
                Your shopping cart
            </Typography>
            {
                isEmpty
                    ? <p>Empty cart. <Link to="/">Return to the shop</Link></p>
                    : <Grid container spacing={3}>
                        {
                            cart?.line_items?.map((item: any) => (
                                <Grid key={item.id} item xs={12} md={6}>
                                    <CartItem
                                        handleUpdateCart={handleUpdateCart}
                                        handleRemoveFromCart={handleRemoveFromCart}
                                        item={item}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
            }
            <div>
                <Typography variant="h5">
                    Subtotal: {cart?.subtotal?.formatted_with_symbol}
                </Typography>
                <div>
                    <Button onClick={() => handleEmptyCart()} size="large" variant="outlined" color="secondary">
                        Empty cart
                    </Button>

                    <Button component={Link} to='/checkout' size="large" variant="outlined" color="secondary">
                        Checkout
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Cart

import React from 'react'
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {Box, Button, Divider, List, ListItem, ListItemText, Typography} from '@mui/material'

const Reivew: React.FC<{ token: any }> = ({token}) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {
                    token.live.line_items.map((item: any) => (
                        <ListItem key={item.name}>
                            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}/>
                            <Typography variant="body2">
                                {item.line_total.formatted_with_symbol}
                            </Typography>
                        </ListItem>
                    ))}
                <ListItem>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1">
                        {token.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

const StripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '')

const PaymentForm: React.FC<{ token: any, data: any, onCaptureCheckout: Function, prevStep: Function, nextStep: Function }> =
    ({token, data, onCaptureCheckout, prevStep, nextStep}) => {
        const handleSubmit = async (e: any, elements: any, stripe: any) => {
            e.preventDefault()
            if (!stripe || !elements) return

            const cardElement = elements.getElement(CardElement)
            const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})

            if (error) console.log(error)
            else {
                const orderData = {
                    line_items: token.live.line_items,
                    customer: {
                        firstname: data.firstName,
                        lastname: data.lastName,
                        email: data.email,
                    },
                    shipping: {
                        name: 'Primary',
                        street: data.address,
                        town_city: data.city,
                        country_state: data.shippingSubdivision,
                        postal_zip_code: data.zip,
                        country: data.shippingCountry,
                    },
                    fulfillment: {
                        shipping_method: data.shippingOption,
                    },
                    payment: {
                        gateway: 'stripe',
                        stripe: {
                            payment_method_id: paymentMethod.id,
                        },
                    }
                }
                onCaptureCheckout(token.id, orderData)
                nextStep()
            }
        }

        return (
            <>
                <Reivew token={token}/>
                <Divider/>
                <Typography variant="h6" gutterBottom>Payment Method</Typography>
                {/*@ts-ignore*/}
                <Elements stripe={StripePromise}>
                    <ElementsConsumer>
                        {({elements, stripe}) => (
                            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                <CardElement/>
                                <br/> <br/>
                                <Box display="flex" justifyContent="space-between">
                                    <Button variant="outlined" onClick={() => prevStep()}>Back</Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!stripe}
                                        color="primary"
                                    >
                                        Pay {token.live.subtotal.formatted_with_symbol}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </>
        )
    }

export default PaymentForm

import React, {useEffect, useState} from 'react'
import {Paper, Step, StepLabel, Stepper, Typography} from '@mui/material'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'
import {commerce} from '../services/commerce'

const steps = [
    'Shipping address',
    'Payment details'
]

const Checkout: React.FC<{ cart: any }> = ({cart}) => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const [token, setToken] = useState<any>(null)
    const [data, setData] = useState<any>({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setToken(token)
            } catch (e) {
                console.log(e)
            }
        }

        generateToken()

    }, [cart])

    if (!token) return <></>

    const Form = () => activeStep === 0
        ? <AddressForm token={token} next={next}/>
        : <PaymentForm/>

    const nextStep = () => {setActiveStep(prevState => prevState + 1)}
    const prevStep = () => {setActiveStep(prevState => prevState - 1)}

    const next = (data: any) => {
        console.log(data)
        setData(data)
        nextStep()
    }

    const confirmation = () => (
        <p>confirmation</p>
    )

    return (
        <Paper style={{marginTop: 60}}>
            <Typography variant="h5">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((step: any) => (
                        <Step key={step}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            {activeStep === steps.length ? <Confirmation/> : <Form/>}
        </Paper>
    )
}

export default Checkout

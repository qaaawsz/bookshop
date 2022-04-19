import React, {useEffect, useState} from 'react'
import {Paper, Step, StepLabel, Stepper, Typography} from '@mui/material'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'
import {commerce} from '../services/commerce'
import {useNavigate} from 'react-router-dom'

const steps = [
    'Shipping address',
    'Payment details'
]

interface ICheckout {
    cart: any
    order: any
    onCaptureCheckout: Function
    error: string
}

const Checkout: React.FC<ICheckout> = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const [token, setToken] = useState<any>(null)
    const [data, setData] = useState<any>({})
    const navigate = useNavigate()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setToken(token)
            } catch (e) {
                navigate('/')
            }
        }

        generateToken()

    }, [cart])

    if (!token) return <></>

    const Form = () => activeStep === 0
        ? <AddressForm token={token} next={next}/>
        : <PaymentForm token={token} data={data} onCaptureCheckout={onCaptureCheckout} prevStep={prevStep}
                       nextStep={nextStep}/>

    const nextStep = () => {
        setActiveStep(prevState => prevState + 1)
    }
    const prevStep = () => {
        setActiveStep(prevState => prevState - 1)
    }

    const next = (data: any) => {
        setData(data)
        nextStep()
    }

    const Confirmation = () => (
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

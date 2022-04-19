import React, {useEffect, useState} from 'react'
import {Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material'
import {FormProvider, useForm, Controller, useFormContext} from 'react-hook-form'
import {commerce} from '../services/commerce'
import {Link} from 'react-router-dom'

const AddressForm: React.FC<{ token: any, next: Function }> = ({token, next}) => {
    const methods = useForm()
    const [shippingCountries, setShippingCountries] = useState<any[]>([])
    const [shippingCountry, setShippingCountry] = useState<string>('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState<any[]>([])
    const [shippingSubdivision, setShippingSubdivision] = useState<string>('')
    const [shippingOptions, setShippingOptions] = useState<any[]>([])
    const [shippingOption, setShippingOption] = useState<string>('')

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}))
    const options = shippingOptions.map((option) => ({
        id: option.id,
        label: `${option.description} - ${option.price.formatted_with_symbol}`
    }))

    const fetchShippingCountries = async (checkoutTokenId: string) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode: string) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (tokenId: string, country: string, region: string | null = null) => {
        const options = await commerce.checkout.getShippingOptions(tokenId, {country, region})
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(token.id)
    }, [])

    useEffect(() => {
        shippingSubdivision && fetchShippingOptions(token.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])


    useEffect(() => {
        shippingCountry && fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    const CustomTextField: React.FC<{ name: string, label: string, required: boolean }> =
        ({name, label, required}) => {
            const {control} = useFormContext()
            return (
                <Grid item xs={12} sm={6}>
                    <Controller
                        defaultValue=""
                        control={control}
                        name={name}
                        render={({field}) => (
                            <TextField
                                {...field}
                                name={name}
                                label={label}
                                required={required}
                                fullWidth
                                variant="standard"
                            />
                        )}
                    />
                </Grid>
            )
        }

    return (
        <>
            <Typography variant="h6">Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data: any) => next({
                    ...data,
                    shippingCountry,
                    shippingSubdivision,
                    shippingOption
                }))}>
                    <Grid container spacing={3} style={{padding: 20}}>
                        <CustomTextField name="firstName" label="First name" required={true}/>
                        <CustomTextField name="lastName" label="Last name" required={true}/>
                        <CustomTextField name="address" label="Address" required={true}/>
                        <CustomTextField name="email" label="Email" required={true}/>
                        <CustomTextField name="city" label="City" required={true}/>
                        <CustomTextField name="zip" label="ZIP" required={true}/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth
                                    onChange={(e) => setShippingCountry(e.target.value)}>
                                {
                                    countries.map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth
                                    onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {
                                    subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => {
                                setShippingOption(e.target.value)
                            }}>
                                {
                                    options.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <Box width="100%" display="flex" justifyContent="space-between">
                        <Button variant="outlined" component={Link} to="/cart">Back to cart</Button>
                        <Button variant="contained" color="primary" type="submit">Next</Button>
                    </Box>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

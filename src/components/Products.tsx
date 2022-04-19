import React from 'react'
import {Grid} from '@mui/material'
import {Product} from './index'

const Products:React.FC<{products: any, handleAddToCart: Function}> = ({products, handleAddToCart}) => {
    return (
        <Grid mt={6} container justifyContent="center" spacing={4}>
            {products.map((product: any) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <Product handleAddToCart={handleAddToCart} product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Products

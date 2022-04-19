import React from 'react'
import {Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const Product: React.FC<{ product: any, handleAddToCart: Function }> = ({product, handleAddToCart}) => {

    return (
        <Card>
            <CardMedia image={product.image.url} title={product.name} style={{height: 400}}/>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </Box>
                <Typography
                    dangerouslySetInnerHTML={{__html: product.description}}
                    variant="body2"
                    color="textSecondary"
                />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={() => {
                    handleAddToCart(product.id, 1)
                }}>
                    <AddShoppingCartIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product

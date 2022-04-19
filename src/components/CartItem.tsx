import React from 'react'
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'

interface ICartItem {
    item: any
    handleUpdateCart: Function
    handleRemoveFromCart: Function
}

const CartItem: React.FC<ICartItem> = ({item, handleRemoveFromCart, handleUpdateCart}) => {
    return (
        <Card>
            <CardMedia image={item?.media?.source}/>
            <CardContent>
                <Typography variant="h6">
                    {item?.name}
                </Typography>
                <Typography variant="body2">
                    {item?.line_total?.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions>
                <Box display="flex" width="100%" justifyContent="space-between">
                    <Box display="flex">
                        <Button
                            onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
                            style={{padding: 0, minWidth: 20, borderRadius: '50%'}}
                            variant="contained"
                            size="small"
                        >
                            -</Button>
                        <Typography variant="body2">{item?.quantity}</Typography>
                        <Button
                            onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
                            style={{padding: 0, minWidth: 20, borderRadius: '50%'}}
                            variant="contained"
                            size="small"
                        >
                            +</Button>
                    </Box>
                    <Button
                        style={{padding: 0}}
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        onClick={() => handleRemoveFromCart(item.id)}
                    >
                        Remove
                    </Button>
                </Box>
            </CardActions>
        </Card>
    )
}

export default CartItem

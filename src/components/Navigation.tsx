import React from 'react'
import {AppBar, Badge, Box, IconButton, Toolbar, Typography} from '@mui/material'
import {ShoppingCart} from '@mui/icons-material'
import {Link, useLocation} from 'react-router-dom'

const Navigation: React.FC<{ totalItems: any }> = ({totalItems}) => {
    const location = useLocation()
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box display="flex" width="100%" justifyContent="space-between">
                    <Typography component={Link} to="/" variant="h6">
                        <img src="" alt=""/>
                        BookShop
                    </Typography>
                    {
                        location.pathname === '/' &&
                        <IconButton component={Link} to="/cart">
                            <Badge color="secondary" badgeContent={totalItems}>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation

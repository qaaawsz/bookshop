import React from 'react'
import {Product} from '../../exports'
import './products.scss'

const ProductsList: React.FC<{ products: any, handleAddToCart: Function }> = ({products, handleAddToCart}) => {
    return (
        <div className="productsList">
            {products.map((product: any) => (
                <Product key={product.id} handleAddToCart={handleAddToCart} product={product}/>
            ))}
        </div>
    )
}

export default ProductsList

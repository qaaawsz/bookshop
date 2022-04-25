import React from 'react'
// TODO replace with react-icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import './products.scss'

const ProductItem: React.FC<{ product: any, handleAddToCart: Function }> = ({product, handleAddToCart}) => {

    return (
        <div className="productsList__item item">
            <div
                style={{background: `url(${product.image.url}) no-repeat center`, backgroundSize: 'contain'}}
                className="item__image"
            />
            <div className="item__info">
                <p>{product.name}</p>
                <p className='item__author' style={{margin: 0}}
                   dangerouslySetInnerHTML={{__html: product.description}}/>
                <div className="item__bottom">
                    <p>{product.price.formatted_with_symbol}</p>
                    <button onClick={() => handleAddToCart(product.id, 1)}><AddShoppingCartIcon/></button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem

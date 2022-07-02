import {useContext } from 'react';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () =>{
    const {isCartOpen, setIstCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIstCartOpen(!isCartOpen);
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )

}
export default CartIcon;
import { createContext, useState} from 'react';

export const CartContext= createContext({
    isCartOpen: false,
    setIstCartOpen: ()=>{},
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIstCartOpen]=useState(false);
    const value={isCartOpen, setIstCartOpen};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
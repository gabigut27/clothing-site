import { createContext, useState, useEffect} from 'react';

const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItems = cartItems.find(
        (cartItem)=> cartItem.id === productToAdd.id);

    if (existingCartItems){ //if its already exist add +1 to quantity
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity+1}
        : cartItem )
    }
    return [...cartItems, {...productToAdd, quantity: 1}]; //if thie product not exist add him and make quanitty equal to 1
}

export const CartContext= createContext({
    isCartOpen: false,
    setIstCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIstCartOpen]=useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems])  

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));

    }

    const value={isCartOpen, setIstCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
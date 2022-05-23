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

const removeCartItem = (cartItems, cartItemToRemove) =>{
    const existingCartItems = cartItems.find(
        (cartItem)=> cartItem.id === cartItemToRemove.id);
    if (existingCartItems.quantity===1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity-1}
    : cartItem )

};

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);



export const CartContext= createContext({
    isCartOpen: false,
    setIstCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIstCartOpen]=useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity,0);
        setCartCount(newCartCount);
    }, [cartItems])  

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem)=>total+ cartItem.quantity * cartItem.price,0);
        setCartTotal(newCartTotal);
    }, [cartItems])  

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));

    };
    const removeItemFromCart = (cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove));

    };
    const clearItemFromCart = (cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems,cartItemToClear));

    }


    const value={isCartOpen, setIstCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart,cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
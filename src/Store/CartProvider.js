import { useReducer } from "react";
import CardContext from "./cart-context";

const defalutcartstate ={
    items: [],
    totalAmount: 0
};
const cartReducer =(state, action) => {
    if(action.type === 'ADD'){
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
            );

        const existingCartItem =state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;

        if(existingCartItem){
            updatedItem ={
               ...existingCartItem,
               amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else{
            
            updatedItems =state.items.concat(action.item);
        }  

            
  return{
    items: updatedItems,
    totalAmount: updateTotalAmount,
  };
}
if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];
    const updateTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount ===1){
     updatedItems = state.items.filter(item =>item.id !== action.id);
    }
    else{
     const updatedItem ={...existingItem, amount: existingItem.amount -1};
     updatedItems =[...state.items];
     updatedItems[existingCartItemIndex] = updatedItem;
    }
    return{
        items: updatedItems,
        totalAmount: updateTotalAmount
    };
}   
    return defalutcartstate;
};

const CartProvider = (props) => {
    const[cartState, dispatchCardAction]= useReducer(cartReducer, defalutcartstate);
  
  
  const addItemToCartHandler = (item) => {
    dispatchCardAction({type : 'ADD',item: item})

  };

  const removeItemFromCartHandler = (id) => {
    dispatchCardAction({type :'REMOVE',id:id})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;

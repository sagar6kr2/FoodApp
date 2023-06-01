import  { useState } from "react";
import Header from "./Component/Layout/Header";
import Meals from "./Component/Meals/Meals";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const[cardIsShow, setCardIsShow] =useState(false)
 
  const showCardHandler =() =>{
    setCardIsShow(true)
  }
  const hideCardHandler =() =>{
    setCardIsShow(false)
  }
  return (
    <CartProvider>
      {cardIsShow && <Cart onclose={hideCardHandler}/>}
      <Header   onShowCard ={showCardHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;

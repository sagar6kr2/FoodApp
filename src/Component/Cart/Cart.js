import React, { useContext, useState } from "react";
import CartItems from "./CartItems";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CardContext from "../../Store/cart-context";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const[isCheckOut, setIsCheckOut]=useState(false);
  const[isSubmit, setIsSubmit]=useState(false);
  const[didSubmit, setDidSubmit] =useState(false);
  const cartCtx = useContext(CardContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1});
  };

  const oderHandler =() =>{
    setIsCheckOut(true);
  }
  const submitHandlerOder = async(userData) =>{
    setIsSubmit(true);
    await fetch('https://react--api-9eec6-default-rtdb.firebaseio.com/order.json',{
    method:'POST',
    body: JSON.stringify({
      user :userData,
    oderedItems :cartCtx.items
    })
  });
  setIsSubmit(false);
  setDidSubmit(true)
  } 
  const CartItem = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItems
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRomve={cartItemRemoveHandler.bind(null,item.id)}
          onAdd ={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = <div className={styles.actions}>
  <button className={styles["button--alt"]} onClick={props.onclose}>
    Close
     </button>
     {hasItem && <button className={styles.button} onClick={oderHandler}>Order</button>}
     </div>
const cardModalContent =<React.Fragment>
  {CartItem}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
        {isCheckOut && <CheckOut onConfirm={submitHandlerOder} onCancel={props.onclose}/>}
        {!isCheckOut && modalAction}
</React.Fragment>

const isSubmittingModal =<p>Sending oder data...</p>
const didSubmitingModal =<React.Fragment>
  <p>Successfully sending Order</p>
  <div className={styles.actions}>
  <button className={styles["button--alt"]} onClick={props.onclose}>
    Close
     </button>
     {/* {hasItem && <button className={styles.button} onClick={oderHandler}>Order</button>} */}
     </div>
  </React.Fragment>

  return (
    <Modal onclose={props.onclose}>
     {!isSubmit && !didSubmit && cardModalContent}
     {isSubmit && isSubmittingModal}
     {!isSubmit && didSubmit && didSubmitingModal}
    
    </Modal>
  );
};

export default Cart;

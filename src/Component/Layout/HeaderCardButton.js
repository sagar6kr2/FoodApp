import React from "react";
import { useContext, useEffect, useState } from "react";
import CardIcon from "../Cart/CardIcon";
import styles from "./HeaderCardButton.module.css";
import CardContext from "../../Store/cart-context";


const HeaderCardButton = (props) => {

  const[btnHighLight, setBtnHighLight]=useState(false);

  const cartCtx = useContext(CardContext);
  const numberOfCartItem = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses =`${styles.button} ${btnHighLight ? styles.bump : ''}`;
  useEffect(() =>{
    if (cartCtx.items.length === 0){
      return;
    }
    setBtnHighLight(true);
     setTimeout(() => {
      setBtnHighLight(false);
     }, 300)}, [cartCtx]);
  return (
    <button className={btnClasses} onClick={props.onClick}>

      <span className={styles.icon}>
        <CardIcon />
      </span>

      <span>Your Card</span>
      <span className={styles.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCardButton;

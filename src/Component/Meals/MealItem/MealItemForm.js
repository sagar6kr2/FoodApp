import { useRef, useState } from 'react';
import React from 'react'
import styles from './MealItem.module.css'
import Input from '../../UI/Input'


    const MealItemForm =(props) => {
        const [amountIsValid, setAmountIsValid] =useState(true)
        const amountInputRef =useRef();

        const submitHandler = (event) => {
            event.preventDefault();

            const  enterAmount =amountInputRef.current.value;
            const enterAmountNumber = +enterAmount;

            if(enterAmount.trim().length ===0 || enterAmountNumber < 1 || enterAmount > 5){
                setAmountIsValid(false);
                return;
            }
            props.onaddToCart(enterAmountNumber);
        };
    
  return (
    <form className={styles.form}  onSubmit={submitHandler}>
        <Input
            ref={amountInputRef}
            label ="Amount" 
            input={{
            id: 'amount',
            type : 'number',
            min : '1',
            max : '5',
            step : '1',
            defaultValue : '1'
        }}/>
        <button>+Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  )
}

export default MealItemForm
